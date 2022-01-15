import React, { useEffect, useState } from 'react'
import {
  InfiniteScroll,
  List,
  Loading,
  SearchBar,
  Ellipsis,
  PullToRefresh,
  Empty,
  NoticeBar
} from 'antd-mobile'
import { useNavigate, Link } from 'react-router-dom'
import HomeMenu from '../../components/HomeMenu'
import { KeepAlive } from 'react-activation'

import styles from './index.module.less'
import { getListApi } from '../../services/api'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const [list, setList] = useState<any>([])
  const [hasMore, setHasMore] = useState(true)
  const [current, setCurrent] = useState(1)
  const [searchVal, setSearchVal] = useState('')
  useEffect(() => {
    doSearch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function loadMore(isSearch?: boolean, searchValue?: string) {
    if (isSearch) {
      return getListApi({
        current: 1,
        pageSize: 20,
        city: '石家庄',
        company: searchValue,
      }).then((res: any) => {
        setCurrent((i) => i + 1)
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

  async function doSearch(searchValue: string = searchVal) {
    setCurrent(1)
    setList([])
    setHasMore(true)
    await loadMore(true, searchValue)
  }

  return (
    <>
      <Link to="/statement">
        <NoticeBar content="置顶公告" color="alert" />
      </Link>
      <HomeMenu />
      <div className={styles.header}>
        <div className={styles.left}>
          <SearchBar value={searchVal} onChange={(e) => setSearchVal(e)}
            onSearch={doSearch} placeholder="输入公司名称搜索~" />
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
                    content={item.content} />}
                  onClick={() => navigate(`/uni-content?_id=${item._id}&type="uni"`)}
                >
                  {item.company}
                </List.Item>
              ))}
            </List>
            <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
          </>
        ) : !hasMore ? <Empty description="暂无数据" /> : (
          <div className={styles.placeholder}>
            <div className={styles.loadingWrapper}>
              <Loading />
            </div>
            正在拼命加载数据
          </div>
        )}
      </PullToRefresh>
    </>
  )
}

const KeepAliveHome = (props: any) => (<KeepAlive saveScrollPosition="screen"><Home {...props} /></KeepAlive>)

export default KeepAliveHome