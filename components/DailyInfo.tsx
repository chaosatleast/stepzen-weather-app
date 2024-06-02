import React from "react";
import CalloutCard from "./CalloutCard";
import { SlCalender } from "react-icons/sl";
import { BsDroplet, BsDropletHalf, BsFillDropletFill } from "react-icons/bs";
import Image from "next/image";
import weatherCodeToString from "@/helper/weatherCodeToIconAndStr";
function DailyInfo({ data }: { data: Daily }) {
  const time6 = data.time.slice(1, 7);
  const weather6 = data.weather_code.slice(1, 7);
  const minTemp6 = data.temperature_2m_min.slice(1, 7);
  const maxTemp6 = data.temperature_2m_max.slice(1, 7);
  const precipitation6 = data.precipitation_probability_max.slice(1, 7);
  const apparentTemp6 = data.apparent_temperature_max.slice(1, 7);
  return (
    <div className="pt-5 m-1">
      <CalloutCard>
        <div className="text-blue-600 ">
          <div className="flex gap-x-2 items-center">
            <SlCalender />
            DAILY FORECAST
          </div>
        </div>
        <hr className="h-px my-4 bg-zinc-700 border-0"></hr>
        <div className="flex flex-col gap-y-2 items-center text-gray-100 text-lg xl:text-xl font-semibold">
          {time6.map((elem: string, index: number) => (
            <>
              <div className="w-full grid grid-cols-5 ">
                <div className="flex items-center  text-md col-span-1">
                  <span className="shrink-0">
                    {new Date(elem).toLocaleString("en-GB", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-x-1 justify-center shrink-0 font-normal">
                  {precipitation6[index] < 20 ? (
                    <BsDroplet className="h-3 w-3" />
                  ) : precipitation6[index] < 60 ? (
                    <BsDropletHalf className="h-3 w-3" />
                  ) : (
                    <BsFillDropletFill className="h-3 w-3" />
                  )}
                  <span className="text-sm">{precipitation6[index]}%</span>
                </div>
                <div className="font-normal flex  items-center text-sm">
                  {weatherCodeToString[weather6[index]].description}
                </div>

                <div className="flex items-center justify-center shrink-0 col-span-1 ">
                  <Image
                    src={`https://www.weatherbit.io/static/img/icons/${
                      weatherCodeToString[weather6[index]][`iconDay`]
                    }.png`}
                    alt={weatherCodeToString[weather6[index]].description}
                    objectFit="fit"
                    height={50}
                    width={50}
                    quality={100}
                  />
                </div>
                <div className="flex  text-md gap-x-2 items-center justify-center  col-span-1">
                  <div className="shrink-0">
                    <span>{apparentTemp6[index].toFixed(0)} °</span>
                  </div>
                  <div className="text-sm text-start shrink-0 md:block hidden ">
                    {maxTemp6[index].toFixed(0)} °/ {minTemp6[index].toFixed(0)}{" "}
                    °
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </CalloutCard>
    </div>
  );
}

export default DailyInfo;
