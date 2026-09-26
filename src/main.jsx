import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BusinessIdeaProvider } from './context/BusinessIdeaContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BusinessIdeaProvider>
      <App />
    </BusinessIdeaProvider>
  </StrictMode>,
)

