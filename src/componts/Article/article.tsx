import Taro, { Component } from '@tarojs/taro'
import './article.scss'
import { View, ScrollView } from '@tarojs/components'

type DefaultProps = {
  title: string
  content: string
}

interface ComponentProps extends DefaultProps {
}

type ComponentState = {
}

export default interface Article {
  props: ComponentProps
  state: ComponentState
}

export default class Article extends Component {

  static defaultProps: DefaultProps = {
    title: '',
    content: ''
  }

  render () {
    const { title, content } = this.props

    return (
      <ScrollView
        className='article'
        onScroll={(e: any) => console.log(e.detail.scrollLeft)}
        scrollX
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
