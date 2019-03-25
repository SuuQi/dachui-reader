import Taro, { Component } from '@tarojs/taro'
import './article.scss'
import { View } from '@tarojs/components'
import { ITouchEvent, ITouch } from '@tarojs/components/types/common';
import memoize from 'lodash/memoize'
import noop from 'lodash/noop'
import { getBoundingClientRect } from '../../utils';

type DefaultProps = {
  title: string
  content: string
  minOffset: number
  /** 回弹时的backTransition */
  backTransition: number
  /** 中间按钮大小 */
  centerButtonWidth: number
  onCenterButtonClick: () => void
  onScrollPrev: () => void
  onScrollNext: () => void
}

interface ComponentProps extends DefaultProps {
  page: number
  onSwiper: (page: number) => void
}

type ComponentState = {
  scrollLeft: number
  transition: number
  /** 总共的页数 */
  pageCount: number
}

export default class Article extends Component<ComponentProps, ComponentState> {

  wrapWidth: number
  wrapHeight: number
  touchDetail: {
    x: number
    y: number
  }
  moveTouch?: ITouch

  state = {
    scrollLeft: 0,
    transition: 0,
    pageCount: 1,
    isResized: false
  }

  static defaultProps: DefaultProps = {
    title: '',
    content: '',
    minOffset: 50,
    centerButtonWidth: 200,
    backTransition: .2,
    onCenterButtonClick: noop,
    onScrollPrev: noop,
    onScrollNext: noop
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
    const touch = e.touches[0]
    this.moveTouch = undefined
    this.touchDetail = {
      x: touch.clientX,
      y: touch.clientY
    }
    this.setState({
      scrollLeft: 0,
      transition: 0
    })
  }

  /** 触摸滑动过程中，滑动及记录 */
  onTouchMove = (e: ITouchEvent) => {
    const touch = e.touches[0]
    const { x: startX } = this.touchDetail
    const offsetX = touch.clientX - startX
    this.moveTouch = touch
    this.setState({
      scrollLeft: offsetX
    })
  }

  /** 触摸滑动结束，设置值以及回弹 */
  onTouchEnd = () => {
    if (!this.moveTouch) return
    const { x: startX } = this.touchDetail
    let { minOffset, backTransition, page } = this.props
    const offsetX = this.moveTouch.clientX - startX
    if (offsetX > minOffset) {
      page--
    } else if (offsetX < -minOffset) {
      page++
    }
    this.setState({
      scrollLeft: 0,
      transition: this.swiperChange(page) ? backTransition : 0
    })
  }

  /** 点击时间，前一页，后一页，点击中央 */
  onClickHandle = async (e: ITouchEvent) => {
    let { page, centerButtonWidth, onCenterButtonClick } = this.props
    const offsetMiddleX = e.detail.x - this.wrapWidth / 2
    const offsetMiddleY = e.detail.y - this.wrapHeight / 2
    if (Math.abs(offsetMiddleX) < centerButtonWidth / 2 && offsetMiddleY < centerButtonWidth / 2) {
      /** 点击了中间部分 */
      return onCenterButtonClick()
    }
    if (offsetMiddleX > 0) {
      page++
    } else {
      page--
    }
    this.swiperChange(page)
  }

  /** 改变page, 返回是否成功 */
  swiperChange (page: number): boolean {
    const { onScrollPrev, onScrollNext } = this.props
    const { pageCount } = this.state
    if (page < 0) {
      onScrollPrev()
      // this.props.onSwiper(0)
      return false
    } else if (page > pageCount - 1) {
      onScrollNext()
      // this.props.onSwiper(pageCount - 1)
      return false
    } else {
      this.props.onSwiper(page)
      return true
    }
  }

  /** 缓存获取到的数组 */
  getContentArray = memoize((content: string) => content.split('\n'))

  render () {
    const { title, content, page } = this.props
    const { scrollLeft, transition, pageCount } = this.state
    const contentArray = this.getContentArray(content)
    const contentArrayLength = contentArray.length

    // 校验props
    const activePage = Math.max(0, Math.min(page, pageCount))

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
            transform: `translate3d(${activePage * this.wrapWidth * -1 + scrollLeft}px, 0, 0)`,
            transition: `transform ${transition}s`
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
