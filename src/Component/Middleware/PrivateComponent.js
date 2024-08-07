import React from "react";
import { Cookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const PrivateComponent = ({ children }) => {
    const cookie = new Cookies();
    const token = cookie.get("token");

    return (
        <div className="h-screen">
            {token !== null && token !== undefined ? (
                children
            ) : (
                <>
                    <Navigate to="/" />
                    {toast(
                        "Please go for login either you can't access our Service"
                    )}
                </>
            )}
            ;
        </div>
    );
};

export default PrivateComponent;
