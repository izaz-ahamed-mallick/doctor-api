import axiosInstance from "../../Helper";
import { endpoints } from "../endPoints/endpoints";

export const getAllDepartments = async () => {
    const response = await axiosInstance.get(endpoints.doctor.allDepartment);
    return response.data.data;
};

export const getAlldoctor = async (id) => {
    const response = await axiosInstance.get(
        `${endpoints.doctor.departmentDoctor}/${id}`
    );
    return response.data.data;
};

export const createAppoinment = async (payload) => {
    const response = await axiosInstance.post(
        `${endpoints.doctor.appoinment}`,
        payload,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return response.data.data;
};

export const getDoctorDetails = async (id) => {
    const response = await axiosInstance.get(
        `${endpoints.doctor.doctorDetails}/${id}`
    );
    return response.data;
};
