import { getClient } from "@/apollo-client";
import InfiniteScroll from "@/components/InfiniteScroll";
import fetchAirQualityIndexQuery from "@/graphQL/fetchAirQualityIndexQuery";
import fetchNewsQuery from "@/graphQL/fetchNewsQuery";

type Props = {
  params: {
    city: string;
    lat: string;
    long: string;
    country: string;
    category: string;
  };
};
async function News({ params: { city, lat, long, country, category } }: Props) {
  console.log(lat, long, country, category);

  const client = getClient();
  const {
    data: { aqiQuery },
  } = await client.query({
    query: fetchAirQualityIndexQuery,
    variables: {
      current: "european_aqi,us_aqi,dust",
      longitude: `${long}`,
      latitude: `${lat}`,
      timezone: "auto",
    },
  });

  const aqiResult: AirQualityIndex = aqiQuery;

  const key = process.env.MEDIASTACK_API_KEY;
  const { data } = await client.query({
    query: fetchNewsQuery,
    variables: {
      access_key: key,
      categories: category,
      countries: country,
      limit: "20",
      offset: "0",
      languages: "en",
    },
  });

  const news: News[] = data.newsQuery.data;
  const pagination: NewsPagination = data.newsQuery.data;
  console.log(news);

  if (news.length > 0) {
    return (
      <>
        <InfiniteScroll
          country={country}
          category={category}
          utcOffsetSeconds={aqiResult.utc_offset_seconds}
          data={news}
          pagination={pagination}
        />
      </>
    );
  } else {
    return (
      <div className="flex items-center justify-center text-xl text-gray-500">
        No live news at the moment.
      </div>
    );
  }
}

export default News;
