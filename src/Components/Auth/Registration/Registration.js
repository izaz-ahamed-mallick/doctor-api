import React from "react";
import { useForm } from "react-hook-form";
import apiInstence from "../../Utils/Helper";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();
    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("phone", data.phone);
        formData.append("password", data.password);
        formData.append("forget", data.confrmpassword);
        formData.append("image", data.image[0]);
        try {
            const res = await apiInstence.post("/register", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            if (res.data.success) {
                alert(res.data.message);
                navigate("/login");
            }
            console.log(res.data);
        } catch (error) {
            console.error("Error registering user:", error);
            alert(error.response.data.message);
        }
    };

    const password = watch("password");
    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Registration Form</h2>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        {...register("name", {
                            required: "This field is required",
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
                        Email
                    </label>
                    <input
                        {...register("email", {
                            required: "This field is required",
                        })}
                        type="email"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.email && (
                        <span className="text-red-500 text-sm">
                            {errors.email.message}
                        </span>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Phone
                    </label>
                    <input
                        {...register("phone", {
                            required: "This field is required",
                        })}
                        type="tel"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.phone && (
                        <span className="text-red-500 text-sm">
                            {errors.phone.message}
                        </span>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        {...register("password", {
                            required: "This field is required",
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
                    <label className="block text-sm font-medium text-gray-700">
                        Confirm Password
                    </label>
                    <input
                        {...register("confrmpassword", {
                            required: "This field is required",
                            validate: (value) =>
                                value === password || "Passwords do not match",
                        })}
                        type="password"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.confrmpassword && (
                        <span className="text-red-500 text-sm">
                            {errors.confrmpassword.message}
                        </span>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Image
                    </label>
                    <input
                        {...register("image", {
                            required: "This field is required",
                        })}
                        type="file"
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                    {errors.image && (
                        <span className="text-red-500 text-sm">
                            {errors.image.message}
                        </span>
                    )}
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Register
                    </button>
                </div>
                <div>
                    <p>
                        Already have an account?{" "}
                        <Link to={"/login"} className="text-blue-600">
                            Login
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Registration;
