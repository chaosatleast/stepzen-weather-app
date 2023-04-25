import React from "react";
import CityPicker from "./CityPicker";
import { Card, Divider, Subtitle, Text } from "@tremor/react";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";

type Props = {
  result: Weather;
  city: string;
  lat: string;
  long: string;
};
function SidePanel({ result, city, lat, long }: Props) {
  return (
    <div className="w-full xl:w-80 p-10 h-screen  text-white bg-gradient-to-br from-[#394F68] to-[#183B7E]">
      <div className="pb-5">
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
      {/* Day/Night Icon */}
      <div className="h-12 w-12 bg-yellow-300 rounded-full"></div>
      {/* Temperature and description */}
      <div className="flex justify-between items-center py-2">
        <p className="text-4xl  font-semibold">
          {result?.current_weather.temperature.toFixed(1)} &#8451;
        </p>
        <Text className="text-md  font-thin">Clear sky</Text>
      </div>
      {/* Sunrise and Sunset */}
      <div className="flex flex-col space-y-2">
        <Card className="flex items-center h-fit">
          <SunIcon className="h-10 w-10" />
          <Text className="flex-1">Sunrise</Text>
          <Text>5:12 AM</Text>
        </Card>
        <Card className="flex items-center h-fit">
          <MoonIcon className="h-10 w-10" />
          <Text className="flex-1">Sunset</Text>
          <Text>6:18 PM</Text>
        </Card>
      </div>
    </div>
  );
}

export default SidePanel;
