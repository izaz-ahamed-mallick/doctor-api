import React, { useState } from "react";
import { imgPath } from "../../Utils/Helper";

const Comments = ({ allComments }) => {
    const [displayedComments, setDisplayedComments] = useState(5);

    const handleShowMoreComments = () => {
        setDisplayedComments((prevCount) => prevCount + 5);
    };

    const handleShowLessComments = () => {
        setDisplayedComments((prevCount) => Math.max(prevCount - 5, 5));
    };

    return (
        <div className="p-6 h-[300px] overflow-y-auto">
            <h3 className="text-xl font-bold mb-2">Comments</h3>
            {allComments && allComments.length > 0 ? (
                <div>
                    <div className="">
                        {allComments
                            .slice()
                            .reverse()
                            .slice(0, displayedComments)
                            .map((comment) => (
                                <div
                                    key={comment._id}
                                    className="mb-2 border-b pb-2 flex items-start space-x-4"
                                >
                                    <img
                                        src={imgPath + comment.user_id.image}
                                        alt={"userimg"}
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div>
                                        <p className="font-bold">
                                            {comment.user_id.name}
                                        </p>
                                        <p>{comment.comment}</p>
                                    </div>
                                </div>
                            ))}
                    </div>
                    <div className="flex gap-4">
                        {displayedComments > 5 && (
                            <button
                                onClick={handleShowLessComments}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded mt-4"
                            >
                                Show less
                            </button>
                        )}
                        {displayedComments < allComments.length && (
                            <button
                                onClick={handleShowMoreComments}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded mt-4"
                            >
                                Show more
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <p>No comments yet. Be the first to comment!</p>
            )}
        </div>
    );
};

export default Comments;
