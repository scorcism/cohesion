import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App.tsx'
import { AppProvider } from './context/provider/AppContentProvider.tsx'
import { ConversationContextProvider } from './context/provider/ConversationContextProvider.tsx'
import { ThemeProvider } from './context/provider/ThemeProvider.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='cohesion-app-theme'>
      <AppProvider>
        <BrowserRouter>
          <ConversationContextProvider>
            <App />
          </ConversationContextProvider>
        </BrowserRouter>
      </AppProvider>
    </ThemeProvider>
  </StrictMode>,
)
