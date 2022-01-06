import { createContext } from 'react'

export const initState = {
  userInfo: null,
  cityList: [
    {
      value: '河北省',
      label: '河北省',
      children: [
        { value: '石家庄', label: '石家庄市' },
      ],
    },
    {
      value: '北京市',
      label: '北京市',
      children: [
        { value: '北京', label: '市辖区' },
      ],
    },
  ],
  noticeBar: null,
}
export const stateReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'userInfo/update':
      console.log(action, state)
      localStorage.setItem('$it-blacklist', JSON.stringify(action.payload))
      return {
        ...state,
        userInfo: action.payload,
      }
    case 'noticeBar/update':
      console.log(action, state)
      return {
        ...state,
        noticeBar: action.payload,
      }
    default:
      return state
  }
}


export const GlobalState = createContext(
  { state: initState, dispatch: stateReducer })