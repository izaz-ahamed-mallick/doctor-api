import axiosInstance from "../../Helper";
import { endpoints } from "../endPoints/endpoints";

export const getUserDasboard = async (id) => {
    const response = await axiosInstance.get(`${endpoints.user}/${id}`);
    return response.data.data;
};
