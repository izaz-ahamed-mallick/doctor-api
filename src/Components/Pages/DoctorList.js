import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import apiInstence, { imgPath } from "../Utils/Helper";
import Loader from "../Utils/Loader/Loader";
import { addDoctorList, updateCache } from "../Utils/Store/DoctorListSlice";
import GetAllDepertmemt from "./GetAllDepertmemt";

const DoctorList = () => {
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [selectdeptName, setselectdeptName] = useState(null);

    const dispatch = useDispatch();
    const { doctorLists, cache } = useSelector((state) => state.doctorList);

    const getDoctorList = async (deptId = null) => {
        try {
            let data;
            if (deptId) {
                if (cache.departmentWise[deptId]) {
                    data = cache.departmentWise[deptId];
                } else {
                    const res = await apiInstence.get(
                        `/departmentidwisedoctor/${deptId}`
                    );
                    data = res.data.data;
                    dispatch(
                        updateCache({
                            departmentWise: {
                                ...cache.departmentWise,
                                [deptId]: data,
                            },
                        })
                    );
                }
            } else {
                if (cache.allDoctors) {
                    data = cache.allDoctors;
                } else {
                    const res = await apiInstence.get("/alldoctordepartment");
                    data = res.data.data;
                    dispatch(updateCache({ allDoctors: data }));
                }
            }
            dispatch(addDoctorList(data));
        } catch (error) {
            console.log(error);
        }
    };

    const handleFetchAllDoctors = () => {
        getDoctorList();
        setselectdeptName("All Doctor's");
    };

    const handleDepartmentSelect = (deptName, departmentId) => {
        setSelectedDepartment(departmentId);
        getDoctorList(departmentId);
        setselectdeptName(deptName);
    };

    useEffect(() => {
        getDoctorList();
        return () => dispatch(addDoctorList(null));
    }, []);

    return doctorLists ? (
        <div className="w-full min-h-screen bg-gray-100">
            <div className="mb-4">
                <GetAllDepertmemt
                    handleFetchAllDoctors={handleFetchAllDoctors}
                    onDepartmentSelect={handleDepartmentSelect}
                />
            </div>

            <div>
                <h1 className="font-semibold text-3xl m-2">
                    {selectedDepartment ? selectdeptName : `All Doctor's`}
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6">
                    {doctorLists.map((list) => (
                        <Link
                            to={`/doctordetails/${list._id}`}
                            key={list._id}
                            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105"
                        >
                            <div className="flex flex-col items-center p-6">
                                <img
                                    className="w-[130px] h-[130px] object-cover rounded-full border-4 border-blue-500"
                                    src={imgPath + list.image}
                                    alt={list.name}
                                />
                                <h1 className="mt-4 text-xl font-semibold text-gray-900">
                                    {list.name}
                                </h1>
                                <div className="mt-2 text-gray-600 text-center">
                                    {list.department_details ? (
                                        list.department_details.map((dept) => (
                                            <p key={dept.doctor_id[0]}>
                                                {dept.departmentName}
                                            </p>
                                        ))
                                    ) : (
                                        <p>
                                            {list.department_id.departmentName}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    ) : (
        <Loader />
    );
};

export default DoctorList;
