import React from 'react'
import Copyright from './components/Copyright.js'
import Navbar from './components/Navbar.js'
import Home from './pages/home.js'
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import AdministracionProductos from './pages/administracion_productos.js'
import Context from './helpers/Context.js'
import './App.css';
const App = () => {

  const [precioCarta, setPrecioCarta] = React.useState({
    empanadas: 150,
    lomoCarne: 1000,
    lomoPollo: 900,
    hamburguesaAmericana: 800,
    hamburguesaVeggie: 800,
    hamburguesaClasica: 800,
    sandwichMilanesa: 900,
    milanesa: 700,
    milanesaNapolitana: 1100,
    mozzarella: 900,
    mozzarella_media: 500,
    mozzarellaDoble: 1100,
    mozzarellaDoble_media: 600,
    mozzarellaConHuevo: 1200,
    mozzarellaConHuevo_media: 650,
    mozzarellaSuper: 1200,
    mozzarellaSuper_media: 650,
    fugazzeta: 1200,
    fugazzeta_media: 650,
    napolitana: 1200,
    napolitana_media: 650,
    jamonEspecial: 1200,
    jamonEspecial_media: 650,
    roquefort: 1200,
    roquefort_media: 600,
    tresQuesos: 1200,
    tresQuesos_media: 650,
    anana: 1300,
    anana_media: 700,
    palmitos: 1300,
    palmitos_media: 700,
    champignon: 1300,
    champignon_media: 700,
    calabresa: 1400,
    calabresa_media: 750,
    panceta: 1400,
    panceta_media: 750


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







