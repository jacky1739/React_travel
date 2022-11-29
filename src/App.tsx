import React from 'react'
import styles from './App.module.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import { HomePage, SignInPage, RegisterPage, DetailPage } from './pages'

const App: React.FC = () => {

  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* 新的element屬性可以允許傳入元件 */} 
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/detail/:touristRouteId" element={<DetailPage />} />
          <Route path="*" element={<h1>404 not found 頁面去火星了</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
