import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
// 如果要使用自定義action, 就可以使用PayloadAction
import axios from 'axios'

interface ProductDetailState {
  data: any
  loading: boolean
  error: string | null
}

const initialState: ProductDetailState = {
  loading: true,
  error: null,
  data: null
}

export const getProductDetail = createAsyncThunk(
  // 前面為 name , 後面為這個 action 的名稱
  "productDetail/getProductDetail",
  async (touristRouteId: string, thunkAPI) => {
    const { data } = await axios.get(`http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`)
    // 返回的是一個promise, getProductDetail這個函數就會自動生成pending, fulfilled, rejected這三個action
    return data
  }
)

// 當使用createSlice創建reducer的時候 immer其實在底層就已經在運行了
// 把所有的程式都轉換為immeutable
export const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState,
  reducers: {
    fetchStart: (state) => {
     // return  { ...state, loading: true }
     // 使用 immer 就可以直接更改數值
     state.loading = true
    },
    fetchSuccess: (state, action) => {
      state.data = action.payload
      state.loading = false
      state.error = null
    },
    fetchFail: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    }
  },
  extraReducers: {
    // 因為typescript的定義 所以需要加上.type
    [getProductDetail.pending.type]: (state) => {
      // return  { ...state, loading: true }
      // 使用 immer 就可以直接更改數值
      state.loading = true
    },
    [getProductDetail.fulfilled.type]: (state, action) => {
      state.data = action.payload
      state.loading = false
      state.error = null
    },
    // PayloadAction 是自定義action類型
    [getProductDetail.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    }
  }
})