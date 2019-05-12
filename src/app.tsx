import '@tarojs/async-await'
import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/about/about'

import store from './store'
import './app.scss'
import { getSystemInfo } from './actions/base';
import { fetchCatsList, fetchHotBookList } from './actions/book';

/** fix window 变量报错 */
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
  }
}

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }
class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/home/home',
      'pages/bookshelf/bookshelf',
      'pages/about/about',
      'pages/booksearch/booksearch',
      'pages/read/read'
    ],
    tabBar: {
      position: 'top',
      list: [
        {
          pagePath: 'pages/home/home',
          text: '首页'
        },
        {
          pagePath: 'pages/bookshelf/bookshelf',
          text: '书架'
        },
        {
          pagePath: 'pages/about/about',
          text: '关于'
        }
      ]
    },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '大锤读书',
      navigationBarTextStyle: 'black'
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

store.dispatch(fetchCatsList() as any)
store.dispatch(fetchHotBookList() as any)
getSystemInfo().then(store.dispatch)

Taro.render(<App />, document.getElementById('app'))
