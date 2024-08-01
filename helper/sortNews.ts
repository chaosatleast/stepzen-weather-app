export enum NewsCategory {
  general = "general",
  business = "business",
  entertainment = "entertainment",
  health = "health",
  science = "science",
  sports = "sports",
  technology = "technology",
}

export enum NewsLanguage {
  ar = "Arabic",
  de = "German",
  en = "English",
  es = "Spanish",
  fr = "French",
  he = "Hebrew",
  it = "Italian",
  nl = "Dutch",
  no = "Norwegian",
  pt = "Portuguese",
  ru = "Russian",
  se = "Swedish",
  zh = "Chinese",
}

export default function sortNews(news: News[]): News[] {
  const newsWithImage = news.filter((news) => news.image !== null);
  const newsWithoutImage = news.filter((news) => news.image === null);

  // Remove items with duplicate image and title
  const uniqueNews = newsWithImage.reduce((acc: News[], curr: News) => {
    const isDuplicate = acc.some((news) => news.title === curr.title);
    if (!isDuplicate) {
      acc.push(curr);
    }
    return acc;
  }, []);

  console.log([...uniqueNews]);
  return [...uniqueNews];
}
