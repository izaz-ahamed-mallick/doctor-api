import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const PrivateCom = ({ children }) => {
    const token = localStorage.getItem("token");

    return (
        <div className="min-h-screen mt-24">
            {token !== null && token !== undefined ? (
                children
            ) : (
                <>
                    <Navigate to="/" />
                </>
            )}
        </div>
    );
};

export default PrivateCom;
