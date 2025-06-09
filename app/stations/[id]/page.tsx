'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../../components/navbar";

export default function StationDetailPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const router = useRouter();
  const [station, setStation] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/station-details?id=${id}`)
      .then(res => res.json())
      .then(data => {
        setStation(data.result || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#000013] flex flex-col items-center justify-center text-white">
        <Navbar />
        <div>Loading station details...</div>
      </div>
    );
  }

  if (!station) {
    return (
      <div className="min-h-screen bg-[#000013] flex flex-col items-center justify-center text-white">
        <Navbar />
        <div>Station not found.</div>
        <button onClick={() => router.back()} className="mt-4 bg-blue-600 px-4 py-2 rounded text-white">Go Back</button>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#000013] p-6 flex flex-col items-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-xl w-full mt-16">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">{station.name}</h1>
          <p className="text-gray-600 mb-2">{station.formatted_address || station.vicinity}</p>
          <p className="mb-2">
            <span className="font-semibold">Status:</span>{" "}
            {station.opening_hours?.open_now ? (
              <span className="text-green-600">Open</span>
            ) : (
              <span className="text-red-600">Closed</span>
            )}
          </p>
          <div className="mb-2">
            <span className="font-semibold">Charging Type:</span>{" "}
            {station.types?.includes("fast_charging") ? "Fast Charging" : "Standard"}
          </div>
          {station.formatted_phone_number && (
            <div className="mb-2">
              <span className="font-semibold">Phone:</span> {station.formatted_phone_number}
            </div>
          )}
          {station.website && (
            <div className="mb-2">
              <span className="font-semibold">Website:</span>{" "}
              <a href={station.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{station.website}</a>
            </div>
          )}
          <div className="mb-4">
            <iframe
              width="100%"
              height="250"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=place_id:${station.place_id}`}
            />
          </div>
          <button onClick={() => router.back()} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Back</button>
        </div>
      </main>
    </>
  );
}
