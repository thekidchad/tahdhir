import { createServiceClient } from "@/lib/supabase/server";

interface GeoResult {
  lat: number;
  lng: number;
  formatted_address?: string;
}

export async function resolveLocation(locationName: string): Promise<GeoResult | null> {
  const supabase = createServiceClient();

  // 1. Check cities table for match
  const { data: city } = await supabase
    .from("cities")
    .select("lat, lng, name_en")
    .or(`name_en.ilike.%${locationName}%,name_ar.ilike.%${locationName}%`)
    .limit(1)
    .single();

  if (city) {
    return { lat: city.lat, lng: city.lng, formatted_address: city.name_en };
  }

  // 2. Check geocode cache
  const { data: cached } = await supabase
    .from("geocode_cache")
    .select("lat, lng, formatted_address")
    .eq("query", locationName.toLowerCase())
    .single();

  if (cached) {
    return cached;
  }

  // 3. Google Geocoding API
  const apiKey = process.env.GOOGLE_GEOCODING_API_KEY;
  if (!apiKey) {
    console.warn("No GOOGLE_GEOCODING_API_KEY set, cannot geocode");
    return null;
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(locationName + ", UAE")}&key=${apiKey}&region=ae`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.results && data.results.length > 0) {
      const result = data.results[0];
      const geo: GeoResult = {
        lat: result.geometry.location.lat,
        lng: result.geometry.location.lng,
        formatted_address: result.formatted_address,
      };

      // Cache the result
      await supabase.from("geocode_cache").insert({
        query: locationName.toLowerCase(),
        lat: geo.lat,
        lng: geo.lng,
        formatted_address: geo.formatted_address,
      });

      return geo;
    }
  } catch (error) {
    console.error("Geocoding error:", error);
  }

  return null;
}
