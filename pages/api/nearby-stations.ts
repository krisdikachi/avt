import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { lat, lng, query } = req.query;
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return res.status(400).json({ error: "Missing API key" });
  }

  let url = "";

  if (query) {
    // Use Text Search API if query is present
    url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
      query + " EV charging station"
    )}&key=${apiKey}`;
  } else if (lat && lng) {
    // Use Nearby Search API if lat/lng is present
    url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=charging_station&key=${apiKey}`;
  } else {
    return res.status(400).json({ error: "Missing lat/lng or query" });
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stations" });
  }
}