import React from "react";

// Create a separate CSS file or add the loader styles to your existing CSS
import "./LoadingButton.css"; // Ensure this file contains the .loader styles

const LoadingButton = ({ isLoading = false, children, bgCol, hoverCol }) => {
    return (
        <button
            className={`relative text-white py-2 px-4 rounded-lg ${bgCol} transition duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed ${
                isLoading ? "bg-[#4a4a4a]" : undefined
            } ${isLoading ? "cursor-not-allowed" : undefined} 
               ${isLoading ? bgCol : hoverCol}`}
            disabled={isLoading}
        >
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="loader"></div>
                </div>
            )}
            <span
                className={`transition-opacity ${
                    isLoading ? "opacity-0" : "opacity-100"
                } text-md md:text-xl`}
            >
                {children}
            </span>
        </button>
    );
};

export default LoadingButton;
