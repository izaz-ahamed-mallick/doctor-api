import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import apiInstence, { imgPath } from "../../Utils/Helper";
import Comments from "./Comments";

const Blog = ({ title, description, image, createdAt, blogId }) => {
    const formattedDate = format(new Date(createdAt), "MMMM dd, yyyy");
    const userId = localStorage.getItem("userId");
    const [comment, setComment] = useState("");
    const [allComments, setAllComments] = useState([]);

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("blog_Id", blogId);
        formData.append("user_id", userId);
        formData.append("comment", comment);
        try {
            await apiInstence.post("/createblogcomment", formData, {
                headers: { "Content-Type": "application/json" },
            });
            setComment("");
            getComments();
        } catch (error) {
            console.log(error.message);
        }
    };

    const getComments = async () => {
        try {
            const res = await apiInstence.get(`/getblogcomment/${blogId}`);
            setAllComments(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getComments();
    }, []);

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden mb-6">
            <img
                src={imgPath + image}
                alt={title}
                className="w-full h-64 object-cover object-center"
            />
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{title}</h2>
                <p className="text-gray-600 mb-4">{formattedDate}</p>
                <p>{description}</p>
            </div>
            <div className="mb-4">
                <form onSubmit={handleCommentSubmit}>
                    <textarea
                        value={comment}
                        onChange={handleCommentChange}
                        placeholder="Add a comment"
                        className="w-full p-2 border border-gray-300 rounded mb-2"
                        required
                    ></textarea>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Submit
                    </button>
                </form>
            </div>
            <Comments allComments={allComments} />
        </div>
    );
};

export default Blog;
