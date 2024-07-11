import React, { useEffect, useState } from "react";
import apiInstence from "../Utils/Helper";
import { useDispatch, useSelector } from "react-redux";
import { updateCache } from "../Utils/Store/DoctorListSlice";

const GetAllDepertmemt = ({ onDepartmentSelect, handleFetchAllDoctors }) => {
    const [department, setDepartment] = useState(null);
    const { cache } = useSelector((state) => state.doctorList);
    const dispatch = useDispatch();

    const getDeptName = async () => {
        let data;
        if (cache.allDept) {
            data = cache.allDept;
            setDepartment(data);
        } else {
            try {
                const res = await apiInstence.get("/alldepartment");

                setDepartment(res.data.data);
                dispatch(updateCache({ allDept: res.data.data }));
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        getDeptName();
    }, []);

    return (
        department && (
            <div className="h-[70px] flex gap-4 items-center p-6 bg-gray-100 rounded-lg shadow-lg">
                <button
                    onClick={() => handleFetchAllDoctors()}
                    className="border-2 border-blue-500 bg-blue-500 text-white hover:bg-white hover:text-blue-500 px-6 py-2 rounded-full font-semibold transition-colors duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                    Show All Doctors
                </button>
                {department.map((name) => (
                    <button
                        key={name._id}
                        onClick={() =>
                            onDepartmentSelect(name.departmentName, name._id)
                        }
                        className="border-2 border-blue-500 bg-blue-500 text-white hover:bg-white hover:text-blue-500 px-6 py-2 rounded-full font-semibold transition-colors duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        {name.departmentName}
                    </button>
                ))}
            </div>
        )
    );
};

export default GetAllDepertmemt;
