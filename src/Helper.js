import axios from "axios";
import { Cookies } from "react-cookie";

let cookie = new Cookies();
export const baseURL = "https://doctor-service.onrender.com";
let axiosInstance = axios.create({
    baseURL,
});
export const imgPath = "https://doctor-service.onrender.com/";
export const sanitizeImagePath = (path) => {
    return path.replace(/\\/g, "/");
};

axiosInstance.interceptors.request.use(
    async function (config) {
        const token = cookie.get("token");
        if (token !== null || token !== undefined) {
            config.headers["x-access-token"] = token;
        }
        return config;
    },
    function (err) {
        return Promise.reject(err);
    }
);

export default axiosInstance;
