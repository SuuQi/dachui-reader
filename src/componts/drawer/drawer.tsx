import Taro, { Component } from '@tarojs/taro'
import './drawer.scss'
import classnames from 'classnames'
import { AtDrawer } from 'taro-ui'
import { AtDrawerProps } from 'taro-ui/@types/drawer';
import { View } from '@tarojs/components';

type DefaultProps = {
  type: 'top' | 'bottom'
}

interface ComponentProps extends DefaultProps {
}

type ComponentState = {
}

/** 对AtDrawer的扩展，支持上下，AtDrawer仅支持左右 */
export default class Catelogue extends Component<ComponentProps & AtDrawerProps, ComponentState> {

  static defaultProps: DefaultProps = {
    type: 'bottom'
  }

  render () {
    const {
      className,
      type,
      // width,
      // right,
      
      // restProps不支持，单独列出
      show,
      mask,
      items,
      onItemClick,
      onClose,
      customStyle,
    } = this.props

    const rootClassName = ['at-drawer--vertical', `at-drawer--${type}`]
    console.log(this.props)
    return (
      <AtDrawer
        className={classnames(rootClassName, className)}
        width='100%'
        show={show}
        mask={mask}
        items={items}
        onItemClick={onItemClick}
        onClose={onClose}
        customStyle={customStyle}
      >
        {/* <View className='at-row'>
          <View className='at-col' onClick={e => console.log(e)}>目录</View>
          <View className='at-col'>设置</View>
          <View className='at-col'>分享</View>
        </View> */}
      </AtDrawer>
    )
  }
}
