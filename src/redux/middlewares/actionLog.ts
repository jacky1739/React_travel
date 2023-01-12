import { Middleware } from "redux"
export const actionLog: Middleware = (store) => (next) => (action) => {
  console.log("state 當前", store.getState())
  // 被攔截的對象
  console.log("fire action", action)
  next(action)
  console.log("state 更新", store.getState())
}