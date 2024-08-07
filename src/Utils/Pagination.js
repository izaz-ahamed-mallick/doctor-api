import React, { useState } from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex justify-center gap-4 shadow-2xl">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="md:px-4 px-2 py-2 mx-1 text-xs md:text-md bg-gray-200 text-gray-700 rounded-lg"
            >
                Previous
            </button>
            <span className="md:px-4 px-2 py-2 mx-1 text-xs md:text-md bg-gray-200 text-gray-700 rounded-lg">
                Page {currentPage} of {totalPages}
            </span>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="md:px-4 px-2 py-2 mx-1 text-xs md:text-md bg-gray-200 text-gray-700 rounded-lg"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
