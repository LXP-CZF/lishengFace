import Cookies from 'js-cookie'
const TokenKey = 'Admin-Token'
const nameKey='username'
export function setName(name) {
  return Cookies.set(nameKey, name,{expires:7 });
}
export function getName() {
  return Cookies.get(nameKey);
}
export function setPassword(password) {
  return Cookies.set(passwordKey, password,{expires:7 });
}
export function getPassword() {
  return Cookies.get(passwordKey);
}
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
