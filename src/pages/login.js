import { useState, useEffect } from "react";
import {
  Alert,
  Avatar,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
} from "@mui/material";
import KeyOffIcon from "@mui/icons-material/KeyOff";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { logIn } from "../services/api";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const paperStyle = {
    padding: 20,
    minHeight: "40vh",
    width: 300,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#510029" };
  const btnstyle = { margin: "8px 0" };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  
  const iniciarSesion = async () => {
    const response = await logIn(email, password);
    if(response.status === 200){
        navigate("/home");   
        localStorage.setItem("email", email);
        localStorage.setItem("token", response.data.token);
        setEmail("");	
        setPassword("");
    }else{
        setShowError(true);
    }
  }
  return (
    <Grid
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <KeyOffIcon />
          </Avatar>
          <h2>Iniciar sesión</h2>
        </Grid>
        <TextField
          label="Email"
          placeholder="Ingresar email"
          variant="outlined"
          fullWidth
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <FormControl required variant="outlined" sx={{width: "100%", mt:2}}>
          <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder= "Ingresar contraseña"
            fullWidth
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            }
            label="Contraseña"
            
          />
        </FormControl>
        {
            showError && <Alert sx={{mt: 2}} variant="filled" severity="error">
                            <strong>Email o contraseña incorrecto</strong>
                        </Alert>
        }
        <FormControlLabel
          control={<Checkbox name="checkedB" color="primary" />}
          label="Recordarme"
          sx={{mt: 1}}
        />
        <Button
          sx={{  backgroundColor: "#510029", '&:hover': { backgroundColor: '#38011d' } }}
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
          onClick={iniciarSesion}
        >
          Iniciar sesión
        </Button>
      </Paper>
    </Grid>
  );
};

export default Login;
