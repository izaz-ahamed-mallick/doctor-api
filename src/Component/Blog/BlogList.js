import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Changed from 'next/link'

import blogPlaceholder from "../../Images/singleBlog.jpeg";

import { imgPath, sanitizeImagePath } from "../../Helper";

import HeroSection from "../../Utils/HeroSection";
import {
    useAllBlog,
    useGetSearchBlog,
} from "../../customQueryHooks/BlogQuery/BlogQuery";
import Pagination from "../../Utils/Pagination";
import Loader from "../../Utils/Loader/Loader";

const BlogList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [selectBlog, setSelectBlog] = useState("allblog"); // State for filter
    const { data, isError, isLoading } = useAllBlog(selectBlog);
    const { searchData, isLoader } = useGetSearchBlog(searchValue);

    const blogsPerPage = 3;

    if (isLoading || isLoader)
        return (
            <>
                <Loader />
            </>
        );

    // Filtering and pagination logic
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;

    // Apply filter and search logic
    let filteredBlogs = searchValue ? searchData : data;

    const paginatedBlogs = filteredBlogs.slice(
        indexOfFirstBlog,
        indexOfLastBlog
    );
    const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

    const handleSearch = () => {
        const value = searchQuery.toLowerCase().trim();
        setSearchValue(value);
        setCurrentPage(1);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
    };

    const handleFilterChange = (e) => {
        setSelectBlog(e.target.value);
        setSearchValue("");
        setSearchQuery("");
        setCurrentPage(1);
    };

    const paginate = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <HeroSection
                imageSrc={blogPlaceholder}
                title="Our Blog"
                subtitle="Stay updated with the latest news and articles"
            />

            <div className="flex flex-col items-center py-12 px-6">
                <section className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full text-gray-800">
                    {/* Search and Filter */}
                    <div className="mb-8 flex justify-center flex-col md:flex-row gap-3 md:gap-0 items-center space-x-4 shadow-2xl p-4 rounded-full">
                        <div className="flex  gap-4 w-full">
                            <input
                                type="text"
                                placeholder="Search blogs..."
                                value={searchQuery}
                                onChange={handleInputChange}
                                className="w-full max-w-md border border-gray-300 rounded-l-lg py-2 md:px-4 px-2 text-sm md:text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={handleSearch}
                                className="bg-blue-500 hover:bg-blue-600 text-white py-2 md:px-4 px-2 md:text-lg text-xs rounded-r-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            >
                                Search
                            </button>
                        </div>

                        <select
                            value={selectBlog}
                            onChange={handleFilterChange}
                            className="border border-gray-300 rounded-lg py-2 md:px-4 px-1 text-xs md:text-lg  text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="allblog">All Blogs</option>
                            <option value="recentblog">Recent Blogs</option>
                        </select>
                    </div>

                    {paginatedBlogs.length > 0 ? (
                        paginatedBlogs.map((blog) => (
                            <div
                                key={blog._id}
                                className="mb-8 shadow-2xl p-4 rounded-xl"
                            >
                                <Link to={`/bloglist/${blog._id}`}>
                                    {" "}
                                    {/* Changed from 'next/link' */}
                                    <div className="relative h-64 w-full mb-4 rounded-lg overflow-hidden">
                                        <img
                                            src={
                                                imgPath +
                                                    sanitizeImagePath(
                                                        blog.image
                                                    ) || blogPlaceholder
                                            }
                                            alt={blog.title}
                                            className="absolute inset-0 object-cover"
                                        />
                                    </div>
                                    <h2 className="text-2xl font-bold mb-2">
                                        {blog.title}
                                    </h2>
                                    <p className="text-lg text-gray-700 mb-4">
                                        {blog.description.slice(0, 150)}
                                        ...
                                    </p>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <h1 className="text-center text-3xl font-semibold">
                            No Blog Found
                        </h1>
                    )}

                    {/* Pagination */}
                    {paginatedBlogs.length > 0 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={paginate}
                        />
                    )}
                </section>
            </div>
        </div>
    );
};

export default BlogList;
