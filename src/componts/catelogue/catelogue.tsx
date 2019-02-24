import Taro, { Component } from '@tarojs/taro'
import './catelogue.scss'
import { AtList, AtListItem, AtDrawer } from 'taro-ui';
import { IChaptersData, IChapterOrigin } from '../../constants/book';
import { View } from '@tarojs/components';

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

  render () {
    const { chaptersData, show } = this.props
    return (
        <AtDrawer
          className='catelogue'
          show={show}
          mask
          onClose={this.props.onClose}
          width='80%'
        >
          {
            chaptersData && chaptersData.chapters.map((chapter, i) => 
              <View
                className='catelogue__item'
                key={`catelogue-item-${i}`}
                onClick={() => {
                  this.props.onItemClick!(i, chapter)
                  this.props.onClose!()
                }}
              >
                {chapter.title}
                {chapter.title}
                {chapter.title}
                {chapter.title}
              </View>
            )
          }
        </AtDrawer>
    )
  }
}
