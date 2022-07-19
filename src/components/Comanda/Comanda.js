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
import { Divider } from '@mui/material';
import jsPDF from 'jspdf';
import { AirlineSeatReclineExtraRounded } from '@mui/icons-material';



const theme = createTheme();

export default function Checkout() {

  const [total, setTotal] = useState(0);
  const [cantidadEmpanadas, setCantidadEmpanadas] = useState(0);
  const [productos, setProductos] = useState({});
  const [datosCliente, setDatosCliente] = useState({
    nombre: '',
    telefono: '',
    calle: '',
    altura: '',
    dpto: ''
  });
  const [clear, setClear] = useState(false)


  const limpiarFormulario = () => {
    console.log("limpianding....")
    setDatosCliente({nombre: '', telefono: '', calle: {"label": ""}, altura: '', dpto: ''});
    setProductos({});
    setCantidadEmpanadas(0);
    setTotal(0);
    setClear(true);


  }

  const imprimirPedido = () => {
    const cantidadKeys = Object.keys(productos).length
    const alturaTicket = 50 + (cantidadKeys*2)
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [55.28, alturaTicket],

    });
    // Create a template for a receipt
    // An image first
    doc.addImage('./logo_abuela.jpg', 'JPG', 22, 5, 15, 14);
    doc.setFontSize(6);
    doc.setFont('helvetica');
    const left = 7;
    const center = 22;
    const right = 30;
    doc.text(left, 20, '----------------------------------------------------------');
    doc.text(center,22, 'Datos Cliente');
    doc.text(left, 24, '----------------------------------------------------------');
    doc.text(left, 26, `Nombre: ${datosCliente.nombre}`);
    const array =  datosCliente.calle.split('-')
    const calle = array[0]
    const ciudad = array[1]
    if(datosCliente.dpto !== ''){
      doc.text(left, 28, `Direccion: ${calle} ${datosCliente.altura} - ${ciudad}, ${datosCliente.dpto}`);
    }else{
      doc.text(left, 28, `Direccion: ${calle} ${datosCliente.altura} - ${ciudad}`);
    }
    doc.text(left, 30, `Telefono: ${datosCliente.telefono}`);
    doc.text(left, 31, '----------------------------------------------------------');
    doc.text(center + 2, 33, 'Productos');
    doc.text(left, 35, '----------------------------------------------------------');

    // Recorrer producots y por cada uno pintar una línea
    let acum = 31 + 6;
    for (const [key, val] of Object.entries(productos)) {
      const producto = "- " + key + ": " + val
      doc.text(left, acum, producto)
      acum += 2;

    }
    doc.text(left, acum, `------------------------Cant: ${cantidadEmpanadas}-----------------------`);
    doc.text(right, acum + 4, `Precio final: $${total}`);
    doc.autoPrint();  
    doc.output('dataurlnewwindow');





  }
  return (
    <ThemeProvider theme={theme}>

      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Comanda
          </Typography>

          <React.Fragment>

            <DatosCliente datosCliente={datosCliente} setDatosCliente={setDatosCliente} />
            <Productos clear={clear} setClear={setClear} setTotal={setTotal} setCantidadEmpanadas={setCantidadEmpanadas} productos={productos} setProductos={setProductos} />
            <Divider sx={{ mt: 2 }} />
            <Totales total={total} cantidadEmpanadas={cantidadEmpanadas} />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                sx={{ mt: 3, ml: 1 }}
                onClick={() => { limpiarFormulario() }}
              >
                Limpiar Formulario
              </Button>
              <Button
                variant="contained"
                sx={{ mt: 3, ml: 1 }}
                onClick={() => { imprimirPedido() }}
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
