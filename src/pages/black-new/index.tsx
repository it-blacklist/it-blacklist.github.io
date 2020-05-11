import React, { useContext, useEffect, useState } from 'react'
import { View, Button, navigateBack, showToast, showModal, Input, Textarea } from 'remax/wechat'
import { SpecialTip } from '@/components'
import { addBlackApi } from '@/service/black'
import { SubmitResTypes } from '@/pages/black-detail/data'
import FormPage from 'weui-miniprogram/miniprogram_dist/form-page/form-page'
import Form from 'weui-miniprogram/miniprogram_dist/form/form'
import Cell from 'weui-miniprogram/miniprogram_dist/cell/cell'
import Cells from 'weui-miniprogram/miniprogram_dist/cells/cells'
import Msg from "weui-miniprogram/miniprogram_dist/msg/msg"
import { GlobalContext, GlobalContextTypes } from '@/app'
import format from 'dayjs'

let timer: NodeJS.Timeout | undefined = undefined
export default () => {
  const { globalShow }: GlobalContextTypes = useContext(GlobalContext)
  const [name, setName] = useState<string>('')
  const [info, setInfo] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [isAgree, setIsAgree] = useState(false)
  const submit = () => {
    if (!name || !info) {
      showToast({ icon: 'none', title: '请补全信息后再提交!' })
    } else if (!isAgree) {
      showToast({ icon: 'none', title: '请勾选我同意' })
    } else {
      showModal({
        title: '是否确认提交？',
      }).then((r) => {
        if (r.confirm) {
          setLoading(true)
          const time = format().valueOf()
          addBlackApi({ name, info, time, checked: true })
            .then((res: SubmitResTypes) => {
              setLoading(false)
              if (res.result.errMsg === 'collection.add:ok') {
                showToast({ icon: 'success', title: '提交成功', mask: true })
                timer = setTimeout(() => {navigateBack()}, 1500)
              } else if (res.result.errCode === 87014) {
                showToast({ icon: 'none', title: '内容含有违法违规内容' })
              } else {
                showToast({ icon: 'none', title: '系统异常' })
              }
            })
        }
      })
    }
  }
  useEffect(()=>{
    return ()=> clearTimeout(timer as NodeJS.Timeout)
  },[])
  return (<>{globalShow ? <FormPage title="贡献一条名单">
    <Form>
      <Cells>
        <Cell title="公司名称">
          <Input value={name} onInput={e => setName(e.detail.value)} className="weui-input"
                 placeholder="请输入公司名称..."/>
        </Cell>
      </Cells>
      <View className="weui-cells weui-cells_after-title">
        <View className="weui-cell">
          <View className="weui-cell__bd">
            <Textarea value={info} onInput={e => setInfo(e.detail.value)} maxlength={1000} className="weui-textarea"
                      placeholder="该公司不合理的地方..." style={{ height: '3.3em' }}/>
          </View>
        </View>
      </View>
    </Form>
    <View className="weui-btn-area" slot='button'>
      <Button className="weui-btn" type="primary" loading={loading} onClick={() => submit()}>确定</Button>
    </View>
    <View slot="tips">
      <SpecialTip isAgree={isAgree} setIsAgree={setIsAgree}/>
    </View>
  </FormPage> : <Msg type="warn" title="提示">
    <View slot="desc">由于涉及个人主体小程序未开放类目，目前该功能已下线，留言功能正常~</View>
    <View slot="footer">
      <View className="weui-footer__text">Copyright © liujiayii@foxmail.com</View>
    </View>
  </Msg>
  }</>)
}
