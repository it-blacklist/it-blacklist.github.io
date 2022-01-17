import React, {  useState } from "react";
import {
  List,
  FloatingBubble,
  Popup,
  Image,
  ImageViewer,
} from 'antd-mobile'
import { useNavigate, } from 'react-router-dom'
import {
  AppstoreOutline,
  ChatAddOutline,
  HandPayCircleOutline, EditSOutline,
} from 'antd-mobile-icons'

const handleShowImage = () => {
  ImageViewer.Multi.show({
    images: [
      'https://6974-it-blacklist-a6de4b-1302530662.tcb.qcloud.la/reward/wechat.jpg',
      'https://6974-it-blacklist-a6de4b-1302530662.tcb.qcloud.la/reward/alipay.jpg',
    ],
  })
}

const HomeMenu: React.FC = () => {
  const navigate = useNavigate()
  const [modalVisible, setModalVisible] = useState(false)
  const onClick = () => {
    setModalVisible(true)
  }
  const onClose = (url: string) => {
    setModalVisible(false)
    navigate(url)
  }
  return (
    <>
      <FloatingBubble
        style={{
          '--initial-position-top': '160px',
          '--initial-position-left': '24px',
        }}
        onClick={onClick}
      >
        <AppstoreOutline fontSize={32} />
      </FloatingBubble>
      {modalVisible && <Popup
        visible={modalVisible}
        onMaskClick={() => {
          setModalVisible(false)
        }}
        bodyStyle={{
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
          overflow: 'hidden',
        }}
      >
        <List>
          <List.Item
            prefix={
              <Image
                src={'https://imgsa.baidu.com/forum/pic/item/562c11dfa9ec8a13424f9c95fc03918fa0ecc06a.jpg'}
                style={{ borderRadius: 20 }}
                fit="cover"
                width={40}
                height={40}
              />
            }
            description={'如果您觉得本站还不错，分享给您身边的IT从业者，或者点击下方的打赏，请作者喝杯茶。'}
          />
        </List>
        <List style={{ '--border-top': 'none', }} >
          <List.Item prefix={<EditSOutline />} onClick={() => { onClose('/go-github?id=new') }}>
            贡献一条黑名单
          </List.Item>
          <List.Item prefix={<ChatAddOutline />} onClick={() => { onClose('/feedback') }}>
            留言
          </List.Item>
          <List.Item prefix={<HandPayCircleOutline />} onClick={() => { handleShowImage() }}>
            打赏
          </List.Item>
        </List>
      </Popup>}
    </>
  )
}

export default HomeMenu