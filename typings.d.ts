interface Current {
  apparent_temperature: number;
  interval: number;
  is_day: number;
  precipitation: number;
  rain: number;
  relative_humidity_2m: number;
  showers: number;
  snowfall: number;
  surface_pressure: number;
  temperature_2m: number;
  time: string;
  weather_code: number;
  wind_direction_10m: Int;
  wind_speed_10m: number;
}

interface CurrentUnits {
  apparent_temperature: string;
  interval: string;
  is_day: string;
  precipitation: string;
  rain: string;
  relative_humidity_2m: string;
  showers: string;
  snowfall: string;
  surface_pressure: string;
  temperature_2m: string;
  time: string;
  weather_code: string;
  wind_direction_10m: string;
  wind_speed_10m: string;
}

interface Daily {
  apparent_temperature_max: number[];
  apparent_temperature_min: number[];
  precipitation_hours: number[];
  precipitation_probability_max: number[];
  precipitation_sum: number[];
  rain_sum: number[];
  showers_sum: number[];
  snowfall_sum: number[];
  sunrise: string[];
  sunset: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  time: string[];
  uv_index_clear_sky_max: number[];
  uv_index_max: number[];
  weather_code: number[];
}
interface DailyUnits {
  apparent_temperature_max: string;
  apparent_temperature_min: string;
  precipitation_hours: string;
  precipitation_probability_max: string;
  precipitation_sum: string;
  rain_sum: string;
  showers_sum: string;
  snowfall_sum: string;
  sunrise: string;
  sunset: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  time: string;
  uv_index_clear_sky_max: string;
  uv_index_max: string;
  weather_code: string;
}

interface Hourly {
  apparent_temperature: number[];
  dew_point_2m: number[];
  precipitation: number[];
  precipitation_probability: number[];
  rain: number[];
  relative_humidity_2m: number[];
  showers: number[];
  snow_depth: number[];
  snowfall: number[];
  surface_pressure: number[];
  temperature_2m: number[];
  time: [String];
  visibility: number[];
  weather_code: number[];
}

interface HourlyUnits {
  apparent_temperature: string;
  dew_point_2m: string;
  precipitation: string;
  precipitation_probability: string;
  rain: string;
  relative_humidity_2m: string;
  showers: string;
  snow_depth: string;
  snowfall: string;
  surface_pressure: string;
  temperature_2m: string;
  time: string;
  visibility: string;
  weather_code: string;
}

interface Weather {
  current: Current;
  current_units: CurrentUnits;
  daily: Daily;
  daily_units: DailyUnits;
  elevation: number;
  generationtime_ms: number;
  hourly: Hourly;
  hourly_units: HourlyUnits;
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
}

interface Country {
  id: number;
  name: string;
  iso3: string;
  iso2: string;
  numeric_code: string;
  phone_code: string;
  currency: string;
  currency_name: string;
  currency_symbol: string;
  tld: string;
  native: string;
  timezones: string;
  latitude: string;
  longitude: string;
  emoji: string;
}

interface State {
  id: number;
  name: string;
  country_id: number;
  country_code: string;
  latitude: string;
  longitude: string;
  state_code: string;
}

interface City {
  id: number;
  name: string;
  state_id: number;
  country_id: number;
  latitude: string;
  longitude: string;
  wikiDataId: string;
}

interface AirQualityIndex {
  current: CurrentAQI;
  current_units: CurrentUnitsAQI;
  elevation: number;
  generationtime_ms: number;
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: String;
  utc_offset_seconds: number;
}

interface CurrentUnitsAQI {
  dust: string;
  european_aqi: string;
  interval: string;
  time: string;
  us_aqi: string;
}

interface CurrentAQI {
  dust: number;
  european_aqi: number;
  interval: number;
  time: string;
  us_aqi: number;
}
