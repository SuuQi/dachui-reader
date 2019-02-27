import { fetchAjax } from "../utils";
import { SERVER_ROOT } from "../constants";
import { FETCH_LOGIN_INFO } from "../constants/user";

export function fetchLoginInfo (code: string) {
    return fetchAjax({
        type: FETCH_LOGIN_INFO,
        url: SERVER_ROOT + '/api/wechat/dachui/login',
        data: {
            code
        }
    })
}
