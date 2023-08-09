import React, { useEffect, useContext, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from "@mui/material";
import Producto from "./Producto";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import WineBarIcon from '@mui/icons-material/WineBar';

import { styled } from "@mui/system";
import { getAllProductos } from "../../services/api";
import { useNavigate } from "react-router-dom";
import Loader  from "../Loader";
import { LogueadoContext } from "../../helpers/Context";
import { ordenarSandwichs, ordenarPizzas, ordenarBebidas, ordenarEmpanadas } from "../../helpers/OrdenarProductos";
const Icon = styled("img")({
  height: "30px",
  width: "30px",
  display: "block",
});

const Icon2 = styled("img")({
  height: "25px",
  width: "25px",
  display: "block",
});

const Productos = ({
  subTotal,
  setSubTotal,
  clear,
  setClear,
  setTotal,
  setCantidadEmpanadas,
  productos,
  setProductos,
}) => {
  

  const [precioCarta, setPrecioCarta] = useState([]);
  const [Sandwichs, setSandwichs] = useState([]);
  const [Pizzas, setPizzas] = useState([]);
  const [Empanadas, setEmpanadas] = useState([]);
  const [Gaseosas, setGaseosas] = useState([]);
  const [Cervezas, setCervezas] = useState([]);
  const [Vinos, setVinos] = useState();
  const [precioEmpanada, setPrecioEmpanada] = useState(0);
  const [precioDocena, setPrecioDocena] = useState(0);
  const [loading, setLoading] = useState(true);
  const { setIsLogged } = useContext(LogueadoContext);


  const navigate = useNavigate();

  const getProductos = async () => {
    try {
      const productos = await getAllProductos();
      setPrecioCarta(productos);
      setIsLogged(true);
      const sandwichs = productos.filter((precio) => precio.tipo === "sandwich").map((precio) => precio.name);
      setSandwichs(
        ordenarSandwichs(sandwichs)
      );
      const pizzas = productos.filter((precio) => precio.tipo === "pizza").map((precio) => precio.name);
      setPizzas(
        ordenarPizzas(pizzas)
      );
      const gaseosas = productos.filter(precio => precio.tipo === "gaseosa").map(precio => precio.name);
      setGaseosas(
        gaseosas
      );
      const cervezas = productos.filter(precio => precio.tipo === "cerveza").map(precio => precio.name);
      setCervezas(
        cervezas
      );
      const vinos = productos.filter(precio => precio.tipo === "vino").map(precio => precio.name);
      setVinos(
        vinos
      );

      const empanadas = productos.filter((precio) => precio.tipo === "empanada").map((precio) => precio.name);
      setEmpanadas(
        ordenarEmpanadas(empanadas)
      );



      setPrecioEmpanada(
        productos.find(
          (p) =>
            p.tipo.toUpperCase().trim() === "empanada_precio".toUpperCase().trim()
        ).costo
      );
      const promos = productos.filter((prod) => prod.tipo === "promocion");
      setPrecioDocena(
        promos.find(
          (p) => p.name.toUpperCase().trim() === "Docena".toUpperCase().trim()
        ).costo
      );
    } catch (e) {
      console.log(e);
      if (e.response?.status === 401) {
        localStorage.removeItem("email");
        localStorage.removeItem("token");
        setIsLogged(false);
        navigate("/");
      }
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductos();
  }, []);
  useEffect(() => {
    let total = 0;
    let totalEmpanadas = 0;
    let totalOtros = 0;
    let cantidad = 0;
    productos.forEach((producto) => {
      if (producto.tipoProducto === "empanada") {
        cantidad += producto.cantidad;
        updateSubtotal(
          producto.cantidad,
          producto.name,
          producto.cantidad * precioEmpanada
        );
      } else {
        const precio = precioCarta.find(
          (p) =>
            p.name.toUpperCase().trim() === producto.name.toUpperCase().trim()
        ).costo;
        const costo = producto.cantidad * precio;
        totalOtros += costo;
        updateSubtotal(producto.cantidad, producto.name, costo);
      }
    });

    if (cantidad >= 12) {
      const docenas = Math.floor(cantidad / 12);
      const sobrante = cantidad - docenas * 12;
      totalEmpanadas = docenas * precioDocena + sobrante * precioEmpanada;
    } else {
      totalEmpanadas = cantidad * precioEmpanada;
    }
    total = totalEmpanadas + totalOtros;
    setTotal(total);
    setCantidadEmpanadas(cantidad);
    setProductos(productos);
  }, [productos]);

  const limpiarProductos = () => {
    if (productos.length === 0) {
      setTotal(0);
      setCantidadEmpanadas(0);
    }
  };

  const updateSubtotal = (cantidad, name, costo) => {
    // We got to find the producto in the subTotal array and update "costo" with the value we have in the parameters, otherwise, we have to create it
    let objectIndex = subTotal.findIndex((obj) => obj.name === name);
    if (objectIndex === -1) {
      setSubTotal([
        ...subTotal,
        { name: name, cantidad: cantidad, costo: costo },
      ]);
    } else {
      subTotal[objectIndex].costo = costo;
      subTotal[objectIndex].cantidad = cantidad;
      setSubTotal([...subTotal]);
    }
  };

  const deleteSubtotal = (name) => {
    let objectIndex = subTotal.findIndex((obj) => obj.name === name);
    if (objectIndex !== -1) {
      subTotal.splice(objectIndex, 1);
      setSubTotal([...subTotal]);
    }
  };
  return (
    <>
      {loading ? (<Loader/>):(
        <>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ mt: 2 }} variant="h6" gutterBottom>
              Empanadas
            </Typography>
            <Icon sx={{ marginTop: "6px" }} src="./empanada.png" alt="icon" />
          </div>
          <Grid container spacing={3}>
            {Empanadas.map((empanada) => (
              <Producto
                deleteSubtotal={deleteSubtotal}
                limpiarProductos={limpiarProductos}
                setClear={setClear}
                clear={clear}
                tipoProducto={"empanada"}
                key={empanada}
                name={empanada}
                productos={productos}
                setProductos={setProductos}
              />
            ))}
          </Grid>
          {!loading && (
            <>
              <Accordion sx={{ mt: 2 }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography>Sandwichs</Typography>
                    <LunchDiningIcon />
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={3}>
                    {Sandwichs.map((sandwich) => (
                      <Producto
                        deleteSubtotal={deleteSubtotal}
                        limpiarProductos={limpiarProductos}
                        setClear={setClear}
                        clear={clear}
                        tipoProducto={"sandwich"}
                        key={sandwich}
                        name={sandwich}
                        productos={productos}
                        setProductos={setProductos}
                      />
                    ))}
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion sx={{ mt: 2 }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography>Pizzas</Typography>
                    <LocalPizzaIcon />
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={3}>
                    {Pizzas.map((pizza) => (
                      <Producto
                        deleteSubtotal={deleteSubtotal}
                        limpiarProductos={limpiarProductos}
                        setClear={setClear}
                        clear={clear}
                        tipoProducto={"pizza"}
                        key={pizza}
                        name={pizza}
                        productos={productos}
                        setProductos={setProductos}
                      />
                    ))}
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion sx={{ mt: 2 }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography>Gaseosas</Typography>
                    <Icon2 sx={{ marginTop: "2px", marginLeft: "2px" }} src="./gaseosa.png" alt="icon" />
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={3}>
                  {
                      Gaseosas.map(gaseosa => {
                          return( 
                            <Producto
                            deleteSubtotal={deleteSubtotal}
                            limpiarProductos={limpiarProductos}
                            setClear={setClear}
                            clear={clear}
                            tipoProducto={"gaseosa"}
                            key={gaseosa}
                            name={gaseosa}
                            productos={productos}
                            setProductos={setProductos}
                          />
                          )
                      })
                    }
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion sx={{ mt: 2 }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography>Cervezas</Typography>
                    <SportsBarIcon />
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={3}>
                  {
                      Cervezas.map(cerveza => {
                          return( 
                            <Producto
                            deleteSubtotal={deleteSubtotal}
                            limpiarProductos={limpiarProductos}
                            setClear={setClear}
                            clear={clear}
                            tipoProducto={"cerveza"}
                            key={cerveza}
                            name={cerveza}
                            productos={productos}
                            setProductos={setProductos}
                          />
                          )
                        }
                      )
                    }
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion sx={{ mt: 2 }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography>Vinos</Typography>
                    <WineBarIcon />
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={3}>
                    {
                      Vinos.map(vino => {
                          return( 
                            <Producto
                            deleteSubtotal={deleteSubtotal}
                            limpiarProductos={limpiarProductos}
                            setClear={setClear}
                            clear={clear}
                            tipoProducto={"vino"}
                            key={vino}
                            name={vino}
                            productos={productos}
                            setProductos={setProductos}
                          />
                          )
                        
                      })
                    }
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Productos;
