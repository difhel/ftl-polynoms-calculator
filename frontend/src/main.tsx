import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ConfigProvider } from '@nacteam/sdfui'
import { ConfigProvider as MyConfigProvider } from './components'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider>
      <MyConfigProvider>
        <App />
      </MyConfigProvider>
    </ConfigProvider>
  </React.StrictMode>,
)
