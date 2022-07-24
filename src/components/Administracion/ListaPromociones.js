import styled from '@emotion/styled';
import { Button, Grid, List, ListItem, ListItemIcon, ListItemText, Modal, TextField, Typography } from '@mui/material';
import React, { useContext, useState } from 'react'
import RestaurantIcon from '@mui/icons-material/Restaurant';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import { PrecioPromocionesContext } from '../../helpers/Context';
import { Box } from '@mui/system';

const Demo = styled('div')({
    backgroundColor: '#f2b705',
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ListaPromociones = () => {
    const { precioPromociones, setPrecioPromociones } = useContext(PrecioPromocionesContext)
    const [open, setOpen] = useState(false);
    const [textoModal, setTextoModal] = useState({ value: '', precio: 0});
    const handleOpen = (value, precio) => {
        setOpen(true)
        setTextoModal({ value, precio })
    };
    const handleClose = () => setOpen(false);
    const actualizarPrecio = () => {
        let objectIndex = precioPromociones.findIndex((p => p.name === textoModal.value));
        precioPromociones[objectIndex].costo = textoModal.precio;
        setPrecioPromociones([...precioPromociones])
        setTextoModal({ value: '', precio: 0})
        handleClose()
    }

   


    return (
        <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                Lista de promociones
            </Typography>
            <Demo>
                <List sx={{ backgroundColor: "white" }}>

                    {
                        precioPromociones.map(producto => {
                            return (
                                <ListItem key={producto.name}>
                                    <ListItemIcon>
                                        <RestaurantIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={`${producto.name} \n- ${producto.descripcion}`}
                                        secondary={`$ ${producto.costo}`}
                                    />
                                    <Button variant="contained" sx={{ backgroundColor: "#FFC000", '&:hover': { backgroundColor: '#f2b705' } }} onClick={() => handleOpen(producto.name, producto.costo)}>Editar <EditIcon /> </Button>

                                </ListItem>

                            )
                        })
                    }


                </List>
            </Demo>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {textoModal.value}
                    </Typography>
                    <Box sx={{ display: 'flex' }}>
                        <TextField id="standard-basic" onChange={(e) => setTextoModal({ ...textoModal, precio: e.target.value })} value={textoModal.precio} variant="standard" />
                        <Button sx={{ ml: 2 }} onClick={actualizarPrecio} color="primary" variant="contained">Confirmar<CheckIcon /></Button>
                    </Box>
                </Box>
            </Modal>
        </Grid>
    )
}


export default ListaPromociones