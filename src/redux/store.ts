// import { createStore, applyMiddleware } from 'redux'
import languageReducer from './language/languageReducer'
import recommendProductsReducer from './recommendProducts/recommendProductsReducer'
// import thunk from 'redux-thunk'
import { actionLog } from './middlewares/actionLog'
import { productDetailSlice } from './productDetail/slice'
import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { productSearchSlice } from './productSearch/slice'
import { userSlice } from './user/slice'
// 引入redux-persist
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // local storage必須從這裡引入



// 因為redux-persist默認的就是localStorage 因此persisConfig不需任何改變
const persistConfig = {
  key: 'root', // 持久化命名空間
  storage, // 數據的保存方式
  whitelist: ['user'] // 這裡指向的是rootReducer裡的user 把資料都保存起來 其他都不保存 黑名單則相反 不會保存裡面的內容 但其他數據全部保存
}

// rootReducer這名字是約定俗成的名稱
const rootReducer = combineReducers({
  language: languageReducer,
  recommendProducts: recommendProductsReducer,
  productDetail: productDetailSlice.reducer,
  productSearchSlice: productSearchSlice.reducer,
  user: userSlice.reducer
})
// 必須有兩個參數
const persistedReducer = persistReducer(persistConfig, rootReducer)

// const store = createStore(rootReducer, applyMiddleware(thunk, actionLog)) -> redux的store
// configureStore 是RTK的 store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(actionLog),
  devTools: true
})
// 使用persisStore創造一個持久化的store
const persistor = persistStore(store)

// store 的類型
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const rootStore = {store, persistor}

export default rootStore