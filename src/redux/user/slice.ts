import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
// 如果要使用自定義action, 就可以使用PayloadAction
import axios from 'axios'

interface userState {
    loading: boolean
    error: string | null
    token: string | null // 因為使用的是jwt 所以token會保存在這
}

const initialState: userState = {
  loading: false,
  error: null,
  token: null
}

export const signIn = createAsyncThunk(
  // 前面為 name , 後面為這個 action 的名稱
  "user/signIn",
  async (paramaters: {
    email: string,
    password: string
  }, thunkAPI) => {
    const { data } = await axios.post(
      "http://123.56.149.216:8080/auth/login", {
        email: paramaters.email,
        password: paramaters.password
      }
      )
    return data.token
  }
)

// 當使用createSlice創建reducer的時候 immer其實在底層就已經在運行了
// 把所有的程式都轉換為immeutable
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: (state) => {
      state.token = null
      state.error = null
      state.loading = false
    }
  },
  extraReducers: {
    // 因為typescript的定義 所以需要加上.type
    [signIn.pending.type]: (state) => {
      // return  { ...state, loading: true }
      // 使用 immer 就可以直接更改數值
      state.loading = true
    },
    [signIn.fulfilled.type]: (state, action) => {
      state.token = action.payload
      state.loading = false
      state.error = null
    },
    // PayloadAction 是自定義action類型
    [signIn.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    }
  }
})