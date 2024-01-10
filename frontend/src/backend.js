import axios from "axios"

const backend = axios.create({
    // baseURL: `${import.meta.env.VITE_BACKEND_BASE_URL}` || 'http://localhost:3000/',
    baseURL: 'http://localhost:3000/',
    headers: {
        "Content-Type": "application/json"
    }
})

export default backend
