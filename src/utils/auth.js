import Cookies from 'js-cookie'
export function setName(name) {
  return Cookies.set("name", name,{expires:7 });
}
export function getName() {
  return Cookies.get("name");
}
export function setPassword(password) {
  return Cookies.set("password", password,{expires:7 });
}
export function getPassword() {
  return Cookies.get("password");
}
export function setToken(token) {
  return Cookies.set("token", token);
}
export function getToken() {
  return Cookies.get("token");
}
