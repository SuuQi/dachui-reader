import Taro, { Component } from '@tarojs/taro'
import './catelogue.scss'
import { AtDrawer } from 'taro-ui'
import classnames from 'classnames'
import noop from 'lodash/noop'
import { IChaptersData, IChapterOrigin } from '../../constants/book'
import { View, ScrollView } from '@tarojs/components'

type DefaultProps = {
  onItemClick: (i: number, chapter: IChapterOrigin) => void
  onClose: () => void
}

interface ComponentProps extends DefaultProps {
  chaptersData: IChaptersData
  activeIndex: number
  show: boolean
}

type ComponentState = {
  showDate?: number,
  scrollIntoView?: string
}

export default class Catelogue extends Component<ComponentProps, ComponentState> {

  static defaultProps: DefaultProps = {
    onItemClick: noop,
    onClose: noop
  }

  componentWillReceiveProps (nextProps: ComponentProps) {
    if (!this.props.show && nextProps.show) {
      // 通过两次设置值，fixed无法定位到active的bug
      const showDate = +new Date()
      this.setState({
        showDate,
        scrollIntoView: undefined
      }, () => {
        this.setState({
          scrollIntoView: `catelogue-item-${showDate}-${nextProps.activeIndex}`
        })
      })
    }
  }

  handleItemClick (i: number, chapter: IChapterOrigin) {
    if (i === this.props.activeIndex) return
    this.props.onItemClick!(i, chapter)
    this.props.onClose!()
  }

  render () {
    const { chaptersData, show, activeIndex, onClose } = this.props
    const { scrollIntoView, showDate } = this.state
    return (
      <AtDrawer
        className='catelogue'
        show={show}
        mask
        onClose={onClose}
        width='75%'
      >
        <ScrollView
          className='catelogue__scroll'
          scrollIntoView={scrollIntoView}
          scrollY
        >
        {
          chaptersData && chaptersData.chapters.map((chapter, i) => 
            <View
              className={classnames('catelogue__item', activeIndex === i ? 'catelogue__item--active' : 'catelogue__item--normal')}
              key={`catelogue-item-${i}`}
              id={`catelogue-item-${showDate}-${i}`}
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
