import React, { useEffect } from 'react'
import { useQuery, View } from 'remax/wechat'
import { SpecialTip } from '@/components'
import VanCellGroup from '@vant/weapp/dist/cell-group'
import VanCell from '@vant/weapp/dist/cell'
import VanDialog from '@vant/weapp/dist/dialog'
import VanButton from '@vant/weapp/dist/button'
import VanLoading from '@vant/weapp/dist/loading'
import VanDivider from '@vant/weapp/dist/divider'
import VanNotify from '@vant/weapp/dist/notify'
import VanPanel from '@vant/weapp/dist/panel'
import VanField from '@vant/weapp/dist/field'
import hooks from './hooks'
import styles from './index.module.css'

export default function () {
  const [state, setState, loading, fetchRate, submit] = hooks()
  const changeState = newState => {
    setState({ ...state, ...newState })
  }
  const query = useQuery()
  useEffect(() => {
    const detail = JSON.parse(query.detail)
    fetchRate(detail)
  }, [])
  return (
    <View className={styles.black_detail}>
      <VanNotify id='van-notify'/>
      <VanDialog id='van-dialog'/>
      <VanPanel title={state.detail.name} desc={state.detail.time} use-footer-slot>
        <View className={styles.black_content}>{state.detail.info}</View>
        <View slot='footer'>
          <VanDivider contentPosition='center' textColor='#1989fa'>网友点评</VanDivider>
          <View>
            {state.rateList.map(item => (
              <VanCell key={item._id} title={item.content} border={false}/>
            ))}
            {loading.fetchRate &&
            <View style={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}>
              <VanLoading size='24px' color='#1989fa'>加载中...</VanLoading>
            </View>}
            {state.rateList.length === 0 && <VanDivider contentPosition='center'>没有更多了</VanDivider>}
          </View>
        </View>
      </VanPanel>
      <View className='page-content'>
        <VanCellGroup>
          <VanField value={state.rate} type='textarea' placeholder='我要点评...'
                    autosize onchange={e => changeState({ rate: e.detail })}
          />
          <SpecialTip url={'/pages/statement/index'}/>
          <VanButton loading={loading.submit} block type='info' onclick={() => submit()}>提交</VanButton>
        </VanCellGroup>
      </View>
    </View>
  )
}
