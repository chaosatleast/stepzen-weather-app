"use client";

import { Card, AreaChart, Title } from "@tremor/react";

type Props = {
  result: Weather;
};

function HumidityChart({ result }: Props) {
  const hourly = result?.hourly.time
    .map((time) =>
      new Date(time).toLocaleString("en-US", { hour: "numeric", hour12: false })
    )
    .slice(0, 24);

  const data = hourly.map((hour, i) => ({
    time: Number(hour),
    Humidity: result.hourly.relativehumidity_2m[i],
  }));

  return (
    <Card>
      <Title>Humidity</Title>
      <AreaChart
        className="mt-6"
        data={data}
        showLegend
        index="time"
        colors={["cyan"]}
        categories={["Humidity"]}
      />
    </Card>
  );
}

export default HumidityChart;
