import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { WalletProvider } from './hooks/WalletProvider.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
<WalletProvider>
  <BrowserRouter>
  <App/>
  </BrowserRouter>
</WalletProvider>,
)
