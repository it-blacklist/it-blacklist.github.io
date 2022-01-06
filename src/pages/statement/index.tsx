import React, { useContext, useEffect, useState } from 'react'
import {
  Card,
  NavBar,
  Button,
  List,
  Toast,
  Dialog,
  Modal,
  Checkbox, Form, TextArea,
} from 'antd-mobile'
import { MessageFill } from 'antd-mobile-icons'
import { Link, useNavigate } from 'react-router-dom'
import {
  getDiscussApi,
  updateDiscussApi,
} from '../../services/api'
import styles from './index.module.less'
import dayjs from 'dayjs'
import { GlobalState } from '../../store'

const Statement: React.FC = () => {
  const { state } = useContext<any>(GlobalState)
  const navigate = useNavigate()
  const notice = state.noticeBar || {}
  const [discussList, setDiscussList] = useState([])
  const [submitLoading, setSubmitLoading] = useState(false)
  const [checked, setChecked] = useState(false)
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
  const handleSubmit = (params: any) => {
    if (!checked) {
      Dialog.alert({
        content: '请先勾选协议',
        onConfirm: () => {},
      })
      return
    }
    Modal.confirm({
      content: '确认要提交吗？',
      onConfirm: () => {
        setSubmitLoading(true)
        updateDiscussApi({
          ...params,
          userInfo: state.userInfo,
          company: notice.title,
        }).then((res) => {
          console.log(res)
          //@ts-ignore
          if (res?.errcode) {
            Dialog.alert({
              content: '内容可能含有违法违规内容',
              onConfirm: () => {},
            })
          } else {
            Dialog.alert({
              content: '保存成功',
              onConfirm: () => {
                getDiscussList(notice.title)
              },
            })
          }
        }).finally(() => {
          setSubmitLoading(false)
        })
      },
    })
  }
  useEffect(() => {
    if(  notice.title ){
      getDiscussList(notice.title)
    }
  }, [notice.title])
  const back = () => {
    navigate('/')
  }
  if(!notice){
    return null
  }
  return <div className={styles.page_statement}>
    <NavBar onBack={back}/>
    <Card title={notice.title} bodyStyle={{ fontSize: 18}}>
      {notice.content}
    </Card>
    <div className={styles.discuss_title}><MessageFill/>精选评论</div>
    <List>
      {discussList.map((item: any) => <List.Item  key={item._id}>
        <div onClick={() => Toast.show(`发表时间:${dayjs(item.createTime).
          format('YYYY-MM-DD HH:mm:ss')}`)}>{item.content}</div>
      </List.Item>)}
    </List>
    <Form
      style={{ marginTop: 20 }}
      layout="horizontal"
      footer={
        <>
          <Checkbox
            checked={checked}
            onChange={(val) => setChecked(val)}
            style={{
              '--icon-size': '18px',
              '--font-size': '14px',
              '--gap': '6px',
              marginBottom: 8,
            }}
          >
            勾选代表已阅读并同意<Link to="/statement">相关条款</Link>
          </Checkbox>
          <Button block type="submit" color="primary" loading={submitLoading}>
            提交
          </Button>
        </>
      }
      onFinish={(values) => {
        handleSubmit(values)
      }}
    >
      <Form.Item name="content" rules={[{ required: true, message: '内容不能为空' }]}>
        <TextArea placeholder="我要评论…" maxLength={2000} rows={4}/>
      </Form.Item>
    </Form>
  </div>
}

export default Statement