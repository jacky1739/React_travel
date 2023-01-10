import { ThunkAction } from 'redux-thunk'
import { RootState } from '../store'
import axios from 'axios'

export const FETCH_RECOMMEND_PRODUCTS_START = "FETCH_RECOMMEND_PRODUCTS_START" 
// 正在調用推薦信息api

export const FETCH_RECOMMEND_PRODUCTS_SUCCESS = "FETCH_RECOMMEND_PRODUCTS_SUCCESS"
// 推薦訊息api調用成功

export const FETCH_RECOMMEND_PRODUCTS_FAIL = "FETCH_RECOMMEND_PRODUCTS_FAIL"
// 推薦訊息api調用失敗

interface FetchRecommendProductStartAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_START
}

interface FetchRecommendProductSuccessAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS
  payload: any
}

interface FetchRecommendProductFailAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_FAIL,
  payload: any
}

export type RecommendProductActioin = FetchRecommendProductStartAction | FetchRecommendProductSuccessAction | FetchRecommendProductFailAction

export const fetchRecommendProductStartActionCreator = (): RecommendProductActioin => {
  return {
    type: FETCH_RECOMMEND_PRODUCTS_START
  }
}

export const fetchRecommendProductSuccessActionCreator = (data): RecommendProductActioin => {
  return {
    type: FETCH_RECOMMEND_PRODUCTS_SUCCESS,
    payload: data
  }
}

export const fetchRecommendProductFailActionCreator = (error): RecommendProductActioin => {
  return {
    type: FETCH_RECOMMEND_PRODUCTS_FAIL,
    payload: error
  }
}

export const initRecommendProductDataActionCreator = () : ThunkAction<void, RootState, unknown, RecommendProductActioin> => async(dispatch, getState) => {
  dispatch(fetchRecommendProductStartActionCreator())
  try {
    const { data } = await axios.get("http://123.56.149.216:8080/api/productCollections", {
      headers: {
        "x-icode": "DA4BF817D6402BC7"
      }
    })
    dispatch(fetchRecommendProductSuccessActionCreator(data))
  } catch (error) {
    if (error instanceof Error) {
      dispatch(fetchRecommendProductFailActionCreator(error.message))
    }
  }
}
