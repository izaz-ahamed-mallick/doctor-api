import React from "react";

const HeroSection = ({
    title,
    subtitle,
    imageSrc,
    height = "h-80",
    textColor = "text-white",
}) => {
    return (
        <div className={`relative w-full ${height}`}>
            <img
                src={imageSrc}
                alt="Hero"
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                }}
                className="absolute inset-0"
            />
            <div
                className={`relative flex flex-col items-center justify-center h-full bg-gradient-to-r from-[rgba(0,0,0,0.5)] via-transparent to-[rgba(0,0,0,0.5)] ${textColor} text-center p-6`}
            >
                <div className="relative flex justify-center items-center flex-col bg-black bg-opacity-50 p-4 rounded-lg">
                    <h1 className="text-4xl font-extrabold leading-tight">
                        {title}
                    </h1>
                    <p className="text-xl mt-2 max-w-lg">{subtitle}</p>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
