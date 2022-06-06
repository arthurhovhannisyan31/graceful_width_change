import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'

import './styles/normalize.css'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

const renderApp = (): void => {
  root.render(<App />)
}

renderApp()
