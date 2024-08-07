import { useMutation } from "@tanstack/react-query";
import { isLogin, isSignUp } from "../../api/functionApi/AuthApi";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginDetails } from "../../Store/AuthSlice";
import { useNavigate } from "react-router-dom";

export const useLoginMutation = (payload) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: isLogin,
        onSuccess: (response) => {
            const { status, token, message } = response.data;
            const { image, name, _id, phone, email } = response.data.data;
            if (status === 200) {
                toast.success(message);
                dispatch(
                    loginDetails({ image, name, _id, token, phone, email })
                );
                navigate("/doctorhome");
            }
        },
        onError: (error) => {
            const { message } = error.response.data;
            toast.error(message);
        },
    });
};

export const useSignUpMutation = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: isSignUp,
        onSuccess: (response) => {
            const { message } = response.data;

            if (response.status === 200) {
                toast.success(message);
                navigate("/auth/login");
            }
        },
        onError: (error) => {
            const { message } = error.response.data;
            toast.error(message);
        },
    });
};
