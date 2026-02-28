import { GoogleGenerativeAI } from "@google/generative-ai";
import type { ParsedAlert } from "@/types/alert";

const SYSTEM_PROMPT = `You are a security alert parser for the UAE/Dubai region. Given text (from a news article or social media post), determine if it describes an ACTIVE, CURRENT attack, missile strike, drone threat, explosion, or security incident in the UAE/Dubai area.

IMPORTANT: Only classify as an alert if the text describes a CURRENT or VERY RECENT event (not historical, not opinion, not political commentary).

Respond with a JSON object only, no other text:

If it IS a genuine current alert:
{
  "is_alert": true,
  "severity": "critical" | "warning" | "info",
  "event_type": "missile" | "drone" | "rocket" | "explosion" | "threat" | "other",
  "title_en": "Brief alert title in English",
  "title_ar": "Brief alert title in Arabic",
  "description_en": "1-2 sentence summary in English",
  "description_ar": "1-2 sentence summary in Arabic",
  "locations": [
    {
      "name_en": "Location name in English",
      "name_ar": "Location name in Arabic",
      "type": "city" | "district" | "landmark" | "address"
    }
  ]
}

If it is NOT a genuine alert:
{ "is_alert": false }

Severity guide:
- "critical": Active missile strike, rocket attack, confirmed explosion with casualties
- "warning": Drone sighting, unconfirmed threat, siren activation
- "info": Threat assessment, security advisory, elevated alert level`;

export async function parseWithLLM(text: string): Promise<ParsedAlert | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("No GEMINI_API_KEY set, skipping LLM parsing");
    return null;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.1,
    },
  });

  try {
    const result = await model.generateContent([
      { text: SYSTEM_PROMPT },
      { text: `Analyze this text and determine if it's a genuine security alert for the UAE/Dubai region:\n\n${text}` },
    ]);

    const response = result.response.text();
    const parsed = JSON.parse(response);
    if (!parsed.is_alert) return null;

    return parsed as ParsedAlert;
  } catch (error) {
    console.error("Gemini parsing error:", error);
    return null;
  }
}
