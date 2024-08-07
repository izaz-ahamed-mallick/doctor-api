import React from "react";

const HeroSection2 = ({
    backgroundImage,
    title,
    description,
    buttonText,
    onButtonClick,
}) => {
    return (
        <div className="relative h-96 w-full">
            <img
                src={backgroundImage}
                alt="Hero Background"
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                className="absolute inset-0 object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative flex items-center justify-center h-full text-center text-white p-6">
                <div>
                    <h1 className="text-5xl font-bold mb-4">{title}</h1>
                    <p className="text-lg mb-6">{description}</p>
                    <button
                        onClick={onButtonClick}
                        className="bg-yellow-500 hover:bg-yellow-400 text-white py-2 px-6 rounded-md text-lg font-semibold"
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection2;
