import React, { useState } from 'react'
import { View, Button, navigateBack, showToast, showModal, Input, Textarea, Label, Navigator } from 'remax/wechat'
import { SpecialTip } from '@/components'
import { addBlackApi } from '@/service/black'
import { SubmitResTypes } from '@/pages/BlackDetail'

export default () => {
  const [name, setName] = useState<string>('')
  const [info, setInfo] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  
  const submit = () => {
    if (!name || !info) {
      showToast({ icon: 'none', title: '请补全信息后再提交!' })
    } else {
      showModal({
        title: '提示',
        content: '是否确认提交？'
      }).then((r) => {
        if (r.confirm) {
          setLoading(true)
          const time = `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`
          addBlackApi({ name, info, time, checked: true })
            .then((res: SubmitResTypes) => {
              setLoading(false)
              if (res.result.errMsg === 'collection.add:ok') {
                showToast({ icon: 'success', title: '提交成功', mask: true })
                  .then(() => {setTimeout(() => {navigateBack()}, 1500)})
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
  
  return (
    <View className="weui-form">
      <View className="weui-form__text-area">
        <View className="weui-form__title">贡献黑名单</View>
      </View>
      <View className="weui-form__control-area">
        <View className="weui-cells__group weui-cells__group_form">
          <View className="weui-cells weui-cells_form">
            <View className="weui-cell">
              <View className="weui-cell__hd"><Label className="weui-label">公司名称</Label></View>
              <View className="weui-cell__bd">
                <Input className="weui-input" value={name} placeholder='请输入公司名称...'
                       onInput={e => setName(e.detail.value)}/>
              </View>
            </View>
            <View className="weui-cell">
              <View className="weui-cell__bd">
                <Textarea className="weui-textarea" value={info} placeholder='该公司不合理的地方...'
                          onInput={e => setInfo(e.detail.value)}/>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View className="weui-form__opr-area">
        <Button type="primary" loading={loading} onClick={() => submit()}>提交</Button>
      </View>
      <SpecialTip/>
    </View>
  )
}
