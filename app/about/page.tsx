import React from "react";
import { FaEnvelope, FaWhatsapp, FaFacebook } from "react-icons/fa";
import Navbar from "../../components/navbar";

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
                <h1 className="text-3xl font-bold mb-4 text-green-700">About AVT</h1>
                <p className="mb-4 text-gray-700">
                    AVT (AndroVehicleTracker) is a platform dedicated to making electric vehicle (EV) charging more accessible and convenient. Our mission is to help EV owners and drivers easily locate, review, and navigate to charging stations across the region.
                </p>
                <p className="mb-4 text-gray-700">
                    With AVT, users can search for nearby EV charging stations, view real-time availability, and get detailed information about charging types, pricing, and amenities. Our platform empowers the transition to sustainable transportation by connecting drivers with reliable charging infrastructure.
                </p>
                <p className="mb-6 text-gray-700">
                    Join us in accelerating the adoption of electric vehicles. Whether you are planning a road trip, commuting daily, or managing a fleet, AVT is your trusted partner for finding the best EV charging solutions wherever you go.
                </p>
                <div className="flex items-center space-x-6">
                    <a
                        href="mailto:andrewnwuko@gmail.com"
                        aria-label="Send Email"
                        className="text-green-700 hover:text-green-900 text-2xl"
                    >
                        <FaEnvelope />
                    </a>
                    <a
                        href="https://wa.me/2348101451936"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="WhatsApp"
                        className="text-green-700 hover:text-green-900 text-2xl"
                    >
                        <FaWhatsapp />
                    </a>
                    <a
                        href="https://facebook.com/yourfacebookhandle"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                        className="text-green-700 hover:text-green-900 text-2xl"
                    >
                        <FaFacebook />
                    </a>
                </div>
            </div>
        </>
    );
}
