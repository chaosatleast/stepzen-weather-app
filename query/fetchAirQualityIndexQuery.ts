import { gql } from "@apollo/client";

const fetchAirQualityIndexQuery = gql`
	query MyQuery(
		$current: String!
		$latitude: String!
		$longitude: String!
		$timezone: String!
	) {
		aqiQuery(
			current: $current
			latitude: $latitude
			longitude: $longitude
			timezone: $timezone
		) {
			generationtime_ms
			elevation
			utc_offset_seconds
			timezone_abbreviation
			timezone
			longitude
			latitude
			current {
				dust
				european_aqi
				interval
				time
				us_aqi
			}
			current_units {
				dust
				european_aqi
				interval
				time
				us_aqi
			}
		}
	}
`;

export default fetchAirQualityIndexQuery;
