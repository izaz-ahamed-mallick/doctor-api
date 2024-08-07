import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import departmentImage from "../../../Images/department1.jpeg";
import HeroSection from "../../../Utils/HeroSection";
import { useGetAllDepartment } from "../../../customQueryHooks/DoctorQuery/DoctorQuery";
import { imgPath, sanitizeImagePath } from "../../../Helper";
import Loader from "../../../Utils/Loader/Loader";

const Departments = () => {
    const [expandedDept, setExpandedDept] = useState(null);
    const { data, isError, isLoading } = useGetAllDepartment();
    const navigate = useNavigate();

    if (isLoading)
        return (
            <div className="text-center p-8">
                <Loader />
            </div>
        );
    if (isError)
        return <div className="text-center p-8">Error loading departments</div>;

    const handleLearnMore = (deptName) => {
        setExpandedDept((prev) => (prev === deptName ? null : deptName));
    };

    const handleCheckDoctor = (deptName, deptId) => {
        navigate(`/doctor/${deptName}/${deptId}`);
    };

    return (
        <div className="bg-gray-100 min-h-[1400px]">
            {/* Hero Section */}
            <HeroSection
                title="Our Departments"
                subtitle="Discover our specialized departments dedicated to providing exceptional care."
                imageSrc={departmentImage} // Update the path accordingly
                height="h-80"
                textColor="text-white"
            />

            {/* Department Cards */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.map((dept) => (
                        <div
                            key={dept.departmentName}
                            className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 relative border border-gray-200"
                        >
                            <div className="relative h-48">
                                {dept.image ? (
                                    <img
                                        src={
                                            imgPath +
                                            sanitizeImagePath(dept.image)
                                        }
                                        alt={dept.departmentName}
                                        className="h-full w-full  object-cover"
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                                        <span className="text-gray-500">
                                            No Image Available
                                        </span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-300 hover:bg-opacity-50 "></div>
                            </div>
                            <div
                                className={`p-6 transition-all duration-300 ease-in-out ${
                                    expandedDept === dept.departmentName
                                        ? "max-h-[400px] opacity-100"
                                        : "max-h-60 opacity-75"
                                }`}
                                style={{ overflow: "hidden" }}
                            >
                                <h2 className="text-2xl font-semibold mb-2">
                                    {dept.departmentName}
                                </h2>
                                <p className="text-gray-700 mb-4">
                                    {expandedDept === dept.departmentName
                                        ? dept.description
                                        : `${dept.description.slice(
                                              0,
                                              100
                                          )}...`}
                                </p>
                                <div className="flex justify-between">
                                    <button
                                        onClick={() =>
                                            handleLearnMore(dept.departmentName)
                                        }
                                        className="bg-blue-600 text-white xl:px-4 xl:text-lg sm:px-2 px-2 py-2 md:px-1 md:py-2 md:text-sm rounded-lg hover:bg-blue-700 transition duration-300"
                                    >
                                        {expandedDept === dept.departmentName
                                            ? "Show Less"
                                            : "Learn More"}
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleCheckDoctor(
                                                dept.departmentName,
                                                dept._id
                                            )
                                        }
                                        className="bg-green-600 text-white xl:px-4 xl:text-lg sm:px-2 px-2 py-2 md:px-1 md:py-2 md:text-sm rounded-lg hover:bg-green-700 transition duration-300"
                                    >
                                        Check Our Doctor
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Departments;
