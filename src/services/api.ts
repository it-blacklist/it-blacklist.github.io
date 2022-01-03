import request from './request'

export async function getConfigApi(){
  return request({
    method: 'post',
    url: 'system/get',
  })
}

export async function getListApi(data: any){
  return request({
    method: 'post',
    url: 'list/get',
    data
  })
}