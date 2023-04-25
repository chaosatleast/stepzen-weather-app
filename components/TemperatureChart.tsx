"use client";

import { Card, AreaChart, Title } from "@tremor/react";

type Props = {
  result: Weather;
};

function TemperatureChart({ result }: Props) {
  const hourly = result?.hourly.time
    .map((time) =>
      new Date(time).toLocaleString("en-US", { hour: "numeric", hour12: false })
    )
    .slice(0, 24);

  const data = hourly.map((hour, i) => ({
    time: Number(hour),
    "UV Index": result.hourly.uv_index[i],
    "Temperature (C)": result.hourly.temperature_2m[i],
  }));

  return (
    <Card>
      <Title>Temperature & UV Index</Title>
      <AreaChart
        className="mt-6"
        data={data}
        showLegend
        index="time"
        colors={["rose", "yellow"]}
        categories={["Temperature (C)", "UV Index"]}
      />
    </Card>
  );
}

export default TemperatureChart;
