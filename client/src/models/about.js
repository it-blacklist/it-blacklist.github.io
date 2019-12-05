export default {
  namespace: 'about',
  state: {
    active: false
  },
  effects: {},
  reducers: {
    switch (state, { payload }) {
      return { ...state, ...payload }
    }
  }
}
