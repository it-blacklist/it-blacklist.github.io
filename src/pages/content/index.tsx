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
import { MessageFill, SmileFill, FrownFill } from 'antd-mobile-icons'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import qs from 'query-string'
import {
  getListApi,
  getDiscussApi,
  updateDiscussApi,
  updateListApi
} from '../../services/api'
import styles from './index.module.less'
import dayjs from 'dayjs'
import { GlobalState } from '../../store'

const Content: React.FC = () => {
  const { state } = useContext<any>(GlobalState)
  const location = useLocation()
  const navigate = useNavigate()
  const [detail, setDetail] = useState<any>({})
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
          company: detail.company,
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
                getDiscussList(detail.company)
              },
            })
          }
        }).finally(() => {
          setSubmitLoading(false)
        })
      },
    })
  }
  const getList = (needDiscuss?: boolean) => {
    const params = qs.parse(location.search) as { _id: string }
    getListApi(params).then((res: any) => {
      setDetail(res[0])
      if(needDiscuss){
        getDiscussList(res[0].company)
      }
    })
  }
  useEffect(() => {
    getList(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const back = () => {
    navigate('/')
  }
  const appeal = () => {
    Modal.confirm({
      content: '如果内容有误，可以点此纠错，请具体到哪家公司、哪条评论',
      onConfirm: () => {
        navigate(`/feedback?_id=${detail._id}&company=${detail.company}`)
      },
    })
  }
  const updateRate = (type: number) => {
    updateListApi({
      _id: detail._id,
      rate: {
        type,
        userInfo: state.userInfo
      }
    }).then(()=>{
      getList()
      Toast.show('评价成功')
    })
  }
  const rateConfig = () => {
    const openid = state.userInfo.openid || ''
    const rate = detail.rate || []
    const rateUp = rate.filter((item: any) => item.type === 1)
    const rateDown = rate.filter((item: any) => item.type === -1)
    const isRate = [...rateUp, ...rateDown].findIndex(
      item => item.userInfo.openid === openid) !== -1
    return <>
      <Button onClick={() => updateRate(isRate ? 0 : 1)} size="small"
              color={isRate ? 'success' : 'default'} shape="rounded">
        {isRate ? <div style={{padding:'0 6px'}}><SmileFill style={{paddingRight: 4}}/>{rateUp.length}</div> : '有价值'}
      </Button>
      <Button onClick={() => updateRate(isRate ? 0 : -1)} size="small"
              color={isRate ? 'danger' : 'default'} shape="rounded">
        {isRate ? <div style={{padding:'0 6px'}}><FrownFill style={{paddingRight: 4}}/>{rateDown.length}</div> : '无价值'}
      </Button>
    </>
  }
  return <div className={styles.page_content}>
    <NavBar onBack={back}/>
    <Card title={detail.company}
          extra={`${dayjs(detail.createTime).format('YYYY-MM-DD HH:mm')}`}
          bodyStyle={{ fontSize: 18, paddingBottom: 40 }}>
      {detail.content}
      <Button color="primary" fill="none" style={{ float: 'right' }}
              onClick={() => appeal()}>
        我要纠错
      </Button>
    </Card>
    <div className={styles.btn_wrap}>
      {rateConfig()}
    </div>
    <div className={styles.discuss_title}><MessageFill/>精选评论</div>
    <List>
      {discussList.map((item: any) => <List.Item key={item._id}>
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

export default Content