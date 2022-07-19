import { Typography } from '@mui/material'
import React from 'react'

const Totales = ({total, cantidadEmpanadas }) => {
  console.log(cantidadEmpanadas)
  return (
    <div>
        <Typography textAlign={'right'} variant="h6" gutterBottom>
            Cantidad empanadas: {cantidadEmpanadas}
        </Typography>
        <Typography textAlign={'right'} variant="h6" gutterBottom>
            Total: ${total}
        </Typography>
    </div>
  )
}

export default Totales