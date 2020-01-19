import { cloud } from 'remax/wechat'

cloud.init()
const db = cloud.database()

export function fetchApi (data) {/*黑名单列表*/
  return cloud.callFunction({ name: 'fetch', data })
}

export function fetchAllApi () {/*体验版黑名单列表*/
  return cloud.callFunction({ name: 'fetchAll' })
}

export function SearchApi (data) {/*黑名单搜索*/
  return db.collection('blacklist').where({
    name: db.RegExp({
      regexp: data.name,
      options: 'i'
    })
  }).get()
}

export function addBlackApi (data) {/*增加黑名单*/
  return cloud.callFunction({ name: 'addBlack', data })
}

export function submitRateApi (data) {/*增加黑名单评论*/
  return cloud.callFunction({ name: 'updateRate', data })
}

export function getRateListApi (data) {/*查询黑名单评论*/
  return db.collection('blacklist_rate')
    .where({ father: data._id, checked: true })
    .get()
}

export function feedbackApi (data) {/*增加留言*/
  return db.collection('feedback').add({ data })
}

export function fetchNodeApi (data) {/*查询节点*/
  return db.collection('system').doc(data).get()
}
