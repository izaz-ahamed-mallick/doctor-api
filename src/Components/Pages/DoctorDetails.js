import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiInstance, { imgPath } from "../Utils/Helper";
import Loader from "../Utils/Loader/Loader";
import AppointmentModal from "../Pages/AppoinmentModal";
import { useDispatch, useSelector } from "react-redux";
import { addDoctorDetails } from "../Utils/Store/DoctorSlice";

const DoctorDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const doctorDetails = useSelector(
        (state) => state.doctorReducer.doctorDetails
    );

    const getDoctorDetails = async () => {
        try {
            const res = await apiInstance.get(`/doctordetails/${id}`);
            dispatch(addDoctorDetails(res.data.data));
        } catch (error) {
            console.error("Error fetching doctor details:", error);
        }
    };

    useEffect(() => {
        if (!doctorDetails) getDoctorDetails();
        return () => {
            dispatch(addDoctorDetails(null));
        };
    }, [id]);

    const toggleDescription = () => setIsExpanded(!isExpanded);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleConfirm = (phoneNumber) => {
        console.log("Phone Number:", phoneNumber);
        handleCloseModal();
    };

    return doctorDetails ? (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <button
                    onClick={() => navigate(-1)}
                    className="border p-2 m-4 rounded-lg bg-gray-100 hover:bg-gray-200"
                >
                    Back
                </button>
                <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-1/3 p-4">
                        <img
                            className="rounded-md w-full object-cover"
                            src={imgPath + doctorDetails?.image}
                            alt={doctorDetails?.name}
                        />
                    </div>
                    <div className="lg:w-2/3 p-6 flex flex-col justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-2 text-gray-900">
                                {doctorDetails.name}
                            </h1>
                            <h2 className="text-xl font-medium mb-4 text-gray-700">
                                {doctorDetails?.department_id.departmentName}
                            </h2>
                            <p className="text-gray-700 mb-4">
                                {isExpanded
                                    ? doctorDetails.description
                                    : `${doctorDetails.description.substring(
                                          0,
                                          150
                                      )}...`}
                            </p>
                            <button
                                className="text-blue-500 hover:underline"
                                onClick={toggleDescription}
                            >
                                {isExpanded ? "Show less" : "Show more"}
                            </button>
                        </div>
                        <div className="mt-6">
                            <button
                                onClick={handleOpenModal}
                                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                            >
                                Book Appointment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <AppointmentModal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                onConfirm={handleConfirm}
            />
        </div>
    ) : (
        <Loader />
    );
};

export default DoctorDetails;
