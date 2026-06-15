// nova-tourism/src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// @ts-ignore: side-effect CSS import without declarations
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)