import { StrictMode } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { createRoot } from 'react-dom/client'
import LoginPage from './features/auth/login/login'
import RegisterPage from './features/auth/register/regsiterPage'
import { MisEventos } from './features/dasboard/Mis-Eventos'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <Registrar />
  // </StrictMode>,
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage></LoginPage>}></Route>
      <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
      <Route path="/mis-eventos/:id" element={<MisEventos></MisEventos>}></Route>
    </Routes>
  </BrowserRouter>
)
