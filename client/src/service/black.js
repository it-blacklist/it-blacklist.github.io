import Taro from '@tarojs/taro'

Taro.cloud.init()
const db = Taro.cloud.database()
const _ = db.command

export const fetchApi = data =>/*黑名单列表*/
  db.collection('blacklist')
    .skip((data.current - 1) * 10)
    .limit(10)
    .get()

export const SearchApi = data =>/*黑名单搜索*/
  db.collection('blacklist').where({
    name: db.RegExp({
      regexp: data.name,
      options: 'i'
    })
  }).get()

export const getCountApi = () =>/*查询总数量*/
  db.collection('blacklist').count()

export const addBlackApi = data =>/*增加黑名单*/
  db.collection('blacklist').add({ data })

export const updateRateApi = data =>/*增加黑名单评论*/
  db.collection('blacklist_rate').add({data})

export const getRateListApi = data =>/*查询黑名单评论*/
  db.collection('blacklist_rate')
    .where({father:data._id,checked:true})
    .get()
