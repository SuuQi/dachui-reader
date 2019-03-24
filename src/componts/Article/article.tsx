import Taro, { Component } from '@tarojs/taro'
import './article.scss'
import { View, ScrollView } from '@tarojs/components'
import { ITouchEvent } from '@tarojs/components/types/common';

type DefaultProps = {
  title: string
  content: string
}

interface ComponentProps extends DefaultProps {
  windowWidth: number
}

type ComponentState = {
  scrollLeft: number
}

export default class Article extends Component<ComponentProps, ComponentState> {

  state = {
    scrollLeft: 0
  }

  static defaultProps: DefaultProps = {
    title: '',
    content: ''
  }

  onSwiperStart = () => {
    console.log('onSwiperStart')
  }

  onSwiperEnd = () => {
    console.log('onSwiperEnd')
  }

  onScrollHandle = (e: any) => {
    const { scrollLeft } = e.detail
    this.setState({
      scrollLeft
    })
  }

  onClickHandle = async (e: ITouchEvent) => {
    const { windowWidth } = this.props
    let scrollLeft = this.state.scrollLeft
    if (e.detail.x > windowWidth / 2) {
      scrollLeft += windowWidth
    } else {
      scrollLeft -= windowWidth
    }
    this.setState({ scrollLeft })
  }

  render () {
    const { title, content } = this.props
    const { scrollLeft } = this.state

    return (
      <ScrollView
        className='article'
        scrollX
        scrollLeft={scrollLeft}
        onScroll={this.onScrollHandle}
        onScrollToUpper={this.onSwiperStart}
        onScrollToLower={this.onSwiperEnd}
        onClick={this.onClickHandle}
      >
        <View className="article__content">
          <View className='article__title'>
            {title}
          </View>
          {
            content.split('\n').map((p, i) => 
              <View className='article__p' key={`article-${i}`}>{p}</View>
            )
          }
        </View>
      </ScrollView>
    )
  }
}
