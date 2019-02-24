import { fetchAjax } from '../utils';
import { FETCH_FUZZY_SEARCH, CLEAR_FUZZY_SEARCH, FETCH_BOOK_CHAPTERS } from '../constants/book';
import { SERVER_API_ROOT } from '../constants';

export function fuzzySearch (query: string) {
    return fetchAjax({
        type: FETCH_FUZZY_SEARCH,
        url: SERVER_API_ROOT + '/book/fuzzy-search',
        showLoading: true,
        data: {
            query
        }
    })
}

export function clearFuzzySearch () {
    return {
        type: CLEAR_FUZZY_SEARCH
    }
}

export function fetchBookChapters (bookId: string) {
    return fetchAjax({
        type: FETCH_BOOK_CHAPTERS,
        showLoading: true,
        url: `${SERVER_API_ROOT}/mix-atoc/${bookId}?view=chapters`
    })
}
