import Taro, { Component } from '@tarojs/taro'
import './settingsBar.scss'
import { View } from '@tarojs/components'
import Drawer from '../../componts/drawer/drawer'
import noop from 'lodash/noop';

type DefaultProps = {
  onCatelogueClick: () => void
  onAddBookClick: () => void
}

interface ComponentProps extends DefaultProps {
  onClose?: () => void
  show: boolean
}

type ComponentState = {
}

export default class SettingsBar extends Component<ComponentProps, ComponentState> {

  static defaultProps: DefaultProps = {
    onCatelogueClick: noop,
    onAddBookClick: noop
  }

  render () {
    const { show, onClose, onCatelogueClick, onAddBookClick } = this.props
    return (
      <Drawer
        className='catelogue'
        show={show}
        mask
        onClose={onClose}
        items={['目录', '加入书架']}
        onItemClick={index => {
          index === 0 && onCatelogueClick()
          index === 1 && onAddBookClick()
        }}
      />
    )
  }
}
