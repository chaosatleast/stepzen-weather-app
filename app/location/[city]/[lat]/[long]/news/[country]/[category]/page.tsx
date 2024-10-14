import { createApolloClient } from "@/apollo-client";
import InfiniteScroll from "@/components/InfiniteScroll";
import { createHmacApp } from "@/helper/createHmac";
import sortNews from "@/helper/sortNews";
import fetchAirQualityIndexQuery from "@/query/fetchAirQualityIndexQuery";
import fetchNewsQuery from "@/query/fetchNewsQuery";

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

	const {
		data: { aqiQuery },
	} = await createApolloClient().query({
		query: fetchAirQualityIndexQuery,
		variables: {
			current: "european_aqi,us_aqi,dust",
			longitude: `${long}`,
			latitude: `${lat}`,
			timezone: "auto",
		},
	});

	const aqiResult: AirQualityIndex = aqiQuery;

	const basePathForMediaStack =
		process.env.NODE_ENV === "development"
			? "http://localhost:3000/api/graphql"
			: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/graphql`;

	if (!process.env.API_JWT_USER) throw new Error("API_JWT_USER is not set");
	if (!process.env.API_JWT_PASS) throw new Error("API_JWT_PASS is not set");
	if (!process.env.API_JWT_TOKEN) throw new Error("API_JWT_TOKEN is not set");

	const textToEncrypt = `${process.env.API_JWT_USER}:${process.env.API_JWT_PASS}`;

	const hmac = createHmacApp(process.env.API_JWT_TOKEN, textToEncrypt);

	const response = await fetch(basePathForMediaStack, {
		method: "POST",
		cache: "no-cache",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${hmac}`,
		},
		body: JSON.stringify({
			query: fetchNewsQuery,
			variables: {
				access_key: process.env.MEDIASTACK_API_KEY,
				categories: category,
				countries: country,
				limit: "50",
				offset: "0",
				languages: "en",
			},
		}),
	});

	const { data } = await response.json();

	const news = sortNews(data.newsQuery.data);

	const pagination: NewsPagination = data.newsQuery.pagination;
	console.log(data);

	if (!news) {
		return (
			<div className="flex items-center justify-center text-xl text-gray-500">
				No live news at the moment.
			</div>
		);
	}

	return (
		<InfiniteScroll
			country={country}
			category={category}
			utcOffsetSeconds={aqiResult.utc_offset_seconds}
			data={news}
			pagination={pagination}
		/>
	);

	// return <></>;
}

export default News;
