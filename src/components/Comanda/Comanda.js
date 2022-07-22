import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DatosCliente from './DatosCliente';
import Productos from './Productos';
import Totales from './Totales'
import { Divider, TextField } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import imprimirPedido from '../../helpers/Imprimir';




const theme = createTheme();

export default function Checkout() {

  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState([]);
  const [cantidadEmpanadas, setCantidadEmpanadas] = useState(0);
  const [productos, setProductos] = useState([]);
  const [notas, setNotas] = useState("");
  const [clear, setClear] = useState(false)

  const [datosCliente, setDatosCliente] = useState({
    nombre: '',
    telefono: '',
    calle: '',
    altura: '',
    dpto: ''
  });


  const limpiarFormulario = () => {
    setDatosCliente({ nombre: '', telefono: '', calle: { "label": "" }, altura: '', dpto: '' });
    setProductos([]);
    setCantidadEmpanadas(0);
    setSubTotal([]);
    setTotal(0);
    setClear(true);
    setNotas("");
  }



  return (
    <ThemeProvider theme={theme}>

      <Container component="main" maxWidth="md" sx={{
        mb: 4, fontWeight: "bold"
      }}>
        <Paper id="comanda" variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Typography component="h1" variant="h4" align="center">
              Comanda
            </Typography>
            <CreateIcon sx={{ fontSize: "30px"}} />
          </div>

          <React.Fragment>

            <DatosCliente datosCliente={datosCliente} setDatosCliente={setDatosCliente} />
            <Productos subTotal={subTotal} setSubTotal={setSubTotal} clear={clear} setClear={setClear} setTotal={setTotal} setCantidadEmpanadas={setCantidadEmpanadas} productos={productos} setProductos={setProductos} />
            <div style={{display:"flex"}}>
              <Typography component="h1" variant="h5" sx={{ mt: 2 }} align="left">Notas</Typography>
              <CreateIcon sx={{marginTop:"18px", marginLeft: "6px"}}/>
            </div>
            <TextField
                id="outlined-textarea"
                label="Escriba alguna nota ..."
                placeholder="Ingrese nota..."
                sx={{ width: "100%" }}
                value={notas}
                onChange={(e) => setNotas(e.target.value)}
                multiline
              />

            <Divider sx={{ mt: 2 }} />

            <Totales subTotal={subTotal} total={total} cantidadEmpanadas={cantidadEmpanadas} />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                sx={{ mt: 3, ml: 1, backgroundColor: "#510029" }}
                onClick={() => { limpiarFormulario() }}
              >
                Limpiar Formulario
              </Button>
              <Button
                variant="contained"
                sx={{ mt: 3, ml: 1, backgroundColor: "#510029" }}
                onClick={() => { imprimirPedido(notas, productos, datosCliente, cantidadEmpanadas, total) }}
              >
                Imprimir
              </Button>

            </Box>
          </React.Fragment>

        </Paper>
      </Container>
    </ThemeProvider>
  );
}
