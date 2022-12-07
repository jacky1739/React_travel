interface languageState {
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
export default (state = defaultState, action) => {
  return state
}