"use client";

import { Card, AreaChart, Title } from "@tremor/react";

type Props = {
  result: Weather;
};

function RainChart({ result }: Props) {
  const hourly = result?.hourly.time
    .map((time) =>
      new Date(time).toLocaleString("en-US", { hour: "numeric", hour12: false })
    )
    .slice(0, 24);

  const data = hourly.map((hour, i) => ({
    time: Number(hour),
    "Rain (%)": result.hourly.precipitation_probability[i],
  }));

  return (
    <Card>
      <Title>Probability of Rain</Title>
      <AreaChart
        className="mt-6"
        data={data}
        showLegend
        index="time"
        colors={["indigo"]}
        categories={["Rain (%)"]}
      />
    </Card>
  );
}

export default RainChart;
