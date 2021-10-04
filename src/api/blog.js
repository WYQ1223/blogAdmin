import request from '@/utils/request'

export function getBlogList(data) {
  return request({
    url: '/api/blog',
    method: 'get',
    params: data
  })
}

export function delOneBlog(id) {
  return request({
    url: `/api/blog/${id}`,
    method: 'delete',
  })
}
