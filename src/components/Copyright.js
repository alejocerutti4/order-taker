import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';



const Copyright = () => {
    return (
      <Typography variant="body2" sx={{color: "white"}} align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          La Abuela VM
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

export default Copyright