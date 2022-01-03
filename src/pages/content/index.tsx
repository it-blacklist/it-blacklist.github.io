import React, { useEffect, useState } from 'react'
import { Card, NavBar } from 'antd-mobile'
import { useLocation,useNavigate } from 'react-router-dom'
import qs from 'query-string'
import { getListApi } from '../../services/api'

const Content: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [detail, setDetail] = useState<any>({})
  useEffect(() => {
    const params = qs.parse(location.search)
    getListApi(params).then((res: any) => {
      setDetail(res[0])
    })
  }, [])
  const back = () => {
    navigate(-1)
  }
  return <>
    <NavBar onBack={back}/>
    <Card title={detail.company}>
      {detail.content}
    </Card>
  </>
}

export default Content