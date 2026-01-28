import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_JOB_APP_API_URL,
    withCredentials: true
})


axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status == 401) {
            console.log("Unauthorized - redirecting to login");
            window.location.href = '/login'

        }

        return Promise.reject(error)
    }
)


export default axiosInstance