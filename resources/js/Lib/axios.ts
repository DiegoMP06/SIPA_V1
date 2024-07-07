import axios from "axios";


const api = axios.create({
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        "Accept": "application/json",
        'X-Request-With': 'XMLHttpRequest',
    }
})

export default api
