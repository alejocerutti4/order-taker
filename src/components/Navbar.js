import {useContext} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import './Navbar.css'
import { useEffect, useState } from 'react';
import { Button, IconButton, SwipeableDrawer, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { LogueadoContext } from '../helpers/Context';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
    const { setIsLogged } = useContext(LogueadoContext);

    useEffect(() => {
        if (matches) {
            setHideBox(true);
        } else {
            setHideBox(false);
        }
    }, [matches]);
    
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        setIsLogged(false);
        navigate('/login');
    }
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
                                            <Box sx={{display: "flex", justifyContent: "space-between"}}>
                                                <IconButton onClick={logout} aria-label="logout">
                                                    <ExitToAppIcon sx={{fontSize: "28px", color: "white", ml: 1}} />
                                                </IconButton>
                                                <Button sx={{justifyContent: "flex-end", mr: 1}} onClick={handleToggle}><RestaurantMenuIcon fontSize="large" sx={{color: "white", ml: 4}}/></Button>

                                            </Box>
                                            <List>
                                                <ListItem disablePadding>
                                                    <ListItemButton>
                                                    <ListItemIcon>
                                                        <LabelImportantIcon sx={{color: "white"}} />
                                                    </ListItemIcon>
                                                    <Link onClick={handleClose} style={{ textDecoration: 'inherit' }} to="/home">
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
                            <Link style={{ textDecoration: 'inherit', display: 'flex', alignItems: 'center' }} to="/">
                                <Typography variant="h6" sx={{ mx: 2 }} color="white" noWrap>
                                    Comanda
                                </Typography>
                            </Link>
                            <Link style={{ textDecoration: 'inherit', display: 'flex', alignItems: 'center' }} to="/administracion-productos">
                                <Typography sx={{ textDecoration: "none" }} variant="h6" color="white" noWrap>
                                    Productos
                                </Typography>
                            </Link>
                            <Link style={{ textDecoration: 'inherit', display: 'flex', alignItems: 'center' }} to="/promociones">
                                <Typography sx={{ textDecoration: "none", mx:2}} variant="h6" color="white" noWrap>
                                    Promociones
                                </Typography>
                            </Link>
                            <IconButton onClick={logout} aria-label="logout">
                                <ExitToAppIcon sx={{fontSize: "28px", color: "white"}} />
                            </IconButton>
                        </Box>)
                    }

                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar