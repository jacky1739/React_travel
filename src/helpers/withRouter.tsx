import { useNavigate, NavigateFunction } from 'react-router-dom'

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