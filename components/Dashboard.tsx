import React from "react";
import { Text, Subtitle } from "@tremor/react";
import CalloutCard from "./CalloutCard";

type Props = {
  result: Weather | null;
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
      <div>
        <CalloutCard warning message="This where gpt summary will pop" />
      </div>
    </div>
  );
}

export default Dashboard;
