import { fetchAjax } from "../utils";
import { SERVER_ROOT } from "../constants";
import { FETCH_LOGIN_INFO, FETCH_USER_BOOKS, ADD_USER_BOOK, IBookItem } from "../constants/user";

export function fetchLoginInfo (code: string) {
    return fetchAjax({
        type: FETCH_LOGIN_INFO,
        url: SERVER_ROOT + '/api/wechat/dachui/login',
        data: {
            code
        }
    })
}

export function fetchUserBook () {
    return fetchAjax({
        type: FETCH_USER_BOOKS,
        url: SERVER_ROOT + '/api/reader/bookshelf',
        showLoading: true
    })
}

export function addUserBook (book: IBookItem) {
    return fetchAjax({
        type: ADD_USER_BOOK,
        url: SERVER_ROOT + '/api/reader/bookshelf',
        method: 'POST',
        data: book,
        showLoading: true
    })
}
