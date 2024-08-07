import React from "react";
import { useForm } from "react-hook-form";

import loginBg from "../../../Images/loginBg.jpeg";
import logo from "../../../Images/logo.png";
import { useLoginMutation } from "../../../customQueryHooks/AuthQuery/Auth";
import LoadingButton from "../../../Utils/LoadingButton/LoadingButton";
import { Link } from "react-router-dom";
import { useTitle } from "../../../FunctionalCustomHooks/useTitle";

const Login = () => {
    useTitle("Login");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { mutate, isPending } = useLoginMutation();

    const onSubmit = (data) => {
        mutate(data);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative">
            <img
                src={loginBg}
                alt="Login Background"
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                className="absolute inset-0 z-0"
            />
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md backdrop-blur-0 bg-opacity-80 z-10">
                <div className="flex justify-center mb-4">
                    <img
                        src={logo}
                        alt="DoctorConsult Logo"
                        style={{ width: "100px", height: "100px" }}
                    />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
                    Login to DoctorConsult
                </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-semibold mb-2"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email address",
                                },
                            })}
                            type="email"
                            id="email"
                            className="shadow text-sm sm:text-md md:text-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your email"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-semibold mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message:
                                        "Password must be at least 6 characters",
                                },
                            })}
                            type="password"
                            id="password"
                            className="shadow text-sm sm:text-md md:text-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your password"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    <div className="flex items-center justify-between flex-col gap-3 md:flex-row">
                        <LoadingButton
                            type="submit"
                            isLoading={isPending}
                            bgCol={"bg-blue-600"}
                            hoverCol={"bg-blue-700"}
                        >
                            Login
                        </LoadingButton>
                        <Link
                            to="/registration"
                            className="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800 transition duration-300"
                        >
                            Don't have an account? Sign Up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
