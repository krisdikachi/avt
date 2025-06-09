"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import { AuthProvider, useAuth } from "../../context/auth";
import Link from "next/link";

// Remove the API key from the code and use an environment variable instead.
// In your .env file (at the root of your project), add:
//
// NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_google_maps_api_key
//
// Then, in your code, use:
const GOOGLE_GEOLOCATION_API = `https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;

function StationPopup({ station, userLocation, onClose }: any) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative" onClick={e => e.stopPropagation()}>
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>✕</button>
        <h2 className="text-2xl font-bold mb-2">{station.name}</h2>
        <p className="text-gray-700 mb-2">{station.vicinity || station.address}</p>
        <p className="mb-2">
          <span className="font-semibold">Status:</span>{" "}
          {station.opening_hours?.open_now ? (
            <span className="text-green-600">Open</span>
          ) : (
            <span className="text-red-600">Closed</span>
          )}
        </p>
        <div className="mb-4">
          <span className="font-semibold">Charging Type:</span>{" "}
          {station.types?.includes("fast_charging") ? "Fast Charging" : "Standard"}
        </div>
        {/* Map */}
        <iframe
          width="100%"
          height="250"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps/embed/v1/directions?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&origin=${userLocation.lat},${userLocation.lng}&destination=${station.geometry.location.lat},${station.geometry.location.lng}`}
        />
      </div>
    </div>
  );
}

function StationsContent() {
  const { user } = useAuth();
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [stations, setStations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedStation, setSelectedStation] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);

  // Get user location (browser first, fallback to Google Geolocation API)
  useEffect(() => {
    if (!user) return;
    setLoading(true);

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          pos => {
            setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
            setLoading(false);
          },
          async () => {
            // Fallback to Google Geolocation API
            try {
              const res = await fetch(GOOGLE_GEOLOCATION_API, { method: "POST" });
              const data = await res.json();
              if (data.location) {
                setLocation({ lat: data.location.lat, lng: data.location.lng });
              }
            } catch {
              // Could not get location
            }
            setLoading(false);
          }
        );
      }
    };
    getLocation();
  }, [user]);

  // Fetch stations when location is available
  useEffect(() => {
    if (!user || !location) return;
    setLoading(true);
    fetch(`/api/nearby-stations?lat=${location.lat}&lng=${location.lng}`)
      .then(res => res.json())
      .then(data => {
        setStations(data.results || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [location, user]);

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#000013] text-white">
        {/* <Navbar /> */}
        <h2 className="text-2xl font-bold mb-4">Please sign up to view charging stations.</h2>
        <Link href="/signup" className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700">Sign Up</Link>
      </div>
    );
  }

  // ...inside StationsContent component...


const handleSearch = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!search.trim()) return;
  setLoading(true);
  setSearching(true);
  fetch(`/api/nearby-stations?query=${encodeURIComponent(search)}`)
    .then(res => res.json())
    .then(data => {
      setStations(data.results || []);
      setLoading(false);
    })
    .catch(() => setLoading(false));
};


  return (
    <>
      <Navbar />

      


      <main className="min-h-screen bg-[#000013] p-6">
        <header className="mt-14 mb-8 text-center">
          <h1 className="text-4xl font-bold text-blue-700 mb-2">All EV Charging Stations Near You</h1>
          <p className="text-gray-300">Browse all available charging stations in your area.</p>
        </header>
        <section className="max-w-3xl mx-auto">
          {loading ? (
            <div className="text-center text-gray-400">Loading stations...</div>
          ) : (
            <div className="space-y-4">
              {stations.length === 0 ? (
                <div className="text-center text-gray-400">No stations found.</div>
              ) : (
                stations.map((station, idx) => (
                  <div
                    key={station.place_id || idx}
                    className="bg-white rounded-lg shadow p-5 flex flex-col md:flex-row md:items-center md:justify-between cursor-pointer hover:ring-2 ring-blue-400 transition"
                    onClick={() => setSelectedStation(station)}
                  >
                    <div>
                      <h3 className="text-xl font-bold text-blue-800">{station.name}</h3>
                      <p className="text-gray-500">{station.vicinity || station.address}</p>
                      <p className="text-sm text-gray-400">
                        {station.opening_hours
                          ? station.opening_hours.open_now
                            ? "Open now"
                            : "Closed"
                          : "No hours info"}
                      </p>
                    </div>
                    <div className="mt-3 md:mt-0 flex items-center space-x-6">
                      <span className="text-blue-600 font-medium">
                        {station.types?.includes("fast_charging") ? "Fast Charging" : "Standard"}
                      </span>
                      <Link href={`/stations/${station.place_id}`}>
                        <button
                          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                          onClick={e => { e.stopPropagation(); }}
                        >
                          More Info
                        </button>
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </section>
        {/* Popup */}
        {selectedStation && location && (
          <StationPopup
            station={selectedStation}
            userLocation={location}
            onClose={() => setSelectedStation(null)}
          />
        )}
      </main>

<form onSubmit={handleSearch} className="mb-6 flex gap-2 max-w-xl mx-auto">
  <input
  type="text"
  value={search}
  onChange={e => setSearch(e.target.value)}
  placeholder="Search for a location (e.g. Lagos, Ikeja...)"
  className="flex-1 px-4 py-2 rounded border border-blue-200 focus:ring-2 focus:ring-blue-400 placeholder-white text-white"
/>
  <button
    type="submit"
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
  >
    Search
  </button>
</form>
    </>
  );
}

export default function StationsPage() {
  return (
    <AuthProvider>
      <StationsContent />
    </AuthProvider>
  );
}