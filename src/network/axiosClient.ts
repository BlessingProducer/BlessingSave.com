import axios from 'axios'

const apiUrl ="http://127.0.0.1:5000"

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
