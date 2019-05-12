import Taro, { Component } from '@tarojs/taro'
import './userBookItem.scss'
import classnames from 'classnames'
import noop from 'lodash/noop'
import { IUserBookItem } from '../../constants/book'
import { View, Image } from '@tarojs/components'
import { SERVER_STATICS_ROOT } from '../../constants';
import { AtTag } from 'taro-ui';

type DefaultProps = {
}

interface ComponentProps extends DefaultProps {
  data: IUserBookItem
  className?: string
  onClick?: (data: IUserBookItem) => void
}

type ComponentState = {
}

/**
 * 书籍一条组件
 * @export
 * @class BookItem
 * @extends {Component<ComponentProps, ComponentState>}
 */
export default class UserBookItem extends Component<ComponentProps, ComponentState> {

  static defaultProps: DefaultProps = {
  }

  handleClick = () => {
    const { data } = this.props
    if (this.props.onClick) {
      this.props.onClick(data)
    } else {
      Taro.navigateTo({ url: `/pages/read/read?id=${data.book}&title=${data.title}` })
    }
  }

  render () {
    const { data, className } = this.props
    if (!data) return null
    return (
      <View className={classnames('user-book-item', className)} onClick={this.handleClick}>
        <View className='user-book-item__cover'>
          <View className='user-book-item__cover-img' style={{
            backgroundImage: `url(${SERVER_STATICS_ROOT}${data.cover})`
          }}></View>
        </View>
        <View className='user-book-item__title'>{data.title}</View>
        <View className='user-book-item__lastindex'>已阅读至第{data.lastIndex + 1}章</View>
      </View>
    )
  }
}
