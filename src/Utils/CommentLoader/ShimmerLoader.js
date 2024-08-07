import React from "react";
import "./Comment.css";

const ShimmerLoader = () => {
    return (
        <div className="flex flex-col items-center py-12 px-6">
            <div className="bg-gray-100 p-8 rounded-lg shadow-lg max-w-4xl w-full">
                {/* Header Placeholder */}
                <div className="w-1/4 h-6 bg-gray-400 rounded mb-6 shimmer"></div>

                {/* Comments Section Placeholder */}
                <div className="space-y-4 h-[300px] flex flex-col md:overflow-y-scroll overflow-y-scroll overflow-x-hidden">
                    {Array(5) // Adjust the number of placeholders as needed
                        .fill(0)
                        .map((_, index) => (
                            <div
                                key={index}
                                className="flex items-start space-x-4 bg-gray-300 p-4 rounded-lg shadow-lg relative border border-gray-200"
                            >
                                <div className="w-12 h-12 bg-gray-400 rounded-full shimmer"></div>
                                <div className="flex-1 space-y-4">
                                    <div className="w-3/4 h-4 bg-gray-400 rounded shimmer"></div>
                                    <div className="w-full h-4 bg-gray-400 rounded shimmer"></div>
                                </div>
                            </div>
                        ))}
                </div>

                {/* Input and Button Placeholder */}
                <form className="mt-6">
                    <div className="w-full bg-gray-300 rounded-lg py-2 px-4 mb-4 h-10 shimmer"></div>
                    <div className="w-full bg-gray-300 rounded-lg h-10 shimmer"></div>
                </form>
            </div>
        </div>
    );
};

export default ShimmerLoader;
