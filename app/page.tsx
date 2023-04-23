import CityPicker from "@/components/CityPicker";
import { Card, Divider, Subtitle, Text } from "@tremor/react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#394F68] to-[#183B7E] px-10 flex flex-col justify-center items-center">
      <Card className="">
        <Text className="text-6xl text-center font-bold mb-10">Weather AI</Text>
        <Subtitle className="text-xl text-center">
          Powered by Next.js@13.3 , OpenAI, Stepzen and Tailwind CSS.
        </Subtitle>
        <Divider className="my-10" />

        <Card className="bg-gradient-to-br from-[#394F68] to-[#183B7E] max-w-4xl mx-auto">
          <CityPicker />
        </Card>
      </Card>
    </div>
  );
}
