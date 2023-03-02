import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'antd/dist/antd.min.css';
import './i18n/configs'

import { Provider } from 'react-redux'
import rootStore from './redux/store'

import axios from 'axios'
// 這像普通的元件一樣 可直接在jsx中使用
import { PersistGate } from 'redux-persist/integration/react'

axios.defaults.headers['x-icode'] = 'BD4EE4AC835DB9CD'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    {/* 將store傳入 */}
    <Provider store={rootStore.store}>
      <PersistGate loading={null} persistor={rootStore.persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
