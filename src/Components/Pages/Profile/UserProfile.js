import React from "react";
import apiInstence from "../../Utils/Helper";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Utils/Loader/Loader";
import { format } from "date-fns";

const UserProfile = () => {
    const { id } = useSelector((state) => state.auth.userData);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, "PPPP");
    };
    const getUserDetails = async () => {
        const res = await apiInstence.get(`/userdash/${id}`);
        return res;
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ["user", id],
        queryFn: getUserDetails,
    });

    return isLoading ? (
        <Loader />
    ) : (
        <div>
            <h1 className="text-2xl font-semibold border-b-2 py-2">
                Appointment
            </h1>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Doctor Name
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Time
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Date
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y border divide-gray-200">
                    {data?.data.data.map((appointment) => (
                        <tr key={appointment._id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {appointment.doctor_id.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {appointment.doctor_id.aperture_time}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {formatDate(appointment.doctor_id.date)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserProfile;
