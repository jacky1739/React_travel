// 路由擴展 如何讓Router支援class component
import { useNavigate, NavigateFunction } from 'react-router-dom'

// 路由的props的typescript定義
export interface RouteComponentProps {
  navigate: NavigateFunction
}

export const withRouter = (Component) => {
  // Wrapper 是函數式元件 因此就可以使用react-router-dom的hook
  const Wrapper = (props) => {
    let navigate = useNavigate()
    return <Component navigate={navigate} {...props} />
  }
  return Wrapper
}