import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const useScrollToSection = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const section = params.get("section");

    const queryParams = section;
    const aboutUsRef = useRef(null);
    const blogHomeRef = useRef(null);
    const homeRef = useRef(null);

    useEffect(() => {
        if (queryParams) {
            switch (queryParams) {
                case "home":
                    homeRef.current?.scrollIntoView({ behavior: "smooth" });
                    break;
                case "aboutUs":
                    aboutUsRef.current?.scrollIntoView({ behavior: "smooth" });
                    break;
                case "blogHome":
                    blogHomeRef.current?.scrollIntoView({ behavior: "smooth" });
                    break;
                default:
                    break;
            }
        }
    }, [queryParams]);

    return { homeRef, aboutUsRef, blogHomeRef };
};

export default useScrollToSection;
