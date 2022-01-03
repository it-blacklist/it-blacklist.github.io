import React, { useEffect, useState } from 'react'
import { InfiniteScroll, List, Loading, SearchBar, Ellipsis } from 'antd-mobile'
import { sleep } from 'antd-mobile/es/utils/sleep'
import { useNavigate } from 'react-router-dom'

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
  }, [])

  async function loadMore () {
    sleep(500)
    return getListApi({
      current: current,
      pageSize: 20,
      city: '石家庄',
      company: searchVal,
    }).then((res: any) => {
      console.log(res)
      setCurrent((i) => i + 1)
      setList([...list, ...res])
      setHasMore(res.length > 0)
    })
  }

  function doSearch () {
    setCurrent(1)
    setList([])
    setHasMore(true)
    loadMore()
  }

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <SearchBar value={searchVal} onChange={(e) => setSearchVal(e)}
                     onSearch={doSearch} placeholder="这里还不能用"/>
        </div>
      </div>
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
      ) : (
        <div className={styles.placeholder}>
          <div className={styles.loadingWrapper}>
            <Loading/>
          </div>
          正在拼命加载数据
        </div>
      )}
    </>
  )
}

export default Home