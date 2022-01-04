import React, { useEffect, useState } from 'react'
import {
  InfiniteScroll,
  List,
  Loading,
  SearchBar,
  Ellipsis,
  FloatingBubble,
  PullToRefresh,
  Popup,
  Image,
  ImageViewer,
  Modal,
  Empty,
  Toast,
} from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import {
  AppstoreOutline,
  ChatAddOutline,
  HandPayCircleOutline, EditSOutline,
} from 'antd-mobile-icons'

import styles from './index.module.less'
import { getListApi } from '../../services/api'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const [list, setList] = useState<any>([])
  const [hasMore, setHasMore] = useState(true)
  const [current, setCurrent] = useState(1)
  const [searchVal, setSearchVal] = useState('')
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    doSearch()
  }, [])

  async function loadMore (isSearch?: boolean, searchValue?: string) {
    if (isSearch) {
      return getListApi({
        current: 1,
        pageSize: 20,
        city: '石家庄',
        company: searchValue,
      }).then((res: any) => {
        setCurrent(1)
        setList([...res])
        setHasMore(res.length >= 20)
      })
    }
    return getListApi({
      current: current,
      pageSize: 20,
      city: '石家庄',
      company: searchValue,
    }).then((res: any) => {
      setCurrent((i) => i + 1)
      setList([...list, ...res])
      setHasMore(res.length >= 20)
    })
  }

  async function doSearch (searchValue: string = searchVal) {
    setCurrent(1)
    setList([])
    setHasMore(true)
    await loadMore(true, searchValue)
  }

  const onClick = () => {
    setModalVisible(true)
  }
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <SearchBar value={searchVal} onChange={(e) => setSearchVal(e)}
                     onSearch={doSearch} placeholder="输入公司名称搜索~"/>
        </div>
      </div>
      <PullToRefresh
        /* @ts-ignore*/
        onRefresh={() => {
          setSearchVal('')
          doSearch('')
        }}
      >
        {list.length > 0 ? (
          <>
            <List>
              {list.map((item: any) => (
                <List.Item
                  key={item._id}
                  description={<Ellipsis direction={'end'} rows={2}
                                         content={item.content}/>}
                  onClick={() => navigate(`/content?_id=${item._id}`)}
                >
                  {item.company}
                </List.Item>
              ))}
            </List>
            <InfiniteScroll loadMore={loadMore} hasMore={hasMore}/>
          </>
        ) : !hasMore ? <Empty description="暂无数据"/> : (
          <div className={styles.placeholder}>
            <div className={styles.loadingWrapper}>
              <Loading/>
            </div>
            正在拼命加载数据
          </div>
        )}
      </PullToRefresh>
      <FloatingBubble
        style={{
          '--initial-position-top': '160px',
          '--initial-position-left': '24px',
        }}
        onClick={onClick}
      >
        <AppstoreOutline fontSize={32}/>
      </FloatingBubble>
      <Popup
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
                src={'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'}
                style={{ borderRadius: 20 }}
                fit="cover"
                width={40}
                height={40}
              />
            }
            description={'如果您觉得小程序还不错，分享给您身边的IT从业者，或者点击下方的打赏，请作者喝杯茶。'}
          />
        </List>
        <List
          style={{
            '--border-top': 'none',
          }}
        >
          <List.Item prefix={<EditSOutline/>} onClick={() => Toast.show({
            content: '正在开发中~',
          })}>
            贡献一条黑名单
          </List.Item>
          <List.Item prefix={<ChatAddOutline/>} onClick={() => Toast.show({
            content: '正在开发中~',
          })}>
            留言
          </List.Item>
          <List.Item prefix={<HandPayCircleOutline/>}
                     onClick={() => Modal.confirm({
                       content: '打赏是自愿的，不打赏也可以使用所有功能~',
                       confirmText: '继续',
                       cancelText: '关闭',
                       onConfirm: () => {
                         ImageViewer.Multi.show({
                           images: [
                             'https://6974-it-blacklist-a6de4b-1302530662.tcb.qcloud.la/reward/wechat.jpg',
                             'https://6974-it-blacklist-a6de4b-1302530662.tcb.qcloud.la/reward/alipay.jpg',
                           ],
                         })
                       },
                     })
                     }>
            打赏
          </List.Item>
        </List>
      </Popup>
    </>
  )
}

export default Home