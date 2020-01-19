import React, { useState } from 'react'
import './app.css'

export const AppContext = React.createContext({})

const App = ({ children }) => {
  const [globalData, setGlobalData] = useState({
    tabBarIndex: 0,
    about: false
  })
  return (
    <AppContext.Provider value={{ globalData, setGlobalData }}>
      {children}
    </AppContext.Provider>
  )
}

export default App
