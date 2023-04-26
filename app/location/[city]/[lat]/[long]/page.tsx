import SidePanel from "@/components/SidePanel";
import Dashboard from "@/components/Dashboard";
import React from "react";
import { getClient } from "@/apollo-client";
import fetchWeatherQuery from "@/graphQL/fetchWeatherQuery";
import cleanData from "@/helper/cleanData";
import getHostPath from "@/helper/getHostPath";
type Props = {
  params: {
    city: string;
    lat: string;
    long: string;
  };
};

export const revalidate = 60;

async function WeatherPage({ params: { city, lat, long } }: Props) {
  const client = getClient();

  const { data } = await client.query({
    query: fetchWeatherQuery,
    variables: {
      current_weather: "true",
      longitude: long,
      latitude: lat,
      timezone: "GMT",
    },
  });

  const result: Weather = data?.weatherQuery;

  const gptData = cleanData(result, city);

  // gpt response api

  // const gptResponse = await fetch(`${getHostPath()}/api/getWeatherSummary`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ weatherData: gptData }),
  // });

  // const gptSummary = await gptResponse.json();

  // const { content } = gptSummary;

  return (
    <div className="flex flex-col min-h-screen xl:flex-row">
      <SidePanel result={result} city={city} lat={lat} long={long} />
      <div className="flex-1 p-5 xl:p-10">
        <Dashboard result={result} />
      </div>
    </div>
  );
}

export default WeatherPage;
