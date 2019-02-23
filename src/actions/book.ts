import { fetchAjax } from '../utils';
import { SERVER_API_ROOT, FETCH_FUZZY_SEARCH } from '../constants/book';

export function fuzzySearch (query) {
    return fetchAjax({
        type: FETCH_FUZZY_SEARCH,
        url: SERVER_API_ROOT + '/book/fuzzy-search',
        data: {
            query
        }
    })
}