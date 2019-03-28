import Taro, { Component } from '@tarojs/taro'
import './drawer.scss'
import classnames from 'classnames'
import { AtDrawer } from 'taro-ui'
import { AtDrawerProps } from 'taro-ui/@types/drawer';

type DefaultProps = {
  type: 'top' | 'bottom'
}

export interface ComponentProps extends DefaultProps {
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
      children,
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
        {children}
      </AtDrawer>
    )
  }
}
