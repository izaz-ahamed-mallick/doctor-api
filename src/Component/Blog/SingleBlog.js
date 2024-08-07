import React from "react";
import { useNavigate, useParams } from "react-router-dom"; // Changed from 'next/navigation'

import blogPlaceholder from "../../Images/singleBlog.jpeg";
import { useGetSingleBlog } from "../../customQueryHooks/BlogQuery/BlogQuery";
import CommentSection from "./Comment/CommentSection";
import { imgPath, sanitizeImagePath } from "../../Helper";
import HeroSection from "../../Utils/HeroSection";
import Loader from "../../Utils/Loader/Loader";

const SingleBlog = () => {
    const { id } = useParams(); // Changed from 'params'
    const navigate = useNavigate();
    const { data, isLoading, isError } = useGetSingleBlog(id);

    if (isLoading)
        return (
            <>
                <Loader />
            </>
        );
    if (isError || !data) return <p>Failed to load blog post</p>;

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <HeroSection
                imageSrc={imgPath + data.image}
                title={data.title}
                subtitle="Stay updated with the latest news and articles"
            />
            <div className="container mx-auto px-4 py-4">
                <button
                    onClick={() => navigate(-1)} // Navigate back to the previous page
                    className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300"
                >
                    Back
                </button>
            </div>
            <div className="flex flex-col items-center py-12 px-6">
                <section className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full text-gray-800">
                    <div className="mb-8 relative h-64 w-full rounded-lg overflow-hidden">
                        <img
                            src={
                                imgPath + sanitizeImagePath(data.image) ||
                                blogPlaceholder
                            }
                            alt={data.title}
                            style={{ objectFit: "cover" }}
                            className="absolute inset-0 object-cover"
                        />
                    </div>
                    <h1 className="text-4xl font-bold mb-6">{data.title}</h1>
                    <div className="text-lg text-gray-700 mb-4">
                        {data.description}
                    </div>
                    <div className="text-base text-gray-600 mb-4">
                        {data.content}
                    </div>
                    <div className="text-sm text-gray-500 mb-4">
                        <p>
                            <strong>Created At:</strong>{" "}
                            {new Date(data.createdAt).toLocaleDateString()}
                        </p>
                        <p>
                            <strong>Updated At:</strong>{" "}
                            {new Date(data.updatedAt).toLocaleDateString()}
                        </p>
                    </div>
                </section>
            </div>
            <CommentSection id={id} />
        </div>
    );
};

export default SingleBlog;
