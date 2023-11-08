import React from 'react'
import ReactDOM, {
  createRoot,
} from 'react-dom/client'
import './styles/css/index.css'
import App from './App'
const root = ReactDOM.createRoot(
  document.getElementById('root')
)
root.render(
 <App />
)

const link = `https://api.rawg.io/api/games?key=4e52d5704d8d4c5eab34ba05fe121eb7`