export default {
  namespace: 'tabbar',
  state: {
    currentIndex: 0
  },
  effects: {},
  reducers: {
    switch (state, { payload }) {
      return { ...state, ...payload }
    }
  }
}
