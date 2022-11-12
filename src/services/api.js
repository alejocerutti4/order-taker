import axios from "axios";

const url = "http://54.207.49.31:8080/api/v1/";

const getAllProductos = async () => {
    const token = localStorage.getItem("token");
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
    const response = await axios.get(url + "productos", { headers });
    return response.data;
}

const updateProducto = async (producto, id) => {
    const token = localStorage.getItem("token");
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
    const response = await axios.put(url + "productos/" + id, producto, { headers });
    return response;
}

const logIn = async (email, password) => {
    try{
        const response = await axios.post(url + "login", { email, password });
        return response;
    }catch(e){
        return e.response;
    }
}
export { getAllProductos, updateProducto, logIn };

