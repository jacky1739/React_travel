import React from 'react'
import styles from './App.module.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import { HomePage } from './pages'

const App: React.FC = () => {

  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* 新的element屬性可以允許傳入元件 */} 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
