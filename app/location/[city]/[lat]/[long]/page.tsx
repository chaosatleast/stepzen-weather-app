import { getClient } from "@/apollo-client";
import CalloutCard from "@/components/CalloutCard";
import HumidityChart from "@/components/HumidityChart";
import RainChart from "@/components/RainChart";
import SidePanel from "@/components/SidePanel";
import StatCard from "@/components/StatCard";
import TemperatureChart from "@/components/TemperatureChart";
import fetchWeatherQuery from "@/graphQL/fetchWeatherQuery";
import cleanData from "@/helper/cleanData";
import NewsArea from "@/components/NewsArea";
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
      <div className="w-full xl:fixed xl:left-0 xl:top-0 xl:w-1/5">
        <SidePanel result={result} city={city} lat={lat} long={long} />
      </div>
      <div className="flex-1 p-5 ml-0 xl:p-10 xl:ml-[20%] xl:w-4/5">
        <div className="flex flex-col">
          <div className="flex-1 overflow-x-scroll">
            <h1 className="text-2xl font-bold pb-5">Top News</h1>
            <NewsArea />
          </div>
          <div className="flex-none ">
            <h2 className="text-2xl font-bold pt-5">Weather Overview</h2>
            <p className="text-sm text-gray-400">
              Last Updated at:{" "}
              {new Date(result?.current_weather?.time).toLocaleString()}(
              {result?.timezone})
            </p>
            <div className="m-2 mb-8">
              {/* <CalloutCard message={gptSummary} /> */}
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
                  metric={`${result?.current_weather?.winddirection.toFixed(
                    1
                  )}°`}
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
        </div>
      </div>
    </div>
  );
}

export default WeatherPage;
