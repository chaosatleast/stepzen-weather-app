import { gql } from "@apollo/client";

export const typeDefs = gql`
	type Current {
		apparent_temperature: Float
		interval: Float
		is_day: Int
		precipitation: Float
		rain: Float
		relative_humidity_2m: Float
		showers: Float
		snowfall: Float
		surface_pressure: Float
		temperature_2m: Float
		time: String
		weather_code: Int
		wind_direction_10m: Float
		wind_speed_10m: Float
	}

	type CurrentUnits {
		apparent_temperature: String
		interval: String
		is_day: String
		precipitation: String
		rain: String
		relative_humidity_2m: String
		showers: String
		snowfall: String
		surface_pressure: String
		temperature_2m: String
		time: String
		weather_code: String
		wind_direction_10m: String
		wind_speed_10m: String
	}

	type Daily {
		apparent_temperature_max: [Float]
		apparent_temperature_min: [Float]
		precipitation_hours: [Int]
		precipitation_probability_max: [Int]
		precipitation_sum: [Float]
		rain_sum: [Float]
		showers_sum: [Float]
		snowfall_sum: [Int]
		sunrise: [String]
		sunset: [String]
		temperature_2m_max: [Float]
		temperature_2m_min: [Float]
		time: [String]
		uv_index_clear_sky_max: [Float]
		uv_index_max: [Float]
		weather_code: [Int]
	}

	type DailyUnits {
		apparent_temperature_max: String
		apparent_temperature_min: String
		precipitation_hours: String
		precipitation_probability_max: String
		precipitation_sum: String
		rain_sum: String
		showers_sum: String
		snowfall_sum: String
		sunrise: String
		sunset: String
		temperature_2m_max: String
		temperature_2m_min: String
		time: String
		uv_index_clear_sky_max: String
		uv_index_max: String
		weather_code: String
	}

	type Hourly {
		apparent_temperature: [Float]
		dew_point_2m: [Float]
		precipitation: [Float]
		precipitation_probability: [Float]
		rain: [Float]
		relative_humidity_2m: [Float]
		showers: [Float]
		snow_depth: [Float]
		snowfall: [Float]
		surface_pressure: [Float]
		temperature_2m: [Float]
		time: [String]
		visibility: [Int]
		weather_code: [Int]
	}

	type HourlyUnits {
		apparent_temperature: String
		dew_point_2m: String
		precipitation: String
		precipitation_probability: String
		rain: String
		relative_humidity_2m: String
		showers: String
		snow_depth: String
		snowfall: String
		surface_pressure: String
		temperature_2m: String
		time: String
		visibility: String
		weather_code: String
	}

	type Root {
		current: Current
		current_units: CurrentUnits
		daily: Daily
		daily_units: DailyUnits
		elevation: Int
		generationtime_ms: Float
		hourly: Hourly
		hourly_units: HourlyUnits
		latitude: Float
		longitude: Float
		timezone: String
		timezone_abbreviation: String
		utc_offset_seconds: Int
	}

	type CurrentAQI {
		dust: Int
		european_aqi: Int
		interval: Int
		time: String
		us_aqi: Int
	}

	type CurrentUnitsAQI {
		dust: String
		european_aqi: String
		interval: String
		time: String
		us_aqi: String
	}

	type RootAQI {
		current: CurrentAQI
		current_units: CurrentUnitsAQI
		elevation: Int
		generationtime_ms: Float
		latitude: Float
		longitude: Float
		timezone: String
		timezone_abbreviation: String
		utc_offset_seconds: Int
	}

	type DataEntry {
		author: String
		category: String
		country: String
		description: String
		image: String
		language: String
		published_at: String
		source: String
		title: String
		url: String
	}

	type Pagination {
		count: Int
		limit: Int
		offset: Int
		total: Int
	}

	type NewsRoot {
		data: [DataEntry]
		pagination: Pagination
	}

	type Query {
		weatherQuery(
			current: String
			daily: String
			hourly: String
			latitude: String
			longitude: String
			timezone: String
		): Root

		aqiQuery(
			current: String
			latitude: String
			longitude: String
			timezone: String
		): RootAQI

		newsQuery(
			access_key: String
			categories: String
			countries: String
			limit: String
			offset: String
			languages: String
		): NewsRoot
	}
`;
