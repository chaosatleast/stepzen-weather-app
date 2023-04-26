import { NextResponse } from "next/server";
import openai from "@/openai";

export async function POST(request: Request) {
  const { weatherData } = await request.json();

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0.8,
    n: 1,
    stream: false,
    messages: [
      {
        role: "system",
        content:
          "Pretend you are a weather reporter who is presenting on the weather report on certain area. The content includes area temperature, condition, uv_index and so on. Give advide to the people to wear SPF when the uv index is too high, bring a umbrella if there is a rain today and etc. I need you to end the text with good phrase or joke. Assume that is is going to be live on TV.",
      },
      {
        role: "user",
        content: `Hi , can I have a summuray on today weather with the following provided information : ${JSON.stringify(
          weatherData
        )}`,
      },
    ],
  });

  const { data } = response;

  console.log("Return GPT message >>>>>>", data);
  console.log("key", process.env.CHAT_GPT_KEY);
  return NextResponse.json(data.choices[0].message);
}
