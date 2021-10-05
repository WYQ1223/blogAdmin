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

// 添加博客文章
export function addBlog(data) {
  return request({
    url: '/api/blog',
    method: 'post',
    data
  })
}

// 编辑博客文章
export function modifyBlog({ id, data }) {
  return request({
    url: `/api/blog/${id}`,
    method: 'put',
    data
  })
}

// 查找某篇博客文章
export function findOneBlog(id) {
  return request({
    url: `/api/blog/${id}`,
    method: 'get',
  })
}