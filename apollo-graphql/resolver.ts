import { createHmacApp } from "@/helper/createHmac";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const checkAuthorization = (req: NextRequest) => {
	const headersList = headers();
	const authorization = headersList
		.get("Authorization")
		?.replace("Bearer ", "");
	if (!authorization) {
		console.log("authorization", authorization);
		return NextResponse.json(
			{ error: "Authorization Header is missing" },
			{ status: 401 }
		);
	}

	if (!process.env.API_JWT_USER) throw new Error("API_JWT_USER is not set");
	if (!process.env.API_JWT_PASS) throw new Error("API_JWT_PASS is not set");
	if (!process.env.API_JWT_TOKEN) throw new Error("API_JWT_TOKEN is not set");

	const textToEncrypt = `${process.env.API_JWT_USER}:${process.env.API_JWT_PASS}`;

	const hmac = createHmacApp(process.env.API_JWT_TOKEN, textToEncrypt);

	if (hmac !== authorization) {
		return NextResponse.json(
			{ error: "Authorization token is invalid" },
			{ status: 401 }
		);
	}
};

export const resolvers = {
	Query: {
		weatherQuery: async (
			_: any,
			args: {
				latitude: number;
				longitude: number;
				current: boolean;
				daily: string;
				hourly: string;
				timezone: string;
			},
			{ req }: { req: NextRequest }
		) => {
			const authorizationResponse = checkAuthorization(req);
			if (authorizationResponse) return authorizationResponse;

			const response = await fetch(
				`https://api.open-meteo.com/v1/forecast?latitude=${args.latitude}&longitude=${args.longitude}&current=${args.current}&daily=${args.daily}&hourly=${args.hourly}&timezone=${args.timezone}`
			);
			if (response.ok) {
				const data = await response.json();
				return data;
			}
		},

		aqiQuery: async (
			_: any,
			{
				current,
				latitude,
				longitude,
				timezone,
			}: {
				latitude: number;
				longitude: number;
				current: string;
				timezone: string;
			},
			{ req }: { req: NextRequest }
		) => {
			const authorizationResponse = checkAuthorization(req);
			if (authorizationResponse) return authorizationResponse;
			const response = await fetch(
				`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=${current}&timezone=${timezone}`,
				{
					method: "GET",
				}
			);

			const data = await response.json();
			return data; // Adjust this based on the actual structure of the responsesed on the actual structure of the response
		},

		newsQuery: async (
			_: any,
			{
				access_key,
				categories,
				countries,
				limit,
				offset,
				languages,
			}: {
				access_key: string;
				categories: string;
				limit: string;
				countries: string;
				offset: string;
				languages: string;
			},
			{ req }: { req: NextRequest }
		) => {
			const authorizationResponse = checkAuthorization(req);
			if (authorizationResponse) return authorizationResponse;
			const url = new URL(
				`http://api.mediastack.com/v1/news?access_key=${access_key}&categories=${categories}&limit=${limit}&countries=${countries}&offset=${offset}&languages=${languages}`
			);

			const response = await fetch(url, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			return data; // Adjust this based on the actual structure of the response
		},
	},
};
