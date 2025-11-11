import { useEffect } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import NotFound from './components/NotFound/NotFound'
import EventList from './components/EventosList/EventList.jsx'
import NavBar from './components/Navbar/NavBar.jsx'
import DetailsEvent from './components/EventDetails/DetailsEvent.jsx'
import Compras from './components/Compras/Compras.jsx'
import DetailsBoleta from './components/DetailsBoleta/DetailsBoleta.jsx'
import "./App.css"

function App() {
  
  useEffect(() => {
    localStorage.setItem("usuario", JSON.stringify({ id: 456, nombre: "Ricardo" }));
  }, []);

  
  return (
    <>
      <Router>
        <NavBar></NavBar>
        <Routes>
          <Route path='*' element={<NotFound/>} />
          <Route path='/' element={<EventList/>} />
          <Route path='/login' element={<h1>login</h1>} />
          <Route path='/compras' element={<Compras/>} />
          <Route path='/Evento/:id' element={<DetailsEvent/>} />
          <Route path='/Boleta/:id' element={<DetailsBoleta/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
