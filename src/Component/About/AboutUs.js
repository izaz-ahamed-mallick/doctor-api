import React, { useState } from "react";
import aboutImg from "../../Images/aboutUs2.jpeg"; // Adjust the path as needed

import HeroSection2 from "../../Utils/HeroSection2";
import ContactUsModal from "../../Utils/ContactModal";
import { useTitle } from "../../FunctionalCustomHooks/useTitle";

const AboutUs = () => {
    useTitle("About us");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleContactUsModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <HeroSection2
                backgroundImage={aboutImg}
                title={"About Us"}
                description={
                    "Discover who we are and our commitment to your health."
                }
                buttonText={"Contact Us"}
                onButtonClick={handleContactUsModal}
            />

            {/* Main Content Section */}
            <div className="flex flex-col items-center py-12 px-6">
                <section className="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full text-gray-800">
                    <div className="mb-8">
                        <h2 className="text-3xl font-semibold mb-4">
                            Our Mission
                        </h2>
                        <p className="text-lg mb-4">
                            At DoctorConsult, we are dedicated to providing the
                            highest quality of healthcare with a personal touch.
                            Our team of experienced professionals is committed
                            to offering comprehensive medical solutions tailored
                            to your individual needs.
                        </p>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-3xl font-semibold mb-4">
                            Meet Our Team
                        </h2>
                        <p className="text-lg mb-4">
                            Our team consists of highly qualified doctors,
                            nurses, and support staff, all working together to
                            ensure you receive the best care possible. We take
                            pride in our expertise and compassion, striving to
                            make your experience comfortable and effective.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-3xl font-semibold mb-4">
                            Why Choose Us?
                        </h2>
                        <p className="text-lg mb-4">
                            With state-of-the-art facilities and a
                            patient-centered approach, DoctorConsult stands out
                            for its commitment to excellence. We are dedicated
                            to continuous improvement and innovation in
                            healthcare to ensure the best outcomes for our
                            patients.
                        </p>
                    </div>
                </section>
            </div>
            <ContactUsModal onClose={handleCloseModal} isOpen={isModalOpen} />
        </div>
    );
};

export default AboutUs;
