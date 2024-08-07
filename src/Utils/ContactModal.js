import React from "react";
import { useForm } from "react-hook-form";
// import axios from "axios"; // Adjust if you have a custom axios instance
// import { useContactUs } from "../../../customHooks/DoctorQuery";
import crossIcon from "../Images/crossicon2.png";
import LoadingButton from "./LoadingButton/LoadingButton";

const ContactUsModal = ({ isOpen, onClose }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    // const { mutate, isPending } = useContactUs();

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("topic", data.topic);
        formData.append("phone", data.phone);
        formData.append("msg", data.message);

        // mutate(formData);
        // !isPending && onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Contact Us
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-white hover:text-gray-300 transition duration-300 ease-in-out"
                    >
                        <img
                            src={crossIcon}
                            alt="Close"
                            width={60}
                            height={60}
                        />
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-semibold mb-2"
                            htmlFor="name"
                        >
                            Name
                        </label>
                        <input
                            {...register("name", {
                                required: "Name is required",
                            })}
                            type="text"
                            id="name"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your name"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>
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
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your email"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-semibold mb-2"
                            htmlFor="topic"
                        >
                            Topic
                        </label>
                        <input
                            {...register("topic", {
                                required: "Topic is required",
                            })}
                            type="text"
                            id="topic"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter the topic"
                        />
                        {errors.topic && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.topic.message}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-semibold mb-2"
                            htmlFor="phone"
                        >
                            Phone
                        </label>
                        <input
                            {...register("phone", {
                                required: "Phone number is required",
                            })}
                            type="tel"
                            id="phone"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your phone number"
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.phone.message}
                            </p>
                        )}
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-semibold mb-2"
                            htmlFor="message"
                        >
                            Message
                        </label>
                        <textarea
                            {...register("message", {
                                required: "Message is required",
                            })}
                            id="message"
                            rows="4"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your message"
                        />
                        {errors.message && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.message.message}
                            </p>
                        )}
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                        >
                            Cancel
                        </button>
                        <LoadingButton
                            bgCol={"bg-blue-600"}
                            hoverCol={"bg-blue-700"}
                            // isLoading={isPending}
                        >
                            Send
                        </LoadingButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactUsModal;
