import request from './request'

export async function getConfigApi () {
  return request({
    method: 'post',
    url: '/api/system/get',
  })
}

interface IListParams {
  _id?: string
  current?: number
  pageSize?: number
  city?: string
  company?: string
  rate?: any
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
    url: '/api/list/get',
    data,
  })
}

export async function updateListApi (data: IListParams) {
  return request({
    method: 'post',
    url: '/api/list/update',
    data,
  })
}

export async function listCountApi () {
  return request({
    method: 'post',
    url: '/api/list/count',
  })
}

export async function getDiscussApi (data: IListParams) {
  return request({
    method: 'post',
    url: '/api/discuss/get',
    data,
  })
}
export async function updateDiscussApi (data: IListParams) {
  return request({
    method: 'post',
    url: '/api/discuss/update',
    data,
  })
}


export async function updateFeedbackApi (data: IListParams) {
  return request({
    method: 'post',
    url: '/api/feedback/update',
    data,
  })
}

export async function systemGetApi () {
  return request({
    method: 'post',
    url: '/api/system/get',
  })
}
