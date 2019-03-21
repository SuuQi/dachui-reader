import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import pick from 'lodash/pick'

import './read.scss'
import { IChaptersData, IChapterItem, IChapterOrigin, IUserBookItem } from '../../constants/book'
import { fetchBookChapters, fetchBookChapterText } from '../../actions/book'
import Catelogue from '../../componts/catelogue/catelogue'
import { addUserBook, updateUserBook } from '../../actions/user'

type PageStateProps = {
}

type PageDispatchProps = {
  fetchBookChapters: (bookId: string) => any
  fetchBookChapterText: (link: string) => any
  addUserBook: (book: IUserBookItem) => any
  updateUserBook: (book: Partial<IUserBookItem>) => any
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
  addUserBook: (book: IUserBookItem) => dispatch(addUserBook(book)),
  updateUserBook: (book: Partial<IUserBookItem>) => dispatch(updateUserBook(book))
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
    const { fetchBookChapters } = this.props
    Taro.setNavigationBarTitle({
      title: params.title
    })
    const { mixToc: chaptersData } = await fetchBookChapters(params.id)
    chaptersData.id = chaptersData._id
    this.setState({ chaptersData })
    const index = Number(params.index) || 0
    await this.loadChapter(index, chaptersData.chapters[index])
    Taro.hideLoading()
  }

  loadChapter = async (index: number, originChapter?: IChapterOrigin ) => {
    Taro.showLoading({ title: '正在加载...' })
    const { fetchBookChapterText } = this.props
    const { chaptersData } = this.state
    const chapter = (originChapter || chaptersData.chapters[index]) as IChapterItem
    const chapterData = await fetchBookChapterText(chapter.link)
    chapter.body = chapterData.chapter.body
    chapter.index = index
    this.setState({ chapter }, () => {
      // Taro.pageScrollTo({ scrollTop: 0, duration: 0 })
      Taro.hideLoading()
    })
    chaptersData.id && await this.props.updateUserBook({
      id: chaptersData.id,
      lastIndex: chapter.index,
    })
  }
  
  handleAddUserBook = async () => {
    const { params } = this.$router
    await this.props.addUserBook({
      ...this.state.chaptersData,
      lastIndex: this.state.chapter.index,
      title: params.title
    })
    Taro.showToast({
      title: '加入成功'
    })
  }

  render () {
    const { chaptersData, chapter, drawShow } = this.state
    const isLastChapter = chapter.index === chaptersData.chapters.length - 1
    const isFirstChapter = chapter.index === 0
    return (
      <View className='read'>
        <Catelogue
          show={drawShow}
          activeIndex={chapter.index}
          chaptersData={chaptersData}
          onItemClick={this.loadChapter}
          onClose={() => this.setState({ drawShow: false })}
        />
        <ScrollView
          className='read__scroll at-article'
          scrollY
        >
          <Button onClick={() => this.setState({ drawShow: true })}>目录</Button>
          <Button onClick={this.handleAddUserBook}>加入书架</Button>
          {!isFirstChapter && <Button onClick={() => this.loadChapter(chapter.index - 1)}>{'上一章'}</Button>}
          <Button disabled={isLastChapter} onClick={() => this.loadChapter(chapter.index + 1)}>{isLastChapter ? '已是最后一章' : '下一章'}</Button>
          <View className='at-article__h2'>
            {chapter.title}
          </View>
          <View className='at-article__content'>
            <View className='at-article__section'>
            {
                <View className='at-article__section'>
                  {chapter.body!.split('\n').map((p, i) => 
                    <View className='at-article__p' key={`article-${i}`}>{p}</View>
                  )}
                </View>
            }
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default ReadPage as ComponentClass<PageOwnProps, PageState>
