import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import departmentDocImge from "../../Images/Designer (5).jpeg";

import { Cookies } from "react-cookie";

import {
    useCreateAppointment,
    useDepartmentDoctor,
} from "../../customQueryHooks/DoctorQuery/DoctorQuery";
import { imgPath, sanitizeImagePath } from "../../Helper";
import HeroSection from "../../Utils/HeroSection";
import LoadingButton from "../../Utils/LoadingButton/LoadingButton";
import AppointmentModal from "../../Utils/AppoinmentModal";
import Loader from "../../Utils/Loader/Loader";

const Doctorlist = () => {
    const { mutate, isPending } = useCreateAppointment();
    const cookie = new Cookies();
    const params = useParams();
    console.log(params);

    const { id, deptName } = params;
    console.log(id);

    const { data, isError, isLoading } = useDepartmentDoctor(id);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    const navigate = useNavigate();

    const handleOpenModal = (doctor) => {
        setSelectedDoctor(doctor);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedDoctor(null);
    };

    const handleSubmit = (data) => {
        const { _id } = selectedDoctor.department_id;

        // Handle form submission logic here
        const formData = new FormData();
        formData.append("user_id", cookie.get("userId"));
        formData.append("department_id", _id);
        formData.append("doctor_id", selectedDoctor._id);
        formData.append("phone", data.phone);
        formData.append("message", data.reason);
        mutate(formData);

        !isPending && handleCloseModal();
    };

    if (isLoading) {
        return (
            <div>
                <Loader />
            </div>
        );
    }

    if (isError) {
        return <div className="text-center p-8">Error loading doctors</div>;
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Hero Section */}
            <HeroSection
                title={`Doctors in ${deptName} Department`}
                subtitle="Meet our specialized doctors and schedule your appointment with the best professionals."
                imageSrc={departmentDocImge} // Update the path accordingly
                height="h-80"
                textColor="text-white"
            />
            <div className="container mx-auto px-4 py-4">
                <button
                    onClick={() => navigate(-1)} // Navigate back to the previous page
                    className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300"
                >
                    Back
                </button>
            </div>

            {/* Doctors List */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.map((doctor) => (
                        <div
                            key={doctor._id}
                            className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 transition-transform transform hover:scale-105"
                        >
                            <div className="relative h-64">
                                {doctor.image ? (
                                    <img
                                        src={`${imgPath}${sanitizeImagePath(
                                            doctor.image
                                        )}`}
                                        alt={doctor.name}
                                        style={{
                                            objectFit: "cover",
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                                        <span className="text-gray-500">
                                            No Image Available
                                        </span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end justify-center">
                                    <div className="text-center text-white bg-black bg-opacity-60 p-4 rounded-lg">
                                        <h2 className="text-2xl font-semibold mb-2">
                                            {doctor.name}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 bg-gray-50">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-gray-600">
                                        <p className="font-semibold">
                                            Appointment Time:
                                        </p>
                                        <p>{doctor.aperture_time}</p>
                                        <p className="font-semibold">
                                            Departure Time:
                                        </p>
                                        <p>{doctor.departure_time}</p>
                                    </div>
                                    <div
                                        onClick={() => handleOpenModal(doctor)}
                                    >
                                        <LoadingButton
                                            isLoading={isPending}
                                            bgCol={"bg-blue-600"}
                                            hoverCol={"bg-blue-700"}
                                        >
                                            Book Appointment
                                        </LoadingButton>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <Link
                                        to={`/doctor/doctorDetails/${doctor._id}`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Modal */}
            <AppointmentModal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                handleOnSubmit={handleSubmit}
                isPending={isPending}
            />
        </div>
    );
};

export default Doctorlist;
