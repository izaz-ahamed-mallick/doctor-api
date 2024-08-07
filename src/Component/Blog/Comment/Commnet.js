import React from "react";

import userImg from "../../../Images/userIcon.jpeg";

const Comment = ({ commentSec }) => {
    return (
        <div className="flex items-start space-x-4 p-4 bg-white shadow-md rounded-lg mb-4">
            <img
                width={48}
                height={48}
                src={userImg}
                alt="User Avatar"
                className="w-12 h-12 rounded-full object-cover"
            />
            <div>
                <h4 className="text-lg font-bold">
                    {commentSec.user_id?.name}
                </h4>
                <p className="text-gray-700">{commentSec.comment}</p>
            </div>
        </div>
    );
};

export default Comment;
