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
import { Divider, TextField } from '@mui/material';
import jsPDF from 'jspdf';



const theme = createTheme();

export default function Checkout() {

  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState([]);
  const [cantidadEmpanadas, setCantidadEmpanadas] = useState(0);
  const [productos, setProductos] = useState([]);
  const [notas, setNotas] = useState("");
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
    setDatosCliente({nombre: '', telefono: '', calle: {"label": ""}, altura: '', dpto: ''});
    setProductos([]);
    setCantidadEmpanadas(0);
    setTotal(0);
    setClear(true);


  }

  const hayTipoProducto = (tipoProducto) => {
    return productos.filter(producto => producto.tipoProducto === tipoProducto).length > 0;
  }

  const getHora = ()=>{
    const now = new Date();
    const date = pad(now.getHours()) + ":" + pad(now.getMinutes())
    return date
  }

  const pad = (value) => {
    if(value < 10) {
        return '0' + value;
    } else {
        return value;
    }
}

  const imprimirPedido = () => {
    const flagEmpanadas = hayTipoProducto('empanada');
    const flagSandwichs = hayTipoProducto('sandwich');
    const flagPizzas = hayTipoProducto('pizza');
    const flagNotas = notas.length > 0;

    const largoEmpanadas = flagEmpanadas ? 8 : 0;
    const largoSandwichs = flagSandwichs ? 8 : 0;
    const largoPizzas = flagPizzas ? 8 : 0;
    const largoNotas = flagNotas ? 8 : 0;

    const cantidadKeys = productos.length
    const alturaTicket = 65 + largoEmpanadas + largoSandwichs + largoPizzas + largoNotas + (cantidadKeys*3)
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
      doc.text(left, 31, `Direccion: ${calle} ${datosCliente.altura} - ${ciudad}, ${datosCliente.dpto}`, {
        maxWidth: 46
      });
    }else{
      doc.text(left, 31, `Direccion: ${calle} ${datosCliente.altura} - ${ciudad}`, {
        maxWidth: 44
      });
    }
    doc.text(left, 39, `Telefono: ${datosCliente.telefono}`);
    doc.text(left, 43, `Hora: ${getHora()}`);

    let acum = 46;
    if(flagEmpanadas){
      doc.setFontSize(6);
      doc.text(left, acum, '----------------------------------------------------------');
      doc.setFontSize(10);
      doc.text(center + 2, acum + 3, 'Empanadas');
      doc.setFontSize(6);
      doc.text(left, acum + 5, '----------------------------------------------------------');
      doc.setFontSize(10);
      acum += 8
      productos.forEach(producto => {
        if(producto.tipoProducto === 'empanada'){
          const text = `- ${producto.name}: ${producto.cantidad}`
          doc.text(left, acum, text)
          acum += 3;
        }
      })
      doc.setFontSize(10);
      doc.text(left, acum, `Total: ${cantidadEmpanadas}`);
      acum+=2;
    }
    if(flagSandwichs){
      doc.setFontSize(6);
      doc.text(left, acum, '----------------------------------------------------------');
      doc.setFontSize(10);
      doc.text(center + 2, acum + 3, 'Sandwichs');
      doc.setFontSize(6);
      doc.text(left, acum + 5, '----------------------------------------------------------');
      acum+=8
      doc.setFontSize(10);
      productos.forEach(producto => {
        if(producto.tipoProducto === 'sandwich'){
          const text = `- ${producto.name}: ${producto.cantidad}`
          doc.text(left, acum, text)
          acum += 3;
        }
      })
    }
    if(flagPizzas){
      doc.setFontSize(6);
      doc.text(left, acum, '----------------------------------------------------------');
      doc.setFontSize(10);
      doc.text(center + 6, acum + 3, 'Pizzas');
      doc.setFontSize(6);
      doc.text(left, acum + 5, '----------------------------------------------------------');
      acum+=8
      doc.setFontSize(10);
      productos.forEach(producto => {
        if(producto.tipoProducto === 'pizza'){
          const text = `- ${producto.name}: ${producto.cantidad}`
          doc.text(left, acum, text,{
            maxWidth: 43
          });
          if(producto.name.length > 20){
            acum += 7;
          }else{
            acum += 3;
          }
        }
      })
    }

    if(flagNotas){
      doc.setFontSize(6);
      doc.text(left, acum, '----------------------------------------------------------');
      doc.setFontSize(8);
      doc.text(left, acum + 3, 'Notas: ');
      const cant = notas.length / 30;
      doc.text(left, acum + 6, "- " + notas, {
        maxWidth: 46
      })
      acum += 8 + (2.5)*cant
    }
    // Recorrer producots y por cada uno pintar una línea
    
    doc.setFontSize(6);
    doc.text(left, acum, '----------------------------------------------------------');
    doc.setFontSize(10);
    doc.text(right, acum + 3, `Precio final: $${total}`);
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
            <Productos subTotal={subTotal} setSubTotal={setSubTotal} clear={clear} setClear={setClear} setTotal={setTotal} setCantidadEmpanadas={setCantidadEmpanadas} productos={productos} setProductos={setProductos} />
            <Typography component="h1" variant="h5" sx={{mt:2}} align="left">Notas</Typography>
            <TextField
              id="outlined-textarea"
              label="Escribir alguna nota ..."
              placeholder="Ingrese nota..."
              sx={{width: "100%"}}
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              multiline
            />
            <Divider sx={{ mt: 2 }} />
            
            <Totales subTotal={subTotal} total={total} cantidadEmpanadas={cantidadEmpanadas} />
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
