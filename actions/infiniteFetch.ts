"use server";

import fetchNewsQuery from "@/query/fetchNewsQuery";
import sortNews from "@/helper/sortNews";
import React from "react";
import { createHmacApp } from "@/helper/createHmac";

async function infiniteFetch(
	offset: number,
	category: string,
	country: string
) {
	const basePathForMediaStack =
		process.env.NODE_ENV === "development"
			? "http://localhost:3000/api/graphql"
			: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/graphql`;

	if (!process.env.API_JWT_USER) throw new Error("API_JWT_USER is not set");
	if (!process.env.API_JWT_PASS) throw new Error("API_JWT_PASS is not set");
	if (!process.env.API_JWT_TOKEN) throw new Error("API_JWT_TOKEN is not set");

	const textToEncrypt = `${process.env.API_JWT_USER}:${process.env.API_JWT_PASS}`;

	const hmac = createHmacApp(process.env.API_JWT_TOKEN, textToEncrypt);

	const response = await fetch(basePathForMediaStack, {
		method: "POST",
		cache: "no-cache",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${hmac}`,
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
	});

	const { data } = await response.json();

	if (data) {
		const news = sortNews(data.newsQuery.data);
		return { news, pagination: data.newsQuery.pagination };
	} else return { news: [], pagination: {} };
}

export default infiniteFetch;
