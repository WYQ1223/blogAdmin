import request from '@/utils/request'

// 查看文章分类
export function getBlogCategory() {
  return request({
    url: '/api/blogtype',
    method: 'get',
  })
}

// 添加文章分类
export function addBlogCategory(data) {
  return request({
    url: '/api/blogtype',
    method: 'post',
    data
  })
}

// 更新某一个文章分类
export function updateOneBlogCategory(editInfo) {
  return request({
    url: `/api/blogtype/${editInfo.id}`,
    method: 'put',
    data: editInfo.data
  })
}

// 删除文章分类
export function delBlogCategory(id) {
  return request({
    url: `/api/blogtype/${id}`,
    method: 'delete',
  })
}

// 查找某一个文章分类
export function findOneBlogCategory(id) {
  return request({
    url: `/api/blogtype/${id}`,
    method: 'get',
  })
}

