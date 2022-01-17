import React, { useContext, useEffect, useState } from 'react'
import { Card, NavBar, List, Toast } from 'antd-mobile'
import { MessageFill } from 'antd-mobile-icons'
import { useNavigate } from 'react-router-dom'
import { getDiscussApi } from '../../services/api'
import styles from './index.module.less'
import dayjs from 'dayjs'
import { GlobalState } from '../../store'

const Statement: React.FC = () => {
  const { state } = useContext<any>(GlobalState)
  const navigate = useNavigate()
  const notice = state.noticeBar || {}
  const [discussList, setDiscussList] = useState([])
  const getDiscussList = (company: string) => {
    getDiscussApi({
      company,
      current: 1,
      pageSize: 100,
    }).then((res: any) => {
      setDiscussList(res)
      console.log(res)
    })
  }
  useEffect(() => {
    if (notice.title) {
      getDiscussList(notice.title)
    }
  }, [notice.title])
  const back = () => {
    navigate('/')
  }
  if (!notice) {
    return null
  }
  return <div className={styles.page_statement}>
    <NavBar onBack={back}/>
    <Card title={notice.title} bodyStyle={{ fontSize: 18 }}>
      {notice.content}
    </Card>
    <div className={styles.discuss_title}><MessageFill/>精选评论</div>
    <List>
      {discussList.map((item: any) => <List.Item key={item._id}>
        <div onClick={() => Toast.show(`发表时间:${dayjs(item.createTime).
          format('YYYY-MM-DD HH:mm:ss')}`)}>{item.content}</div>
      </List.Item>)}
    </List>
  </div>
}

export default Statement