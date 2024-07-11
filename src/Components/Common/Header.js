import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Utils/Store/AuthSlice";
import { imgPath } from "../Utils/Helper";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated, userData } = useSelector((state) => state.auth);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
        setDropdownOpen(false);
    };

    const handleContactUs = () => {
        navigate("/contactus");
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <header className="bg-blue-900 fixed top-0 w-full z-50 shadow-md p-6 flex justify-between items-center">
            <Link to={"/alldoctor"} className="text-2xl font-bold text-white">
                <span>Doctor App</span>
            </Link>
            {isAuthenticated && userData && (
                <div className="flex items-center space-x-4">
                    <Link
                        to="/allblog"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                    >
                        Blog
                    </Link>
                    <div className="relative">
                        <button
                            onClick={toggleDropdown}
                            className="flex items-center bg-transparent text-white font-semibold py-2 px-4 rounded focus:outline-none"
                        >
                            {userData.image && (
                                <img
                                    src={imgPath + userData.image}
                                    alt="Profile"
                                    className="w-8 h-8 rounded-full mr-2"
                                />
                            )}
                            <span className="mr-2">{userData.name}</span>
                            <svg
                                className="fill-current h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 12a1 1 0 0 1-.707-.293l-4-4a1 1 0 0 1 1.414-1.414L10 9.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4A1 1 0 0 1 10 12z"
                                />
                            </svg>
                        </button>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                                <Link
                                    onClick={() => setDropdownOpen(false)}
                                    to="/userprofile"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Profile
                                </Link>
                                <button
                                    onClick={handleContactUs}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Contact Us
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
