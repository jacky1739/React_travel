import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
// 如果要使用自定義action, 就可以使用PayloadAction
import axios from 'axios'
import { checkout } from '../shoppingCart/slice'

interface OrderState {
  loading: boolean
  error: string | null
  currentOrder: any
}

const initialState: OrderState = {
  loading: false,
  error: null,
  currentOrder: null
}

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (parameters: { jwt: string, orderId: string }, thunkAPI) => {
    const { data } = await axios.post(`http://123.56.149.216:8080/api/orders/${parameters.orderId}/placeOrder`,
    null, {
      headers: {
        Authorization: `bearer ${parameters.jwt}`
      }
    })
    return data
  }
)

export const orderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {},
  extraReducers: {
    [placeOrder.pending.type]: (state) => {
      state.loading = true
    },
    [placeOrder.fulfilled.type]: (state, action) => {
      state.currentOrder = action.payload
      state.loading = false
      state.error = null
    },
    [placeOrder.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    },
    [checkout.pending.type]: (state) => {
      state.loading = true
    },
    [checkout.fulfilled.type]: (state, action) => {
      state.currentOrder = action.payload
      state.loading = false
      state.error = null
    },
    [checkout.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    }
  }
})