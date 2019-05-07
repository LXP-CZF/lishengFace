import fetch from '@/utils/fetch'

export function getTree(query) {
  return fetch({
    url: '/api/admin/group/tree',
    method: 'get',
     params: query
  })
}
export function getNode(id) {
    return fetch({
      url: '/api/admin/group/'+id,
      method: 'get'
    })
  }
export function UpdateNode(id, obj) {
  return fetch({
    url: '/api/admin/group/'+id,
    method: 'put',
    data: obj
  })
}
export function delNode(id) {
  return fetch({
    url: '/api/admin/group/'+id,
    method: 'delete'
  })
}
export function Addrole(obj) {
  return fetch({
    url: '/api/admin/group',
    method: 'post',
    data: obj
  })
}