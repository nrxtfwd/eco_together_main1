import axios from "axios";

const BASE_URL = 'https://eco-together-main1-2.onrender.com/api'

const api = axios.create({
    baseURL : BASE_URL
})

export default api