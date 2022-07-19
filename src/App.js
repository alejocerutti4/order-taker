import React from 'react'
import Copyright from './components/Copyright.js'
import Navbar from './components/Navbar.js'
import Home from './pages/home.js'
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import AdministracionProductos from './pages/administracion_productos.js'
import Context from './helpers/Context.js'
const App = () => {

  const [precioCarta, setPrecioCarta] = React.useState({
    empanadas: 190,
    lomoCarne: 1000,
    lomoPollo: 900,
    hamburguesaAmericana: 800,
    hamburguesaVeggie: 900,
    hamburguesaClasica: 800,
    pizza: 1000
  });
  const value = { precioCarta, setPrecioCarta }
  return (
    <Context.Provider value={value}>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/administracion-productos" element={<AdministracionProductos />} />
            <Route path="*" element={<Home />} />
          </Routes>
          <Copyright />

        </div>
      </BrowserRouter >
    </Context.Provider>
  )
}

export default App







