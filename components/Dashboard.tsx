import React from "react";
import { Text, Subtitle } from "@tremor/react";
import CalloutCard from "./CalloutCard";
import StatCard from "./StatCard";
import TemperatureChart from "./TemperatureChart";
import RainChart from "./RainChart";
import HumidityChart from "./HumidityChart";

type Props = {
  result: Weather;
};

function Dashboard({ result }: Props) {
  return (
    <div>
      <h2 className="text-xl font-bold">Today Overview</h2>
      <p className="text-sm text-gray-400">
        Last Updated at:{" "}
        {/* {new Date(result?.current_weather?.time).toLocaleString()}(
        {result?.timezone}) */}
      </p>
      <div className="m-2 mb-8">
        <CalloutCard warning message="This where gpt summary will pop" />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 m-2">
        <StatCard
          title="Maximum Temperature"
          metric={`${result?.daily?.temperature_2m_max[0].toFixed(1)}°`}
          color="yellow"
        />
        <StatCard
          title="Minimum Temperature"
          metric={`${result?.daily?.temperature_2m_min[0].toFixed(1)}°`}
          color="green"
        />
        <div className="flex flex-col space-y-2 w-full">
          <StatCard
            title="UV index"
            metric={`${result?.daily?.uv_index_max[0].toFixed(1)}`}
            color="rose"
          />
          {Number(result?.daily.uv_index_max[0].toFixed(1)) > 10 && (
            <CalloutCard
              message="The UV is too high today. Be sure to wear SPF for protection"
              warning
            />
          )}
        </div>
        <div className="flex space-x-2 w-full">
          <StatCard
            title="Wind Speed"
            metric={`${result?.current_weather?.windspeed.toFixed(1)}m/s`}
            color="cyan"
          />
          <StatCard
            title="Wind Direction"
            metric={`${result?.current_weather?.winddirection.toFixed(1)}°`}
            color="indigo"
          />
        </div>
      </div>
      <hr className="mb-5" />
      <div className="space-y-4">
        {/* Temp Chart */}
        <TemperatureChart result={result} />

        {/* Rain Chart */}
        <RainChart result={result} />
        {/* Humidity Chart*/}
        <HumidityChart result={result} />
      </div>
    </div>
  );
}

export default Dashboard;
