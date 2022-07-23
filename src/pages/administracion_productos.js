import * as React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ListaProductos from '../components/Administracion/ListaProductos';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';


const AdministracionProductos = () => {
  return (
    <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Typography component="h1" variant="h4" align="center">
            Administración de productos
          </Typography>
          <RestaurantMenuIcon sx={{marginTop:"11px", ml:1}}/>
        </div>
        <ListaProductos />


      </Paper>
    </Container>
  );
}

export default AdministracionProductos