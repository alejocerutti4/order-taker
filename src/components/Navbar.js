import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import './Navbar.css'

const Img = styled('img')({
    width: "100px"
})

const Div = styled('div')({
    textAlign: 'center',
    color: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: "64px"
});
const Navbar = () => {
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
                    borderBottom: (t) => `1px solid ${t.palette.divider}`,
                }}
            >
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Div>
                        <Img src="./logo_abuela_transparente.png" alt="logo" />
                      
                    </Div>

                    <Box sx={{ display: 'flex', justifyContent: 'space-around', mr:8}}>
                        <Link style={{ textDecoration: 'inherit' }} to="/">
                            <Typography variant="h6" sx={{ mx: 2 }} color="black" noWrap>
                                Comanda
                            </Typography>
                        </Link>
                        <Link style={{ textDecoration: 'inherit' }} to="/administracion-productos">
                            <Typography sx={{ textDecoration: "none" }} variant="h6" color="black" noWrap>
                                Productos
                            </Typography>
                        </Link>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar