import Taro, { Component } from '@tarojs/taro'
import './article.scss'
import { View } from '@tarojs/components'
import { ITouchEvent, ITouch } from '@tarojs/components/types/common';

type DefaultProps = {
  title: string
  content: string
  minOffset: number
  /** 回弹时的backTransition */
  backTransition: number
}

interface ComponentProps extends DefaultProps {
}

type ComponentState = {
  scrollLeft: number
  transition: number
}

export default class Article extends Component<ComponentProps, ComponentState> {

  warpWidth: number
  wrapHeight: number
  touchDetail: {
    scrollLeft: number
    x: number
    y: number
  }
  moveTouch?: ITouch

  state = {
    scrollLeft: 0,
    transition: 0
  }

  static defaultProps: DefaultProps = {
    title: '',
    content: '',
    minOffset: 50,
    backTransition: .3
  }

  componentDidShow () {
    // 设置宽高值
    Taro.createSelectorQuery()
      .in(process.env.TARO_ENV === 'h5' ? this : this.$scope)
      .select('.article')
      .boundingClientRect(rect => {
        rect = Array.isArray(rect) ? rect[0] : rect
        this.warpWidth = rect.width
        this.wrapHeight = rect.height
      })
      .exec()
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
    let scrollCount = offsetX > 0 ? Math.floor(offsetX / this.warpWidth) : Math.ceil(offsetX / this.warpWidth)
    const remianOffset = offsetX % this.warpWidth
    if (remianOffset > minOffset) {
      scrollCount++
    } else if (remianOffset < -minOffset) {
      scrollCount--
    }
    this.setState({
      scrollLeft: startScrollLeft + scrollCount * this.warpWidth,
      transition: backTransition
    })
  }

  onTouchCancel = (e: ITouchEvent) => {
  }

  onClickHandle = async (e: ITouchEvent) => {
    let scrollLeft = this.state.scrollLeft
    if (e.detail.x > this.warpWidth / 2) {
      scrollLeft -= this.warpWidth
    } else {
      scrollLeft += this.warpWidth
    }
    this.setState({ scrollLeft })
  }

  render () {
    const { title, content } = this.props
    const { scrollLeft, transition } = this.state

    return (
      <View
        className='article'
        onTouchStart={this.onTouchStart}
        onTouchMove={this.onTouchMove}
        onTouchEnd={this.onTouchEnd}
        onTouchCancel={this.onTouchCancel}
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
            content.split('\n').map((p, i) => 
              <View className='article__p' key={`article-${i}`}>{p}</View>
            )
          }
        </View>
      </View>
    )
  }
}
