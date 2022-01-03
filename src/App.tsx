import React  from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './app.less';
import Home from './pages/home'
import Content from './pages/content'

const App: React.FC = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} key='home'/>
          <Route path="/content" element={<Content />} key='content'/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
