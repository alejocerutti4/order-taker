import { Autocomplete, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import {tablaCalles} from '../../utils/TablaCalles';

const DatosCliente = () => {
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
                    />
                </Grid>
                <Grid item xs={6}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={tablaCalles}
                        sx={{ width: 'auto' , borderLine: 'none'}}
                        renderInput={(params) => <TextField variant="standard" {...params} label="Calle" />}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        id="altura"
                        name="altura"
                        label="Altura"
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        id="dpto"
                        name="dpto"
                        label="Dpto"
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                    />
                </Grid>





            </Grid>
        </>
    )
}



export default DatosCliente