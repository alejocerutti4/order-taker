import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import './Navbar.css'
import { useEffect, useState } from 'react';
import { Button, SwipeableDrawer, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
const Img = styled('img')({
    width: "100px"
})

const Div = styled('div')({
    textAlign: 'center',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: "64px"
});
const Navbar = () => {

    const [hideBox, setHideBox] = useState(false);
    const [open, setOpen] = useState(false);

    const matches = useMediaQuery('(max-width:700px)');
    const handleToggle = () => setOpen(!open);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        if (matches) {
            setHideBox(true);
        } else {
            setHideBox(false);
        }
    }, [matches]);
    
    return (
        <>
            <CssBaseline />
            <AppBar
                id="Navbar"
                position="absolute"
                color="default"
                elevation={0}
                sx={{
                    position: 'relative',
                }}
            >
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Div>
                        <Img src="./logo_abuela_transparente_white.png" alt="logo" />
                      
                    </Div>
                    {
                        hideBox ? 
                        (
                           
                            
                                <>
                                    <Button onClick={handleToggle}><MenuIcon fontSize="large" sx={{color: "white", mr: 4}}/></Button>
                                    <SwipeableDrawer
                                        anchor="right"
                                        open={open}
                                        onClose={handleOpen}
                                        onOpen={handleClose}
                                    >
                                        <Box sx={{ height: "100%", backgroundColor: "#800040", width: "250px", display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
                                            <Button sx={{justifyContent: "flex-end"}} onClick={handleToggle}><RestaurantMenuIcon fontSize="large" sx={{color: "white", ml: 4}}/></Button>
                                            <List>
                                                <ListItem disablePadding>
                                                    <ListItemButton>
                                                    <ListItemIcon>
                                                        <LabelImportantIcon sx={{color: "white"}} />
                                                    </ListItemIcon>
                                                    <Link onClick={handleClose} style={{ textDecoration: 'inherit' }} to="/">
                                                        <ListItemText sx={{color: "white"}} primary="Comanda" />
                                                    </Link>
                                                    </ListItemButton>
                                                </ListItem>
                                                <ListItem disablePadding>
                                                    <ListItemButton>
                                                    <ListItemIcon>
                                                        <LabelImportantIcon sx={{color: "white"}} />
                                                    </ListItemIcon>
                                                    <Link onClick={handleClose} style={{ textDecoration: 'inherit' }} to="/administracion-productos">
                                                        <ListItemText sx={{color: "white"}} primary="Productos" />
                                                    </Link>
                                                    </ListItemButton>
                                                </ListItem>
                                                <ListItem disablePadding>
                                                    <ListItemButton>
                                                    <ListItemIcon>
                                                        <LabelImportantIcon sx={{color: "white"}} />
                                                    </ListItemIcon>
                                                    <Link onClick={handleClose} style={{ textDecoration: 'inherit' }} to="/promociones">
                                                        <ListItemText sx={{color: "white"}} primary="Promociones" />
                                                    </Link>
                                                    </ListItemButton>
                                                </ListItem>
                                            </List> 
                                        </Box>
                                    </SwipeableDrawer>
                                </>
                               
                           
                        )
                        :
                        (<Box sx={{ display: 'flex', justifyContent: 'space-around', mr:8}}>
                            <Link style={{ textDecoration: 'inherit' }} to="/">
                                <Typography variant="h6" sx={{ mx: 2 }} color="white" noWrap>
                                    Comanda
                                </Typography>
                            </Link>
                            <Link style={{ textDecoration: 'inherit' }} to="/administracion-productos">
                                <Typography sx={{ textDecoration: "none" }} variant="h6" color="white" noWrap>
                                    Productos
                                </Typography>
                            </Link>
                            <Link style={{ textDecoration: 'inherit' }} to="/promociones">
                                <Typography sx={{ textDecoration: "none", mx:2}} variant="h6" color="white" noWrap>
                                    Promociones
                                </Typography>
                            </Link>
                        </Box>)
                    }

                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar