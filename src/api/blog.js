import request from '@/utils/request'

// 获取博客列表数据
export function getBlogList(data) {
  return request({
    url: '/api/blog',
    method: 'get',
    params: data
  })
}

// 删除某一篇博客的数据
export function delOneBlog(id) {
  return request({
    url: `/api/blog/${id}`,
    method: 'delete',
  })
}
