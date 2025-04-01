import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './App.css'
import MainRouter from './routes.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <MainRouter />
  </BrowserRouter>,
)
