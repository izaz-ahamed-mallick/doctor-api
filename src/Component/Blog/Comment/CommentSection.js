import React from "react";
import { useForm } from "react-hook-form";
import {
    useCreateComment,
    useSingleComment,
} from "../../../customQueryHooks/BlogQuery/BlogQuery";
import { Cookies } from "react-cookie";
import Comment from "./Commnet";
import LoadingButton from "../../../Utils/LoadingButton/LoadingButton";
import ShimmerLoader from "../../../Utils/CommentLoader/ShimmerLoader";
import ErrorPage from "../../../Utils/Errorpage/ErrorPage";

const CommentSection = ({ id }) => {
    const cookie = new Cookies();
    const { data, isLoading, isError } = useSingleComment(id);
    const { mutate, isPending } = useCreateComment();

    const {
        register,
        handleSubmit,

        reset,
    } = useForm();

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("blog_Id", id);
        formData.append("user_id", cookie.get("userId"));
        formData.append("comment", data.comment);

        mutate(formData);
        reset();
    };

    if (isLoading)
        return (
            <>
                <ShimmerLoader />
            </>
        );
    if (isError)
        return (
            <>
                <ErrorPage />
            </>
        );

    return (
        <div className="flex flex-col items-center py-12 px-6">
            <div className="bg-gray-100 p-8 rounded-lg shadow-lg max-w-4xl w-full">
                <h2 className="text-2xl font-bold mb-6">Comments</h2>
                <div className="space-y-4 h-[300px] flex flex-col md:overflow-y-scroll overflow-y-scroll overflow-x-hidden  ">
                    {data
                        .slice()
                        .reverse()
                        .map((comment, index) => (
                            <Comment key={index} commentSec={comment} />
                        ))}
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
                    <input
                        {...register("comment", {
                            required: "This is required",
                        })}
                        type="text"
                        placeholder="Add a comment..."
                        className="w-full border border-gray-300 rounded-lg py-2 px-4 mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <LoadingButton
                        bgCol={"bg-blue-500"}
                        hoverCol={"bg-blue-600"}
                        isLoading={isPending}
                    >
                        Comment
                    </LoadingButton>
                </form>
            </div>
        </div>
    );
};

export default CommentSection;
