import React, { useEffect } from 'react'
import styles from './App.module.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import { HomePage, SignInPage, RegisterPage, DetailPage, SearchPage, ShoppingCartPage } from './pages'
import { Navigate } from 'react-router-dom'
import { useSelector, useAppDispatch } from './redux/hooks'
import { getShoppingCart } from './redux/shoppingCart/slice'

// 使用函數式元件的方式來創建私有路由
const PrivateRoute = ({ children }) => {
  const jwt = useSelector(state => state.user.token)
  return jwt ? children : <Navigate to="/signin" />
}

const App: React.FC = () => {
  const jwt = useSelector(state => state.user.token)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (jwt) {
      dispatch(getShoppingCart(jwt))
    }
  }, [jwt])

  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* 新的element屬性可以允許傳入元件 */} 
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/detail/:touristRouteId" element={<DetailPage />} />
          <Route path="/search/:keywords" element={<SearchPage />} />
          <Route path="/shoppingCart"
            element={
              <PrivateRoute>
                <ShoppingCartPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<h1>404 not found 頁面去火星了</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
