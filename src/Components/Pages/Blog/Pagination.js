// src/components/Pagination.js
import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex justify-center mt-4">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 mx-1 bg-gray-200 text-gray-700 rounded-lg"
            >
                Previous
            </button>
            <span className="px-4 py-2 mx-1 bg-gray-200 text-gray-700 rounded-lg">
                Page {currentPage} of {totalPages}
            </span>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 mx-1 bg-gray-200 text-gray-700 rounded-lg"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
