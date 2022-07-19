import { Autocomplete, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import {tablaCalles} from '../../utils/TablaCalles';

const DatosCliente = ({datosCliente, setDatosCliente}) => {

    const setValue = (key, value) => {
        setDatosCliente({ ...datosCliente, [key]: value})
    }


   

  
    return (
        
        <>
            <Typography variant="h6" gutterBottom>
                Datos del cliente
            </Typography>
            <Grid container spacing={3}>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="nombre"
                        name="nombre"
                        label="Nombre"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        value={datosCliente.nombre}
                        onChange={(e)=> setValue('nombre', e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="telefono"
                        name="telefono"
                        label="Teléfono"
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                        value={datosCliente.telefono}
                        onChange={(e)=> setValue('telefono', e.target.value)}

                    />
                </Grid>
                <Grid item xs={6}>
                    <Autocomplete
                        disablePortal
                        value={datosCliente.calle}
                        id="combo-box-demo"
                        options={tablaCalles}
                        sx={{ width: 'auto' , borderLine: 'none'}}
                        renderInput={(params) => <TextField  variant="standard" {...params} label="Calle" />}
                        onInputChange={(e, value)=> setValue('calle', value)}

                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        id="altura"
                        name="altura"
                        label="Altura"
                        value={datosCliente.altura}
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                        onChange={(e)=> setValue('altura', e.target.value)}
                        

                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        id="dpto"
                        name="dpto"
                        label="Dpto"
                        value={datosCliente.dpto}
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                        onChange={(e)=> setValue('dpto', e.target.value)}


                    />
                </Grid>





            </Grid>
        </>
    )
}



export default DatosCliente