import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
// 如果要使用自定義action, 就可以使用PayloadAction
import axios from 'axios'

interface ProductSearchState {
  data: any
  loading: boolean
  error: string | null
  pagination: any
}

const initialState: ProductSearchState = {
  loading: true,
  error: null,
  data: null,
  pagination: null
}

export const searchProduct = createAsyncThunk(
  // 前面為 name , 後面為這個 action 的名稱
  "productSearch/searchProduct",
  async (paramaters: {
    keywords: string,
    nextPage: number | string
  }) => {
    let url = `http://123.56.149.216:8080/api/touristRoutes`

    if (paramaters.keywords) {
      url += `?keyword=${paramaters.keywords}`
    }
    
    const response = await axios.get(url)
    // 返回的是一個promise, getProductDetail這個函數就會自動生成pending, fulfilled, rejected這三個action
    console.log(response)
    // return response
    return {
      data: response.data,
      pagination: response.headers["x-pagination"]
    }
  }
)

// 當使用createSlice創建reducer的時候 immer其實在底層就已經在運行了
// 把所有的程式都轉換為immeutable
export const productSearchSlice = createSlice({
  name: 'productSearch',
  initialState,
  reducers: {
  },
  extraReducers: {
    // 因為typescript的定義 所以需要加上.type
    [searchProduct.pending.type]: (state) => {
      // return  { ...state, loading: true }
      // 使用 immer 就可以直接更改數值
      state.loading = true
    },
    [searchProduct.fulfilled.type]: (state, action) => {
      state.data = action.payload.data
      state.pagination = action.payload.pagination
      state.loading = false
      state.error = null
      console.log(state.pagination)
    },
    // PayloadAction 是自定義action類型
    [searchProduct.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    }
  }
})