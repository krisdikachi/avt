"use client";
import React, { useState } from "react";
import Navbar from "../components/navbar";
import { AuthProvider, useAuth } from "../context/auth";
import Link from "next/link";
import Image from "next/image";

function HomeContent() {
  // const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    setLoading(true);
    fetch(`/api/nearby-stations?query=${encodeURIComponent(search)}`)
      .then(res => res.json())
      .then(data => {
        setSearchResults(data.results || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  return (
    <div className="relative min-h-screen  flex flex-col">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0"
        poster="/avt logo.png"
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
        {/* fallback image if video not supported */}
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Navbar */}
      <div className="relative z-20">
        <Navbar />
      </div>

      {/* Hero Section */}
      <main className="relative z-20 flex flex-1 flex-col items-center justify-center text-center px-4">
        <div className="max-w-2xl mx-auto mt-32">
          <Image
            src="/chargeart2.png"
            alt="EV Hero"
            className="mx-auto mb-6 w-32 h-32 object-contain rounded-full shadow-lg border-4 border-blue-400 bg-white/80"
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
            Welcome to AndroVehicleTrack
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8">
            Discover, search, and navigate to the nearest EV charging stations with ease.
          </p>
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 justify-center items-center text-white mb-8">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search for a location (e.g. Lagos, Ikeja...)"
              className="w-full sm:w-80 px-4 py-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </form>
          {searchResults.length > 0 && (
            <div className="bg-white/90 rounded-xl shadow-lg p-6 mt-4 space-y-4">
              <h2 className="text-blue-700 text-xl font-bold mb-2">Search Results</h2>
              {searchResults.map((station, idx) => (
                <div
                  key={station.place_id || idx}
                  className="bg-blue-50 rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <h3 className="text-lg font-bold text-blue-800">{station.name}</h3>
                    <p className="text-gray-600">{station.vicinity || station.formatted_address}</p>
                    <p className="text-sm text-gray-500">
                      {station.opening_hours
                        ? station.opening_hours.open_now
                          ? "Open now"
                          : "Closed"
                        : "No hours info"}
                    </p>
                  </div>
                  <Link href={`/stations/${station.place_id}`}>
                    <button className="mt-3 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                      More Info
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          )}
          <div className="mt-8">
            <Link href="/stations">
              <button className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition font-semibold shadow-lg">
                See All Stations Near You
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function HomePage() {
  return (
    <AuthProvider>
      <HomeContent />
    </AuthProvider>
  );
}