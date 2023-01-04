interface RecommencProductsState {
  productList: any[]
  loading: boolean
  error: string | null
}

const defaultState: RecommencProductsState = {
  loading: true,
  error: null,
  productList: []
}

export default (state = defaultState, action) => {
  return state
}
