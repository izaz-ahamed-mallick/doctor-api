// AppointmentModal.js
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import apiInstence from "../Utils/Helper";
import { useSelector } from "react-redux";

Modal.setAppElement("#root");

const AppointmentModal = ({ isOpen, onRequestClose, onConfirm }) => {
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const doctorDetails = useSelector(
        (state) => state.doctorReducer.doctorDetails
    );
    const [id, setId] = useState();

    const getAppoinment = async () => {
        const doctorData = {
            user_id: id,
            department_id: doctorDetails.department_id._id,
            doctor_id: doctorDetails._id,
            phone: phoneNumber,
            message: "New Appointment Please Approve",
        };
        try {
            const res = await apiInstence.post(
                "/createappointment",
                doctorData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (res.status == "200") {
                alert(res.data.message);
                onRequestClose();
            }
            console.log(res);
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
            onRequestClose();
        }
    };
    useEffect(() => {
        setId(localStorage.getItem("userId"));
    }, []);

    // const handleConfirm = () => {
    //     getAppoinment();
    //     onConfirm(phoneNumber);

    // };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Appointment Modal"
            className="fixed inset-0 flex items-center justify-center z-50"
            overlayClassName="fixed inset-0 bg-black opacity-90"
        >
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
                <h2 className="text-lg font-bold mb-4">
                    Enter your phone number
                </h2>
                <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Phone Number"
                    className="border border-gray-300 rounded-md w-full py-2 px-3 mb-4"
                    required
                />
                <div className="flex justify-center">
                    <button
                        onClick={getAppoinment}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2"
                    >
                        Confirm
                    </button>
                    <button
                        onClick={onRequestClose}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md"
                    >
                        Close
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default AppointmentModal;
