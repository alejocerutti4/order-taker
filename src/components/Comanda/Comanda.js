import React, { useEffect, useState } from 'react';
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



const theme = createTheme();

export default function Checkout() {

  const [total, setTotal] = useState(0);
  const [cantidadEmpanadas, setCantidadEmpanadas] = useState(0);
  const [productos, setProductos] = useState([]);
  const [datosCliente, setDatosCliente] = useState({
    nombre: '',
    telefono: '',
    calle: '',
    altura: '',
    dpto: ''
  });
  const [clear, setClear] = useState(false)

  useEffect(()=>{
    
  },[productos])

  

  const limpiarFormulario = () => {
    console.log("limpianding....")
    setDatosCliente({nombre: '', telefono: '', calle: {"label": ""}, altura: '', dpto: ''});
    setProductos([]);
    setCantidadEmpanadas(0);
    setTotal(0);
    setClear(true);


  }

  const imprimirPedido = () => {
    const cantidadKeys = productos.length
    const alturaTicket = 65 + (cantidadKeys*3)
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [55.28, alturaTicket],

    });
    const left = 7;
    const center = 16
    const right = 18;
    // Create a template for a receipt
    // An image first
    doc.addImage('./logo_abuela.jpg', 'JPG', 18, 3, 17, 16);
    doc.setFontSize(10);
    doc.setFont('helvetica');
    
    doc.setFontSize(6);
    doc.text(left, 20, '----------------------------------------------------------');
    doc.setFontSize(10);
    doc.text(center,23, 'Datos Cliente');
    doc.setFontSize(6);
    doc.text(left, 24, '----------------------------------------------------------');
    doc.setFontSize(10);
    doc.text(left, 27, `Nombre: ${datosCliente.nombre}`);
    const array =  datosCliente.calle.split('-')
    const calle = array[0]
    const ciudad = array[1] ? array[1] : ""
    if(datosCliente.dpto !== ''){
      doc.text(left, 30, `Direccion: ${calle} ${datosCliente.altura} - ${ciudad}, ${datosCliente.dpto}`, {
        maxWidth: 46
      });
    }else{
      doc.text(left, 30, `Direccion: ${calle} ${datosCliente.altura} - ${ciudad}`, {
        maxWidth: 44
      });
    }
    doc.text(left, 33 + 5, `Telefono: ${datosCliente.telefono}`);
    doc.setFontSize(6);
    doc.text(left, 36 + 5, '----------------------------------------------------------');
    doc.setFontSize(10);
    doc.text(center + 2, 39 + 5, 'Productos');
    doc.setFontSize(6);
    doc.text(left, 40 + 5, '----------------------------------------------------------');
    doc.setFontSize(10);
    // Recorrer producots y por cada uno pintar una línea
    let acum = 49;
  
    productos.forEach(producto => {
      if(producto.tipoProducto === 'empanada'){
        const text = `- ${producto.name}: ${producto.cantidad}`
        doc.text(left, acum, text)
        acum += 3;
      }
    })
    doc.setFontSize(10);
    doc.text(left, acum, `------------Cant: ${cantidadEmpanadas}------------`);
    acum+=3;
    productos.forEach(producto => {
      if(producto.tipoProducto === 'sandwich'){
        const text = `- ${producto.name}: ${producto.cantidad}`
        doc.text(left, acum, text)
        acum += 3;
      }
    })
    doc.setFontSize(6);
    doc.text(left, acum+2, '----------------------------------------------------------');
    doc.setFontSize(10);
    doc.text(right, acum + 5, `Precio final: $${total}`);
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
