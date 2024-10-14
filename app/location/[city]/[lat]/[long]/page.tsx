import { createApolloClient } from "@/apollo-client";
import CalloutCard from "@/components/CalloutCard";
import DailyInfo from "@/components/DailyInfo";
import HourlyInfo from "@/components/HourlyInfo";
import PaginationSummary from "@/components/PaginationSummary";
import fetchAirQualityIndexQuery from "@/query/fetchAirQualityIndexQuery";
import fetchWeatherQuery from "@/query/fetchWeatherQuery";
import { CgCompressV } from "react-icons/cg";
import { FaArrowUp, FaWind } from "react-icons/fa";
import { MdDewPoint, MdVisibility } from "react-icons/md";
import { RiWaterPercentFill } from "react-icons/ri";
import { TbUvIndex } from "react-icons/tb";

type Props = {
	params: {
		city: string;
		lat: string;
		long: string;
	};
};

export const revalidate = 60;

async function WeatherPage({ params: { city, lat, long } }: Props) {
	const {
		data: { weatherQuery },
	} = await createApolloClient().query({
		query: fetchWeatherQuery,
		variables: {
			current:
				"temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m",
			daily:
				"weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max",
			hourly:
				"temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weather_code,surface_pressure,visibility",
			longitude: `${long}`,
			latitude: `${lat}`,
			timezone: "auto",
		},
	});

	const result: Weather = weatherQuery;
	console.log(result.hourly);

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
	console.log(aqiQuery);

	// if (!process.env.MEDIASTACK_API_KEY) {
	// 	throw new Error("MEDIASTACK_API_KEY is not set");
	// }

	// if (!process.env.NODE_ENV) {
	// 	throw new Error("NODE_ENV is not set");
	// }

	// if (!process.env.NEXT_PUBLIC_VERCEL_URL) {
	// 	throw new Error("NEXT_PUBLIC_VERCEL_URL is not set");
	// }
	// const basePathForMediaStack =
	// 	process.env.NODE_ENV === "development"
	// 		? "http://localhost:3000/api/graphql"
	// 		: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/graphql`;

	// const response = await fetch(basePathForMediaStack, {
	// 	method: "POST",
	// 	cache: "default",
	// 	next: { revalidate: 300 },
	// 	headers: {
	// 		"Content-Type": "application/json",
	// 		//   Authorization: `apikey ${process.env.STEPZEN_API_KEY}`,
	// 	},
	// 	body: JSON.stringify({
	// 		query: fetchNewsQuery,
	// 		variables: {
	// 			access_key: process.env.MEDIASTACK_API_KEY,
	// 			categories: Object.values(NewsCategory).join(", "),
	// 			countries: "",
	// 			limit: "50",
	// 			offset: "0",
	// 			languages: "en",
	// 		},
	// 	}),
	// });

	// const { data } = await response.json();

	// const news = sortNews(data.newsQuery.data);

	// console.log("data:", data);

	const hourly24 = result.hourly.time.slice(0, 24);
	const precipitation24 = result.hourly.precipitation.slice(0, 24);

	const findTimeSpecificDataIndex = () => {
		let current = new Date(result.current.time).valueOf();
		current = current + result.utc_offset_seconds * 1000;

		const item = hourly24.filter((elem: any) => {
			let elemHr = new Date(elem).valueOf();
			elemHr = elemHr + result.utc_offset_seconds * 1000;

			return current >= elemHr && elemHr <= current;
		});
		// last items is the nearest to current time
		return item.length - 1;
	};

	const index = findTimeSpecificDataIndex();

	return (
		<div className="min-h-screen text-gray-100">
			<div className="flex flex-col min-h-screen">
				{/* Weather Overview */}
				<div className="flex-none">
					<h2 className="text-2xl font-bold pt-5">Weather Overview</h2>
					<p className="text-sm text-gray-400">
						Last Updated at: {new Date(result?.current?.time).toLocaleString()}(
						{result?.timezone})
					</p>
					<div className="m-2 mb-8">
						{/* <CalloutCard message={gptSummary} /> */}
					</div>

					{/* Summaries */}
					<PaginationSummary result={result} aqiResult={aqiResult} />

					{/* Stats */}
					<div className="grid grid-cols-2 gap-3 m-1">
						<CalloutCard>
							<div className="flex flex-col gap-y-2  ">
								<span className="flex items-center gap-x-1 text-sm text-gray-400">
									<TbUvIndex /> UV index
								</span>
								<div>
									<span className="font-semibold text-xl">
										{result?.daily.uv_index_max[0] <= 2
											? "Low"
											: result?.daily.uv_index_max[0] <= 5
											? "Moderate"
											: result?.daily.uv_index_max[0] <= 7
											? "High"
											: result?.daily.uv_index_max[0] <= 10
											? "Very High"
											: result?.daily.uv_index_max[0] > 10
											? "Extreme"
											: ""}
									</span>
								</div>
							</div>
						</CalloutCard>
						<CalloutCard>
							<div className="flex flex-col gap-y-2  ">
								<span className="flex items-center gap-x-1 text-sm text-gray-400">
									<RiWaterPercentFill /> Humidity
								</span>
								<div>
									<span className="font-semibold text-xl">
										{result?.current?.relative_humidity_2m} %
									</span>
								</div>
							</div>
						</CalloutCard>

						<CalloutCard>
							<div className="flex flex-col gap-y-2  ">
								<span className="flex items-center gap-x-1 text-sm text-gray-400">
									<FaWind /> Wind
								</span>

								<div className="font-semibold text-xl flex items-center gap-x-2 ">
									<div
										className={`rotate-[${result.current.wind_direction_10m.toFixed(
											0
										)}deg]`}
									>
										<FaArrowUp />
									</div>
									{result?.current?.wind_speed_10m}{" "}
									{result?.current_units?.wind_speed_10m}
								</div>
							</div>
						</CalloutCard>

						<CalloutCard>
							<div className="flex flex-col gap-y-2  ">
								<span className="flex items-center gap-x-1 text-sm text-gray-400">
									<MdDewPoint /> Dew point
								</span>
								<div>
									<span className="font-semibold text-xl">
										{result?.hourly.dew_point_2m[index]}{" "}
										{result.hourly_units.dew_point_2m}
									</span>
								</div>
							</div>
						</CalloutCard>
						<CalloutCard>
							<div className="flex flex-col gap-y-2  ">
								<span className="flex items-center gap-x-1 text-sm text-gray-400">
									<CgCompressV /> Pressure
								</span>
								<>
									<span className="font-semibold text-xl">
										{result?.current?.surface_pressure}{" "}
										{result.current_units.surface_pressure}
									</span>
								</>
							</div>
						</CalloutCard>
						<CalloutCard>
							<div className="flex flex-col gap-y-2 ">
								<span className="flex items-center gap-x-1 text-sm text-gray-400">
									<MdVisibility /> Visibility
								</span>
								<>
									<span className="font-semibold text-xl">
										{(result?.hourly.visibility[index] / 1000).toFixed(1)} km
									</span>
								</>
							</div>
						</CalloutCard>
					</div>
				</div>

				{/* Hourly Info */}
				<HourlyInfo
					data={result.hourly}
					utcOffsetSec={result.utc_offset_seconds}
					timezone={result.timezone}
					sunrise={result.daily.sunrise[0]}
					sunset={result.daily.sunset[0]}
				/>

				{/* Daily Info */}
				<DailyInfo data={result.daily} />

				{/* News  */}
				{/* <NewsArea
					data={news}
					timezone={result.timezone}
					utcOffsetSecond={result.utc_offset_seconds}
				/> */}
			</div>
		</div>
	);
}

export default WeatherPage;
