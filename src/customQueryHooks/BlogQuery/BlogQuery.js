import { useMutation, useQuery } from "@tanstack/react-query";
import {
    createComment,
    getAllBlog,
    getAllComments,
    getSearchBlog,
    getSingleBlog,
} from "../../api/functionApi/BlogApi";
import { queryClient } from "../globalHooks/globalHooks";

export const useAllBlog = (selectBlog) => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ["allBlog", selectBlog],
        queryFn: () => getAllBlog(selectBlog),
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });
    return { data, isError, isLoading };
};

export const useGetSearchBlog = (searchVal) => {
    const {
        data: searchData,
        isLoading: isLoader,
        isError: error,
    } = useQuery({
        queryKey: ["searchBlog", searchVal],
        queryFn: () => getSearchBlog(searchVal),
        enabled: !!searchVal,
    });
    return { searchData, isLoader, error };
};

export const useGetSingleBlog = (id) => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ["singleBlog", id],
        queryFn: () => getSingleBlog(id),
    });
    return { data, isError, isLoading };
};

export const useSingleComment = (id) => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ["allComments", id],
        queryFn: () => getAllComments(id),
    });
    return { data, isError, isLoading };
};
export const useCreateComment = (payload) => {
    return useMutation({
        mutationFn: createComment,
        onSuccess: (response) => {
            if (response.status === 200) {
                queryClient.invalidateQueries("allComments");
            }
        },
    });
};
