import { reactive, h,defineComponent } from 'vue';
import {View} from '@tarojs/components'
import {Button } from '@nutui/nutui-taro'
import './index.scss'

export default defineComponent({
  name: 'Index',
  setup () {
    const state = reactive({
      msg: 'hello world',
      msg2: '你成功了～',
      type: 'text',
      show: false,
      cover: false,
    });

    const handleClick = (type: string, msg: string, cover: boolean = false) => {
      console.log('handleClick')
      state.show = true;
      state.msg2 = msg;
      state.type = type;
      state.cover = cover;
    };
    return () => (
      <View>
        <View class="index">
          {state.msg}
          <View class="btn">
            <Button type="primary" onClick={() => handleClick('text', state.msg2, true)}>点我</Button>
          </View>
        </View>
      </View>
    )
  }
})
