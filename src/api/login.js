import fetch from '@/utils/fetch'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return fetch({
    url: '/api/auth/jwt/token',
    method: 'post',
    data
  })
}

export function logout(token) {
  return fetch({
    url: '/login/logout',
    method: 'post',
    params: { token }
  })
}
export function getInfo(token) {
  return fetch({
    url: '/api/admin/user/front/info',
    method: 'get',
    params: { token }
  });
}
export function getUserMenus(token) {
  return fetch({
    url: '/api/admin/user/front/menus',
    method: 'get',
    params: { token }
  })
}

