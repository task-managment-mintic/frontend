import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:4400/api',
    withCredentials: true
})

instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('auth_token')
        if (token) {
            config.headers['Authorization'] = token
        }
        return config
    },
    error => Promise.reject(error)
)

export default instance