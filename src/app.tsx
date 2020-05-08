import React, { createContext, useEffect, useState } from 'react'
import { setStorage, getStorage, redirectTo } from 'remax/wechat'
import { useAppEvent } from 'remax/macro'
import './app.css'
import 'weui-miniprogram/miniprogram_dist/weui-wxss/dist/style/weui.css'
import { fetchNodeApi, userInfoApi, checkUserStateApi } from '@/service/black'
export const GlobalContext = createContext({})

export interface GlobalContextTypes {
  globalShow?: boolean
}

const App: React.FC = ({ children }) => {
  const [globalShow, setGlobalShow] = useState<boolean>(false)
  const checkUserState = (openid: string) => {
    checkUserStateApi({ openid }).then(res => {
      if (res.data && res.data.length) {
        redirectTo({ url: '/pages/dark-room/index' })
      }
    })
  }
  useEffect(() => {
    fetchNodeApi('694cb712-ce24-4e26-9409-a980ecb04fac')
      .then(res => {
        if (res.errMsg === 'document.get:ok') {
          if (res.data.show) {
            setGlobalShow(true)
          }
        }
      })
    getStorage({ key: 'openid' }).then(res => {
      if (res.data) {
        checkUserState(res.data)
      }
    }).catch(_ => {
      userInfoApi().then(res => {
        if (res.errMsg === 'cloud.callFunction:ok') {
          checkUserState(res.result.OPENID)
          setStorage({ key: 'openid', data: res.result.OPENID })
        }
      })
    })
  }, [])
  useAppEvent('onShareAppMessage', () => {
    return {
      title: '石家庄IT公司黑企',
      path: '/pages/index/index'
    }
  })
  return <GlobalContext.Provider value={{ globalShow }}>{children}</GlobalContext.Provider>
}

export default App
