AndroVehicleTrack

AndroVehicleTrack is a Next.js web application that helps users find, search, and navigate to electric vehicle (EV) charging stations nearby or in any location. It features authentication, Google Maps integration, and a modern, responsive UI.

Features 🔒 Authentication (Firebase/Supabase) 📍 Find nearby EV charging stations using Google Places API 🔎 Search for stations by location or name 🗺️ View station details and navigate with Google Maps 🎥 Modern UI with background video, hero image, and responsive design 🌙 Works for both signed-in and guest users (with enhanced features for signed-in users) Tech Stack Next.js (App Router) React Tailwind CSS Firebase & Supabase for Auth Google Maps Platform (Places API, Maps JavaScript API) Getting Started Clone the repo:

Install dependencies:

Set up environment variables:

Copy .env.local.example to .env.local and fill in your API keys: Enable APIs in Google Cloud Console:

Places API Maps JavaScript API Geolocation API (optional, for fallback location)

Run the