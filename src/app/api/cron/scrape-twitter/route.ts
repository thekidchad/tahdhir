import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { scrapeRecentTweets } from "@/lib/twitter/scraper";
import { parseWithLLM } from "@/lib/news/llm-parser";
import { resolveLocation } from "@/lib/geo/geocode";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServiceClient();

  try {
    const tweets = await scrapeRecentTweets();
    let alertsCreated = 0;

    for (const tweet of tweets) {
      const { data: existing } = await supabase
        .from("processed_tweets")
        .select("tweet_id")
        .eq("tweet_id", tweet.id)
        .single();

      if (existing) continue;

      const parsed = await parseWithLLM(tweet.text);

      await supabase.from("processed_tweets").insert({
        tweet_id: tweet.id,
        is_alert: parsed?.is_alert ?? false,
      });

      if (!parsed || !parsed.is_alert) continue;

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
          source_url: tweet.url,
          source_text: tweet.text,
          detected_at: new Date().toISOString(),
          expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
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
      tweetsScraped: tweets.length,
      alertsCreated,
    });
  } catch (error) {
    console.error("Twitter scrape error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
