import React, { useEffect, useState, useContext } from 'react'
import { Grid, TextField, Typography } from '@mui/material'
import Producto from './Producto'
import Context from '../../helpers/Context';
 

const Productos = ({setTotal, setCantidadEmpanadas}) => {
  const [pedido, setPedido] = useState({});
  const Empanadas = ["Árabes", "Albahaca", "Ananá", "Calabresa", "Carne Picante", "Carne Suave", "Cebolla", "Champignones", "Criolla Dulce", "Criolla Salada", "Gallega", "Humita", "Jamón y Queso", "Palmitos", "Panceta y Ciruela", "Pera", "Pollo", "Pollo Picante", "Puerro", "Roquefort y Apio", "Verdura", "Zapallito"];
  const { precioCarta } = useContext(Context)

  useEffect(()=>{
    //Recorrer pedido y multiplicar cada unidad de producto x 150, luego sumar todos los valores y usar setTotal
    let total = 0;
    let cantidad = 0;
    for (let key in pedido) {
      total += pedido[key] * precioCarta.empanadas;
      cantidad += pedido[key];
    }
    setTotal(total);
    setCantidadEmpanadas(cantidad);
  }, [pedido])
  return (
    <>
      <Typography sx={{ mt: 2 }} variant="h6" gutterBottom>
        Productos
      </Typography>
      <Grid container spacing={3}>
        {Empanadas.map((empanada) => (
          <Producto key={empanada} name={empanada} pedido={pedido} setPedido={setPedido} />
        ))
        }

      </Grid>
    </>
  )
}

export default Productos