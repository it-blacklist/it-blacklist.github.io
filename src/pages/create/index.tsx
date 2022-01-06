import React, { useContext, useState } from 'react'
import {
  Button,
  Form,
  Input,
  TextArea,
  CascadePicker,
  Modal, Dialog,Checkbox
} from 'antd-mobile'
import { GlobalState } from '../../store'
import { updateListApi } from '../../services/api'
import { useNavigate,Link } from 'react-router-dom'

const Create: React.FC = () => {
  const { state } = useContext<any>(GlobalState)
  const [pickerVisible, setPickerVisible] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [checked, setChecked] = useState(false)
  const navigate = useNavigate()
  const handleSubmit = (params: any) => {
    if(!checked){
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
        updateListApi({
          ...params,
          city: params.city[1],
          userInfo: state.userInfo,
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
                navigate(-1)
              },
            })
          }
        }).finally(() => {
          setSubmitLoading(false)
        })
      },
    })
  }

  console.log(state)
  return <Form
    layout="horizontal"
    footer={
      <>
        <Checkbox
          checked={checked}
          onChange={(val)=>setChecked(val)}
          style={{
            '--icon-size': '18px',
            '--font-size': '14px',
            '--gap': '6px',
            marginBottom:8
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
    <Form.Item
      name="company"
      label="公司名称"
      rules={[{ required: true, message: '公司名称不能为空' }]}
    >
      <Input placeholder="请输入公司名称"/>
    </Form.Item>
    <Form.Item
      name="city"
      label="城市"
      rules={[{ required: true, message: '城市不能为空' }]}
      trigger="onConfirm"
      onClick={() => {
        setPickerVisible(true)
      }}
    >
      <CascadePicker
        title="城市选择"
        options={state.cityList}
        visible={pickerVisible}
        onClose={() => {
          setPickerVisible(false)
        }}
      >{value => value.length
        ? value.map((i: any) => i.label).join('/')
        : '请选择城市'}</CascadePicker>
    </Form.Item>
    <Form.Item name="content" rules={[{ required: true, message: '内容不能为空' }]}>
      <TextArea placeholder="请输入内容" maxLength={2000} rows={4}/>
    </Form.Item>
  </Form>
}

export default Create