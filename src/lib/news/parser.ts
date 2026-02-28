import { XMLParser } from "fast-xml-parser";

export interface RSSArticle {
  title: string;
  description: string;
  link: string;
  pubDate: string;
}

const ALERT_KEYWORDS = [
  "missile", "rocket", "attack", "siren", "drone", "strike", "explosion", "intercept",
  "صاروخ", "هجوم", "إنذار", "طائرة مسيرة", "انفجار", "ضربة",
];

const REGION_KEYWORDS = [
  "dubai", "uae", "abu dhabi", "sharjah", "emirates",
  "دبي", "الإمارات", "أبو ظبي", "الشارقة",
];

export function parseRSSFeed(xml: string): RSSArticle[] {
  const parser = new XMLParser({ ignoreAttributes: false });
  const result = parser.parse(xml);

  const channel = result?.rss?.channel;
  if (!channel) return [];

  const items = Array.isArray(channel.item) ? channel.item : channel.item ? [channel.item] : [];

  return items.map((item: Record<string, unknown>) => ({
    title: (item.title as string) || "",
    description: (item.description as string) || "",
    link: (item.link as string) || "",
    pubDate: (item.pubDate as string) || "",
  }));
}

export function isRelevantArticle(article: RSSArticle): boolean {
  const text = `${article.title} ${article.description}`.toLowerCase();
  const hasAlertKeyword = ALERT_KEYWORDS.some((kw) => text.includes(kw.toLowerCase()));
  const hasRegionKeyword = REGION_KEYWORDS.some((kw) => text.includes(kw.toLowerCase()));
  return hasAlertKeyword && hasRegionKeyword;
}
