import Taro, { Component } from '@tarojs/taro'
import './article.scss'
import { View } from '@tarojs/components'
import { ITouchEvent, ITouch } from '@tarojs/components/types/common';
import memoize from 'lodash/memoize'
import noop from 'lodash/noop'
import { getBoundingClientRect, sleep } from '../../utils';

type DefaultProps = {
  title: string
  content: string
  minOffset: number
  /** 回弹时的backTransition */
  backTransition: number
  /** 中间按钮大小 */
  centerButtonWidth: number
  page: number
  onCenterButtonClick: () => void
  onScrollPrev: () => void
  onScrollNext: () => void
}

interface ComponentProps extends DefaultProps {
  onSwiper: (page: number) => void
}

type ComponentState = {
  translateX: number
  transition: number
  /** 总共的页数 */
  pageCount: number
  /** 当前页 */
  currentPage: number
}

const ARTICLE_NO_SHOW_TEXT = '您当前使用的版本过低，已停止服务！'
const ARTICLE_SAFE_TEXT = '本章节暂不支持阅读，码字员正在紧急搬运中，敬请期待！'

/**
 * 文章组件
 * @export
 * @class Article
 * @extends {Component<ComponentProps, ComponentState>}
 */
export default class Article extends Component<ComponentProps, ComponentState> {

  /** 正在动画中 */
  private animating: boolean = false
  private moveTouch?: ITouch

  private wrapWidth: number
  private wrapHeight: number
  private touchDetail: {
    x: number
    y: number
  }

  state = {
    translateX: 0,
    transition: 0,
    pageCount: 1,
    currentPage: 0
  }

  static defaultProps: DefaultProps = {
    title: '',
    content: '',
    minOffset: 30,
    centerButtonWidth: 200,
    backTransition: .2,
    onCenterButtonClick: noop,
    onScrollPrev: noop,
    onScrollNext: noop,
    page: 0
  }

  componentWillReceiveProps (nextProps: ComponentProps) {
    if (nextProps.page !== this.props.page && nextProps.page !== this.state.currentPage) {
      this.setState({ currentPage: nextProps.page })
    }
  }

  /** 设置宽高值、预设值 */
  private async __resize__ () {
    const [ wrapRect, contentRect, lastPRect ] = await Promise.all([
      getBoundingClientRect('.article', this),
      getBoundingClientRect('.article-content', this),
      getBoundingClientRect('.article-p-last', this)
    ])

    // 设置容器宽高
    this.wrapWidth = wrapRect.width
    this.wrapHeight = wrapRect.height
    
    // 计算和设置总页数
    const pageCount = Math.round((lastPRect.width + lastPRect.left - contentRect.left) / this.wrapWidth)
    if (pageCount !== this.state.pageCount && pageCount > 1) {
      setTimeout(() => {
        pageCount !== this.state.pageCount && this.setState({ pageCount })
      }, 0)
    }
  }

  componentDidShow () {
    this.__resize__()
  }

  componentDidUpdate (prevProps: ComponentProps) {
    if (prevProps.content !== this.props.content) {
      this.__resize__()
    }
  }

  /** 触摸滑动开始，记录初始值和初始化 */
  onTouchStart = (e: ITouchEvent) => {
    // e.stopPropagation()
    if (this.animating) return
    const touch = e.touches[0]
    this.moveTouch = undefined
    this.touchDetail = {
      x: touch.clientX,
      y: touch.clientY
    }
    this.setState({
      translateX: 0,
      transition: 0
    })
  }

  /** 触摸滑动过程中，滑动及记录 */
  onTouchMove = (e: ITouchEvent) => {
    /** fixed ios上下橡皮筋效果 */
    e.stopPropagation()
    if (this.animating) return
    const touch = e.touches[0]
    const { x: startX } = this.touchDetail
    const offsetX = touch.clientX - startX
    this.moveTouch = touch
    this.setState({
      translateX: offsetX
    })
  }

  /** 触摸滑动结束，设置值以及回弹 */
  onTouchEnd = () => {
    if (!this.moveTouch) return
    const { x: startX } = this.touchDetail
    let { minOffset, backTransition } = this.props
    const { currentPage, pageCount } = this.state
    let safeCurrentPage = this.getSafePageIndex(currentPage, pageCount - 1)
    const offsetX = this.moveTouch.clientX - startX
    if (offsetX > minOffset) {
      safeCurrentPage--
    } else if (offsetX < -minOffset) {
      safeCurrentPage++
    }

    this.moveTouch = undefined
    this.animating = true
    const transition = this.swiperChange(safeCurrentPage) ? backTransition : 0
    this.setState({
      translateX: 0,
      transition,
    }, async () => {
      /** 等待动画结束 */
      await sleep(transition * 1000 + 50)
      this.animating = false
    })
  }

  /** 点击时间，前一页，后一页，点击中央 */
  onClickHandle = async (e: ITouchEvent) => {
    if (this.animating) return
    let { centerButtonWidth, onCenterButtonClick } = this.props
    const { currentPage, pageCount } = this.state
    let safeCurrentPage = this.getSafePageIndex(currentPage, pageCount - 1)
    const offsetMiddleX = e.detail.x - this.wrapWidth / 2
    const offsetMiddleY = e.detail.y - this.wrapHeight / 2
    if (Math.abs(offsetMiddleX) < centerButtonWidth / 2 && offsetMiddleY < centerButtonWidth / 2) {
      /** 点击了中间部分 */
      return onCenterButtonClick()
    }
    if (offsetMiddleX > 0) {
      safeCurrentPage++
    } else {
      safeCurrentPage--
    }
    this.swiperChange(safeCurrentPage)
  }

  /** 改变page, 返回是否成功 */
  swiperChange (page: number): boolean {
    const { onSwiper, onScrollPrev, onScrollNext } = this.props
    const { pageCount } = this.state
    if (page < 0) {
      this.setState({ currentPage: 0 })
      onScrollPrev()
      return false
    } else if (page > pageCount - 1) {
      this.setState({ currentPage: pageCount - 1 })
      onScrollNext()
      return false
    } else {
      this.setState({ currentPage: page })
      onSwiper(page)
      return true
    }
  }

  /** 缓存获取到的数组 */
  getContentArray = memoize((content: string) => {
    if (content.indexOf(ARTICLE_NO_SHOW_TEXT) > -1) {
      return Array(3).fill(ARTICLE_SAFE_TEXT)
    } else {
      return content.split('\n')
    }
  })

  // 校验安全props
  getSafePageIndex = (page: number, pageMax: number) => Math.max(0, Math.min(page, pageMax))

  render () {
    const { title, content } = this.props
    const { translateX, transition, pageCount, currentPage } = this.state
    const contentArray = this.getContentArray(content)
    const contentArrayLength = contentArray.length

    const activePage = this.getSafePageIndex(currentPage, pageCount - 1)

    return (
      <View
        className='article'
        onTouchStart={this.onTouchStart}
        onTouchMove={this.onTouchMove}
        onTouchEnd={this.onTouchEnd}
        onClick={this.onClickHandle}
      >
        <View className="article__content article-content"
          style={{
            transform: `translate3d(${activePage * this.wrapWidth * -1 + translateX}px, 0, 0)`,
            transition: `transform ${transition}s ease-out`
          }}
        >
          <View className='article__title'>
            {title}
          </View>
          {
            contentArray.map((p, i) => 
              <View className={`article__p ${i === contentArrayLength - 1 ? 'article__p--last article-p-last' : ''}`} key={`article-${i}`}>{p}</View>
            )
          }
        </View>
      </View>
    )
  }
}
