import React, { useEffect, useState, Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import bgImg from "../../Images/DoctorPage.jpeg";

import useScrollToSection from "../../FunctionalCustomHooks/useScrollToSection";

// Dynamically import components to mimic `React.Suspense`
const AboutUs = lazy(() => import("../About/AboutUs"));
const BlogHome = lazy(() => import("../Blog/BlogHome"));
const Loader = () => <div>Loading...</div>; // Placeholder for your Loader component

const DoctorList = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { aboutUsRef, blogHomeRef, homeRef } = useScrollToSection();

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div>
            <div
                ref={homeRef}
                className="relative w-full h-screen overflow-hidden"
            >
                <div className="absolute inset-0">
                    <img
                        src={bgImg}
                        alt="Doctor Consultation"
                        style={{
                            objectFit: "cover",
                            width: "100%",
                            height: "100%",
                        }}
                        className="absolute inset-0"
                    />
                </div>
                <div className="relative flex flex-col items-center justify-center h-full text-center text-white bg-black bg-opacity-40 p-6 md:p-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                        Welcome to Doctor Consult
                    </h1>
                    <p className="text-lg md:text-2xl mb-8">
                        Your trusted partner in health and wellness.
                    </p>
                    <Link
                        to="/departments"
                        className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg shadow-lg text-lg md:text-xl transition duration-300 ease-in-out"
                    >
                        Explore Our Departments
                    </Link>
                </div>
            </div>
            <div ref={aboutUsRef}>
                <Suspense fallback={<Loader />}>
                    <AboutUs />
                </Suspense>
            </div>
            <div ref={blogHomeRef}>
                <Suspense fallback={<Loader />}>
                    <BlogHome />
                </Suspense>
            </div>
            <button
                onClick={scrollToTop}
                className={`fixed bottom-20 right-4 w-12 h-12 animate-bounce bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg transition-opacity duration-300 ease-in-out ${
                    isVisible ? "opacity-100" : "opacity-0"
                }`}
                title="Scroll to top"
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7-7-7 7"
                    />
                </svg>
            </button>
        </div>
    );
};

const DoctorHome = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <DoctorList />
    </Suspense>
);

export default DoctorHome;
