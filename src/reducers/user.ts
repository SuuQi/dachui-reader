import { createReducer, fetchHandle } from '../utils';
import { FETCH_LOGIN_INFO } from '../constants/user';

export default createReducer({
  isFetching: false,
  sessionId: '',
}, {
  [FETCH_LOGIN_INFO]: fetchHandle((state, action) => ({
    ...state,
    isFetching: false,
    sessionId: action.data.session_key || ''
  })),

})
