import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  // return Cookies.get(TokenKey)
  return Cookies.get("token")
}

export function setToken(token) {
  // return Cookies.set(TokenKey, token)
  return Cookies.set("token", token)
}

export function removeToken() {
  // return Cookies.remove(TokenKey)
  return Cookies.remove("token")
}
