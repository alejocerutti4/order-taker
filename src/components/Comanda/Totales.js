import { Typography } from '@mui/material'
import React from 'react'

const Totales = ({subTotal, total, cantidadEmpanadas }) => {
  return (
    <div>
        <Typography textAlign={'right'} variant="h6" gutterBottom>
            Cantidad empanadas: {cantidadEmpanadas}
        </Typography>
        {
          subTotal.map((subTotal, index) => {
            return (
              <Typography textAlign={'right'} variant="h6" gutterBottom key={index}>
                  {subTotal.cantidad} x {subTotal.name}: ${subTotal.costo}
              </Typography>
            )
          })
        }
        <Typography textAlign={'right'} variant="h5" gutterBottom>
            Total: ${total}
        </Typography>
    </div>
  )
}

export default Totales