import { Scraper, SearchMode } from "@the-convocation/twitter-scraper";

const SEARCH_QUERIES = [
  "dubai attack",
  "dubai missile",
  "dubai rocket",
  "UAE drone strike",
  "dubai explosion",
  "Abu Dhabi attack",
  "دبي هجوم",
  "صاروخ دبي",
  "الإمارات هجوم",
  "انفجار دبي",
];

export interface ScrapedTweet {
  id: string;
  text: string;
  username: string;
  timestamp: number | undefined;
  url: string;
}

export async function scrapeRecentTweets(): Promise<ScrapedTweet[]> {
  const scraper = new Scraper();
  const tweets: ScrapedTweet[] = [];
  const seenIds = new Set<string>();

  for (const query of SEARCH_QUERIES) {
    try {
      const results = scraper.searchTweets(query, 10, SearchMode.Latest);
      for await (const tweet of results) {
        if (tweet.id && !seenIds.has(tweet.id)) {
          seenIds.add(tweet.id);
          tweets.push({
            id: tweet.id,
            text: tweet.text || "",
            username: tweet.username || "unknown",
            timestamp: tweet.timestamp,
            url: `https://x.com/${tweet.username}/status/${tweet.id}`,
          });
        }
      }
    } catch (error) {
      console.error(`Error scraping query "${query}":`, error);
    }
  }

  return tweets;
}
