import React, {
  useEffect,
  useReducer,
  Suspense,
} from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { WaterMark } from 'antd-mobile'
import { v4 as createUUID } from 'uuid'

import { systemGetApi } from './services/api'
import './app.less'
import routes from './routes'
import {GlobalState,stateReducer,initState} from './store'

const App: React.FC = () => {
  const [state, dispatch] = useReducer(stateReducer, initState)
  useEffect(() => {
    const userInfo = localStorage.getItem('$it-blacklist')
    const payload = userInfo ? JSON.parse(userInfo) : { openid: createUUID() }
    dispatch({ type: 'userInfo/update', payload })
    systemGetApi().then((res: any) => {
      dispatch({ type: 'noticeBar/update', payload: res[0].notice })
    })
  }, [])
  return (
    <div className="app">
      <WaterMark content="IT BLACKLIST"/>
      <GlobalState.Provider value={{ state, dispatch }}>
        <HashRouter>
          <Routes>
            {routes.map(item => <Route path={item.path} element={<Suspense fallback={<>...</>}>{<item.component/>}</Suspense>} key={item.key}/>)}
          </Routes>
        </HashRouter>
      </GlobalState.Provider>
    </div>
  )
}

export default App
