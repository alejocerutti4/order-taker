import axios from "axios";

const url = "https://secure-river-58529.herokuapp.com/api/v1/";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaWF0IjoxNjYwMzQ2ODEzLCJleHAiOjE2NjAzNDg2MTN9.0uvhQra3rCnw-CpRpL0NGPJmI6Vfd1jZQNp7fRaODfU";
const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,

};
const getAllProductos = async () => {
    const response = await axios.get(url + "productos", { headers });
    return response.data;
}

export { getAllProductos };

