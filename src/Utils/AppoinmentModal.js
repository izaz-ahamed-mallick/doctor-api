import React from "react";
import { useForm } from "react-hook-form";

import crossIcon from "../Images/crossicon2.png";
import LoadingButton from "./LoadingButton/LoadingButton";

const AppointmentModal = ({
    isOpen,
    onRequestClose,
    handleOnSubmit,
    isPending,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = (data) => {
        handleOnSubmit(data);
        reset();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-gray-700">
                        Book Appointment
                    </h2>
                    <button
                        onClick={onRequestClose}
                        className="text-white hover:text-gray-300 transition duration-300 ease-in-out"
                    >
                        <img
                            src={crossIcon}
                            alt="Close"
                            className="h-16 w-16"
                        />
                    </button>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-4 space-y-4"
                >
                    <div>
                        <label className="block text-gray-700">
                            Phone Number
                        </label>
                        <input
                            {...register("phone", {
                                required: "Phone number is required",
                            })}
                            type="text"
                            name="phone"
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.phone.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-gray-700">
                            Reason for Appointment
                        </label>
                        <textarea
                            {...register("reason", {
                                required: "Reason is required",
                            })}
                            name="reason"
                            rows="3"
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                        ></textarea>
                        {errors.reason && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.reason.message}
                            </p>
                        )}
                    </div>
                    <div className="flex justify-end">
                        <LoadingButton
                            bgCol="bg-blue-600"
                            hoverCol="bg-blue-700"
                            isLoading={isPending}
                        >
                            Submit
                        </LoadingButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AppointmentModal;
