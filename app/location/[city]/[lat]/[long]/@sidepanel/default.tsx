import { createApolloClient } from "@/apollo-client";
import CityPicker from "@/components/CityPicker";
import fetchWeatherQuery from "@/query/fetchWeatherQuery";
import { getGradient } from "@/helper/getGradient";
import weatherCodeToString from "@/helper/weatherCodeToIconAndStr";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import Image from "next/image";
import React from "react";
type Props = {
	params: {
		city: string;
		lat: string;
		long: string;
	};
};

async function SidePanel({ params: { city, lat, long } }: Props) {
	const client = createApolloClient();

	const {
		data: { weatherQuery },
	} = await client.query({
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
	city = decodeURI(city).replaceAll("_", " ");

	const gradient = getGradient(
		result.utc_offset_seconds,
		result.daily.sunrise[0],
		result.daily.sunset[0],
		result.timezone
	);
	console.log(`gradient: `, gradient);

	return (
		<div className="">
			<div
				className="min-h-screen p-10 text-gray-100"
				style={{
					background: gradient ?? `var(--dark)`,
				}}
			>
				<div className="pb-5 space-y-2">
					{/* City Name */}
					<h1 className="text-6xl font-bold">
						{city[0].toUpperCase() + city.slice(1)}
					</h1>
					{/* LongLat */}
					<p className="text-xs text-gray-200">
						Long/Lat :{long}, {lat}
					</p>
				</div>

				<CityPicker />

				<hr className="my-10" />
				{/* Date, Time and Timezone */}
				<div className="flex justify-between items-center">
					<div className="flex flex-col">
						<p className="text-xl">
							{new Date().toLocaleString("en-GB", {
								day: "numeric",
								month: "long",
								year: "numeric",
								weekday: "long",
								timeZone: result.timezone,
							})}
						</p>
						<p className="text-sm">
							Timezone: {result.timezone.replace("_", " ")}
						</p>
					</div>
					<div className="">
						<p className="text-xl font-bold uppercase ">
							{new Date().toLocaleTimeString("en-GB", {
								hour: "numeric",
								minute: "numeric",
								hour12: true,
								timeZone: result.timezone,
							})}
						</p>
					</div>
				</div>
				<hr className="my-10" />
				<div className="flex justify-between">
					{/* Day/Night Icon */}

					{/* Temperature and description */}
					<div className="flex xl:flex-col items-start justify-stretch gap-x-4">
						<p className="text-7xl font-semibold">
							{result.current.temperature_2m.toFixed(0)} °
						</p>
						<div>
							<p className="text-lg font-semibold pt-2">
								{result.daily.temperature_2m_max[0].toFixed(0)} ° /{" "}
								{result.daily.temperature_2m_min[0].toFixed(0)} °{" "}
							</p>
							<p className="text-md text-right">
								{weatherCodeToString[result.current.weather_code].description}
							</p>
						</div>
					</div>
					<div>
						{/* Day/Night Icon */}
						{result.current.is_day ? (
							<Image
								src={`https://www.weatherbit.io/static/img/icons/${
									weatherCodeToString[result.current.weather_code].iconDay
								}.png`}
								alt={
									weatherCodeToString[result.current.weather_code].description
								}
								objectFit="fit"
								height={70}
								width={70}
								quality={100}
							/>
						) : (
							<Image
								src={`https://www.weatherbit.io/static/img/icons/${
									weatherCodeToString[result.current.weather_code].iconNight
								}.png`}
								alt={
									weatherCodeToString[result.current.weather_code].description
								}
								objectFit="fit"
								height={70}
								width={70}
								quality={100}
							/>
						)}
					</div>
				</div>
				{/* Sunrise and Sunset */}
				<div className="flex flex-col space-y-2 py-3">
					<div className="flex items-center space-x-2 px-4 py-3   rounded-md  shadow-2xl ring-1 ring-white/10 bg-white/10">
						<SunIcon className="h-10 w-10 text-gray-200" />
						<div className="flex-1 flex justify-between items-center">
							<p className="font-extralight">Sunrise</p>
							<p className="uppercase text-2xl">
								{new Date(result.daily.sunrise[0]).toLocaleTimeString("en-GB", {
									hour: "numeric",
									minute: "numeric",
									hour12: true,
								})}
							</p>
						</div>
					</div>
					<div className="flex items-center space-x-2 px-4 py-3 rounded-md  shadow-2xl ring-1 ring-white/10 bg-white/10">
						<MoonIcon className="h-10 w-10" />
						<div className="flex-1 flex justify-between items-center">
							<p className="font-extralight">Sunset</p>
							<p className="uppercase text-2xl">
								{new Date(result.daily.sunset[0]).toLocaleTimeString("en-GB", {
									hour: "numeric",
									minute: "numeric",
									hour12: true,
								})}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SidePanel;
