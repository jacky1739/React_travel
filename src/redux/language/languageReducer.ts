import i18n from 'i18next'
import { CHANGE_LANGUAGE, ADD_LANGUAGE, LaguageActionTypes } from './languageActions'

export interface languageState {
  language: "zh" | "en"
  languageList: {name: string, code: string}[]
}

const defaultState: languageState = {
  language: "zh",
  languageList: [
    { name: "中文", code: "zh" },
    { name: "English", code: "en"}
  ]
}

// 整個Reducer就是個以舊換新的過程
// state 為參數傳入的舊數據 透過action對資料作出處理, 輸出新的數據
export default (state = defaultState, action: LaguageActionTypes) => {
  // state 不能直接修改 必須使用state來創建一個新的數據 修改後再回傳這個數據
  console.log(state, action)
  // if (action.type === "change_language") {
  //   const newState = {
  //     ...state,
  //     language: action.payload }
  //   return newState
  // }
  // if (action.type === "add_language") {
  //   const newState = {
  //     ...state,
  //     languageList: [...state.languageList, action.payload]
  //   }
  //   return newState
  // }
  // switch為官方推薦的撰寫方式
  switch(action.type) {
    case CHANGE_LANGUAGE:
      i18n.changeLanguage(action.payload)
      return { ...state, language: action.payload }
    case ADD_LANGUAGE:
      return { ...state, languageList: [...state.languageList, action.payload] }
  }
  return state
}
