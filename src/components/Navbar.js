import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';


const Navbar = () => {
    return (
        <>
            <CssBaseline />
            <AppBar
                position="absolute"
                color="default"
                elevation={0}
                sx={{
                    position: 'relative',
                    borderBottom: (t) => `1px solid ${t.palette.divider}`,
                }}
            >
                <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography variant="h6" color="inherit" noWrap>
                        La Abuela VM
                    </Typography>
                    <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
                        <Link style={{textDecoration: 'inherit'}} to="/">
                            <Typography variant="h6" sx={{mx:2}} color="inherit" noWrap>
                                Comanda
                            </Typography>
                        </Link>
                        <Link style={{textDecoration: 'inherit'}} to="/administracion-productos">
                            <Typography sx={{textDecoration: "none"}} variant="h6" color="inherit" noWrap>
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