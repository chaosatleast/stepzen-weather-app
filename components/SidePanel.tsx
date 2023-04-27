import React from "react";
import CityPicker from "./CityPicker";
import { Card, Divider, Subtitle, Text } from "@tremor/react";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import weatherCodeToString from "@/helper/weatherCodeToIconAndStr";
import Image from "next/image";

type Props = {
  result: Weather;
  city: string;
  lat: string;
  long: string;
};
function SidePanel({ result, city, lat, long }: Props) {
  return (
    <div className="h-screen p-10 text-white bg-gradient-to-br from-[#394F68] to-[#183B7E]">
      <div className="pb-5 space-y-2">
        {/* City Name */}
        <h1 className="text-6xl font-bold">{decodeURI(city)}</h1>
        {/* LongLat */}
        <p className="text-xs text-gray-400">
          Long/Lat :{long}, {lat}
        </p>
      </div>

      <CityPicker />

      <hr className="my-10" />
      {/* Date, Time and Timezone */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <p className="text-xl">
            {new Date().toLocaleDateString("en-GB", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="font-extralight">
            Timezone:{" "}
            {Intl.DateTimeFormat().resolvedOptions().timeZone.replace("_", " ")}
          </p>
        </div>
        <div className="">
          <p className="text-xl font-bold uppercase ">
            {new Date().toLocaleTimeString("en-GB", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </p>
        </div>
      </div>
      <hr className="my-10" />
      <div className="flex items-center justify-between">
        <div>
          {/* Day/Night Icon */}
          <Image
            src={`https://www.weatherbit.io/static/img/icons/${
              weatherCodeToString[result.current_weather.weathercode].iconDay
            }.png`}
            alt={
              weatherCodeToString[result.current_weather.weathercode]
                .description
            }
            width={75}
            height={75}
          />
          {/* Temperature and description */}
          <div className="flex justify-between items-center space-x-10">
            <p className="text-4xl font-semibold">
              {result?.current_weather.temperature.toFixed(1)} &#8451;
            </p>
            <p className="text-sm text-right font-extralight">
              {
                weatherCodeToString[result.current_weather.weathercode]
                  .description
              }
            </p>
          </div>
        </div>
      </div>
      {/* Sunrise and Sunset */}
      <div className="flex flex-col space-y-2 py-3">
        <div className="flex items-center space-x-2 px-4 py-3 border border-[#6F90CD] rounded-md bg-[#405885]">
          <SunIcon className="h-10 w-10 text-gray-400" />
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
        <div className="flex items-center space-x-2 px-4 py-3 border border-[#6F90CD] rounded-md bg-[#405885]">
          <MoonIcon className="h-10 w-10 text-gray-400" />
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
