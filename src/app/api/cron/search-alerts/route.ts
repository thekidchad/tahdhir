import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { searchAlerts } from "@/lib/news/llm-parser";
import { resolveLocation } from "@/lib/geo/geocode";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServiceClient();

  try {
    const alerts = await searchAlerts();
    let alertsCreated = 0;

    for (const parsed of alerts) {
      // Dedup by source_url if available, or by title
      if (parsed.source_url) {
        const { data: existing } = await supabase
          .from("alerts")
          .select("id")
          .eq("source_url", parsed.source_url)
          .single();

        if (existing) continue;
      } else {
        const { data: existing } = await supabase
          .from("alerts")
          .select("id")
          .eq("title_en", parsed.title_en)
          .gte(
            "detected_at",
            new Date(Date.now() - 60 * 60 * 1000).toISOString()
          )
          .single();

        if (existing) continue;
      }

      let lat = 25.2048;
      let lng = 55.2708;

      if (parsed.locations.length > 0) {
        const geo = await resolveLocation(parsed.locations[0].name_en);
        if (geo) {
          lat = geo.lat;
          lng = geo.lng;
        }
      }

      const { data: alert } = await supabase
        .from("alerts")
        .insert({
          title_en: parsed.title_en,
          title_ar: parsed.title_ar,
          description_en: parsed.description_en,
          description_ar: parsed.description_ar,
          severity: parsed.severity,
          status: "active",
          event_type: parsed.event_type,
          lat,
          lng,
          radius_km: parsed.severity === "critical" ? 10 : 5,
          source_url: parsed.source_url ?? null,
          source_text: parsed.title_en,
          detected_at: new Date().toISOString(),
          expires_at: new Date(
            Date.now() + 24 * 60 * 60 * 1000
          ).toISOString(),
        })
        .select()
        .single();

      if (alert) {
        for (const location of parsed.locations) {
          const { data: city } = await supabase
            .from("cities")
            .select("id, region_id")
            .or(
              `name_en.ilike.%${location.name_en}%,name_ar.ilike.%${location.name_ar}%`
            )
            .limit(1)
            .single();

          if (city) {
            await supabase.from("alert_cities").insert({
              alert_id: alert.id,
              city_id: city.id,
              region_id: city.region_id,
            });
          }
        }
        alertsCreated++;
      }
    }

    return NextResponse.json({
      success: true,
      alertsFound: alerts.length,
      alertsCreated,
    });
  } catch (error) {
    console.error("Alert search error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
