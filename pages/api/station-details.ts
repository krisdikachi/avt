import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!id || !apiKey) {
    return res.status(400).json({ error: "Missing id or API key" });
  }

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&key=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch station details" });
  }
}