import request from './request'

interface IListParams {
  id?: string
  current?: number
  pageSize?: number
  city?: string
  company?: string
}

const BASE_URL = 'https://api.github.com/repos/it-blacklist/it-blacklist.github.io'

export async function getListApi(data: IListParams) {
  return request({
    baseURL: BASE_URL,
    method: 'get',
    url: '/issues?state=all',
    params: {
      page: data.current,
      per_page: data.pageSize,
      labels: data.city,
      title: data.company
    }
  })
}

export async function getListDetailApi(data: IListParams) {
  return request({
    baseURL: BASE_URL,
    method: 'get',
    url: `/issues/${data.id}`
  })
}

export async function getListCommentApi(data: IListParams) {
  return request({
    baseURL: BASE_URL,
    method: 'get',
    url: `/issues/${data.id}/comments`
  })
}