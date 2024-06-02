import { gql } from "@apollo/client";

const fetchWeatherQuery = gql`
  query MyQuery(
    $current: String!
    $daily: String!
    $hourly: String!
    $latitude: String!
    $longitude: String!
    $timezone: String!
  ) {
    weatherQuery(
      current: $current
      daily: $daily
      hourly: $hourly
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
      hourly {
        time
        temperature_2m
        relative_humidity_2m
        dew_point_2m
        apparent_temperature
        precipitation_probability
        precipitation
        rain
        showers
        snowfall
        snow_depth
        weather_code
        surface_pressure
        visibility
      }
      hourly_units {
        apparent_temperature
        dew_point_2m
        precipitation
        precipitation_probability
        rain
        relative_humidity_2m
        showers
        snow_depth
        snowfall
        surface_pressure
        temperature_2m
        time
        visibility
        weather_code
      }
      daily {
        time
        weather_code
        temperature_2m_max
        temperature_2m_min
        apparent_temperature_max
        apparent_temperature_min
        sunrise
        sunset
        uv_index_max
        uv_index_clear_sky_max
        precipitation_sum
        rain_sum
        showers_sum
        snowfall_sum
        precipitation_hours
        precipitation_probability_max
      }
      daily_units {
        apparent_temperature_max
        apparent_temperature_min
        precipitation_hours
        precipitation_probability_max
        precipitation_sum
        rain_sum
        showers_sum
        snowfall_sum
        sunrise
        sunset
        temperature_2m_max
        temperature_2m_min
        time
        uv_index_clear_sky_max
        uv_index_max
        weather_code
      }
      current {
        time
        temperature_2m
        relative_humidity_2m
        apparent_temperature
        is_day
        precipitation
        rain
        showers
        snowfall
        weather_code
        surface_pressure
        wind_speed_10m
        wind_direction_10m
      }
      current_units {
        apparent_temperature
        interval
        is_day
        precipitation
        rain
        relative_humidity_2m
        showers
        snowfall
        surface_pressure
        temperature_2m
        time
        weather_code
        wind_direction_10m
        wind_speed_10m
      }
    }
  }
`;

export default fetchWeatherQuery;
