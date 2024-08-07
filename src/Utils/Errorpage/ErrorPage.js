import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import errorGif from "../../Images/error2.png"; // Replace with the actual path to your animated error GIF

const ErrorPage = ({ error }) => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        // Redirect to the home page or any other relevant page
        navigate("/");
    };

    return (
        <motion.div
            className="min-h-screen flex flex-col items-center justify-center bg-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <motion.div
                className="text-center"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.img
                    src={errorGif}
                    alt="Error"
                    className="mb-8 mx-auto"
                    style={{ maxWidth: "400px", width: "100%", height: "auto" }}
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    transition={{ type: "spring", stiffness: 100 }}
                />
                <motion.h1
                    className="text-4xl font-bold text-gray-800 mb-4"
                    initial={{ x: -200 }}
                    animate={{ x: 0 }}
                    transition={{ type: "spring", stiffness: 100 }}
                >
                    Oops! Something went wrong.
                </motion.h1>
                <motion.p
                    className="text-lg text-gray-600 mb-6"
                    initial={{ x: 200 }}
                    animate={{ x: 0 }}
                    transition={{ type: "spring", stiffness: 100 }}
                >
                    {error || "We can't find the page you're looking for"}
                </motion.p>
                <motion.button
                    onClick={handleGoBack}
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    Go Back to Home
                </motion.button>
            </motion.div>
        </motion.div>
    );
};

export default ErrorPage;
