import axios from 'axios'
import { casServer, centerServer, defaultPageSize } from '../config'

// 必须带 cookie，否则无限跳转
const centerApi = axios.create({ baseURL: centerServer, withCredentials: true })

// pageIndex = -1 ==> first 500 data backend pageIndex starts from 0 !!!
export function getPagination(controllerName, pageIndex = 0, pageSize = defaultPageSize) {
    return centerApi.get(`${centerServer}/${controllerName}?page=${pageIndex}&size=${pageSize}`)
        .then(res => res.data)
        .catch(
            // 未登录的用户去登陆，之后跳转回之前页面
            err => {
                if (err.response.status === 401) {
                    location.href = `${casServer}/login?callback=${encodeURI(location.href)}`
                }
            })
}

export function getById(controllerName, id) {
    return centerApi.get(`${centerServer}/${controllerName}/${id}`)
        .then(res => res.data)
        .catch(
            // 未登录的用户去登陆，之后跳转回之前页面
            err => {
                if (err.response.status === 401) {
                    location.href = `${casServer}/login?callback=${encodeURI(location.href)}`
                }
            })
}

export function getByIdsBatch(controllerName, ids) {
    // ?id=1&id=2&id=3
    return centerApi.get(`${centerServer}/${controllerName}?id=${ids.join('&id=')}`)
        .then(res => res.data)
        .catch(
            // 未登录的用户去登陆，之后跳转回之前页面
            err => {
                if (err.response.status === 401) {
                    location.href = `${casServer}/login?callback=${encodeURI(location.href)}`
                }
            })
}

export function create(controllerName, model) {
    return centerApi.post(`${centerServer}/${controllerName}`, model)
        .then(res => console.log(res))
        .catch(err => console.log(err))
}

export function update(controllerName, id, model) {
    return centerApi.put(`${centerServer}/${controllerName}/${id}`, model)
        .then(res => console.log(res))
        .catch(err => console.log(err))
}

export function deleteById(controllerName, id) {
    return centerApi.delete(`${centerServer}/${controllerName}/${id}`)
        .then(res => console.log(res))
        .catch(err => console.log(err))
}