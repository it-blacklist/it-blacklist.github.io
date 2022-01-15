import { lazy } from 'react'

const Home = lazy(() => import('../pages/home'))
const Uni = lazy(() => import('../pages/uni'))
const UniContent = lazy(() => import('../pages/uni-content'))
const Content = lazy(() => import('../pages/content'))
const Statement = lazy(() => import('../pages/statement'))
const Create = lazy(() => import('../pages/create'))
const Feedback = lazy(() => import('../pages/feedback'))
const GoGithub = lazy(() => import('../pages/go-github'))

interface IRoutes {
  path: string
  key: string
  component: any
}

const routes: IRoutes[] = [
  { path: '/', key: 'home', component: Home },
  { path: '/uni', key: 'uni', component: Uni },
  { path: '/uni-content', key: 'uni-content', component: UniContent },
  { path: '/content', key: 'content', component: Content},
  { path: '/statement', key: 'statement', component: Statement },
  { path: '/create', key: 'create', component: Create },
  { path: '/feedback', key: 'feedback', component: Feedback },
  { path: '/go-github', key: 'go-github', component: GoGithub },
]

export default routes
