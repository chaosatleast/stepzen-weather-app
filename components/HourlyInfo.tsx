"use client";
import React from "react";
import CalloutCard from "./CalloutCard";
import {} from "react-icons/fa6";
import { FiClock } from "react-icons/fi";
import { Chart as ChartJs } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { CategoryScale, layouts } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import weatherCodeToString from "@/helper/weatherCodeToIconAndStr";
import Image from "next/image";
import { BsDropletHalf, BsFillDropletFill, BsDroplet } from "react-icons/bs";
ChartJs.register(CategoryScale);
ChartJs.register(ChartDataLabels);

function HourlyInfo({
  data,
  utcOffsetSec,
  timezone,
  sunset,
  sunrise,
}: {
  data: Hourly;
  utcOffsetSec: number;
  timezone: string;
  sunset: string;
  sunrise: string;
}) {
  const precipitationProbability24 = data.precipitation_probability.slice(
    0,
    24
  );
  const temperature2m24 = data.temperature_2m.slice(0, 24);
  const weatherCode24 = data.weather_code.slice(0, 24);
  const time24 = data.time.slice(0, 24).map((elem: any) => {
    return new Date(elem)
      .toLocaleTimeString("en-GB", {
        hour: "numeric",
        hour12: true,
      })
      .toLocaleUpperCase();
  });

  const sunsetVal = new Date(sunset).valueOf();
  const sunriseVal = new Date(sunrise).valueOf();

  const iconDayOrNight = data.time.map((elem: any, index: number) => {
    let elemVal = new Date(elem).valueOf();
    console.log(elemVal);
    if (elemVal < sunriseVal) {
      return "iconNight";
    } else if (elemVal > sunriseVal && elemVal < sunsetVal) {
      return "iconDay";
    } else {
      return "iconNight";
    }
  });

  return (
    <div className="pt-5 m-1">
      <CalloutCard>
        <div className="">
          <div className="text-blue-600 ">
            <div className="flex gap-x-2 items-center">
              <FiClock />
              HOURLY FORCAST
            </div>
          </div>
          <hr className="h-px my-4 bg-zinc-700 border-0"></hr>
          {/* Scrollable content */}
          <div className="max-h-[800px] w-full max-w-full overflow-x-scroll mt-10">
            <div className=" w-[2800px] h-54 ">
              <Line
                options={{
                  layout: {
                    padding: 20,
                  },
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                    datalabels: {
                      formatter: function (value, context) {
                        return value.toFixed(0) + " °";
                      },

                      align: "top",
                      offset: 5,
                      clip: false,
                      color: "rgb(156 163 175)",
                      font: { size: 12, weight: 400 },
                    },
                  },

                  scales: {
                    x: {
                      ticks: {
                        color: "rgb(209 213 219)",
                        font: { size: 16, weight: 400 },
                      },
                      border: { display: false },
                      grid: { display: false },
                    },
                    y: {
                      display: false,
                      grid: { display: false },
                    },
                  },
                }}
                data={{
                  labels: time24,
                  datasets: [
                    {
                      data: temperature2m24,
                    },
                  ],
                }}
              />
            </div>
            <div className="w-[2800px] flex justify-between text-gray-400 mx-auto -mt-6">
              {weatherCode24.map((elem: number, index: number) => (
                <>
                  <div className="flex items-center justify-center flex-col">
                    <Image
                      src={`https://www.weatherbit.io/static/img/icons/${
                        weatherCodeToString[weatherCode24[index]][
                          `${iconDayOrNight[index]}`
                        ]
                      }.png`}
                      alt={weatherCodeToString[elem].description}
                      objectFit="fit"
                      height={50}
                      width={50}
                      quality={100}
                    />
                    <div className="flex items-center text-sm gap-x-px justify-center -mt-1">
                      {elem < 20 ? (
                        <BsDroplet className="h-3 w-3" />
                      ) : elem < 60 ? (
                        <BsDropletHalf className="h-3 w-3" />
                      ) : (
                        <BsFillDropletFill className="h-3 w-3" />
                      )}
                      <span>{precipitationProbability24[index]}%</span>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </CalloutCard>
    </div>
  );
}

export default HourlyInfo;
