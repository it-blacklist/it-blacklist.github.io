import React, { useContext, useEffect, useState } from 'react'
import { useQuery, View, Button, showToast, showModal, Textarea, usePageEvent } from 'remax/wechat'
import { SpecialTip, LoadingMore } from '@/components'
import { getRateListApi, submitRateApi } from '@/service/black'
import { DetailTypes, RateListTypes, ResTypes, SubmitResTypes } from './data'
import FormPage from 'weui-miniprogram/miniprogram_dist/form-page/form-page'
import Form from 'weui-miniprogram/miniprogram_dist/form/form'
import { GlobalContext, GlobalContextTypes } from '@/app'

export default () => {
  const [detail, setDetail] = useState<DetailTypes>({
    _id: '',
    name: '',
    info: '',
    time: '',
    checked: false,
  })
  const { globalShow }: GlobalContextTypes = useContext(GlobalContext)
  const [loading, setLoading] = useState<boolean>(false)
  const [submitLoading, setSubmitLoading] = useState<boolean>(false)
  const [rateList, setRateList] = useState<Array<RateListTypes>>([])
  const [rateVal, setRateVal] = useState<string>('')
  const [isAgree, setIsAgree] = useState(false)
  const fetchRate = (detail: DetailTypes) => {
    setLoading(true)
    getRateListApi({ _id: detail._id })
      .then((res: ResTypes) => {
        setLoading(false)
        if (res.errMsg === 'collection.get:ok') {
          setRateList(res.data)
        }
      })
  }
  const submit = () => {
    if (!rateVal.length) {
      showToast({ icon: 'none', title: '请输入内容' })
    } else {
      showModal({
        title: '是否确认提交？',
      }).then((r) => {
        if (r.confirm) {
          setSubmitLoading(true)
          submitRateApi({ father: detail._id, content: rateVal, checked: true, name: detail.name })
            .then((res: SubmitResTypes) => {
              setSubmitLoading(false)
              if (res.result.errMsg === 'collection.add:ok') {
                setRateVal('')
                showToast({ icon: 'success', title: '提交成功' })
                fetchRate(detail)
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
  const query = useQuery()
  useEffect(() => {
    const detail = JSON.parse(query.detail)
    setDetail(detail)
    fetchRate(detail)
  }, [])
  usePageEvent('onShareAppMessage', () => {
    return {
      title: '石家庄IT公司黑企',
      path: `/pages/black-detail/index?detail=${query.detail}`
    }
  })
  return (
    <View>
      <view className="page__hd">
        <view className="page__title">{detail.name}</view>
        <view className="page__desc">{detail.time}</view>
      </view>
      <view className="page__bd">
        <view className="weui-article">
          <view className="weui-article__section">
            <view className="weui-article__section">
              <view className="weui-article__p">{detail.info}</view>
            </view>
            {globalShow && <>
              <view className="weui-article__h2">网友点评</view>
              <view className="weui-article__section">
                {rateList.length !== 0 ? rateList.map((item: RateListTypes) =>
                    <View key={item._id} className="weui-article__p">{item.content}</View>) :
                  <LoadingMore type='noMore'/>}
                {loading && <LoadingMore type='loading'/>}
              </view>
            </>}
          </view>
        </view>
      </view>
      {globalShow && <FormPage>
        <Form>
          <View className="weui-cells weui-cells_after-title">
            <View className="weui-cell">
              <View className="weui-cell__bd">
                <Textarea value={rateVal} onInput={e => setRateVal(e.detail.value)} className="weui-textarea"
                          placeholder="我要留言..." style={{ height: '3.3em' }}/>
              </View>
            </View>
          </View>
        </Form>
        <View className="weui-btn-area" slot='button'>
          <Button className="weui-btn" type="primary" loading={submitLoading} onClick={() => submit()}>确定</Button>
        </View>
        <View slot="tips">
          <SpecialTip isAgree={isAgree} setIsAgree={setIsAgree}/>
        </View>
      </FormPage>}
    </View>
  )
}
