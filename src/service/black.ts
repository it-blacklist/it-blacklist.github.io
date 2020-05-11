import { cloud } from 'remax/wechat'

cloud.init({
  env: 'itblacklist',
  traceUser: true
})
const db = cloud.database()

export function fetchApi (data: { pageSize: number; current: number }): Promise<any> {/*黑名单列表*/
  return cloud.callFunction({ name: 'fetch', data })
}

export function SearchApi (data: { name: string }): Promise<any> {/*黑名单搜索*/
  return db.collection('blacklist').where({
    name: db.RegExp({
      regexp: data.name,
      options: 'i'
    })
  }).get()
}

export function addBlackApi (data: { name: string; info: string; time: number; checked: boolean }): Promise<any> {/*增加黑名单*/
  return cloud.callFunction({ name: 'addBlack', data })
}

export function submitRateApi (data: { father: string; name: string; checked: boolean; time: number; content: string }): Promise<any> {/*增加黑名单评论*/
  return cloud.callFunction({ name: 'updateRate', data })
}

export function getRateListApi (data: { _id: string }): Promise<any> {/*查询黑名单评论*/
  return db.collection('blacklist_rate')
    .where({ father: data._id, checked: true })
    .get()
}

export function feedbackApi (data: { feedback: string }): Promise<any> {/*增加留言*/
  return db.collection('feedback').add({ data })
}

export function fetchNodeApi (data: string): Promise<any> {/*查询节点*/
  return db.collection('system').doc(data).get()
}

export function userInfoApi (): Promise<any> {/*查询节点*/
  return cloud.callFunction({ name: 'userInfo' })
}

export function checkUserStateApi (data: { openid: string }): Promise<any> {/*查询黑名单评论*/
  return db.collection('user_blacklist')
    .where({ openid: data.openid })
    .get()
}
