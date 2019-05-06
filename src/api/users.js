import fetch from '@/utils/fetch'

export function getUsersPage(query) {
  return fetch({
    url: '/api/admin/user/page',
    method: 'get',
     params: query
  })
}
export function UpdateUsers(id, obj) {
  return fetch({
    url: '/api/admin/user/'+id,
    method: 'put',
    data: obj
  })
}
export function delUser(id) {
  return fetch({
    url: '/api/admin/user/'+id,
    method: 'delete'
  })
}
export function AddUsers(obj) {
  return fetch({
    url: '/api/admin/user',
    method: 'post',
    data: obj
  })
}