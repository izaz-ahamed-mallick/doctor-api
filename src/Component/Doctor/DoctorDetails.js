import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import img from "../../Images/details2.jpeg";
import { useDoctorDetails } from "../../customQueryHooks/DoctorQuery/DoctorQuery";
import HeroSection from "../../Utils/HeroSection";
import { imgPath, sanitizeImagePath } from "../../Helper";
import Loader from "../../Utils/Loader/Loader";
import { useTitle } from "../../FunctionalCustomHooks/useTitle";
import ErrorPage from "../../Utils/Errorpage/ErrorPage";

const DoctorDetails = () => {
    const params = useParams();
    const { drId } = params;
    useTitle("Doctor Details");
    const { data, isError, isLoading } = useDoctorDetails(drId);
    const navigate = useNavigate(); // Initialize the navigate function

    if (isLoading)
        return (
            <div>
                <Loader />
            </div>
        );
    if (isError)
        return (
            <>
                <ErrorPage error={"Error loading doctor details"} />
            </>
        );

    const { data: doctor } = data;

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Hero Section */}
            <HeroSection
                title={`${doctor.name}`}
                subtitle={doctor.department_id.departmentName}
                imageSrc={img} // Update the path accordingly
                height="h-80"
                textColor="text-white"
            />

            {/* Back Button */}
            <div className="container mx-auto px-4 py-4">
                <button
                    onClick={() => navigate(-1)} // Navigate back to the previous page
                    className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300"
                >
                    Back
                </button>
            </div>

            {/* Doctor Details */}
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
                    <div className="p-6">
                        <div className="flex items-center space-x-6">
                            <div className="flex-shrink-0 w-32 h-32 relative">
                                <img
                                    src={
                                        imgPath +
                                        sanitizeImagePath(doctor.image)
                                    }
                                    alt={doctor.name}
                                    style={{
                                        objectFit: "cover",
                                        width: "100%",
                                        height: "100%",
                                    }}
                                    className="rounded-full"
                                />
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold mb-2">
                                    {doctor.name}
                                </h2>
                                <p className="text-gray-600 mb-4">
                                    {doctor.description}
                                </p>
                                <p className="text-gray-600 mb-2">
                                    <strong>Department:</strong>{" "}
                                    {doctor.department_id.departmentName}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorDetails;
