import React from 'react'
import { NavBar, Result, Button } from 'antd-mobile'
import { useNavigate, useLocation } from 'react-router-dom'
import qs from 'query-string'

const BaseUrl = 'https://github.com/it-blacklist/it-blacklist.github.io/issues/'

const Create: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const back = () => {
    navigate(-1)
  }
  const goGitHub = () => {
    const params = qs.parse(location.search) as { id: string }
    console.log(params)
    const id = params?.id || 'new'
    window.open(BaseUrl + id + (id === 'new' ? '?labels=石家庄' : ''))
  }
  return <>
    <NavBar onBack={back} />
    <Result
      status='warning'
      title='警告提示'
      description='本站的所有数据源会从GitHub的issue读取，登录账户为GitHub账户（没有的自己注册一个~）。如果打不开请尝试用手机流量打开，或者自备上网工具！如果打不开请尝试用手机流量打开，或者自备上网工具！如果打不开请尝试用手机流量打开，或者自备上网工具！'
    />
    <Button color="primary" block onClick={() => goGitHub()}>继续</Button>
  </>
}

export default Create