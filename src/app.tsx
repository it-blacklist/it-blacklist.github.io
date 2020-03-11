import React, { createContext, useEffect, useState } from 'react'
import './app.css'
import './utils/weui.css'
import { fetchNodeApi } from '@/service/black'

export const GlobalContext = createContext({})

export interface GlobalContextTypes {
  globalShow?: boolean
}

const App: React.FC = ({ children }) => {
  const [globalShow, setGlobalShow] = useState<boolean>(false)
  useEffect(() => {
    fetchNodeApi('694cb712-ce24-4e26-9409-a980ecb04fac')
      .then(res => {
        if (res.errMsg === 'document.get:ok') {
          if (res.data.show) {
            setGlobalShow(true)
          }
        }
      })
  }, [])
  return <GlobalContext.Provider value={{ globalShow }}>{children}</GlobalContext.Provider>
}

export default App
