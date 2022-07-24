import React, { useState } from 'react'
import Copyright from './components/Copyright.js'
import Navbar from './components/Navbar.js'
import Home from './pages/home.js'
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import AdministracionProductos from './pages/administracion_productos.js'
import Promociones from './pages/promociones.js'
import { PrecioCartaContext, PrecioPromocionesContext } from './helpers/Context.js'
import { tablaProductos, tablaPromociones } from './utils/TablaProductos.js'
import './App.css';

const App = () => {

  const [precioCarta, setPrecioCarta] = useState(tablaProductos);
  const [precioPromociones, setPrecioPromociones] = useState(tablaPromociones);

  const carta = { precioCarta, setPrecioCarta }
  const promos = { precioPromociones, setPrecioPromociones }
  return (
    <PrecioPromocionesContext.Provider value={promos}>
      <PrecioCartaContext.Provider value={carta}>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/administracion-productos" element={<AdministracionProductos />} />
              <Route path="/promociones" element={<Promociones />} />
              <Route path="*" element={<Home />} />
            </Routes>
            <Copyright />
          </div>
        </BrowserRouter >
      </PrecioCartaContext.Provider>
    </PrecioPromocionesContext.Provider>
  )
}

export default App







