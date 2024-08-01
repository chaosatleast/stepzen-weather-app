"use server";

import fetchNewsQuery from "@/graphQL/fetchNewsQuery";
import sortNews from "@/helper/sortNews";
import React from "react";

async function infiniteFetch(
  offset: number,
  category: string,
  country: string
) {
  if (!process.env.MEDIASTACK_API_KEY) {
    throw new Error("MEDIASTACK_API_KEY is not set");
  }

  if (!process.env.STEPZEN_API_KEY) {
    throw new Error("STEPZEN_API_KEY is not set");
  }

  const response = await fetch(
    "https://villadeleyva.stepzen.net/api/tinseled-butterfly/__graphql",
    {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Authorization: `apikey ${process.env.STEPZEN_API_KEY}`,
      },
      body: JSON.stringify({
        query: fetchNewsQuery,
        variables: {
          access_key: process.env.MEDIASTACK_API_KEY,
          categories: category,
          countries: country,
          limit: "50",
          offset: offset,
          languages: "en",
        },
      }),
    }
  );
  const { data } = await response.json();

  const news = sortNews(data.newsQuery.data);
  return { news, pagination: data.newsQuery.pagination };
}

export default infiniteFetch;
