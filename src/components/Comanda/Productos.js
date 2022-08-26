import React, { useEffect, useContext, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from "@mui/material";
import Producto from "./Producto";
import { PrecioPromocionesContext } from "../../helpers/Context";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import { styled } from "@mui/system";
import { getAllProductos } from "../../services/api";
import { useNavigate } from "react-router-dom";
import Loader  from "../Loader";
import { LogueadoContext } from "../../helpers/Context";
import { ordenarSandwichs, ordenarPizzas, ordenarBebidas } from "../../helpers/OrdenarProductos";
const Icon = styled("img")({
  height: "30px",
  width: "30px",
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
  const Empanadas = [
    "Árabes",
    "Albahaca",
    "Ananá",
    "Calabresa",
    "Carne Picante",
    "Carne Suave",
    "Cebolla",
    "Champignones",
    "Criolla Dulce",
    "Criolla Salada",
    "Gallega",
    "Humita",
    "Jamón y Queso",
    "Palmitos",
    "Panceta y Ciruela",
    "Pera",
    "Pollo",
    "Pollo Picante",
    "Puerro",
    "Roquefort y Apio",
    "Verdura",
    "Zapallito",
  ];

  const [precioCarta, setPrecioCarta] = useState([]);
  const [Sandwichs, setSandwichs] = useState([]);
  const [Pizzas, setPizzas] = useState([]);
  const [Bebidas, setBebidas] = useState([]);
  const [precioEmpanada, setPrecioEmpanada] = useState(0);
  const [precioDocena, setPrecioDocena] = useState(0);
  const [loading, setLoading] = useState(true);
  const { setIsLogged } = useContext(LogueadoContext);

  const { precioPromociones } = useContext(PrecioPromocionesContext);
  const navigate = useNavigate();

  const getProductos = async () => {
    try {
      const productos = await getAllProductos();
      setPrecioCarta(productos);
      setIsLogged(true);
      const sandwichs = productos.filter((precio) => precio.tipo === "sandwich").map((precio) => precio.name)
      setSandwichs(
        ordenarSandwichs(sandwichs)
      );
      const pizzas = productos.filter((precio) => precio.tipo === "pizza").map((precio) => precio.name)
      setPizzas(
        ordenarPizzas(pizzas)
      );
      const bebidas = productos.filter((precio) => precio.tipo === "bebida").map((precio) => precio.name)
      setBebidas(
        ordenarBebidas(bebidas)
      );
      setPrecioEmpanada(
        productos.find(
          (p) =>
            p.name.toUpperCase().trim() === "Empanadas".toUpperCase().trim()
        ).costo
      );
      setPrecioDocena(
        precioPromociones.find(
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
                    <Typography>Bebidas</Typography>
                    <SportsBarIcon />
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={3}>
                    {Bebidas.map((bebida) => (
                      <Producto
                        deleteSubtotal={deleteSubtotal}
                        limpiarProductos={limpiarProductos}
                        setClear={setClear}
                        clear={clear}
                        tipoProducto={"bebida"}
                        key={bebida}
                        name={bebida}
                        productos={productos}
                        setProductos={setProductos}
                      />
                    ))}
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
