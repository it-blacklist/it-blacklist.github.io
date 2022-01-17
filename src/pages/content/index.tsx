import React, { useEffect, useState } from 'react'
import {
  Card,
  NavBar,
  Button,
  List,
  Toast,
  Modal, Image,
} from 'antd-mobile'
import { MessageFill } from 'antd-mobile-icons'
import { useLocation, useNavigate } from 'react-router-dom'
import qs from 'query-string'
import { getListDetailApi, getListCommentApi } from '../../services/github'
import styles from './index.module.less'
import dayjs from 'dayjs'

const Content: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [detail, setDetail] = useState<any>({})
  const [discussList, setDiscussList] = useState([])

  const getList = () => {
    const params = qs.parse(location.search) as { id: string }
    getListDetailApi(params).then(res => {
      setDetail(res)
    })
    getListCommentApi(params).then((res: any) => {
      setDiscussList(res)
    })
  }
  useEffect(() => {
    getList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const back = () => {
    navigate('/')
  }
  const appeal = () => {
    Modal.confirm({
      content: '如果内容有误，可以点此纠错，请具体到哪家公司、哪条评论',
      onConfirm: () => {
        navigate(`/feedback?id=${detail.id}&company=${detail.title}`)
      },
    })
  }
  return <div className={styles.page_content}>
    <NavBar onBack={back}/>
    <Card title={detail.title}
          extra={`${dayjs(detail.created_at).format('YYYY-MM-DD HH:mm')}`}
          bodyStyle={{ fontSize: 18, paddingBottom: 40 }}>
      {detail.body}
      <Button color="primary" fill="none" style={{ float: 'right' }}
              onClick={() => appeal()}>
        我要纠错
      </Button>
    </Card>
    <div className={styles.discuss_title}><MessageFill/>精选评论</div>
    <List>
      {discussList.map((item: any) => <List.Item key={item.id}
                                                 prefix={
                                                   <Image
                                                     src={item.user.avatar_url}
                                                     style={{ borderRadius: 20 }}
                                                     fit="cover"
                                                     width={40}
                                                     height={40}
                                                   />
                                                 } description={item.body}
      >
        <div onClick={() => Toast.show(`发表时间:${dayjs(item.created_at).
          format('YYYY-MM-DD HH:mm:ss')}`)}>{item.user.login}</div>
      </List.Item>)}
      <Button color="primary" fill="none" style={{ float: 'right' }}
              onClick={() => navigate(`/go-github?id=${detail.number}`)}>
        我要评论
      </Button>
    </List>
  </div>
}

export default Content