import React, { useEffect, useContext } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material'
import Producto from './Producto'
import Context from '../../helpers/Context';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const Productos = ({ subTotal, setSubTotal, clear, setClear, setTotal, setCantidadEmpanadas, productos, setProductos }) => {
  // const [pedido, setPedido] = useState({});
  const Empanadas = ["Árabes", "Albahaca", "Ananá", "Calabresa", "Carne Picante", "Carne Suave", "Cebolla", "Champignones", "Criolla Dulce", "Criolla Salada", "Gallega", "Humita", "Jamón y Queso", "Palmitos", "Panceta y Ciruela", "Pera", "Pollo", "Pollo Picante", "Puerro", "Roquefort y Apio", "Verdura", "Zapallito"];
  const Sandwichs = ["Lomo Carne", "Lomo Pollo", "Hambur. Clásica", "Hambur. Americana", "Hambur. Veggie", "Sandwich Milanesa", "Milanesa", "Milanesa Napolitana"];
  const Pizzas = ["Mozzarella ", "Mozzarella Media", "Mozzarella Doble", "Mozzarella Doble Media", "Mozzarella Con Huevo", "Mozzarella Con Huevo Media", "Mozzarella Super", "Mozzarella Super Media", "Fugazzeta", "Fugazzeta Media", "Napolitana", "Napolitana Media", "Jamon Especial", "Jamon Especial Media", "Roquefort", "Roquefort Media", "Tres Quesos", "Tres Quesos Media", "Ananá", "Ananá Media", "Palmitos", "Palmitos Media", "Champignon", "Champignon Media", "Calabresa", "Calabresa Media", "Panceta", "Panceta Media"]
  const { precioCarta } = useContext(Context)

  useEffect(() => {
    let total = 0;
    let cantidad = 0;
    productos.forEach(producto => {
      if (producto.tipoProducto === "empanada") {
        const costo = producto.cantidad * precioCarta.empanadas;
        total += costo;
        cantidad += producto.cantidad
        updateSubtotal(producto.cantidad, producto.name, costo)

      } else if (producto.tipoProducto === "sandwich") {
        if (producto.name === "Lomo Carne") {
          const costo = producto.cantidad * precioCarta.lomoCarne;
          total += costo;
          updateSubtotal(producto.cantidad, producto.name, costo)
        }
        if (producto.name === "Lomo Pollo") {
          const costo = producto.cantidad * precioCarta.lomoPollo;
          total += costo;
          updateSubtotal(producto.cantidad, producto.name, costo)
        }
        if (producto.name === "Hambur. Clásica") {
          const costo = producto.cantidad * precioCarta.hamburguesaClasica;
          total += costo;
          updateSubtotal(producto.cantidad, producto.name, costo)
        }
        if (producto.name === "Hambur. Americana") {
          const costo = producto.cantidad * precioCarta.hamburguesaAmericana;
          total += costo;
          updateSubtotal(producto.cantidad, producto.name, costo)
        }
        if (producto.name === "Hambur. Veggie") {
          const costo = producto.cantidad * precioCarta.hamburguesaVeggie;
          total += costo;
          updateSubtotal(producto.cantidad, producto.name, costo)
        }
        if (producto.name === "Sandwich Milanesa") {
          const costo = producto.cantidad * precioCarta.sandwichMilanesa;
          total += costo;
          updateSubtotal(producto.cantidad, producto.name, costo)
        }
        if (producto.name === "Milanesa") {
          const costo = producto.cantidad * precioCarta.milanesa;
          total += costo;
          updateSubtotal(producto.cantidad, producto.name, costo)
        }
        if (producto.name === "Milanesa Napolitana") {
          const costo = producto.cantidad * precioCarta.milanesaNapolitana;
          total += costo;
          updateSubtotal(producto.cantidad, producto.name, costo)
        }
      } else if (producto.tipoProducto === "pizza") {
        if (producto.name === "Mozzarella ") {
          const costo = producto.cantidad * precioCarta.mozzarella;
          total += costo;
          updateSubtotal(producto.cantidad, producto.name, costo)
        }
        if (producto.name === "Mozzarella Media") {
          const costo = producto.cantidad * precioCarta.mozzarella_media;
          total += costo;
          updateSubtotal(producto.cantidad, producto.name, costo)
        }
        if (producto.name === "Mozzarella Doble") {
          const costo = producto.cantidad * precioCarta.mozzarellaDoble;
          total += costo;
          updateSubtotal(producto.cantidad, producto.name, costo)
        }
        if (producto.name === "Mozzarella Doble Media") {
          const costo = producto.cantidad * precioCarta.mozzarellaDoble_media;
          total += costo;
          updateSubtotal(producto.cantidad, producto.name, costo)
        }
        if (producto.name === "Mozzarella Con Huevo") {
          const costo = producto.cantidad * precioCarta.mozzarellaConHuevo;
          total += costo;
          updateSubtotal(producto.cantidad, producto.name, costo)
        }
        if (producto.name === "Mozzarella Con Huevo Media") {
          const costo = producto.cantidad * precioCarta.mozzarellaConHuevo_media;
          total += costo;
          updateSubtotal(producto.cantidad, producto.name, costo)
        }
        if (producto.name === "Mozzarella Super") {
          const costo = producto.cantidad * precioCarta.mozzarellaSuper;
          total += costo;
          updateSubtotal(producto.cantidad, producto.name, costo)
        }
        if (producto.name === "Mozzarella Super Media") {
          const costo = producto.cantidad * precioCarta.mozzarellaSuper_media;
          total += costo;
          updateSubtotal(producto.cantidad, producto.name, costo)
        }
        if (producto.name === "Fugazzeta") {
          const costo = producto.cantidad * precioCarta.fugazzeta;
          total += costo;
          updateSubtotal(producto.cantidad, producto.name, costo)
        }
        if (producto.name === "Fugazzeta Media") {
          const costo = producto.cantidad * precioCarta.fugazzeta_media;
          total += costo;
          updateSubtotal(producto.cantidad, producto.name, costo)
        }
        if (producto.name === "Napolitana") {
          const costo = producto.cantidad * precioCarta.napolitana;
          total += costo;
          updateSubtotal(producto.cantidad, producto.name, costo)
        }
        if (producto.name === "Napolitana Media") {
          const costo = producto.cantidad * precioCarta.napolitana_media;
          total += costo;
          updateSubtotal(producto.cantidad, producto.name, costo)
        }
        if (producto.name === "Jamon Especial") {
          const costo = producto.cantidad * precioCarta.jamonEspecial;
          total += costo;
          updateSubtotal(producto.cantidad, producto.name, costo)
        }
        if (producto.name === "Jamon Especial Media") {
          const costo = producto.cantidad * precioCarta.jamonEspecial_media;
          total += costo;
          updateSubtotal(producto.cantidad, producto.name, costo)
        }
        if (producto.name === "Roquefort") {
          const costo = producto.cantidad * precioCarta.roquefort;
          total += costo;
          updateSubtotal(producto.cantidad, producto.name, costo)
        }
        if (producto.name === "Roquefort Media") {
          const costo = producto.cantidad * precioCarta.roquefort_media;
          total += costo;
          updateSubtotal(producto.cantidad, producto.name, costo)
        }
        if (producto.name === "Tres Quesos") {
          const costo = producto.cantidad * precioCarta.tresQuesos;
          total += costo;
          updateSubtotal(producto.cantidad, producto.name, costo)
        }
        if (producto.name === "Tres Quesos Media") {
          const costo = producto.cantidad * precioCarta.tresQuesos_media;
          total += costo;
          updateSubtotal(producto.cantidad, producto.name, costo)
        }
        if (producto.name === "Ananá") {
          const costo = producto.cantidad * precioCarta.anana;
          total += costo;
          updateSubtotal(producto.cantidad, producto.name, costo)
        }
        if (producto.name === "Ananá Media") {
          const costo = producto.cantidad * precioCarta.anana_media;
          total += costo;
          updateSubtotal(producto.cantidad, producto.name, costo)
        }
        if (producto.name === "Palmitos") {
          const costo = producto.cantidad * precioCarta.palmitos;
          total += costo;
          updateSubtotal(producto.cantidad, producto.name, costo)
        }
        if (producto.name === "Palmitos Media") {
          const costo = producto.cantidad * precioCarta.palmitos_media;
          total += costo;
          updateSubtotal(producto.cantidad, producto.name, costo)
        }
        if (producto.name === "Champignon") {
          const costo = producto.cantidad * precioCarta.champignon;
          total += costo;
          updateSubtotal(producto.cantidad, producto.name, costo)
        }
        if (producto.name === "Champignon Media") {
          const costo = producto.cantidad * precioCarta.champignon_media;
          total += costo;
          updateSubtotal(producto.cantidad, producto.name, costo)
        }
        if (producto.name === "Calabresa") {
          const costo = producto.cantidad * precioCarta.calabresa;
          total += costo;
          updateSubtotal(producto.cantidad, producto.name, costo)
        }
        if (producto.name === "Calabresa Media") {
          const costo = producto.cantidad * precioCarta.calabresa_media;
          total += costo;
          updateSubtotal(producto.cantidad, producto.name, costo)
        }
        if (producto.name === "Panceta") {
          const costo = producto.cantidad * precioCarta.panceta;
          total += costo;
          updateSubtotal(producto.cantidad, producto.name, costo)
        }
        if (producto.name === "Panceta Media") {
          const costo = producto.cantidad * precioCarta.panceta_media;
          total += costo;
          updateSubtotal(producto.cantidad, producto.name, costo)
        }
      }
    })
    setTotal(total);
    setCantidadEmpanadas(cantidad);
    setProductos(productos);

  }, [productos])

  const limpiarProductos = () => {
    if (productos.length === 0) {
      setTotal(0);
      setCantidadEmpanadas(0);
    }
  }

  const updateSubtotal = (cantidad, name, costo) => {
    // We got to find the producto in the subTotal array and update "costo" with the value we have in the parameters, otherwise, we have to create it
    let objectIndex = subTotal.findIndex((obj => obj.name === name));
        if(objectIndex === -1){
            setSubTotal([...subTotal, {name: name, cantidad: cantidad, costo: costo}])
        }else{
            subTotal[objectIndex].costo = costo;
            subTotal[objectIndex].cantidad = cantidad;
            setSubTotal([...subTotal])
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
      <Accordion sx={{ mt: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Pizzas</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            {Pizzas.map((pizza) => (
              <Producto limpiarProductos={limpiarProductos} setClear={setClear} clear={clear} tipoProducto={"pizza"} key={pizza} name={pizza} productos={productos} setProductos={setProductos} />
            ))
            }
          </Grid>
        </AccordionDetails>
      </Accordion>

    </>
  )
}

export default Productos