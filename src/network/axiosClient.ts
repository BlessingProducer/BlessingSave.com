import axios from 'axios'

const apiUrl ="https://blessingsoftware.dev"
//const apiUrl = "http://localhost:8000"

const axiosClient = axios.create({
    baseURL: apiUrl,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    withCredentials: true,
    validateStatus: function (status) {
        return status >= 200 && status < 600;
    }
});

export default axiosClient;
