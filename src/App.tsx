import React, { createContext, useEffect, useReducer } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './app.less'
import Home from './pages/home'
import Content from './pages/content'
import Statement from './pages/statement'
import Create from './pages/create'
import Feedback from './pages/feedback'
import { v4 as createUUID } from 'uuid'

const initState = {
  userInfo: null,
  cityList: [
    {
      value: '河北省',
      label: '河北省',
      children: [
        { value: '石家庄', label: '石家庄市' },
      ],
    },
    {
      value: '北京市',
      label: '北京市',
      children: [
        { value: '北京', label: '市辖区' },
      ],
    },
  ],
}
const stateReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'userInfo/update':
      console.log(action, state)
      localStorage.setItem('$it-blacklist', JSON.stringify(action.payload))
      return {
        ...state,
        userInfo: action.payload,
      }
    default:
      return state
  }
}

// @ts-ignore
export const GlobalState = createContext()

const App: React.FC = () => {
  const [state, dispatch] = useReducer(stateReducer, initState)
  useEffect(() => {
    const userInfo = localStorage.getItem('$it-blacklist')
    const payload = userInfo ? JSON.parse(userInfo) : { userId: createUUID() }
    dispatch({ type: 'userInfo/update', payload })
  }, [])
  return (
    <div className="app">
      <GlobalState.Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} key="home"/>
            <Route path="/content" element={<Content/>} key="content"/>
            <Route path="/statement" element={<Statement/>} key="statement"/>
            <Route path="/create" element={<Create/>} key="create"/>
            <Route path="/feedback" element={<Feedback/>} key="feedback"/>
          </Routes>
        </BrowserRouter>
      </GlobalState.Provider>
    </div>
  )
}

export default App
