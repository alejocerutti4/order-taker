import { useState, useEffect } from 'react';
import { Grid, List, ListItem, ListItemIcon, ListItemText, Typography, Modal, Box, Button, TextField } from '@mui/material'
import styled from '@emotion/styled';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import Loader from '../Loader';
import { getAllProductos, updateProducto } from '../../services/api';
import { SyncLoader } from 'react-spinners';
import { ordenarProductos } from '../../helpers/OrdenarProductos';

const Demo = styled('div')({
    backgroundColor: '#f2b705',
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ListaProductos = () => {
    const [open, setOpen] = useState(false);
    const [textoModal, setTextoModal] = useState({ value: '', precio: 0, tipo: '', id: ''});
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [spinner, setSpinner] = useState(false);

    const handleOpen = (value, precio, tipo, id) => {
        setOpen(true)
        setTextoModal({ value, precio, tipo, id })
    };
    const handleClose = () => setOpen(false);
    const actualizarPrecio = async () => {
        let objectIndex = productos.findIndex((p => p.id === textoModal.id));
        productos[objectIndex].costo = textoModal.precio;
        setProductos([...productos])
        const producto = {
            name: textoModal.value,
            costo: textoModal.precio,
            tipo: textoModal.tipo,
        }
        setSpinner(true);
        try{
            await updateProducto(producto, textoModal.id);
        }catch(e){
            console.log(e);
        }finally{
            setSpinner(false);
        }
        handleClose()
        setTextoModal({ value: '', precio: 0, tipo: '', id: ''})

    }

    const getProductos = async () => {
        try {
          const data = await getAllProductos();
          const ordenados = ordenarProductos(data);
          setProductos(ordenados);
        }catch(e){
            console.log(e)
        }
        finally {
          setLoading(false);
        }
      };

    useEffect(()=>{
        getProductos()
    }, [])


    return (
        
            loading ? 
            <Loader/>
            :
            
                <Grid item xs={12} md={6}>
                    <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                        Lista de productos
                    </Typography>
                    <Demo>
                        <List sx={{ backgroundColor: "white" }}>

                            {
                                productos.map(producto => {
                                    return (
                                        <ListItem key={producto.id}>
                                            <ListItemIcon>
                                                <RestaurantIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={producto.name}
                                                secondary={'$' + producto.costo}
                                            />
                                            <Button variant="contained" sx={{ backgroundColor: "#FFC000", '&:hover': { backgroundColor: '#f2b705' } }} onClick={() => handleOpen(producto.name, producto.costo, producto.tipo, producto.id)}>Editar <EditIcon /> </Button>

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
                                <Button sx={{ ml: 2 }} onClick={actualizarPrecio} color="primary" variant="contained">Confirmar{!spinner ? <CheckIcon /> : <SyncLoader size={5} color="#ffffff" />}</Button>
                            </Box>
                        </Box>
                    </Modal>
                </Grid>
            
    )
}

export default ListaProductos