import React, { useContext, useEffect, useState } from 'react'
import {
  Card,
  NavBar,
  Button,
  List,
  Toast,
  Modal,
  Dialog
} from 'antd-mobile'
import { MessageFill } from 'antd-mobile-icons'
import { useLocation, useNavigate } from 'react-router-dom'
import qs from 'query-string'
import {
  getListApi,
  getDiscussApi,
} from '../../services/api'
import styles from './index.module.less'
import dayjs from 'dayjs'

const Content: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [detail, setDetail] = useState<any>({})
  const [discussList, setDiscussList] = useState([])
  const getDiscussList = (company: string) => {
    getDiscussApi({
      company,
      current: 1,
      pageSize: 100,
    }).then((res: any) => {
      setDiscussList(res)
    })
  }

  const getList = (needDiscuss?: boolean) => {
    const params = qs.parse(location.search) as { _id: string, type?: 'uni' }
    getListApi(params).then((res: any) => {
      setDetail(res[0])
      if (needDiscuss) {
        getDiscussList(res[0].company)
      }
    })
  }
  useEffect(() => {
    getList(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const back = () => {
    navigate('/uni')
  }
  const appeal = () => {
    Modal.confirm({
      content: '如果内容有误，可以点此纠错，请具体到哪家公司、哪条评论',
      onConfirm: () => {
        navigate(`/feedback?_id=${detail._id}&company=${detail.company}`)
      },
    })
  }

  return <div className={styles.page_content}>
    <NavBar onBack={back} />
    <Card title={detail.company}
      extra={`${dayjs(detail.createTime).format('YYYY-MM-DD HH:mm')}`}
      bodyStyle={{ fontSize: 18, paddingBottom: 40 }}>
      {detail.content}
      <Button color="primary" fill="none" style={{ float: 'right' }}
        onClick={() => appeal()}>
        我要纠错
      </Button>
    </Card>
    <div className={styles.discuss_title}><MessageFill />精选评论</div>
    <List>
      {discussList.map((item: any) => <List.Item key={item._id}>
        <div onClick={() => Toast.show(`发表时间:${dayjs(item.createTime).
          format('YYYY-MM-DD HH:mm:ss')}`)}>{item.content}</div>
      </List.Item>)}
      <Button color="primary" fill="none" style={{ float: 'right' }}
              onClick={() => Dialog.alert({content: '旧数据不再支持评论'})}>
        我要评论
      </Button>
    </List>
  </div>
}

export default Content