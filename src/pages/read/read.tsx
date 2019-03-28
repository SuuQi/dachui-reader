import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './read.scss'
import { IChaptersData, IChapterItem, IUserBookItem } from '../../constants/book'
import { fetchBookChapters, fetchBookChapterText } from '../../actions/book'
import Catelogue from '../../componts/catelogue/catelogue'
import { addUserBook, updateUserBook } from '../../actions/user'
import Article from '../../componts/article/article'
import SettingsBar from './settingsBar'
import { setReadIndexStorage, getReadIndexStorage } from './read.utils';
import clone from 'lodash/clone';

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
  catelogueShow: boolean
  settingsShow: boolean

  /** 当前页 */
  // page: number
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
      body: '',
      pageIndex: 0
    },
    catelogueShow: false,
    settingsShow: false
  }

  config: Config = {
    navigationBarTitleText: '大锤读书'
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
    await this.loadChapter(index, chaptersData.chapters[index], chaptersData.id)
    Taro.hideLoading()
  }

  /** 加载章节 */
  loadChapter = async (index: number, originChapter = this.state.chaptersData.chapters[index], bookId = this.state.chaptersData.id) => {
    Taro.showLoading({ title: '正在加载...' })
    const { fetchBookChapterText } = this.props
    const chapter = clone(originChapter) as IChapterItem
    const [chapterData, readIndexData] = await Promise.all([
      fetchBookChapterText(chapter.link),
      getReadIndexStorage(bookId)
    ])
    chapter.body = chapterData.chapter.body
    chapter.index = index
    if (readIndexData.chapterIndex === index) {
      chapter.pageIndex = readIndexData.pageIndex
    } else {
      chapter.pageIndex = 0
      setReadIndexStorage(bookId, index, 0)
    }
    this.setState({ chapter }, () => {
      Taro.hideLoading()
    })
    bookId && this.props.updateUserBook({
      id: bookId,
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
  
  handleChapterPrev = async () => {
    const { chapter, chaptersData } = this.state
    const isFirstChapter = chapter.index === 0
    if (isFirstChapter) {
      Taro.showToast({ title: '已是第一章' })
    } else {
      // 设置一个很大的值以确保在最后一页
      await setReadIndexStorage(chaptersData.id, chapter.index - 1, 9999)
      await this.loadChapter(chapter.index - 1)
    }
  }

  handleChapterNext = async () => {
    const { chaptersData, chapter } = this.state
    const isLastChapter = chapter.index === chaptersData.chapters.length - 1
    if (isLastChapter) {
      Taro.showToast({ title: '已是最后一章' })
    } else {
      await this.loadChapter(chapter.index + 1)
    }
  }

  render () {
    const { chaptersData, chapter, catelogueShow, settingsShow } = this.state
    return (
      <View className='read'>
        <Catelogue
          show={catelogueShow}
          activeIndex={chapter.index}
          chaptersData={chaptersData}
          onItemClick={(index: number) => {
            this.loadChapter(index)
          }}
          onClose={() => this.setState({ catelogueShow: false })}
        />
        <SettingsBar
          type='top'
          show={settingsShow}
          onClose={() => this.setState({ settingsShow: false })}
          onCatelogueClick={() => this.setState({ settingsShow: false, catelogueShow: true })}
          onAddBookClick={this.handleAddUserBook}
        />
        <Article
          title={chapter.title}
          content={chapter.body}
          page={chapter.pageIndex}
          onCenterButtonClick={() => {this.setState({ settingsShow: true })}}
          onSwiper={(pageIndex: number) => {
            this.setState({ chapter: { ...chapter, pageIndex } })
            setReadIndexStorage(chaptersData.id, chapter.index, pageIndex)
          }}
          onScrollPrev={this.handleChapterPrev}
          onScrollNext={this.handleChapterNext}
        />
        {/* <ScrollView
          className='read__scroll'
          scrollY
        >
          <Button onClick={() => this.setState({ catelogueShow: true })}>目录</Button>
          <Button onClick={this.handleAddUserBook}>加入书架</Button>
          {!isFirstChapter && <Button onClick={() => this.loadChapter(chapter.index - 1)}>{'上一章'}</Button>}
          <Button disabled={isLastChapter} onClick={() => this.loadChapter(chapter.index + 1)}>{isLastChapter ? '已是最后一章' : '下一章'}</Button>
        </ScrollView> */}
      </View>
    )
  }
}

export default ReadPage as ComponentClass<PageOwnProps, PageState>
