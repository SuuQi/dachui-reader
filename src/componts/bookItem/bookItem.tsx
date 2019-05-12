import Taro, { Component } from '@tarojs/taro'
import './bookItem.scss'
import classnames from 'classnames'
import { IBookItem } from '../../constants/book'
import { View } from '@tarojs/components'
import { SERVER_STATICS_ROOT } from '../../constants';
import { AtTag } from 'taro-ui';

type DefaultProps = {
}

interface ComponentProps extends DefaultProps {
  data: IBookItem
  className?: string
  onClick?: (data: IBookItem) => void
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
  }

  handleClick = () => {
    const { data } = this.props
    if (this.props.onClick) {
      this.props.onClick(data)
    } else {
      Taro.navigateTo({ url: `/pages/read/read?id=${data.id}&title=${data.title}` })
    }
  }

  render () {
    const { data, className } = this.props
    if (!data) return null
    return (
      <View className={classnames('book-item', className)} onClick={this.handleClick}>
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
            {
              data.cat.split('-').map((cat, i) => 
                <View className='book-item__tag' key={'cat-' + i}>
                  <AtTag type='primary' size='small' circle>{cat}</AtTag>
                </View>
              )
            }
          </View>
        </View>
      </View>
    )
  }
}
