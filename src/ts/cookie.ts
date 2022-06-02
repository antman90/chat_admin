import Cookies from "js-cookie";
import { apiSiteName } from '../ts/config'

const cookieSet = (key: string, value: any, expires: any = null) => {
    key = apiSiteName + '_' + key
    if (typeof value !== 'string') {
        value = JSON.stringify(value)
    }
    if (expires) {
        Cookies.set(key, value, { expires })
        return
    }
    Cookies.set(key, value)
}

const cookieGet = (key: string) => {
    return Cookies.get(apiSiteName + '_' + key) || ''
}

const cookieRemove = (key: string) => {
    Cookies.remove(apiSiteName + '_' + key)
}


/****************** apply *****************/

export const adminToken = {
    get() {
        return cookieGet('admin_token');
    },
    set(value: string, expires: any = null) {
        cookieSet('admin_token', value, expires)
    },
    remove() {
        cookieRemove('admin_token')
    }
}

export const wsName = {
    key: 'ws_name',
    get() {
        return cookieGet(this.key);
    },
    set(value: string, expires: any = null) {
        cookieSet(this.key, value, expires)
    },
    remove() {
        cookieRemove(this.key)
    }
}



