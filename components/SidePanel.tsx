import React from "react";
import CityPicker from "./CityPicker";
import { Card, Divider, Subtitle, Text } from "@tremor/react";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";

function SidePanel() {
  return (
    <div className="w-80 p-5 h-screen bg-gradient-to-br from-[#394F68] to-[#183B7E]">
      {/* City Name */}
      <Text className="text-4xl text-white font-bold">Alfou</Text>
      {/* LongLat */}
      <Subtitle className="text-sm">
        Long/Lat :2.102319237, 34.6129381638
      </Subtitle>

      <CityPicker />

      <Divider className="px-3 bg-gray-400" />
      {/* Date, Time and Timezone */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <Text className="text-lg text-white">Friday, 21 April 2023</Text>
          <Subtitle>Timezone: Asia/Dubai</Subtitle>
        </div>
        <div className="">
          <Text className="text-lg font-bold text-white">2:36PM</Text>
        </div>
      </div>
      <Divider className="px-3  bg-gray-400" />
      {/* Day/Night Icon */}
      <div className="h-12 w-12 bg-yellow-300 rounded-full"></div>
      {/* Temperature and description */}
      <div className="flex justify-between items-center py-2">
        <Text className="text-4xl text-white font-semibold">17.9 &#8451;</Text>
        <Text className="text-md text-white font-thin">Clear sky</Text>
      </div>
      {/* Sunrise and Sunset */}
      <div className="flex flex-col space-y-2">
        <Card className="flex items-center h-fit">
          <SunIcon className="h-10 w-10" />
          <Text className="flex-1">Sunrise</Text>
          <Text>5:12 AM</Text>
        </Card>
        <Card className="flex items-center h-fit">
          <MoonIcon className="h-10 w-10" />
          <Text className="flex-1">Sunset</Text>
          <Text>6:18 PM</Text>
        </Card>
      </div>
    </div>
  );
}

export default SidePanel;
