import { cloud } from 'remax/wechat'

cloud.init()
const db = cloud.database()

export const fetchApi = data =>/*黑名单列表*/
  cloud.callFunction({ name: 'fetch', data })

export const _fetchAllApi = () =>/*体验版黑名单列表*/
  cloud.callFunction({ name: 'fetchAll' })

export const SearchApi = data =>/*黑名单搜索*/
  db.collection('blacklist').where({
    name: db.RegExp({
      regexp: data.name,
      options: 'i'
    })
  }).get()

export const addBlackApi = data =>/*增加黑名单*/
  cloud.callFunction({ name: 'addBlack', data })

export const updateRateApi = data =>/*增加黑名单评论*/
  cloud.callFunction({ name: 'updateRate', data })

export const getRateListApi = data =>/*查询黑名单评论*/
  db.collection('blacklist_rate')
    .where({ father: data._id, checked: true })
    .get()

export function feedbackApi (data) {/*增加留言*/
  return db.collection('feedback').add({ data })
}
