import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DatosCliente from './DatosCliente';
import Productos from './Productos';
import Totales from './Totales'
import { Divider } from '@mui/material';


const theme = createTheme();

export default function Checkout() {

  const [total, setTotal] = useState(0);
  const [cantidadEmpanadas, setCantidadEmpanadas] = useState(0);

  const imprimirPedido = () => {
   window.print()
  }
  return (
    <ThemeProvider theme={theme}>
      
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Comanda
          </Typography>

          <React.Fragment>

            <DatosCliente />
            <Productos setTotal={setTotal} setCantidadEmpanadas={setCantidadEmpanadas}/>   
            <Divider sx={{mt: 2}} />     
            <Totales total={total} cantidadEmpanadas={cantidadEmpanadas}/>    
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  sx={{ mt: 3, ml: 1 }}
                  onClick={() => {imprimirPedido()}}
                >
                  Finalizar
                </Button>
            </Box>
          </React.Fragment>

        </Paper>
      </Container>
    </ThemeProvider>
  );
}
