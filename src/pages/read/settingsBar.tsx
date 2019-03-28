import Taro, { Component } from '@tarojs/taro'
import './settingsBar.scss'
import Drawer, { ComponentProps as IDrawerProps } from '../../componts/drawer/drawer'
import noop from 'lodash/noop';
import { View } from '@tarojs/components';

type DefaultProps = {
  onCatelogueClick: () => void
  onAddBookClick: () => void
}

interface ComponentProps extends DefaultProps {
  type: IDrawerProps['type']
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
    const { show, onClose, onCatelogueClick, onAddBookClick, type } = this.props
    return (
      <Drawer
        type={type}
        className='catelogue'
        show={show}
        mask
        onClose={onClose}
        items={['目录', '加入书架']}
        onItemClick={index => {
          index === 0 && onCatelogueClick()
          index === 1 && onAddBookClick()
        }}
      >
        {/* <View className='at-row'>
          <View className='at-col' onClick={e => console.log(e)}>目录</View>
          <View className='at-col'>设置</View>
          <View className='at-col'>分享</View>
        </View> */}
      </Drawer>
    )
  }
}
