import React from "react";
import { FaEnvelope, FaWhatsapp, FaFacebook } from "react-icons/fa";

export default function AboutPage() {
    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            <h1 className="text-3xl font-bold mb-4 text-green-700">About AVT</h1>
            <p className="mb-4 text-gray-700">
                AVT is designed to empower users with tools and resources that promote sustainable development. Our app helps individuals and organizations track, manage, and optimize their activities in alignment with the United Nations Sustainable Development Goals (SDGs). By providing actionable insights and fostering community engagement, AVT contributes to a greener, more equitable future.
            </p>
            <p className="mb-6 text-gray-700">
                Whether you &apos; re looking to reduce your carbon footprint, support local initiatives, or simply stay informed about sustainability, AVT is your trusted companion on the journey toward positive impact.
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
    );
}