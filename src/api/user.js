import request from '@/utils/request'

export function login(data) {
  return request({
    // url: '/vue-admin-template/user/login',
    // url:"https://www.fastmock.site/mock/06c8be06c16b30764c466badda582793/ttshop/admin/token",
    url: 'http://203.195.219.146:8080/admin/login',
    // url: baseUrl+'admin/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    // url: '/vue-admin-template/user/info',
    // url: baseUrl+"admin/info",
    url:'http://203.195.219.146:8080/admin/info',
    method: 'get',
    // params: { token }
    // "token": { token }
  })
}

export function logout() {
  return request({
    // url: '/vue-admin-template/user/logout',
    // url:"https://www.fastmock.site/mock/06c8be06c16b30764c466badda582793/ttshop/admin/logout",
    url: 'http://203.195.219.146:8080/admin/logout',
    // url: baseUrl+'admin/logout',
    method: 'post'
  })
}
