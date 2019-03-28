import Taro from '@tarojs/taro'

export type IReadIndexData = {
  chapterIndex: number,
  pageIndex: number
}

/** 保存阅读到的章节和页数 */
export function setReadIndexStorage (bookId: string, chapterIndex: number, pageIndex: number) {
  return Taro.setStorage({
    key: `read-index-${bookId}`,
    data: `${chapterIndex}:${pageIndex}`
  })
}

/** 获取阅读到的章节和页数 */
export function getReadIndexStorage (bookId: string) {
  return new Promise<IReadIndexData>(resolve => {
    Taro.getStorage({ key: `read-index-${bookId}` })
      .then(res => {
        console.log(res)
        const data = res.data.split(':')
        resolve({
          chapterIndex: data[0] ? Number(data[0]) : 0,
          pageIndex: data[1] ? Number(data[1]) : 0,
        })
      })
      .catch(() => {
        console.log(`read-index-${bookId} 没有阅读记录`)
        resolve({
          chapterIndex: 0,
          pageIndex: 0
        })
      })
  })
}
