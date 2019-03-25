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
import Article from '../../componts/article/article';

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

  /** 当前页 */
  page: number
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

@connect(({ book }) => ({
}), (dispatch) => ({
  fetchBookChapters: (bookId: string) => dispatch(fetchBookChapters(bookId)),
  fetchBookChapterText: (link: string) => dispatch(fetchBookChapterText(link)),
  addUserBook: (book: IUserBookItem) => dispatch(addUserBook(book)),
  updateUserBook: (book: Partial<IUserBookItem>) => dispatch(updateUserBook(book))
}))
class ReadPage extends Component<IProps, PageState> {

  state: PageState = {
    page: 0,
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

  /** 初始化操作 */
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

  /** 加载章节 */
  loadChapter = async (index: number, originChapter?: IChapterOrigin) => {
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
  
  /** 加入书架 */
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

  handleChapterNext = async () => {
    const { chapter } = this.state
    await this.loadChapter(chapter.index + 1)
    this.setState({ page: 0 })
  }

  render () {
    const { chaptersData, chapter, drawShow, page } = this.state
    const isLastChapter = chapter.index === chaptersData.chapters.length - 1
    const isFirstChapter = chapter.index === 0
    return (
      <View className='read'>
        <Catelogue
          show={drawShow}
          activeIndex={chapter.index}
          chaptersData={chaptersData}
          onItemClick={(index: number) => {
            this.loadChapter(index)
            this.setState({ page: 0 })
          }}
          onClose={() => this.setState({ drawShow: false })}
        />
        <Article
          title={chapter.title}
          content={chapter.body}
          page={page}
          onCenterButtonClick={() => {this.setState({ drawShow: true })}}
          onSwiper={(page: number) => this.setState({ page })}
          onScrollPrev={() => this.loadChapter(chapter.index - 1)}
          onScrollNext={this.handleChapterNext}
        />
        {/* <ScrollView
          className='read__scroll'
          scrollY
        >
          <Button onClick={() => this.setState({ drawShow: true })}>目录</Button>
          <Button onClick={this.handleAddUserBook}>加入书架</Button>
          {!isFirstChapter && <Button onClick={() => this.loadChapter(chapter.index - 1)}>{'上一章'}</Button>}
          <Button disabled={isLastChapter} onClick={() => this.loadChapter(chapter.index + 1)}>{isLastChapter ? '已是最后一章' : '下一章'}</Button>
        </ScrollView> */}
      </View>
    )
  }
}

export default ReadPage as ComponentClass<PageOwnProps, PageState>
