import Taro, { Component } from '@tarojs/taro'
import './bookItem.scss'
import classnames from 'classnames'
import noop from 'lodash/noop'
import { IBookItem } from '../../constants/book'
import { View, Image } from '@tarojs/components'
import { SERVER_STATICS_ROOT } from '../../constants';
import { AtTag } from 'taro-ui';

type DefaultProps = {
  onClick: (data: IBookItem) => void
}

interface ComponentProps extends DefaultProps {
  data: IBookItem
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
export default class BookItem extends Component<ComponentProps, ComponentState> {

  static defaultProps: DefaultProps = {
    onClick: noop
  }

  render () {
    const { data, className } = this.props
    return (
      <View className={classnames('book-item', className)} onClick={() => this.props.onClick(data)}>
        <View className='book-item__cover'>
          <View className='book-item__cover-img' style={{
            backgroundImage: `url(${SERVER_STATICS_ROOT}${data.cover})`
          }}></View>
        </View>
        <View className='book-item__right'>
          <View className='book-item__right-top'>
            <View className='book-item__title'>{data.title}</View>
            <View className='book-item__intro'>{data.shortIntro}</View>
          </View>
          <View className='book-item__right-bottom'>
            <View className='book-item__author'>{data.author}</View>
            {/* <View className='book-item__tag'>{data.cat}</View> */}
            <AtTag 
              type='primary'
              size='small'
              circle
            >
              {data.cat}
            </AtTag>
          </View>
        </View>
      </View>
    )
  }
}
