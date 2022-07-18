import { useState, useContext, useEffect } from 'react';
import { Grid, List, ListItem, ListItemIcon, ListItemText, Typography, Modal, Box, Button, TextField } from '@mui/material'
import FolderIcon from '@mui/icons-material/Folder';
import styled from '@emotion/styled';
import Context from '../../helpers/Context';
import EditIcon from '@mui/icons-material/Edit'; 
import CheckIcon from '@mui/icons-material/Check';

const Demo = styled('div')({
    backgroundColor: '#f5f5f5',
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
    const { precioCarta, setPrecioCarta } = useContext(Context)
    const [open, setOpen] = useState(false);
    const [textoModal, setTextoModal] = useState({text: '', precio: 0});
    
    const handleOpen = (text, precio) => {
        setOpen(true)
        setTextoModal({text, precio})
    };
    const handleClose = () => setOpen(false);
    const actualizarPrecio = () =>{
        setPrecioCarta({...precioCarta, [textoModal.text]: parseInt(textoModal.precio)})
        setTextoModal({text: '', precio: 0})
        handleClose()
    }

    useEffect(()=>{
        console.log(precioCarta)
    }, [precioCarta])


    return (
        <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                Lista de productos
            </Typography>
            <Demo>
                <List>

                    <ListItem>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Empanada"
                            secondary={'$' + precioCarta.empanadas}
                        />
                        <Button variant="contained" sx={{backgroundColor: "#ffd800", '&:hover': {backgroundColor: '#f4ca16'}}} onClick={()=>handleOpen('empanadas', precioCarta.empanadas)}>Editar <EditIcon/> </Button>

                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Lomo"
                            secondary={'$' + precioCarta.lomos}
                        />
                        <Button variant="contained" sx={{backgroundColor: "#ffd800", '&:hover': {backgroundColor: '#f4ca16'}}}  onClick={()=>handleOpen('lomos', precioCarta.lomos)}>Editar <EditIcon/> </Button>

                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Pizza"
                            secondary={'$' + precioCarta.pizzas}
                        />
                        <Button variant="contained" sx={{backgroundColor: "#ffd800", '&:hover': {backgroundColor: '#f4ca16'}}}  onClick={()=>handleOpen('pizzas', precioCarta.pizzas)}>Editar <EditIcon/> </Button>

                    </ListItem>

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
                    {textoModal.text}
                </Typography>
                <Box sx={{display: 'flex'}}>
                    <TextField id="standard-basic" onChange={(e)=>setTextoModal({ ...textoModal, precio: e.target.value})} value={textoModal.precio} variant="standard" />
                    <Button sx={{ml:2}}  onClick={actualizarPrecio} color="primary" variant="contained">Confirmar<CheckIcon/></Button>
                </Box>
                </Box>
            </Modal>
        </Grid>
    )
}

export default ListaProductos