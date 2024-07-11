// src/components/Footer.js
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-blue-800 text-white py-4">
            <div className="container mx-auto text-center">
                <p>
                    &copy; {new Date().getFullYear()} Doctor App. All rights
                    reserved.
                </p>
                <p>
                    <Link
                        to="/privacy-policy"
                        className="text-blue-400 hover:underline"
                    >
                        Privacy Policy
                    </Link>{" "}
                    |{" "}
                    <Link
                        to="/terms-of-service"
                        className="text-blue-400 hover:underline"
                    >
                        Terms of Service
                    </Link>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
