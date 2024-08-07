import React from "react";
import { useNavigate } from "react-router-dom"; // Use react-router-dom for navigation
import blogImg from "../../Images/BlogHome.jpeg";
import HeroSection2 from "../../Utils/HeroSection2";
import { useTitle } from "../../FunctionalCustomHooks/useTitle";

const BlogHome = () => {
    useTitle("Blog home");
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/bloglist");
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <HeroSection2
                backgroundImage={blogImg}
                title="Welcome to Our Blog"
                description="Stay updated with the latest health tips and news."
                buttonText="Explore Our Blog"
                onButtonClick={handleNavigate}
            />
            {/* Additional content for the blog home page */}
            <div className="flex flex-col items-center py-12 px-6">
                <section className="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full text-gray-800">
                    <h2 className="text-3xl font-semibold mb-4">
                        Featured Articles
                    </h2>
                    <p className="text-lg mb-4">
                        Explore our featured articles to get insights on various
                        health topics.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default BlogHome;
