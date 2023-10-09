import axios from "axios"

const backend = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_BASE_URL}`,
    headers: {
        "Content-Type": "application/json"
    }
})

export default backend
