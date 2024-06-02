"use client";
import React, { useState } from "react";
import {
  Pagination,
  PaginationItem,
  PaginationCursor,
} from "@nextui-org/pagination";
import { Progress } from "@nextui-org/progress";
import { CgCompressV } from "react-icons/cg";
import { FaArrowUp, FaRegSun, FaTemperatureHigh, FaWind } from "react-icons/fa";
import { IoIosWarning, IoMdSunny } from "react-icons/io";
import { IoUmbrellaSharp } from "react-icons/io5";
import { MdDewPoint, MdVisibility } from "react-icons/md";
import { RiWaterPercentFill } from "react-icons/ri";
import { TbUvIndex } from "react-icons/tb";

import CalloutCard from "./CalloutCard";
import { FaCircleChevronLeft } from "react-icons/fa6";
import { ChevronLeftIcon } from "@heroicons/react/solid";

type PaginationSummaryProps = {
  result: Weather;
  aqiResult: AirQualityIndex;
};

export default function PaginationSummary({
  result,
  aqiResult,
}: PaginationSummaryProps) {
  const hourly24 = result.hourly.time.slice(0, 24);
  const precipitation24 = result.hourly.precipitation.slice(0, 24);

  const findTimeSpecificDataIndex = () => {
    let current = new Date(result.current.time).valueOf();
    current = current - Math.abs(result.utc_offset_seconds * 1000);

    const item = hourly24.filter((elem: any) => {
      let elemHr = new Date(elem).valueOf();
      elemHr = elemHr - Math.abs(result.utc_offset_seconds * 1000);

      return current >= elemHr && elemHr <= current;
    });
    // last items is the nearest to current time
    return item.length - 1;
  };

  const index = findTimeSpecificDataIndex();

  const findRainingStopTime = () => {
    let rid = index;
    const rainStop = precipitation24
      .map((elem: any, index: number) => {
        if (index > rid && elem == 0) {
          return index;
        }
      })
      .filter((elem: any) => elem);

    return rainStop[0];
  };

  const findRainingStartTime = () => {
    let rid = index;

    const rainStart = precipitation24
      .map((elem: any, index: number) => {
        if (index > rid && elem > 0) {
          return index;
        }
      })
      .filter((elem: any) => elem);
    return rainStart[0];
  };

  const isSunnyDay = () => {
    const precipitate = precipitation24.filter((elem: any) => elem > 0);
    if (precipitate.length > 0) return false;
    else return true;
  };

  const contents = [
    {
      display: true,
      id: 1,
      value: (
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-y-2 pb-2 ">
            <span className="flex items-center gap-x-1 text-sm text-gray-400">
              <FaTemperatureHigh /> Today's Feels Like Temperature
            </span>
            <>
              <span className="font-semibold text-md">
                Humidity will make high feel like{" "}
                {result.current.apparent_temperature.toFixed(0)}{" "}
                {result.current_units.apparent_temperature}
              </span>
            </>
          </div>
          <span className="font-semibold text-2xl">
            {result.current.apparent_temperature.toFixed(0)} °
          </span>
        </div>
      ),
    },
    {
      display: true,
      id: 2,
      value: (
        <div className="flex flex-col items-center   ">
          <span className="text-sm text-gray-400">AQI</span>
          <>
            <span className="font-semibold text-md pb-1">
              {aqiResult.current.us_aqi <= 50
                ? "Good"
                : aqiResult.current.us_aqi <= 100
                ? "Moderate"
                : aqiResult.current.us_aqi <= 150
                ? "Unhealthy for Sensitive Individuals"
                : aqiResult.current.us_aqi <= 200
                ? "Unhealthy"
                : aqiResult.current.us_aqi <= 300
                ? "Very Unhealthy"
                : aqiResult.current.us_aqi > 300
                ? "Hazardous"
                : ""}
              ({aqiResult.current.us_aqi})
            </span>
          </>
          <Progress
            size="md"
            className="w-72"
            classNames={{
              indicator: `${
                aqiResult.current.us_aqi <= 50
                  ? "bg-green-500"
                  : aqiResult.current.us_aqi <= 100
                  ? "bg-yellow-400"
                  : aqiResult.current.us_aqi <= 150
                  ? "bg-orange-500"
                  : aqiResult.current.us_aqi <= 200
                  ? "bg-red-500"
                  : aqiResult.current.us_aqi <= 300
                  ? "bg-purple-600"
                  : aqiResult.current.us_aqi > 300
                  ? "bg-purple-800"
                  : "bg-zinc-600"
              }`,
            }}
            value={aqiResult.current.us_aqi}
            maxValue={301}
          />
        </div>
      ),
    },
    {
      display: result.daily.uv_index_max[0] >= 5 ? true : false,
      id: 3,
      value: (
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-y-2 pb-2 ">
            <span className="flex items-center gap-x-1 text-sm text-gray-400">
              <IoMdSunny /> Protect your skin
            </span>
            <>
              <span className="font-semibold text-md">
                UV will be high, remember to wear sunscreen
              </span>
            </>
          </div>
          <div className="font-semibold  text-md  flex flex-col items-center">
            <span>{result.daily.uv_index_max[0]}</span>
            <Progress
              size="sm"
              className="w-32"
              classNames={{
                indicator: `bg-gray-300`,
              }}
              value={result.daily.uv_index_max[0]}
              maxValue={10}
            />
          </div>
        </div>
      ),
    },
    {
      display: aqiResult.current.us_aqi > 100 ? true : false,
      id: 4,
      value: (
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-y-2 pb-2 ">
            <span className="flex items-center gap-x-1 text-sm text-gray-400">
              <IoIosWarning /> Unhealthy air quality warning
            </span>
            <>
              <span className="font-semibold text-md">
                Reduce outdoor activities, remember to wear mask when going out
              </span>
            </>
          </div>
        </div>
      ),
    },
    {
      display: true,
      id: 5,
      value: (
        <>
          {isSunnyDay() ? (
            <>
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-y-2 pb-2 ">
                  <span className="flex items-center gap-x-1 text-sm text-gray-400">
                    <FaRegSun /> Sunny day!
                  </span>
                  <span className="font-semibold text-md">
                    No precipitation is likely to happen in today
                  </span>
                </div>
                <span className="font-semibold text-2xl">
                  {result.hourly.precipitation_probability[index].toFixed(0)} %
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-y-2 pb-2 ">
                  <span className="flex items-center gap-x-1 text-sm text-gray-400">
                    <IoUmbrellaSharp /> Grab an umberlla!
                  </span>
                  {precipitation24[index] > 0 ? (
                    <>
                      <span className="font-semibold text-md">
                        It's raining now. Possible to be continued until{" "}
                        {findRainingStopTime() !== undefined
                          ? new Date(`${hourly24[findRainingStopTime()!]}`)
                              .toLocaleTimeString("en-GB", {
                                hour: "numeric",
                                hour12: true,
                              })
                              .toLocaleUpperCase()
                          : "Tomorrow"}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="font-semibold text-md">
                        Raining possible to continue after{" "}
                        {findRainingStartTime() !== undefined
                          ? new Date(`${hourly24[findRainingStartTime()!]}`)
                              .toLocaleTimeString("en-GB", {
                                hour: "numeric",
                                hour12: true,
                              })
                              .toLocaleUpperCase()
                          : ""}
                      </span>
                    </>
                  )}
                </div>
                <span className="font-semibold text-2xl">
                  {result.hourly.precipitation_probability[index].toFixed(0)} %
                </span>
              </div>
            </>
          )}
        </>
      ),
    },
  ];

  const [activeItems, setActiveItems] = useState(
    contents.filter((item: any) => item.display)
  );

  const [curr, setCurr] = useState(0);

  const prev = () => {
    setCurr((curr) => (curr === 0 ? activeItems.length - 1 : curr - 1));
  };

  const next = () => {
    setCurr((curr) => (curr === activeItems.length - 1 ? 0 : curr + 1));
  };

  const clickDot = (index: number) => {
    setCurr(index);
  };

  return (
    <div className="m-1 pb-2">
      <CalloutCard>
        <div className="h-20 flex flex-col gap-y-2 overflow-hidden">
          <div
            className="flex transition-transform ease-out duration-500"
            style={{ transform: `translateX(-${curr * 100}%)` }}
          >
            {activeItems.map((item: any, index: number) => {
              return (
                <>
                  <div className="shrink-0 w-full">{item.value}</div>
                </>
              );
            })}
          </div>
          {/* Controls */}
          <div className="text-gray-100 flex items-center justify-center gap-x-3">
            <FaCircleChevronLeft className="h-3 w-3" onClick={prev} />
            {activeItems.map((item: any, index: any) => {
              return (
                <>
                  <div
                    onClick={() => clickDot(index)}
                    className={`shrink-0 w-2 h-2  rounded-full transition-all ease-in-out duration-500 ${
                      index == curr ? `bg-gray-200 h-3 w-3` : `bg-gray-500`
                    }`}
                  ></div>
                </>
              );
            })}
            <FaCircleChevronLeft
              className="rotate-[180deg] h-3 w-3"
              onClick={next}
            />
          </div>
        </div>
      </CalloutCard>
    </div>
  );
}
