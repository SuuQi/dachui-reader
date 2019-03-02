import Taro, { Component } from '@tarojs/taro'
import './catelogue.scss'
import { AtDrawer } from 'taro-ui'
import classnames from 'classnames'
import { IChaptersData, IChapterOrigin } from '../../constants/book'
import { View, ScrollView } from '@tarojs/components'

type DefaultProps = {
  onItemClick?: (i: number, chapter: IChapterOrigin) => void
  onClose?: () => void
}

interface ComponentProps extends DefaultProps {
  chaptersData: IChaptersData
  activeIndex: number
  show: boolean
}

type ComponentState = {
}

export default interface Catelogue {
  props: ComponentProps
  state: ComponentState
}

export default class Catelogue extends Component {

  static defaultProps: DefaultProps = {
    onItemClick: () => {},
    onClose: () => {}
  }

  state: ComponentState = {
  }

  handleItemClick (i: number, chapter: IChapterOrigin) {
    if (i === this.props.activeIndex) return
    this.props.onItemClick!(i, chapter)
    this.props.onClose!()
  }

  render () {
    const { chaptersData, show, activeIndex } = this.props
    return (
        <AtDrawer
          className='catelogue'
          show={show}
          mask
          onClose={this.props.onClose}
          width='80%'
        >
          <ScrollView
            className='catelogue__scroll'
            scrollY
          >
          {
            chaptersData && chaptersData.chapters.map((chapter, i) => 
              <View
                className={classnames('catelogue__item', activeIndex === i ? 'catelogue__item--active' : 'catelogue__item--normal')}
                key={`catelogue-item-${i}`}
                onClick={() => this.handleItemClick(i, chapter)}
              >
                {chapter.title}
              </View>
            )
          }
          </ScrollView>
        </AtDrawer>
    )
  }
}
