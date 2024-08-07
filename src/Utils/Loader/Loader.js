import React from "react";
import "./Loader.css";

const Loader = () => {
    return (
        <div className="bg-gray-100 min-h-[1400px] flex flex-col">
            {/* Hero Section Loader */}
            <div className="relative w-full h-80 bg-gray-300 overflow-hidden">
                <div className="absolute inset-0 shimmer"></div>
                <div className="relative flex flex-col items-center justify-center h-full bg-gray-200">
                    <div className="w-3/4 h-8 bg-gray-400 rounded mb-4 shimmer"></div>
                    <div className="w-1/2 h-6 bg-gray-400 rounded shimmer"></div>
                </div>
            </div>

            {/* Department Cards Loader */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array(6)
                        .fill(0)
                        .map((_, index) => (
                            <div
                                key={index}
                                className="bg-gray-300 shadow-lg rounded-lg overflow-hidden relative border border-gray-200"
                            >
                                <div className="relative h-48 bg-gray-400 shimmer"></div>
                                <div className="p-6 bg-gray-200">
                                    <div className="w-3/4 h-6 bg-gray-400 rounded mb-4 shimmer"></div>
                                    <div className="w-1/2 h-4 bg-gray-400 rounded mb-4 shimmer"></div>
                                    <div className="flex justify-between">
                                        <div className="w-1/2 h-8 bg-gray-400 rounded shimmer"></div>
                                        <div className="w-1/2 h-8 bg-gray-400 rounded shimmer"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Loader;
