import { useQuery } from "@tanstack/react-query";
import { getUserDasboard } from "../../api/functionApi/User";

export const useGetUserDashBoard = (id) => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ["userDetails", id],
        queryFn: () => getUserDasboard(id),
    });
    return { data, isError, isLoading };
};
