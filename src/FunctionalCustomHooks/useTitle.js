import React, { useEffect } from "react";

export const useTitle = (title) => {
    useEffect(() => {
        document.title = `Doctor Consult || ${title}`;
    }, [title]);
};
