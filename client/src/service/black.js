import Taro from '@tarojs/taro'

Taro.cloud.init()
const db = Taro.cloud.database()

export const fetchApi = data =>
  db.collection('blacklist')
    .skip((data.current - 1) * 10)
    .limit(10)
    .get()

export const SearchApi = data =>
  db.collection('blacklist').where({ name: data.name })
    .get()

export const getCountApi = () =>
  db.collection('blacklist').count()