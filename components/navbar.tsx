"use client";

import { useState } from "react";
import Link from "next/link";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { useAuth } from "../context/auth";
import Image from "next/image";
const getInitial = (email: string) => email ? email[0].toUpperCase() : "";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const displayName = user?.name || getInitial(user?.email || "");

  return (
    <nav className="bg-[#000013] shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
            <Image 
            src="/avt logo.PNG" 
            alt="Logo" 
            className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold text-white">AndroVehicleTrack</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-white hover:text-yellow-300 transition">Home</Link>
          <Link href="/stations" className="text-white hover:text-yellow-300 transition">Stations</Link>
          <Link href="/about" className="text-white hover:text-yellow-300 transition">About</Link>

          {!user ? (
            <div className="flex gap-2">
              <Link href="/signin" className="text-yellow-300 hover:underline">Sign In</Link>
              <Link href="/signup" className="text-blue-600 bg-white px-4 py-2 rounded hover:bg-yellow-300 hover:text-blue-700 transition">Sign Up</Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-full bg-yellow-400 flex items-center justify-center text-blue-700 font-bold text-lg">
                  {displayName}
                </div>
                {user.name && <span className="text-white font-medium">{user.name}</span>}
              </div>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Icon */}
        <button onClick={() => setSidebarOpen(true)} className="md:hidden text-3xl text-white">
          <HiOutlineMenuAlt3 />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-[#000013] shadow-md transform transition-transform duration-300 z-50 ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-4 flex justify-between items-center border-b border-blue-500">
          <span className="text-yellow-300 font-semibold text-lg">Menu</span>
          <button onClick={() => setSidebarOpen(false)} className="text-2xl text-yellow-300">
            <HiX />
          </button>
        </div>
        <div className="flex flex-col p-4 gap-4">
          <Link href="/" onClick={() => setSidebarOpen(false)} className="text-white hover:text-yellow-300 transition">Home</Link>
          <Link href="/stations" onClick={() => setSidebarOpen(false)} className="text-white hover:text-yellow-300 transition">Stations</Link>
          <Link href="/about" onClick={() => setSidebarOpen(false)} className="text-white hover:text-yellow-300 transition">About</Link>
          <hr className="border-blue-500" />
          {!user ? (
            <div className="flex flex-col gap-2">
              <Link href="/signin" onClick={() => setSidebarOpen(false)} className="text-yellow-300">Sign In</Link>
              <Link href="/signup" onClick={() => setSidebarOpen(false)} className="text-blue-700 bg-yellow-300 px-4 py-2 rounded">Sign Up</Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-full bg-yellow-400 flex items-center justify-center text-blue-700 font-bold text-lg">
                  {displayName}
                </div>
                {user.name && <span className="text-white font-medium">{user.name}</span>}
              </div>
              <button
                onClick={() => { logout(); setSidebarOpen(false); }}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          style={{ backdropFilter: "blur(10px)" }}
        />
      )}
    </nav>
  );
}
