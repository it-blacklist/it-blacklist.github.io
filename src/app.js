import React from 'react'
import dva from 'remax-dva'
import createLoading from 'dva-loading'
import './app.scss'
import models from './models/index'

const app = dva()
app.use(createLoading({}))
models.forEach(model => app.model(model))
const App = app.start(({ children }) => children)

export default App
