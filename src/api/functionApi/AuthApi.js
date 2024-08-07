import axiosInstance from "../../Helper";
import { endpoints } from "../endPoints/endpoints";

export const isLogin = async (payload) => {
    const response = await axiosInstance.post(
        `${endpoints.auth.login}`,
        payload
    );
    return response;
};

export const isSignUp = async (payload) => {
    const response = await axiosInstance.post(
        `${endpoints.auth.signup}`,
        payload
    );
    return response;
};
