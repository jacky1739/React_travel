import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
// 如果要使用自定義action, 就可以使用PayloadAction
import axios from 'axios'

interface ShoppingCartState {
  loading: boolean
  error: string | null
  items: any[]
}

const initialState: ShoppingCartState = {
  loading: true,
  error: null,
  items: []
}

export const getShoppingCart = createAsyncThunk(
  // 前面為 name , 後面為這個 action 的名稱
  "shoppingCart/getShoppingCart",
  async (jwt: string, thunkAPI) => {
    const { data } = await axios.get(
      `http://123.56.149.216:8080/api/shoppingCart`,
      {
        headers: {
          Authorization: `bearer ${jwt}`
        }
      }
    )
    // 返回的是一個promise, getProductDetail這個函數就會自動生成pending, fulfilled, rejected這三個action
    return data.shoppingCartItems
  }
)

export const addShoppingCartItem = createAsyncThunk(
  "shoppingCart/addShoppingCartItem",
  async (parameters: { jwt: string, touristRouteId: string }, thunkAPI) => {
    const { data } = await axios.post(
      `http://123.56.149.216:8080/api/shoppingCart/items`,
      {
        touristRouteId: parameters.touristRouteId
      },
      {
        headers: {
          Authorization: `bearer ${parameters.jwt}`
        }
      }
    )
    return data.shoppingCartItems
  }
)

export const clearShoppingCartItem = createAsyncThunk(
  "shoppingCart/clearShoppingCartItem",
  async (parameters: {jwt: string, itemIds: number[]}, thunkAPI) => {
      return await axios.delete(
      `http://123.56.149.216:8080/api/shoppingCart/items/(${parameters.itemIds.join(",")})`,
      {
        headers: {
          Authorization: `bearer ${parameters.jwt}`
        }
      }
    )
  }
)

// 當使用createSlice創建reducer的時候 immer其實在底層就已經在運行了
// 把所有的程式都轉換為immeutable
export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {},
  extraReducers: {
    // 因為typescript的定義 所以需要加上.type
    [getShoppingCart.pending.type]: (state) => {
      // return  { ...state, loading: true }
      // 使用 immer 就可以直接更改數值
      state.loading = true
    },
    [getShoppingCart.fulfilled.type]: (state, action) => {
      state.items = action.payload
      state.loading = false
      state.error = null
    },
    // PayloadAction 是自定義action類型
    [getShoppingCart.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    },
    [addShoppingCartItem.pending.type]: (state) => {
      state.loading = true
    },
    [addShoppingCartItem.fulfilled.type]: (state, action) => {
      state.items = action.payload
      state.loading = false
      state.error = null
    },
    [addShoppingCartItem.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    },
    [clearShoppingCartItem.pending.type]: (state) => {
      // return  { ...state, loading: true }
      // 使用 immer 就可以直接更改數值
      state.loading = true
    },
    [clearShoppingCartItem.fulfilled.type]: (state) => {
      state.items = []
      state.loading = false
      state.error = null
    },
    // PayloadAction 是自定義action類型
    [clearShoppingCartItem.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    },
  }
})
