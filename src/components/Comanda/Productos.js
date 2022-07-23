import React, { useEffect, useContext } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material'
import Producto from './Producto'
import Context from '../../helpers/Context';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FastfoodIcon from '@mui/icons-material/Fastfood';


const Productos = ({ subTotal, setSubTotal, clear, setClear, setTotal, setCantidadEmpanadas, productos, setProductos }) => {
  // const [pedido, setPedido] = useState({});
  const Empanadas = ["Árabes", "Albahaca", "Ananá", "Calabresa", "Carne Picante", "Carne Suave", "Cebolla", "Champignones", "Criolla Dulce", "Criolla Salada", "Gallega", "Humita", "Jamón y Queso", "Palmitos", "Panceta y Ciruela", "Pera", "Pollo", "Pollo Picante", "Puerro", "Roquefort y Apio", "Verdura", "Zapallito"];
  const Sandwichs = ["Lomo Carne", "Lomo Pollo", "Hambur. Clásica", "Hambur. Americana", "Hambur. Veggie", "Sandwich Milanesa", "Milanesa", "Milanesa Napolitana"];
  const Pizzas = ["Mozzarella", "Media Mozzarella", "Mozzarella Doble", "Media Mozzarella Doble", "Mozzarella Con Huevo", "Media Mozzarella Con Huevo", "Mozzarella Super", "Media Mozzarella Super", "Fugazzeta", "Media Fugazzeta", "Napolitana", "Media Napolitana", "Jamon Especial", "Media Jamon Especial", "Roquefort", "Media Roquefort", "Tres Quesos", "Media Tres Quesos", "Ananá", "Media Ananá", "Palmitos", "Media Palmitos", "Champignon", "Media Champignon", "Calabresa", "Media Calabresa", "Panceta", "Media Panceta"]
  const Bebidas = ["Postres", "Coca 500ml", "Coca 1,5L", "Pepsi 1,25L", "Pepsi 2L", "Pepsi 1,5L", "Aquarius 1,5L", "Agua Mineral 1,5L", "Cepita 0,25L", "Brahma 1L", "Quilmes 1L", "Stella 1L", "Quilmes Stout 1L", "Patagonia x710", "Lata Patagonia", "Lata Stella", "Lata Andes", "Lata Quilmes", "Lata Quilmes Sin. Alc", "Lata Quilmes N", "Lata Wolff", "Lata Brahma", "Fernet Branca", "Vino Benjamin Malbec", "Vino Portillo Malbec", "Vino Portillo Pinot Noir", "Vino Flia Gascon Syrah", "Vino Flia Gascon Malbec", "Vino Los Cardos ", "Vino Vive Malbec", "Vino Andeluna Raices", "Vino Santa Julia Malbec Orgánico", "Vino Cordero con Piel de Lobo", "Vino De Moño Rojo Blanco", "Vino De Moño Rojo Malbec", "Vino Cafayate Malbec", "Vino Asado Club Malbec", "Vino Jean Rivier Malbec", "Vino Jean Rivier Rosado", "Vino Callia Alta Malbec ", "Vino Domingo Hnos Otoñal", "Vino LP Partridge Malbec", "Vino LP Partridge Red Blend", "Vino Laureano Gomez Rosado"];
  const { precioCarta } = useContext(Context)


  useEffect(() => {
    let total = 0;
    let cantidad = 0;
    console.log(precioCarta);
    productos.forEach(producto => {
      if(producto.tipoProducto === "empanada"){
        const precio = precioCarta.find(p => ((p.name).toUpperCase()).trim() === (("Empanadas").toUpperCase()).trim()).costo
        const costo = producto.cantidad * precio;
        total += costo;
        cantidad += producto.cantidad
        updateSubtotal(producto.cantidad, producto.name, costo)
      }else{
        const precio = precioCarta.find(p => ((p.name).toUpperCase()).trim() === ((producto.name).toUpperCase()).trim()).costo
        const costo = producto.cantidad * precio;
        total += costo;
        cantidad += producto.cantidad
        updateSubtotal(producto.cantidad, producto.name, costo)
      }
      
    });
      
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

  const deleteSubtotal = (name) => {
    let objectIndex = subTotal.findIndex((obj => obj.name === name));
    if(objectIndex !== -1){
      subTotal.splice(objectIndex, 1);
      setSubTotal([...subTotal])
    }
  }
  return (
    <>
      <div style={{display: "flex", alignItems: "center"}}>
        <Typography sx={{ mt: 2 }} variant="h6" gutterBottom>
          Productos
        </Typography>
        <FastfoodIcon sx={{ml:1, marginTop: "2px"}}/>
      </div>
      <Grid container spacing={3}>
        {Empanadas.map((empanada) => (
          <Producto deleteSubtotal={deleteSubtotal} limpiarProductos={limpiarProductos} setClear={setClear} clear={clear} tipoProducto={"empanada"} key={empanada} name={empanada} productos={productos} setProductos={setProductos} />
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
              <Producto deleteSubtotal={deleteSubtotal} limpiarProductos={limpiarProductos} setClear={setClear} clear={clear} tipoProducto={"sandwich"} key={sandwich} name={sandwich} productos={productos} setProductos={setProductos} />
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
              <Producto deleteSubtotal={deleteSubtotal} limpiarProductos={limpiarProductos} setClear={setClear} clear={clear} tipoProducto={"pizza"} key={pizza} name={pizza} productos={productos} setProductos={setProductos} />
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
          <Typography>Bebidas</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            {Bebidas.map((bebida) => (
              <Producto deleteSubtotal={deleteSubtotal} limpiarProductos={limpiarProductos} setClear={setClear} clear={clear} tipoProducto={"bebida"} key={bebida} name={bebida} productos={productos} setProductos={setProductos} />
            ))
            }
          </Grid>
        </AccordionDetails>
      </Accordion>

    </>
  )
}

export default Productos