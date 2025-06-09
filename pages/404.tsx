"use client";
import Link from "next/link";
import { FaChargingStation } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#000013] flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center">
        <FaChargingStation className="text-blue-600 text-6xl mb-6 animate-pulse" />
        <h1 className="text-5xl font-extrabold text-white mb-4 drop-shadow-lg">404</h1>
        <p className="text-xl text-gray-300 mb-8 text-center">
          Oops! The page you’re looking for doesn’t exist.<br />
          Maybe you took a wrong turn at the charging station.
        </p>
        <Link
          href="/"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}