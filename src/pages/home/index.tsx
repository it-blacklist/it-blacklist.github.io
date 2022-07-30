
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

      <div className={styles.header}>
        <div className={styles.left}>
          <SearchBar value={searchVal} onChange={(e) => setSearchVal(e)}
            onSearch={doSearch} placeholder="这里还不能用~" />
        </div>
      </div>
      <HomeMenu />
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
                  key={item.id}
                  description={<Ellipsis direction={'end'} rows={2}
                    content={item.body} />}
                  onClick={() => navigate(`/content?id=${item.number}`)}
                >
                  {item.title}
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
