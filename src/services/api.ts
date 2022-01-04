import request from './request'

export async function getConfigApi () {
  return request({
    method: 'post',
    url: 'system/get',
  })
}

interface IListParams {
  _id?: string
  current?: number
  pageSize?: number
  city?: string
  company?: string
}

export interface IList {
  _id: string
  company: string
  content: string
  city: string
}

export async function getListApi (data: IListParams) {
  return request({
    method: 'post',
    url: 'list/get',
    data,
  })
}