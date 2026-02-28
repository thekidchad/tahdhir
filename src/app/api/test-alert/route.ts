import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

const MOCK_ALERTS = [
  {
    title_en: "Missile Alert - Deira District",
    title_ar: "إنذار صاروخي - منطقة ديرة",
    description_en:
      "Ballistic missile threat detected heading towards Deira district. Seek shelter immediately.",
    description_ar:
      "تم رصد تهديد صاروخي باليستي باتجاه منطقة ديرة. اطلب المأوى فوراً.",
    severity: "critical" as const,
    event_type: "missile",
    lat: 25.2697,
    lng: 55.3095,
    radius_km: 8,
  },
  {
    title_en: "Drone Sighting - Jumeirah",
    title_ar: "رصد طائرة مسيرة - جميرا",
    description_en:
      "Unidentified drone spotted over Jumeirah Beach area. Authorities investigating.",
    description_ar:
      "تم رصد طائرة مسيرة مجهولة فوق منطقة شاطئ جميرا. السلطات تحقق.",
    severity: "warning" as const,
    event_type: "drone",
    lat: 25.2048,
    lng: 55.2388,
    radius_km: 5,
  },
  {
    title_en: "Security Advisory - Abu Dhabi",
    title_ar: "نشرة أمنية - أبو ظبي",
    description_en:
      "Elevated threat level in Abu Dhabi. Residents advised to stay alert.",
    description_ar:
      "مستوى تهديد مرتفع في أبو ظبي. ينصح السكان بالبقاء في حالة تأهب.",
    severity: "info" as const,
    event_type: "threat",
    lat: 24.4539,
    lng: 54.3773,
    radius_km: 15,
  },
];

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization");
  const isAuthorized =
    process.env.NODE_ENV === "development" ||
    authHeader === `Bearer ${process.env.ADMIN_SECRET}`;

  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServiceClient();
  const alertsCreated = [];

  for (const mock of MOCK_ALERTS) {
    const { data, error } = await supabase
      .from("alerts")
      .insert({
        ...mock,
        status: "active",
        detected_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        source_url: null,
        source_text: "Test alert",
      })
      .select()
      .single();

    if (data) alertsCreated.push(data);
    if (error) console.error("Error creating test alert:", error);
  }

  return NextResponse.json({ success: true, alertsCreated });
}
