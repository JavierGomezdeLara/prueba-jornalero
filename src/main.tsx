import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Laborer from './Laborers.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Laborer />
  </StrictMode>,
)
