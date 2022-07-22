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
    const [textoModal, setTextoModal] = useState({ value: '', precio: 0, text: '' });

    const handleOpen = (value, precio, text) => {
        setOpen(true)
        setTextoModal({ value, precio, text })
    };
    const handleClose = () => setOpen(false);
    const actualizarPrecio = () => {
        setPrecioCarta({ ...precioCarta, [textoModal.value]: parseInt(textoModal.precio) })
        setTextoModal({ value: '', precio: 0, text: '' })
        handleClose()
    }

    useEffect(() => {
        console.log(precioCarta)
    }, [precioCarta])


    return (
        <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                Lista de productos
            </Typography>
            <Demo>
                <List>
                    {/* 
                    empanadas: 150,
                    lomoCarne: 1000,
                    lomoPollo: 900,
                    hamburguesaAmericana: 800,
                    hamburguesaVeggie: 900,
                    hamburguesaClasica: 800,
                    sandwichMilanesa: 900,
                    milanesa: 700,
                    milanesaNapolitana: 1100,
                    mozzarella: 900,
                    mozzarella_media: 500,
                    mozzarellaDoble: 900,
                    mozzarellaDoble_media: 500,
                    mozzarellaConHuevo: 900,
                    mozzarellaConHuevo_media: 500,
                    mozzarellaSuper: 900,
                    mozzarellaSuper_media: 500,
                    fugazzeta: 900,
                    fugazzeta_media: 500,
                    napolitana: 900,
                    napolitana_media: 500,
                    jamonEspecial: 900,
                    jamonEspecial_media: 500,
                    roquefort: 900,
                    roquefort_media: 500,
                    tresQuesos: 900,
                    tresQuesos_media: 500,
                    anana: 900,
                    anana_media: 500,
                    palmitos: 900,
                    palmitos_media: 500,
                    champignon: 900,
                    champignon_media: 500,
                    calabresa: 900,
                    calabresa_media: 500,
                    panceta: 900,
                    panceta_media: 500*/}
                    <ListItem>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Empanada"
                            secondary={'$' + precioCarta.empanadas}
                        />
                        <Button variant="contained" sx={{ backgroundColor: "#ffd800", '&:hover': { backgroundColor: '#f4ca16' } }} onClick={() => handleOpen('empanadas', precioCarta.empanadas, 'Empanadas')}>Editar <EditIcon /> </Button>

                    </ListItem>

                    <ListItem>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Lomo Carne"
                            secondary={'$' + precioCarta.lomoCarne}
                        />
                        <Button variant="contained" sx={{ backgroundColor: "#ffd800", '&:hover': { backgroundColor: '#f4ca16' } }} onClick={() => handleOpen('lomoCarne', precioCarta.lomoCarne, 'Lomo de Carne')}>Editar <EditIcon /> </Button>

                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Lomo Pollo"
                            secondary={'$' + precioCarta.lomoPollo}
                        />
                        <Button variant="contained" sx={{ backgroundColor: "#ffd800", '&:hover': { backgroundColor: '#f4ca16' } }} onClick={() => handleOpen('lomoPollo', precioCarta.lomoPollo, 'Lomo de Pollo')}>Editar <EditIcon /> </Button>

                    </ListItem>

                    <ListItem>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Hambur. Clásica"
                            secondary={'$' + precioCarta.hamburguesaClasica}
                        />
                        <Button variant="contained" sx={{ backgroundColor: "#ffd800", '&:hover': { backgroundColor: '#f4ca16' } }} onClick={() => handleOpen('hamburguesaClasica', precioCarta.hamburguesaClasica, 'Hambur. Clásica')}>Editar <EditIcon /> </Button>

                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Hambur. Americana"
                            secondary={'$' + precioCarta.hamburguesaAmericana}
                        />
                        <Button variant="contained" sx={{ backgroundColor: "#ffd800", '&:hover': { backgroundColor: '#f4ca16' } }} onClick={() => handleOpen('hamburguesaAmericana', precioCarta.hamburguesaAmericana, 'Hambur. Americana')}>Editar <EditIcon /> </Button>

                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Hambur. Veggie"
                            secondary={'$' + precioCarta.hamburguesaVeggie}
                        />
                        <Button variant="contained" sx={{ backgroundColor: "#ffd800", '&:hover': { backgroundColor: '#f4ca16' } }} onClick={() => handleOpen('hamburguesaVeggie', precioCarta.hamburguesaVeggie, 'Hambur. Veggie')}>Editar <EditIcon /> </Button>

                    </ListItem>

                    <ListItem>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Sandwich Milanesa"
                            secondary={'$' + precioCarta.sandwichMilanesa}
                        />
                        <Button variant="contained" sx={{ backgroundColor: "#ffd800", '&:hover': { backgroundColor: '#f4ca16' } }} onClick={() => handleOpen('sandwichMilanesa', precioCarta.sandwichMilanesa, 'Sandwich Milanesa')}>Editar <EditIcon /> </Button>
                    </ListItem>

                    <ListItem>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText

                            primary="Milanesa"
                            secondary={'$' + precioCarta.milanesa}
                        />
                        <Button variant="contained" sx={{ backgroundColor: "#ffd800", '&:hover': { backgroundColor: '#f4ca16' } }} onClick={() => handleOpen('milanesa', precioCarta.milanesa, 'Milanesa')}>Editar <EditIcon /> </Button>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText

                            primary="Milanesa Napolitana"
                            secondary={'$' + precioCarta.milanesaNapolitana}
                        />
                        <Button variant="contained" sx={{ backgroundColor: "#ffd800", '&:hover': { backgroundColor: '#f4ca16' } }} onClick={() => handleOpen('milanesa', precioCarta.milanesaNapolitana, 'Milanesa Napolitana')}>Editar <EditIcon /> </Button>
                    </ListItem>

                    <ListItem>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Mozzarella "
                            secondary={'$' + precioCarta.mozzarella}
                        />
                        <Button variant="contained" sx={{ backgroundColor: "#ffd800", '&:hover': { backgroundColor: '#f4ca16' } }} onClick={() => handleOpen('empanadas', precioCarta.mozzarella, "Mozzarella ")}>Editar <EditIcon /> </Button>
                    </ListItem>


                    <ListItem>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Mozzarella Media"
                            secondary={'$' + precioCarta.mozzarella_media}
                        />
                        <Button variant="contained" sx={{ backgroundColor: "#ffd800", '&:hover': { backgroundColor: '#f4ca16' } }} onClick={() => handleOpen('empanadas', precioCarta.mozzarella_media, "Mozzarella Media")}>Editar <EditIcon /> </Button>
                    </ListItem>


                    <ListItem>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Mozzarella Doble"
                            secondary={'$' + precioCarta.mozzarellaDoble}
                        />
                        <Button variant="contained" sx={{ backgroundColor: "#ffd800", '&:hover': { backgroundColor: '#f4ca16' } }} onClick={() => handleOpen('empanadas', precioCarta.mozzarellaDoble, "Mozzarella Doble")}>Editar <EditIcon /> </Button>
                    </ListItem>


                    <ListItem>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Mozzarella Doble Media"
                            secondary={'$' + precioCarta.mozzarellaDoble_media}
                        />
                        <Button variant="contained" sx={{ backgroundColor: "#ffd800", '&:hover': { backgroundColor: '#f4ca16' } }} onClick={() => handleOpen('empanadas', precioCarta.mozzarellaDoble_media, "Mozzarella Doble Media")}>Editar <EditIcon /> </Button>
                    </ListItem>


                    <ListItem>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Mozzarella ConHuevo"
                            secondary={'$' + precioCarta.mozzarellaConHuevo}
                        />
                        <Button variant="contained" sx={{ backgroundColor: "#ffd800", '&:hover': { backgroundColor: '#f4ca16' } }} onClick={() => handleOpen('empanadas', precioCarta.mozzarellaConHuevo, "Mozzarella ConHuevo")}>Editar <EditIcon /> </Button>
                    </ListItem>


                    <ListItem>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Mozzarella ConHuevo Media"
                            secondary={'$' + precioCarta.mozzarellaConHuevo_media}
                        />
                        <Button variant="contained" sx={{ backgroundColor: "#ffd800", '&:hover': { backgroundColor: '#f4ca16' } }} onClick={() => handleOpen('empanadas', precioCarta.mozzarellaConHuevo_media, "Mozzarella ConHuevo Media")}>Editar <EditIcon /> </Button>
                    </ListItem>


                    <ListItem>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Mozzarella Super"
                            secondary={'$' + precioCarta.mozzarellaSuper}
                        />
                        <Button variant="contained" sx={{ backgroundColor: "#ffd800", '&:hover': { backgroundColor: '#f4ca16' } }} onClick={() => handleOpen('empanadas', precioCarta.mozzarellaSuper, "Mozzarella Super")}>Editar <EditIcon /> </Button>
                    </ListItem>


                    <ListItem>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Mozzarella Super Media"
                            secondary={'$' + precioCarta.mozzarellaSuper_media}
                        />
                        <Button variant="contained" sx={{ backgroundColor: "#ffd800", '&:hover': { backgroundColor: '#f4ca16' } }} onClick={() => handleOpen('empanadas', precioCarta.mozzarellaSuper_media, "Mozzarella Super Media")}>Editar <EditIcon /> </Button>
                    </ListItem>


                    <ListItem>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Fugazzeta"
                            secondary={'$' + precioCarta.fugazzeta}
                        />
                        <Button variant="contained" sx={{ backgroundColor: "#ffd800", '&:hover': { backgroundColor: '#f4ca16' } }} onClick={() => handleOpen('empanadas', precioCarta.fugazzeta, "Fugazzeta")}>Editar <EditIcon /> </Button>
                    </ListItem>


                    <ListItem>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Fugazzeta Media"
                            secondary={'$' + precioCarta.fugazzeta_media}
                        />
                        <Button variant="contained" sx={{ backgroundColor: "#ffd800", '&:hover': { backgroundColor: '#f4ca16' } }} onClick={() => handleOpen('empanadas', precioCarta.fugazzeta_media, "Fugazzeta Media")}>Editar <EditIcon /> </Button>
                    </ListItem>


                    <ListItem>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Napolitana"
                            secondary={'$' + precioCarta.napolitana}
                        />
                        <Button variant="contained" sx={{ backgroundColor: "#ffd800", '&:hover': { backgroundColor: '#f4ca16' } }} onClick={() => handleOpen('empanadas', precioCarta.napolitana, "Napolitana")}>Editar <EditIcon /> </Button>
                    </ListItem>


                    <ListItem>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Napolitana Media"
                            secondary={'$' + precioCarta.napolitana_media}
                        />
                        <Button variant="contained" sx={{ backgroundColor: "#ffd800", '&:hover': { backgroundColor: '#f4ca16' } }} onClick={() => handleOpen('empanadas', precioCarta.napolitana_media, "Napolitana Media")}>Editar <EditIcon /> </Button>
                    </ListItem>


                    <ListItem>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Jamon Especial"
                            secondary={'$' + precioCarta.jamonEspecial}
                        />
                        <Button variant="contained" sx={{ backgroundColor: "#ffd800", '&:hover': { backgroundColor: '#f4ca16' } }} onClick={() => handleOpen('empanadas', precioCarta.jamonEspecial, "Jamon Especial")}>Editar <EditIcon /> </Button>
                    </ListItem>


                    <ListItem>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Jamon Especial Media"
                            secondary={'$' + precioCarta.jamonEspecial_media}
                        />
                        <Button variant="contained" sx={{ backgroundColor: "#ffd800", '&:hover': { backgroundColor: '#f4ca16' } }} onClick={() => handleOpen('empanadas', precioCarta.jamonEspecial_media, "Jamon Especial Media")}>Editar <EditIcon /> </Button>
                    </ListItem>


                    <ListItem>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Roquefort"
                            secondary={'$' + precioCarta.roquefort}
                        />
                        <Button variant="contained" sx={{ backgroundColor: "#ffd800", '&:hover': { backgroundColor: '#f4ca16' } }} onClick={() => handleOpen('empanadas', precioCarta.roquefort, "Roquefort")}>Editar <EditIcon /> </Button>
                    </ListItem>


                    <ListItem>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Roquefort Media"
                            secondary={'$' + precioCarta.roquefort_media}
                        />
                        <Button variant="contained" sx={{ backgroundColor: "#ffd800", '&:hover': { backgroundColor: '#f4ca16' } }} onClick={() => handleOpen('empanadas', precioCarta.roquefort_media, "Roquefort Media")}>Editar <EditIcon /> </Button>
                    </ListItem>


                    <ListItem>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Tres Quesos"
                            secondary={'$' + precioCarta.tresQuesos}
                        />
                        <Button variant="contained" sx={{ backgroundColor: "#ffd800", '&:hover': { backgroundColor: '#f4ca16' } }} onClick={() => handleOpen('empanadas', precioCarta.tresQuesos, "Tres Quesos")}>Editar <EditIcon /> </Button>
                    </ListItem>


                    <ListItem>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Tres Quesos Media"
                            secondary={'$' + precioCarta.tresQuesos_media}
                        />
                        <Button variant="contained" sx={{ backgroundColor: "#ffd800", '&:hover': { backgroundColor: '#f4ca16' } }} onClick={() => handleOpen('empanadas', precioCarta.tresQuesos_media, "Tres Quesos Media")}>Editar <EditIcon /> </Button>
                    </ListItem>


                    <ListItem>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Ananá"
                            secondary={'$' + precioCarta.anana}
                        />
                        <Button variant="contained" sx={{ backgroundColor: "#ffd800", '&:hover': { backgroundColor: '#f4ca16' } }} onClick={() => handleOpen('empanadas', precioCarta.anana, "Ananá")}>Editar <EditIcon /> </Button>
                    </ListItem>


                    <ListItem>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Ananá Media"
                            secondary={'$' + precioCarta.anana_media}
                        />
                        <Button variant="contained" sx={{ backgroundColor: "#ffd800", '&:hover': { backgroundColor: '#f4ca16' } }} onClick={() => handleOpen('empanadas', precioCarta.anana_media, "Ananá Media")}>Editar <EditIcon /> </Button>
                    </ListItem>


                    <ListItem>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Palmitos"
                            secondary={'$' + precioCarta.palmitos}
                        />
                        <Button variant="contained" sx={{ backgroundColor: "#ffd800", '&:hover': { backgroundColor: '#f4ca16' } }} onClick={() => handleOpen('empanadas', precioCarta.palmitos, "Palmitos")}>Editar <EditIcon /> </Button>
                    </ListItem>


                    <ListItem>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Palmitos Media"
                            secondary={'$' + precioCarta.palmitos_media}
                        />
                        <Button variant="contained" sx={{ backgroundColor: "#ffd800", '&:hover': { backgroundColor: '#f4ca16' } }} onClick={() => handleOpen('empanadas', precioCarta.palmitos_media, "Palmitos Media")}>Editar <EditIcon /> </Button>
                    </ListItem>


                    <ListItem>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Champignon"
                            secondary={'$' + precioCarta.champignon}
                        />
                        <Button variant="contained" sx={{ backgroundColor: "#ffd800", '&:hover': { backgroundColor: '#f4ca16' } }} onClick={() => handleOpen('empanadas', precioCarta.champignon, "Champignon")}>Editar <EditIcon /> </Button>
                    </ListItem>


                    <ListItem>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Champignon Media"
                            secondary={'$' + precioCarta.champignon_media}
                        />
                        <Button variant="contained" sx={{ backgroundColor: "#ffd800", '&:hover': { backgroundColor: '#f4ca16' } }} onClick={() => handleOpen('empanadas', precioCarta.champignon_media, "Champignon Media")}>Editar <EditIcon /> </Button>
                    </ListItem>


                    <ListItem>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Calabresa"
                            secondary={'$' + precioCarta.calabresa}
                        />
                        <Button variant="contained" sx={{ backgroundColor: "#ffd800", '&:hover': { backgroundColor: '#f4ca16' } }} onClick={() => handleOpen('empanadas', precioCarta.calabresa, "Calabresa")}>Editar <EditIcon /> </Button>
                    </ListItem>


                    <ListItem>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Calabresa Media"
                            secondary={'$' + precioCarta.calabresa_media}
                        />
                        <Button variant="contained" sx={{ backgroundColor: "#ffd800", '&:hover': { backgroundColor: '#f4ca16' } }} onClick={() => handleOpen('empanadas', precioCarta.calabresa_media, "Calabresa Media")}>Editar <EditIcon /> </Button>
                    </ListItem>


                    <ListItem>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Panceta"
                            secondary={'$' + precioCarta.panceta}
                        />
                        <Button variant="contained" sx={{ backgroundColor: "#ffd800", '&:hover': { backgroundColor: '#f4ca16' } }} onClick={() => handleOpen('empanadas', precioCarta.panceta, "Panceta")}>Editar <EditIcon /> </Button>
                    </ListItem>


                    <ListItem>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Panceta Media"
                            secondary={'$' + precioCarta.panceta_media}
                        />
                        <Button variant="contained" sx={{ backgroundColor: "#ffd800", '&:hover': { backgroundColor: '#f4ca16' } }} onClick={() => handleOpen('empanadas', precioCarta.panceta_media, "Panceta Media")}>Editar <EditIcon /> </Button>
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
                    <Box sx={{ display: 'flex' }}>
                        <TextField id="standard-basic" onChange={(e) => setTextoModal({ ...textoModal, precio: e.target.value })} value={textoModal.precio} variant="standard" />
                        <Button sx={{ ml: 2 }} onClick={actualizarPrecio} color="primary" variant="contained">Confirmar<CheckIcon /></Button>
                    </Box>
                </Box>
            </Modal>
        </Grid>
    )
}

export default ListaProductos