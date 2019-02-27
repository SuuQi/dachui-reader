import { combineReducers } from 'redux'
import book from './book'
import user from './user'

export default combineReducers({
  user,
  book
})
