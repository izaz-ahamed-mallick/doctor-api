// ContactForm.js
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import apiInstence from "../Utils/Helper";
import { useNavigate } from "react-router-dom";

const ContactForm = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("topic", data.topic);
        formData.append("phone", data.phone);
        formData.append("msg", data.message);

        try {
            const res = await apiInstence.post("/createcontact", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (res.status == "200") {
                alert(res.data.message);
                reset();
            }
        } catch (error) {
            alert(error.response.data.message);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button
                onClick={() => navigate(-1)}
                className="border p-2 m-4 rounded-md font-semibold"
            >
                Back
            </button>
            <div className="max-w-2xl mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-gray-700 font-semibold"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            {...register("name", { required: true })}
                            placeholder="Your Name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                        {errors.name && (
                            <span className="text-red-500">
                                Name is required
                            </span>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 font-semibold"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            {...register("email", {
                                required: true,
                                pattern: /^\S+@\S+$/i,
                            })}
                            placeholder="Your Email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                        {errors.email && (
                            <span className="text-red-500">
                                Valid email is required
                            </span>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="topic"
                            className="block text-gray-700 font-semibold"
                        >
                            Topic
                        </label>
                        <input
                            type="text"
                            id="topic"
                            {...register("topic", { required: true })}
                            placeholder="Subject of your message"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                        {errors.topic && (
                            <span className="text-red-500">
                                Topic is required
                            </span>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="phone"
                            className="block text-gray-700 font-semibold"
                        >
                            Phone
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            {...register("phone", {
                                required: true,
                                pattern: /^\d+$/,
                            })}
                            placeholder="Your Phone Number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                        {errors.phone && (
                            <span className="text-red-500">
                                Valid phone number is required
                            </span>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="message"
                            className="block text-gray-700 font-semibold"
                        >
                            Message
                        </label>
                        <textarea
                            id="message"
                            {...register("message", { required: true })}
                            placeholder="Your Message"
                            rows="4"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        ></textarea>
                        {errors.message && (
                            <span className="text-red-500">
                                Message is required
                            </span>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        {loading ? "Submitting" : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;
