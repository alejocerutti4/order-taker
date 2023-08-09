import { useState, useEffect } from "react";
import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Modal,
  Box,
  Button,
  TextField,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import styled from "@emotion/styled";
import {
  LocalPizza,
  LunchDining,
  WineBar,
  BakeryDining,
  Fastfood,
  SportsBar,
  Edit,
  Done,
  Delete,
} from "@mui/icons-material";
import Loader from "../Loader";
import {
  getAllProductos,
  guardarNuevoProducto,
  updateProducto,
  deleteProducto,
} from "../../services/api";
import { SyncLoader } from "react-spinners";

const Demo = styled("div")({
  backgroundColor: "#f2b705",
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ListaProductos = () => {
  const [open, setOpen] = useState(false);
  const [textoModal, setTextoModal] = useState({
    value: "",
    precio: 0,
    tipo: "",
    id: "",
  });
  const [productos, setProductos] = useState([]);
  const [productosAlmacenados, setProductosAlmacenados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [spinner, setSpinner] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("success");

  const handleOpen = (value, precio, tipo, id) => {
    setOpen(true);
    setTextoModal({ value, precio, tipo, id });
  };
  const handleClose = () => setOpen(false);
  const actualizarPrecio = async () => {
    let objectIndex = productos.findIndex((p) => p.id === textoModal.id);
    productos[objectIndex].costo = textoModal.precio;
    setProductos([...productos]);
    const producto = {
      name: textoModal.value,
      costo: textoModal.precio,
      tipo: textoModal.tipo,
    };
    setSpinner(true);
    try {
      await updateProducto(producto, textoModal.id);
    } catch (e) {
      console.log(e);
      setToastMessage("Error al editar el producto");
      setToastSeverity("error");
    } finally {
      setSpinner(false);
      setToastMessage("Producto editado con éxito");
      getProductos();
    }
    handleClose();
    setTextoModal({ value: "", precio: 0, tipo: "", id: "" });
  };

  const renderToast = (severity, message) => {
    return (
      <Snackbar
        open={toastMessage !== ""}
        variant="filled"
        autoHideDuration={4000}
        onClose={() => {
          setToastMessage("");
          setToastSeverity("success");
        }}
      >
        <Alert
          onClose={() => {
            setToastMessage("");
            setToastSeverity("success");
          }}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    );
  };

  const guardarProducto = async () => {
    const newProducto = {
      name: textoModal.value,
      costo: textoModal.precio,
      tipo: textoModal.tipo,
    };

    setSpinner(true);
    try {
      await guardarNuevoProducto(newProducto);
    } catch (error) {
      console.error("Error saving new product:", error);
      setToastMessage("Error al guardar el producto");
      setToastSeverity("error");
    } finally {
      setSpinner(false);
      setToastMessage("Producto guardado con éxito");
      getProductos();
    }

    handleClose();
    setTextoModal({ value: "", precio: 0, tipo: "", id: "" });
  };

  const getProductos = async () => {
    try {
      const data = await getAllProductos();
      // take out product tipo empanada
      const productos = data
        .filter((prod) => prod.tipo !== "empanada")
        .sort((a, b) => {
          if (a.tipo === "empanada_precio" && b.tipo !== "empanada_precio") {
            return -1;
          }
          if (a.tipo !== "empanada_precio" && b.tipo === "empanada_precio") {
            return 1;
          }
          if (a.tipo < b.tipo) {
            return -1;
          }
          if (a.tipo > b.tipo) {
            return 1;
          }
          return 0;
        });
      setProductos(productos);
      setProductosAlmacenados(productos);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  const buscarProducto = (e) => {
    const busqueda = e.target.value;
    if (busqueda === "") {
      setProductos(productosAlmacenados);
    } else {
      const productosFiltrados = productosAlmacenados.filter((prod) =>
        prod.name.trim().toLowerCase().includes(busqueda.trim().toLowerCase())
      );
      setProductos(productosFiltrados);
    }
  };

  const deleteNewProducto = async (id) => {
    try {
      await deleteProducto(id);
    } catch (error) {
      console.error("Error deleting product:", error);
      setToastMessage("Error al eliminar el producto");
      setToastSeverity("error");
    } finally {
      getProductos();
      setToastMessage("Producto eliminado con éxito");
      setToastSeverity("success");
    }
  };

  const getIcon = (tipo) => {
    switch (tipo) {
      case "sandwich":
        return <LunchDining />;
      case "pizza":
        return <LocalPizza />;
      case "empanada_precio":
        return <BakeryDining />;
      case "promocion":
        return <Fastfood />;
      case "cerveza":
        return <SportsBar />;
      case "vino":
        return <WineBar />;
      case "gaseosa":
        return <Fastfood />;
      default:
        return <Fastfood />;
    }
  };

  useEffect(() => {
    getProductos();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Grid item xs={12} md={6}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Lista de productos
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpen("", 0, "", "")} // Initialize empty values for the modal fields
          sx={{ mt: 4, mb: 2, width: "200px", height: "40px" }}
        >
          + Nuevo Producto
        </Button>
      </Box>
      <input
        type="search"
        placeholder="Buscar producto..."
        onChange={(e) => buscarProducto(e)}
        id="Buscador"
      />
      <Demo>
        <List sx={{ backgroundColor: "white" }}>
          {productos.map((producto) => {
            return (
              <ListItem key={producto.id}>
                <ListItemIcon>{getIcon(producto.tipo)}</ListItemIcon>
                <ListItemText
                  primary={producto.name}
                  secondary={"$" + producto.costo}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      handleOpen(
                        producto.name,
                        producto.costo,
                        producto.tipo,
                        producto.id
                      )
                    }
                  >
                    Editar <Edit />{" "}
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => deleteNewProducto(producto.id)}
                  >
                    Eliminar
                    <Delete />
                  </Button>
                </Box>
              </ListItem>
            );
          })}
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
            Nuevo Producto
          </Typography>
          <TextField
            label="Nombre"
            variant="standard"
            fullWidth
            value={textoModal.value}
            onChange={(e) =>
              setTextoModal({ ...textoModal, value: e.target.value })
            }
            sx={{ marginTop: 2 }}
          />
          <TextField
            label="Precio"
            variant="standard"
            fullWidth
            value={textoModal.precio}
            onChange={(e) =>
              setTextoModal({ ...textoModal, precio: e.target.value })
            }
            sx={{ marginTop: 2 }}
          />
          <TextField
            select
            label="Tipo"
            variant="standard"
            fullWidth
            value={textoModal.tipo}
            onChange={(e) =>
              setTextoModal({ ...textoModal, tipo: e.target.value })
            }
            sx={{ marginTop: 2 }}
          >
            <MenuItem value="pizza">Pizza</MenuItem>
            <MenuItem value="gaseosa">Gaseosa</MenuItem>
            <MenuItem value="cerveza">Cerveza</MenuItem>
            <MenuItem value="vino">Vino</MenuItem>
            <MenuItem value="sandwich">Sandwich</MenuItem>
            <MenuItem value="empanada_precio">Precio Empanadas</MenuItem>
          </TextField>
          <Button
            sx={{ marginTop: 2 }}
            onClick={textoModal.id === "" ? guardarProducto : actualizarPrecio}
            color="primary"
            variant="contained"
          >
            Guardar
            {!spinner ? <Done /> : <SyncLoader size={5} color="#ffffff" />}
          </Button>
        </Box>
      </Modal>
      {renderToast(toastSeverity, toastMessage)}
    </Grid>
  );
};

export default ListaProductos;
