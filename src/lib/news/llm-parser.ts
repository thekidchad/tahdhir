import { GoogleGenerativeAI } from "@google/generative-ai";
import type { ParsedAlert } from "@/types/alert";

const SEARCH_PROMPT = `You are a real-time security monitoring system for the UAE region. Search the web right now for any ACTIVE or VERY RECENT (last 30 minutes) security incidents in the United Arab Emirates.

Search for: missile attacks, drone strikes, rocket attacks, explosions, military threats, air defense activations, siren alerts, or any armed conflict events in or targeting the UAE (Dubai, Abu Dhabi, Sharjah, Ajman, Umm Al Quwain, Ras Al Khaimah, Fujairah).

IMPORTANT:
- Only report CURRENT or VERY RECENT events (happening now or in the last 30 minutes)
- Do NOT report historical events, political commentary, military deals, or defense exercises
- Do NOT report events from other countries unless they directly target the UAE
- If there are NO current security incidents in the UAE, return an empty array

Respond with a JSON array only, no other text:

If there ARE active alerts:
[
  {
    "is_alert": true,
    "severity": "critical" | "warning" | "info",
    "event_type": "missile" | "drone" | "rocket" | "explosion" | "threat" | "other",
    "title_en": "Brief alert title in English",
    "title_ar": "Brief alert title in Arabic",
    "description_en": "1-2 sentence summary in English",
    "description_ar": "1-2 sentence summary in Arabic",
    "source_url": "URL of the news source",
    "locations": [
      {
        "name_en": "Location name in English",
        "name_ar": "Location name in Arabic",
        "type": "city" | "district" | "landmark" | "address"
      }
    ]
  }
]

If there are NO current alerts:
[]

Severity guide:
- "critical": Active missile strike, rocket attack, confirmed explosion with casualties
- "warning": Drone sighting, unconfirmed threat, siren activation
- "info": Threat assessment, security advisory, elevated alert level`;

export interface SearchedAlert extends ParsedAlert {
  source_url?: string;
}

export async function searchAlerts(): Promise<SearchedAlert[]> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("No GEMINI_API_KEY set, skipping alert search");
    return [];
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: {
      temperature: 0.1,
    },
    tools: [{ googleSearch: {} } as never],
  });

  try {
    const result = await model.generateContent(SEARCH_PROMPT);
    const response = result.response.text();

    // Extract JSON from response (may be wrapped in ```json ... ```)
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    if (!jsonMatch) return [];

    const parsed = JSON.parse(jsonMatch[0]);
    const alerts: SearchedAlert[] = Array.isArray(parsed) ? parsed : [];
    return alerts.filter((a) => a.is_alert);
  } catch (error) {
    console.error("Gemini search error:", error);
    return [];
  }
}
