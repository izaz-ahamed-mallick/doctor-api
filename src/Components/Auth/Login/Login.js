import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import apiInstence from "../../Utils/Helper";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Utils/AuthProvider";
import { useDispatch, useSelector } from "react-redux";
import { addUserInfo } from "../../Utils/Store/UserSlice";
import { login } from "../../Utils/Store/AuthSlice";

const Login = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append("email", data.email);
            formData.append("password", data.password);

            const response = await apiInstence.post("/login", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.data.status == "200") {
                alert(response.data.message);
                const token = response.data.token;
                const user = {
                    token: token,
                    name: response.data.data.name,
                    id: response.data.data._id,
                    image: response.data.data.image,
                };

                dispatch(login(user));
                dispatch(addUserInfo(response.data.data));
                navigate("/alldoctor");
            }
            console.log(response.data); // Handle response
        } catch (error) {
            console.error("Error logging in:", error);
            alert(error.response.data.message);
        }
    };

    return (
        <div className="max-w-md  mx-auto mt-36 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Login</h2>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        {...register("email", {
                            required: "Email is required",
                        })}
                        type="text"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.name && (
                        <span className="text-red-500 text-sm">
                            {errors.name.message}
                        </span>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        {...register("password", {
                            required: "Password is required",
                        })}
                        type="password"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.password && (
                        <span className="text-red-500 text-sm">
                            {errors.password.message}
                        </span>
                    )}
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Login
                    </button>
                </div>
                <div>
                    <p>
                        Don't have an account?{" "}
                        <Link to={"/reg"} className="text-blue-600">
                            Register
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;
