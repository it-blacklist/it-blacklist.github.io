import React, { createContext, useEffect, useReducer } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './app.less'
import Home from './pages/home'
import Content from './pages/content'
import { v4 as createUUID } from 'uuid'

const initState = {
  userInfo: null,
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
          </Routes>
        </BrowserRouter>
      </GlobalState.Provider>
    </div>
  )
}

export default App
