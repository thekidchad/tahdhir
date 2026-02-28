export interface NewsFeed {
  name: string;
  url: string;
}

export const NEWS_FEEDS: NewsFeed[] = [
  { name: "Al Jazeera", url: "https://www.aljazeera.com/xml/rss/all.xml" },
  { name: "Gulf News", url: "https://gulfnews.com/rss" },
];
