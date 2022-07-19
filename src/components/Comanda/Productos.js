import React, { useEffect, useContext } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material'
import Producto from './Producto'
import Context from '../../helpers/Context';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const Productos = ({ clear, setClear, setTotal, setCantidadEmpanadas, productos, setProductos }) => {
  // const [pedido, setPedido] = useState({});
  const Empanadas = ["Árabes", "Albahaca", "Ananá", "Calabresa", "Carne Picante", "Carne Suave", "Cebolla", "Champignones", "Criolla Dulce", "Criolla Salada", "Gallega", "Humita", "Jamón y Queso", "Palmitos", "Panceta y Ciruela", "Pera", "Pollo", "Pollo Picante", "Puerro", "Roquefort y Apio", "Verdura", "Zapallito"];
  const Sandwichs = ["Lomo Carne", "Lomo Pollo", "Hamburguesa Clásica", "Hamburguesa Americana", "Hamburguesa Veggie"]

  const { precioCarta } = useContext(Context)

  useEffect(() => {
    //Recorrer pedido y multiplicar cada unidad de producto x 150, luego sumar todos los valores y usar setTotal
    let total = 0;
    let cantidad = 0;
    productos.forEach(producto => {
      if(producto.tipoProducto === "empanada"){
        total += producto.cantidad * precioCarta.empanadas
        cantidad += producto.cantidad

      }else if(producto.tipoProducto === "sandwich"){
        if(producto.name==="Lomo Carne"){
          total += producto.cantidad * precioCarta.lomoCarne
        }
        if(producto.name==="Lomo Pollo"){
          total += producto.cantidad * precioCarta.lomoPollo
        }
        if(producto.name==="Hamburguesa Clásica"){
          total += producto.cantidad * precioCarta.hamburguesaClasica
        }
        if(producto.name==="Hamburguesa Americana"){
          total += producto.cantidad * precioCarta.hamburguesaAmericana
        }
        if(producto.name==="Hamburguesa Veggie"){
          total += producto.cantidad * precioCarta.hamburguesaVeggie
        }
      }
    })
    setTotal(total);
    setCantidadEmpanadas(cantidad);
    setProductos(productos);

  }, [precioCarta.empanadas, precioCarta.hamburguesaAmericana, precioCarta.hamburguesaClasica, precioCarta.hamburguesaVeggie, precioCarta.lomoCarne, precioCarta.lomoPollo, productos, setCantidadEmpanadas, setProductos, setTotal])

  const limpiarProductos = () => {
    if (productos.length === 0) {
      setTotal(0);
      setCantidadEmpanadas(0);
    }
  }
  return (
    <>
      <Typography sx={{ mt: 2 }} variant="h6" gutterBottom>
        Productos
      </Typography>
      <Grid container spacing={3}>
        {Empanadas.map((empanada) => (
          <Producto limpiarProductos={limpiarProductos} setClear={setClear} clear={clear} tipoProducto={"empanada"} key={empanada} name={empanada} productos={productos} setProductos={setProductos} />
        ))
        }


      </Grid>
      <Accordion sx={{ mt: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Sandwichs</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            {Sandwichs.map((sandwich) => (
              <Producto limpiarProductos={limpiarProductos} setClear={setClear} clear={clear} tipoProducto={"sandwich"} key={sandwich} name={sandwich} productos={productos} setProductos={setProductos} />
            ))
            }
          </Grid>
        </AccordionDetails>
      </Accordion>
      {/* <Accordion sx={{mt:2}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Sandwichs</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            {Sandwichs.map((sandwich) => (
              <Producto setClear={setClear} clear={clear} tipoProducto={""} key={sandwich} name={sandwich} productos={productos} setProductos={setProductos} />
            ))
            }
          </Grid>
        </AccordionDetails>
      </Accordion> */}
    </>
  )
}

export default Productos