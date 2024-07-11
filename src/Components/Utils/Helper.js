import axios from "axios";

const apiInstence = axios.create({
    baseURL: "https://doctor-service.onrender.com",
});

export const imgPath = "https://doctor-service.onrender.com/";

apiInstence.interceptors.request.use(
    async function (config) {
        const token =
            localStorage.getItem("token") || sessionStorage.getItem("token");
        if (token !== null || token !== undefined) {
            config.headers["x-access-token"] = token;
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

export default apiInstence;
