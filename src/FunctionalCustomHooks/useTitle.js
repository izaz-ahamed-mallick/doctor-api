import React, { useEffect } from "react";

export const useTitle = (title) => {
    useEffect(() => {
        document.title = `Doctor Concult || ${title}`;
    }, [title]);
};
