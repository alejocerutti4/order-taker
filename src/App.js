import React, { useState, useEffect } from 'react'
import Copyright from './components/Copyright.js'
import Navbar from './components/Navbar.js'
import ProtectedRoute from './components/Redirect/ProtectedRoute.js'
import HomeRedirect from './components/Redirect/HomeRedirect.js'
import Home from './pages/home.js'
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import AdministracionProductos from './pages/administracion_productos.js'
import Promociones from './pages/promociones.js'
import { PrecioPromocionesContext } from './helpers/Context.js'
import { tablaPromociones } from './utils/TablaProductos.js'
import './App.css';
import Login from './pages/login.js';

const App = () => {

  const [precioPromociones, setPrecioPromociones] = useState(tablaPromociones);
  const [isLogged, setIsLogged] = useState(false);
  const promos = { precioPromociones, setPrecioPromociones }

  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("email")) {
      setIsLogged(true);
    }else{
      setIsLogged(false);
    }
  })

 

  return (
    <PrecioPromocionesContext.Provider value={promos}>
        <BrowserRouter>
          <div className="App">
            {isLogged && <Navbar /> }
            <Routes>
              <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/administracion-productos" element={<ProtectedRoute><AdministracionProductos /></ProtectedRoute>} />
              <Route path="/promociones" element={<ProtectedRoute><Promociones /></ProtectedRoute>} />
              <Route path="/login" element={<HomeRedirect><Login/></HomeRedirect>} />
              <Route path="/" element={<HomeRedirect><Login/></HomeRedirect>} />
              <Route path="*" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            </Routes>
            {isLogged && <Copyright />}
          </div>
        </BrowserRouter >
    </PrecioPromocionesContext.Provider>
  )
}

export default App







