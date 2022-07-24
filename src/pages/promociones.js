import { Container, Paper, Typography } from '@mui/material'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import React from 'react'
import ListaPromociones from '../components/Administracion/ListaPromociones'

const Promociones = () => {
  return (
    <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Typography component="h1" variant="h4" align="center">
            Administración de promociones
          </Typography>
          <RestaurantMenuIcon sx={{marginTop:"11px", ml:1}}/>
        </div>
        <ListaPromociones />

      </Paper>
    </Container>
  )
}

export default Promociones