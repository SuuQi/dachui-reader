import Taro, { Component } from '@tarojs/taro'
import './settingsBar.scss'
import { AtDrawer } from 'taro-ui'
import { View } from '@tarojs/components'

type DefaultProps = {
  onClose?: () => void
}

interface ComponentProps extends DefaultProps {
  show: boolean
}

type ComponentState = {
}

export default class SettingsBar extends Component<ComponentProps, ComponentState> {

  static defaultProps: DefaultProps = {
    onClose: () => {}
  }

  render () {
    const { show, onClose } = this.props
    return (
      <AtDrawer
        className='catelogue'
        show={show}
        mask
        onClose={onClose}
      >
      </AtDrawer>
    )
  }
}
