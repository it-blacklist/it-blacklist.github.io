import React, { useContext, useState } from 'react'
import {
  Button,
  Form,
  TextArea,
  Modal, Dialog, Checkbox,NavBar
} from 'antd-mobile'
import { GlobalState } from '../../store'
import { updateFeedbackApi } from '../../services/api'
import { useNavigate, Link,useLocation } from 'react-router-dom'

const Feedback: React.FC = () => {
  const { state } = useContext<any>(GlobalState)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [checked, setChecked] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const back = () => {
    navigate(-1)
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
        updateFeedbackApi({
          ...params,
          userInfo: state.userInfo,
          createTime: +new Date(),
          props: location.search
        }).then(() => {
          Dialog.alert({
            content: '保存成功',
            onConfirm: () => {
              navigate(-1)
            },
          })
        }).finally(() => {
          setSubmitLoading(false)
        })
      },
    })
  }
  return <>
  
  <NavBar onBack={back} />
  <Form
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
      <TextArea placeholder="我要留言…" maxLength={2000} rows={4}/>
    </Form.Item>
  </Form>
  </> 
  
}

export default Feedback