
import fetch from '@/utils/fetch'

export function getDairy(query) {
  return fetch({
    url: '/api/admin/gateLog/page',
    method: 'get',
    params: query
  })
}