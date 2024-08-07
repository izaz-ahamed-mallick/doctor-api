import { useMutation, useQuery } from "@tanstack/react-query";
import {
    createAppoinment,
    getAllDepartments,
    getAlldoctor,
    getDoctorDetails,
} from "../../api/functionApi/DoctorApi";
import { queryClient } from "../globalHooks/globalHooks";
import { toast } from "react-toastify";

export const useGetAllDepartment = () => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ["alldepartments"],
        queryFn: getAllDepartments,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });

    return { data, isError, isLoading };
};

export const useDepartmentDoctor = (id) => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ["departmentDoctor", id],
        queryFn: () => getAlldoctor(id),
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });

    return { data, isError, isLoading };
};

export const useCreateAppointment = () => {
    return useMutation({
        mutationFn: createAppoinment,
        onSuccess: (response) => {
            const { message } = response.data;
            if (response.status === 200) {
                toast.success(message);

                queryClient.invalidateQueries("userDetails");
            }
        },
        onError: (error) => {
            const { message } = error.response.data;
            toast.error(message);
        },
    });
};

export const useDoctorDetails = (id) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["doctorDetails", id],
        queryFn: () => getDoctorDetails(id),
    });
    return { data, isLoading, isError };
};
