import request from '@/utils/request'

// 获取banner的信息
export function getBanner() {
  return request({
    url: '/api/banner',
    method: 'get',
  })
}

// 设置banner的信息
export function setBanner(data) {
  return request({
    url: 'api/banner',
    method: 'post',
    data
  })
}