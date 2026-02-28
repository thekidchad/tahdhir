import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { resolveLocation } from "@/lib/geo/geocode";

export async function GET(request: Request) {
  const supabase = createServiceClient();
  const { searchParams } = new URL(request.url);

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "50");
  const severity = searchParams.get("severity");
  const status = searchParams.get("status");
  const offset = (page - 1) * limit;

  let query = supabase
    .from("alerts")
    .select("*, alert_cities(*, city:cities(*), region:regions(*))", {
      count: "exact",
    })
    .order("detected_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (severity) query = query.eq("severity", severity);
  if (status) query = query.eq("status", status);

  const { data, error, count } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data, count, page, limit });
}

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServiceClient();
  const body = await request.json();

  if (body.location_name && (!body.lat || !body.lng)) {
    const geo = await resolveLocation(body.location_name);
    if (geo) {
      body.lat = geo.lat;
      body.lng = geo.lng;
    }
  }

  const { data, error } = await supabase
    .from("alerts")
    .insert({
      title_en: body.title_en,
      title_ar: body.title_ar,
      description_en: body.description_en,
      description_ar: body.description_ar,
      severity: body.severity || "warning",
      status: "active",
      event_type: body.event_type,
      lat: body.lat || 25.2048,
      lng: body.lng || 55.2708,
      radius_km: body.radius_km || 5,
      source_url: body.source_url,
      source_text: body.source_text,
      detected_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
