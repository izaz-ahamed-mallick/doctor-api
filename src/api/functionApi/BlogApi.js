import axiosInstance from "../../Helper";
import { endpoints } from "../endPoints/endpoints";

export const getAllBlog = async (selectBlog) => {
    const respose = await axiosInstance.get(`/${selectBlog}`);
    return respose.data.data;
};

export const getSearchBlog = async (searchVal) => {
    const response = await axiosInstance.get(
        `${endpoints.blog.searchBlog}/${searchVal}`
    );
    return response.data.data;
};

export const getSingleBlog = async (id) => {
    const response = await axiosInstance.get(
        `${endpoints.blog.singleBlog}/${id}`
    );
    return response.data.data;
};

export const getAllComments = async (id) => {
    const response = await axiosInstance.get(
        `${endpoints.blog.commentSec}/${id}`
    );
    return response.data.data;
};

export const createComment = async (payload) => {
    const response = await axiosInstance.post(
        endpoints.blog.createCommnet,
        payload,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return response.data;
};
