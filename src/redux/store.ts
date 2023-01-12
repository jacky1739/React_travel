import { createStore, combineReducers, applyMiddleware } from 'redux'
import languageReducer from './language/languageReducer'
import recommendProductsReducer from './recommendProducts/recommendProductsReducer'
import thunk from 'redux-thunk'
import { actionLog } from './middlewares/actionLog'


// rootReducer這名字是約定俗成的名稱
const rootReducer = combineReducers({
  language: languageReducer,
  recommendProducts: recommendProductsReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk, actionLog))

// store 的類型
export type RootState = ReturnType<typeof store.getState>

export default store