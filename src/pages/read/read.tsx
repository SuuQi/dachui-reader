import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import pick from 'lodash/pick'

import './read.scss'
import { IChaptersData, IChapterItem, IChapterOrigin, IUserBookItem } from '../../constants/book';
import { fetchBookChapters, fetchBookChapterText } from '../../actions/book';
import Catelogue from '../../componts/catelogue/catelogue';
import { addUserBook } from '../../actions/user';

type PageStateProps = {
}

type PageDispatchProps = {
  fetchBookChapters: (bookId: string) => any
  fetchBookChapterText: (link: string) => any
  addUserBook: (book: IUserBookItem) => any
}

type PageOwnProps = {}

type PageState = {
  chaptersData: IChaptersData
  chapter: IChapterItem
  drawShow: boolean
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface ReadPage {
  props: IProps
  state: PageState
}

@connect(({ book }) => pick(book, []), (dispatch) => ({
  fetchBookChapters: (bookId: string) => dispatch(fetchBookChapters(bookId)),
  fetchBookChapterText: (link: string) => dispatch(fetchBookChapterText(link)),
  addUserBook: (book: IUserBookItem) => dispatch(addUserBook(book))
}))
class ReadPage extends Component {

  state: PageState = {
    chaptersData: {
      id: '',
      book: '',
      chaptersUpdated: '',
      updated: '',
      chapters: []
    },
    chapter: {
      index: 0,
      title: '',
      link: '',
      body: ''
    },
    drawShow: false
  }

  config: Config = {
    navigationBarTitleText: '大锤阅读器'
  }

  async componentWillMount () {
    Taro.showLoading({ title: '正在加载...' })
    const { params } = this.$router
    const { fetchBookChapters } = this.props;
    Taro.setNavigationBarTitle({
      title: params.title
    })
    const { mixToc: chaptersData } = await fetchBookChapters(params.id)
    chaptersData.id = chaptersData._id;
    this.setState({ chaptersData })
    await this.loadChapter(0, chaptersData.chapters[0])
    Taro.hideLoading()
  }

  loadChapter = async (index: number, originChapter?: IChapterOrigin ) => {
    Taro.showLoading({ title: '正在加载...' })
    const { fetchBookChapterText } = this.props;
    const chapter = (originChapter || this.state.chaptersData.chapters[index]) as IChapterItem;
    const chapterData = await fetchBookChapterText(chapter.link)
    chapter.body = chapterData.chapter.body
    chapter.index = index
    this.setState({ chapter }, () => {
      Taro.pageScrollTo({ scrollTop: 0, duration: 0 })
      Taro.hideLoading()
    })
  }

  handleAddUserBook = async () => {
    await this.props.addUserBook({
      ...this.state.chaptersData,
      lastIndex: this.state.chapter.index
    })
    Taro.showToast({
      title: '加入成功'
    })
  }

  render () {
    const { chaptersData, chapter, drawShow } = this.state;
    return (
      <View className='read'>
        <Catelogue
          show={drawShow}
          activeIndex={chapter.index}
          chaptersData={chaptersData}
          onItemClick={this.loadChapter}
          onClose={() => this.setState({ drawShow: false })}
        />
        <Button onClick={() => this.setState({ drawShow: true })}>目录</Button>
        <Button onClick={this.handleAddUserBook}>加入书架</Button>
        <View className='at-article'>
          <View className='at-article__h2'>
            {chapter.title}
          </View>
          <View className='at-article__content'>
            <View className='at-article__section'>
              {chapter.body!.split('\n').map((p, i) => 
                <View className='at-article__p' key={`article-${i}`}>{p}</View>
              )}
            </View>
          </View>
        </View>
        <Button onClick={() => this.loadChapter(chapter.index + 1)}>下一章</Button>
      </View>
    )
  }
}

export default ReadPage as ComponentClass<PageOwnProps, PageState>
