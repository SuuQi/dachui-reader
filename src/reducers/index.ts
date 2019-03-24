import { combineReducers } from 'redux'
import base from './base'
import book from './book'
import user from './user'

export default combineReducers({
  base,
  user,
  book
})
