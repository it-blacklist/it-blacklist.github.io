import React from 'react'
import { Checkbox, CheckboxGroup, Icon, Label, Navigator, View } from 'remax/wechat'

export default ({ isAgree, setIsAgree }: { isAgree: boolean, setIsAgree: any }) => (
  <CheckboxGroup
    /*onChange={() => setIsAgree(!isAgree)}*/
  >
    <Label className="weui-agree">
      <View className="weui-agree__text">
        {/*<Checkbox className="weui-agree__checkbox" checked={isAgree}/>
        <View className="weui-agree__checkbox-icon">
          {isAgree && <Icon className="weui-agree__checkbox-icon-check" type="success_no_circle" size="9"/>}
        </View>*/}
        阅读并同意
        <Navigator url="/pages/statement/index" className="weui-agree__link">《相关条款》</Navigator>
      </View>
    </Label>
  </CheckboxGroup>
)
