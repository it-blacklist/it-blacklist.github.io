import React, { useEffect, useState } from 'react'
import { View, Button, Textarea, navigateBack, showToast, showModal } from 'remax/wechat'
import { SpecialTip } from '@/components'
import { feedbackApi } from '@/service/black'
import { SubmitResTypes } from '@/pages/black-detail/data'
import FormPage from 'weui-miniprogram/miniprogram_dist/form-page/form-page'
import Form from 'weui-miniprogram/miniprogram_dist/form/form'

let timer: NodeJS.Timeout | undefined = undefined
export default () => {
  const [feedback, setFeedback] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [isAgree, setIsAgree] = useState(true)
  const submit = () => {
    if (!feedback) {
      showToast({ icon: 'none', title: '请输入内容' })
    } else if (!isAgree) {
      showToast({ icon: 'none', title: '请勾选我同意' })
    } else {
      showModal({
        title: '是否确认提交？'
      }).then((r) => {
        if (r.confirm) {
          setLoading(true)
          feedbackApi({ feedback })
            .then((res: SubmitResTypes) => {
              if (res.errMsg === 'collection.add:ok') {
                setLoading(false)
                showToast({ icon: 'success', title: '提交成功', mask: true })
                timer = setTimeout(() => {navigateBack()}, 1500)
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
  return (<View data-weui-theme="light"><FormPage title="意见反馈">
    <Form>
      <View className="weui-cells weui-cells_after-title">
        <View className="weui-cell">
          <View className="weui-cell__bd">
            <Textarea value={feedback} onInput={e => setFeedback(e.detail.value)} maxlength={1000} className="weui-textarea"
                      placeholder="我要留言..." style={{ height: '3.3em' }}/>
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
  </FormPage></View>
  )
}
