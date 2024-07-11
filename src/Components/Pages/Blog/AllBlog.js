import React, { useState, useEffect } from "react";
import apiInstence from "../../Utils/Helper";
import { useQuery } from "@tanstack/react-query";
import Pagination from "./Pagination";
import Blog from "./Blog";
import Loader from "../../Utils/Loader/Loader";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const AllBlog = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 1;
    const [selectBlog, setSelectBlog] = useState("/allblog");
    const [searchResults, setSearchResults] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        const searchQuery = data.search.trim();
        if (searchQuery) {
            try {
                const res = await apiInstence.get(`/blogsearch/${searchQuery}`);
                setSearchResults(res.data.data);
            } catch (error) {
                console.log("Error fetching search results:", error);
                setSearchResults(null);
            }
        } else {
            setSearchResults(null);
        }
    };

    const getAllBlog = async () => {
        const res = await apiInstence.get(selectBlog);
        return res.data;
    };

    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ["allblog", selectBlog],
        queryFn: getAllBlog,
        staleTime: 60000,
    });

    const handleSelect = (e) => {
        setSelectBlog(e.target.value);
        setCurrentPage(1);
        reset();
        setSearchResults(null);
    };

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const totalPages = Math.ceil(
        (searchResults?.length || data?.data?.length || 0) / blogsPerPage
    );

    const currentBlog =
        (searchResults || data?.data)?.slice(
            (currentPage - 1) * blogsPerPage,
            currentPage * blogsPerPage
        ) || [];

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="p-6 w-full">
            <div className="flex justify-between items-center mb-4">
                <Link
                    to={"/alldoctor"}
                    className="border px-4 py-2 border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition"
                >
                    Home
                </Link>
                <select
                    value={selectBlog}
                    onChange={handleSelect}
                    className="border border-gray-300 rounded p-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    <option value="allblog">All Blogs</option>
                    <option value="recentblog">Recent Blog</option>
                </select>
            </div>
            <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden mb-6 p-4">
                <form
                    className="flex items-center"
                    action=""
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <input
                        {...register("search", {
                            required: "This field is required",
                        })}
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search blog..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r"
                    >
                        Search
                    </button>
                </form>
            </div>
            {currentBlog && currentBlog.length > 0 ? (
                currentBlog.map((blog) => (
                    <Blog
                        key={blog._id}
                        title={blog.title}
                        description={blog.description}
                        image={blog.image}
                        createdAt={blog.createdAt}
                        blogId={blog._id}
                    />
                ))
            ) : (
                <>
                    <h1 className="text-center font-semibold text-2xl">
                        No search result!!
                    </h1>
                </>
            )}
            {currentBlog && currentBlog.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
};

export default AllBlog;
