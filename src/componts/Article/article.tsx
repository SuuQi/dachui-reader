import Taro, { Component } from '@tarojs/taro'
import './article.scss'
import { View } from '@tarojs/components'
import { ITouchEvent, ITouch } from '@tarojs/components/types/common';
import memoize from 'lodash/memoize'
import once from 'lodash/once'
import noop from 'lodash/noop'

type DefaultProps = {
  title: string
  content: string
  minOffset: number
  /** 回弹时的backTransition */
  backTransition: number
  onScrollPrev: () => void
  onScrollNext: () => void
}

interface ComponentProps extends DefaultProps {
}

type ComponentState = {
  scrollLeft: number
  transition: number
  /** 总共的页数 */
  pageCount: number
}

export default class Article extends Component<ComponentProps, ComponentState> {
  wrapWidth: number
  touchDetail: {
    scrollLeft: number
    x: number
    y: number
  }
  moveTouch?: ITouch

  state = {
    scrollLeft: 0,
    transition: 0,
    pageCount: 1
  }

  static defaultProps: DefaultProps = {
    title: '',
    content: '',
    minOffset: 50,
    backTransition: .3,
    onScrollPrev: noop,
    onScrollNext: noop
  }


  /** 设置宽高值、预设值 */ 
  private __resize__ () {
    Taro.createSelectorQuery()
      .in(process.env.TARO_ENV === 'h5' ? this : this.$scope)
      .select('.article')
      .boundingClientRect(rect => {
        rect = Array.isArray(rect) ? rect[0] : rect
        this.wrapWidth = rect.width
      })
      .exec()
    
    Taro.createSelectorQuery()
    .in(process.env.TARO_ENV === 'h5' ? this : this.$scope)
    .select('.article-p-last')
    .boundingClientRect(rect => {
      rect = Array.isArray(rect) ? rect[0] : rect
      const contentWidth = rect.width + rect.left - this.state.scrollLeft
      console.log(contentWidth / this.wrapWidth)
      const pageCount = contentWidth / this.wrapWidth
      pageCount !== this.state.pageCount && this.setState({ pageCount })
    })
    .exec()
  }

  /** 性能优化，避免重复调用的resize方法 */
  private __onecResize__ = once(this.__resize__)

  componentDidShow () {
    this.__resize__()
  }

  componentDidUpdate () {
    /** 需要在didupdate中调用获取 */
    this.__onecResize__()
  }

  onSwiperStart = () => {
    console.log('onSwiperStart')
  }

  onSwiperEnd = () => {
    console.log('onSwiperEnd')
  }

  onTouchStart = (e: ITouchEvent) => {
    const touch = e.touches[0]
    this.moveTouch = undefined
    this.touchDetail = {
      x: touch.clientX,
      y: touch.clientY,
      scrollLeft: this.state.scrollLeft
    }
    this.setState({ transition: 0 })
  }

  onTouchMove = (e: ITouchEvent) => {
    const touch = e.touches[0]
    const { x: startX, scrollLeft: startScrollLeft } = this.touchDetail
    const offsetX = touch.clientX - startX

    this.moveTouch = touch
    this.setState({
      scrollLeft: startScrollLeft + offsetX
    })
  }

  onTouchEnd = () => {
    if (!this.moveTouch) return
    const { x: startX, scrollLeft: startScrollLeft } = this.touchDetail
    const { minOffset, backTransition } = this.props
    const offsetX = this.moveTouch.clientX - startX
    let scrollCount = offsetX > 0 ? Math.floor(offsetX / this.wrapWidth) : Math.ceil(offsetX / this.wrapWidth)
    const remianOffset = offsetX % this.wrapWidth
    if (remianOffset > minOffset) {
      scrollCount++
    } else if (remianOffset < -minOffset) {
      scrollCount--
    }
    const safeLeft = this.checkSafeScrollLeft(startScrollLeft + scrollCount * this.wrapWidth)
    this.setState({
      scrollLeft: safeLeft,
      transition: backTransition
    })
  }

  onClickHandle = async (e: ITouchEvent) => {
    let scrollLeft = this.state.scrollLeft
    if (e.detail.x > this.wrapWidth / 2) {
      scrollLeft -= this.wrapWidth
    } else {
      scrollLeft += this.wrapWidth
    }
    const safeLeft = this.checkSafeScrollLeft(scrollLeft)
    this.setState({ scrollLeft: safeLeft })
  }

  checkSafeScrollLeft (scrollLeft: number) {
    const { pageCount } = this.state
    const { onScrollPrev, onScrollNext } = this.props
    const minLeft = (pageCount - 1) * this.wrapWidth * -1
    const maxLeft = 0
    if (scrollLeft < minLeft) {
      onScrollNext()
      return minLeft
    }
    if (scrollLeft > maxLeft) {
      onScrollPrev()
      return maxLeft
    }
    return scrollLeft
  }

  /** 缓存获取到的数组 */
  getContentArray = memoize((content: string) => content.split('\n'))

  render () {
    const { title, content } = this.props
    const { scrollLeft, transition } = this.state
    const contentArray = this.getContentArray(content)
    const contentArrayLength = contentArray.length

    return (
      <View
        className='article'
        onTouchStart={this.onTouchStart}
        onTouchMove={this.onTouchMove}
        onTouchEnd={this.onTouchEnd}
        onClick={this.onClickHandle}
      >
        <View className="article__content"
          style={{
            transform: `translate3d(${scrollLeft}px, 0, 0)`,
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
