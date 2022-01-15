import React, {
  useEffect,
  useReducer,
  Suspense,
  useState,
} from 'react'
import { HashRouter, Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import { WaterMark, TabBar } from 'antd-mobile'
import { ContentOutline } from 'antd-mobile-icons'
import { v4 as createUUID } from 'uuid'
import { AliveScope } from 'react-activation'

import { systemGetApi } from './services/api'
import './app.less'
import routes from './routes'
import { GlobalState, stateReducer, initState } from './store'

const Bottom = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [active, setActive] = useState('/')
  useEffect(() => {
    setActive(location.pathname)
  }, [location.pathname])
  if (!['/', '/uni'].includes(location.pathname)) {
    return null
  }
  return (
    <TabBar activeKey={active} onChange={(key) => navigate(key)}>
      <TabBar.Item key={"/"} icon={<ContentOutline />} />
      <TabBar.Item key={"/uni"} icon={<ContentOutline />} />
    </TabBar>
  )
}

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
      {/* <WaterMark content="IT BLACKLIST" gapX={96} gapY={96} /> */}
      <GlobalState.Provider value={{ state, dispatch }}>
        <HashRouter>
          <AliveScope>
            <Routes>
              {routes.map(item => <Route path={item.path} element={<Suspense fallback={<>...</>}>{<item.component />}</Suspense>} key={item.key} />)}
            </Routes>
          </AliveScope>
          <Bottom />
        </HashRouter>
      </GlobalState.Provider>
    </div>
  )
}

export default App
