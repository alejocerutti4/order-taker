import React, { useEffect, useContext } from 'react'
import { Grid, Typography } from '@mui/material'
import Producto from './Producto'
import Context from '../../helpers/Context';


const Productos = ({ clear, setClear, setTotal, setCantidadEmpanadas, productos, setProductos }) => {
  // const [pedido, setPedido] = useState({});
  const Empanadas = ["Árabes", "Albahaca", "Ananá", "Calabresa", "Carne Picante", "Carne Suave", "Cebolla", "Champignones", "Criolla Dulce", "Criolla Salada", "Gallega", "Humita", "Jamón y Queso", "Palmitos", "Panceta y Ciruela", "Pera", "Pollo", "Pollo Picante", "Puerro", "Roquefort y Apio", "Verdura", "Zapallito"];
  const { precioCarta } = useContext(Context)

  useEffect(() => {
    //Recorrer pedido y multiplicar cada unidad de producto x 150, luego sumar todos los valores y usar setTotal
    let total = 0;
    let cantidad = 0;
    for (let key in productos) {
      total += productos[key] * precioCarta.empanadas;
      cantidad += productos[key];
    }
    setTotal(total);
    setCantidadEmpanadas(cantidad);
    setProductos(productos);

  }, [productos])
  return (
    <>
      <Typography sx={{ mt: 2 }} variant="h6" gutterBottom>
        Productos
      </Typography>
      <Grid container spacing={3}>
        {Empanadas.map((empanada) => (
          <Producto setClear={setClear} clear={clear} key={empanada} name={empanada} productos={productos} setProductos={setProductos} />
        ))
        }

      </Grid>
    </>
  )
}

export default Productos