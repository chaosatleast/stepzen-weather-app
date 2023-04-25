import SidePanel from "@/components/SidePanel";
import Dashboard from "@/components/Dashboard";
import React from "react";
import { getClient } from "@/apollo-client";
import fetchWeatherQuery from "@/graphQL/fetchWeatherQuery";
type Props = {
  params: {
    city: string;
    lat: string;
    long: string;
  };
};

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

  console.log(data);

  const result: Weather = data?.weatherQuery;

  return (
    <div className="xl:flex">
      <SidePanel result={result} city={city} lat={lat} long={long} />
      <div className="xl:m-5 flex-1">
        <Dashboard result={result} />
      </div>
    </div>
  );
}

export default WeatherPage;
