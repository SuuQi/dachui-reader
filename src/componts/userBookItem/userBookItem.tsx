import Taro, { Component } from '@tarojs/taro'
import './userBookItem.scss'
import classnames from 'classnames'
import noop from 'lodash/noop'
import { IUserBookItem } from '../../constants/book'
import { View, Image } from '@tarojs/components'
import { SERVER_STATICS_ROOT } from '../../constants';
import { AtTag } from 'taro-ui';

type DefaultProps = {
  onClick: (data: IUserBookItem) => void
}

interface ComponentProps extends DefaultProps {
  data: IUserBookItem
  className?: string
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
    onClick: noop
  }

  render () {
    const { data, className } = this.props
    return (
      <View className={classnames('user-book-item', className)} onClick={() => this.props.onClick(data)}>
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
