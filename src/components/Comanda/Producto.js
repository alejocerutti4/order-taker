import React, { useState } from 'react'
import { styled } from '@mui/system';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


const Div1 = styled('div')({
    textAlign: 'center',
    color: 'black',
    backgroundColor: '#f5f5f5',
    height: '40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
});

const Div2 = styled('div')({
    textAlign: 'center',
    color: 'black',
    height: '40px',
    lineHeight: '40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
});

const PersonalizedChipAdd = styled('div')({
    display: "flex",
    position: "relative",
    overflow: "hidden",
    fontSize: "1.25rem",
    backgroundColor: "#32cd32",
    flexShrink: "0",
    alignItems: "center",
    userSelect: "none",
    borderRadius: "50%",
    justifyContent: "center",
    width: "26px",
    color: "#fff",
    height: "26px",
    fontSize: "20px",
    marginRight: "-4px",
    '&:hover': {
        cursor: "pointer",
        backgroundColor: "#2cb82c",
    },
})

const PersonalizedChipRemove = styled('div')({
    display: "flex",
    position: "relative",
    overflow: "hidden",
    fontSize: "1.25rem",
    backgroundColor: "#c62828",
    flexShrink: "0",
    alignItems: "center",
    userSelect: "none",
    borderRadius: "50%",
    justifyContent: "center",
    width: "26px",
    color: "#fff",
    height: "26px",
    fontSize: "20px",
    marginRight: "-4px",
    '&:hover': {
        cursor: "pointer",
        backgroundColor: "#b71c1c"

    },
})


const Producto = ({ name, setPedido, pedido }) => {

    const [cantidad, setCantidad] = useState(0);

    // Agregamos el item, actualizando el texto y la cantidad en el pedido
    const addItem = () => {
        setCantidad(cantidad + 1);
        setPedido({ ...pedido, [name]: cantidad + 1 });
    }

    const removeItem = () => {

        // Decrementamos el item, actualizando el texto y la cantidad en el pedido
        if (cantidad > 0) {
            if(cantidad === 1) {
                delete pedido[name];
                setCantidad(cantidad - 1)
            }else {
                setCantidad(cantidad - 1)
                setPedido({ ...pedido, [name]: cantidad - 1 });

            }
        }

    }
    return (
        <Grid item xs={6} md={4}>
            <Div1>
                <Typography sx={{ ml: 2 }}>{name}</Typography>
                <Div2 sx={{ mr: 2 }}>
                    <PersonalizedChipAdd onClick={addItem}>
                        <AddIcon />
                    </PersonalizedChipAdd>
                    <Typography sx={{ mx: 1 }}>{cantidad}</Typography>
                    <PersonalizedChipRemove onClick={removeItem}>
                        <RemoveIcon />
                    </PersonalizedChipRemove>
                </Div2>

            </Div1>

        </Grid>
    )
}

export default Producto