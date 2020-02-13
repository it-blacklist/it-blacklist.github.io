import React from 'react'
import { View, Button, Textarea, navigateBack, showToast, showModal } from 'remax/wechat'
import { SpecialTip } from '@/components'
import { feedbackApi } from '@/service/black'

export default () => {
  const [feedback, setFeedback] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  
  const submit = () => {
    if (!feedback) {
      showToast({ icon: 'none', title: '请输入内容' })
    } else {
      showModal({
        title: '提示',
        content: '是否确认提交？'
      }).then((r) => {
        if (r.confirm) {
          setLoading(true)
          feedbackApi({ feedback })
            .then(res => {
              if (res.errMsg === 'collection.add:ok') {
                setLoading(false)
                showToast({
                  icon: 'success', title: '提交成功'
                }).then(() => navigateBack())
              } else {
                showToast({ icon: 'none', title: '系统异常' })
              }
            })
        }
      })
    }
  }
  
  return (
    <View className="weui-form">
      <View className="weui-form__text-area">
        <View className="weui-form__title">意见反馈</View>
      </View>
      <View className="weui-form__control-area">
        <View className="weui-cells__group weui-cells__group_form">
          <View className="weui-cells weui-cells_form">
            <View className="weui-cell">
              <View className="weui-cell__bd">
                <Textarea className="weui-textarea" value={feedback} placeholder='我要留言...'
                          onInput={e => setFeedback(e.detail.value)}/>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View className="weui-form__opr-area">
        <Button type="primary" loading={loading} onClick={() => submit()}>提交</Button>
      </View>
      <SpecialTip/>
      <view className="weui-footer weui-footer_fixed-bottom">
        <view className="weui-footer__text">Copyright © liujiayii@foxmail.com</view>
      </view>
    </View>
  )
}
