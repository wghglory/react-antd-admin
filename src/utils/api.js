/**
 * 各种api，未来可以考虑 a) 建立services文件夹，里面export不同实体的http verb接口。 b) 创建不同api，如apiUser, apiProduct
 */
import axios from 'axios'
import {casServer, centerServer, defaultPageSize} from '../config'


// 必须带cookie，否则无限跳转
let centerApi = axios.create({
    baseURL: centerServer,
    withCredentials: true
})

// pageIndex = -1 ==> first 500 data
// backend pageIndex starts from 0 !!!
export function getUsers(pageIndex = 0, pageSize = defaultPageSize) {
    return centerApi.get(`${centerServer}/users?page=${pageIndex}&size=${pageSize}`)
        .then(res => res.data)
        .catch(
            // 未登录的用户去登陆，之后跳转回之前页面
            err => {
                if (err.response.status === 401) {
                    location.href = `${casServer}/login?callback=${encodeURI(location.href)}`
                }
            }
        )
}