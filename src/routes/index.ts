import { lazy } from 'react'

const Home = lazy(() => import('../pages/home'))
const Content = lazy(() => import('../pages/content'))
const Statement = lazy(() => import('../pages/statement'))
const Create = lazy(() => import('../pages/create'))
const Feedback = lazy(() => import('../pages/feedback'))

interface IRoutes {
  path: string
  key: string
  component: any
}

const routes: IRoutes[] = [
  { path: '/', key: 'home', component: Home },
  { path: '/content', key: 'content', component: Content},
  { path: '/statement', key: 'statement', component: Statement },
  { path: '/create', key: 'create', component: Create },
  { path: '/feedback', key: 'feedback', component: Feedback },
]

export default routes
