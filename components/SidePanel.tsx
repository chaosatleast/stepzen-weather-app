import weatherCodeToString from "@/helper/weatherCodeToIconAndStr";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import Image from "next/image";
import CityPicker from "./CityPicker";
import { convertDateToTimezone } from "@/helper/dateConversion";
import dayjs from "dayjs";

type Props = {
  result: Weather;
  city: string;
  lat: string;
  long: string;
};
function SidePanel({ result, city, lat, long }: Props) {
  city = decodeURI(city).replaceAll("_", " ");

  const determineBackgroundGradient = () => {
    let current = new Date().getTime();
    let sunset = new Date(result.daily.sunset[0]).valueOf();
    let sunrise = new Date(result.daily.sunrise[0]).valueOf();

    if (result.utc_offset_seconds < 0) {
      current = current - Math.abs(result.utc_offset_seconds * 1000);
      sunrise = sunrise - Math.abs(result.utc_offset_seconds * 1000);
      sunset = sunset - Math.abs(result.utc_offset_seconds * 1000);
      console.log(current - sunrise);
    } else {
      current = current + Math.abs(result.utc_offset_seconds * 1000);
      sunrise = sunrise + Math.abs(result.utc_offset_seconds * 1000);
      sunset = sunset + Math.abs(result.utc_offset_seconds * 1000);
    }

    const factor = 30;

    const sunsetStart = sunset - Math.floor(factor * 60 * 1000);
    const sunsetEnd = sunset + Math.floor(factor * 60 * 1000);

    const sunriseStart = sunrise - Math.floor(factor * 60 * 1000);
    const sunriseEnd = sunrise + Math.floor(factor * 60 * 1000);

    if (current >= sunriseStart && current <= sunriseEnd) {
      return `var(--sunrise-gradient)`;
    } else if (current > sunriseEnd && current < sunsetStart) {
      return `var(--daytime-gradient)`;
    } else if (current >= sunsetStart && current <= sunsetEnd) {
      return `var(--sunset-gradient)`;
    } else if (current > sunsetEnd) {
      return `var(--nighttime-gradient)`;
    }
  };

  const gradient = determineBackgroundGradient();
  console.log(gradient);

  return (
    <div
      className="min-h-screen p-10 text-gray-100 "
      style={{
        background: gradient,
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
        <div className="flex items-start justify-stretch gap-x-4">
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
          <Image
            src={`https://www.weatherbit.io/static/img/icons/${
              weatherCodeToString[result.current.weather_code].iconDay
            }.png`}
            alt={weatherCodeToString[result.current.weather_code].description}
            objectFit="fit"
            height={70}
            width={70}
            quality={100}
          />
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
  );
}

export default SidePanel;
