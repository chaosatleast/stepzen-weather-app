import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { createHmacApp } from "./helper/createHmac";

export const createApolloClient = () => {
	if (!process.env.NODE_ENV) throw new Error(`NODE_ENV is not set`);

	const url =
		process.env.NODE_ENV === "development"
			? "http://localhost:3000/api/graphql"
			: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/graphql`;

	if (!process.env.API_JWT_USER) throw new Error("API_JWT_USER is not set");
	if (!process.env.API_JWT_PASS) throw new Error("API_JWT_PASS is not set");
	if (!process.env.API_JWT_TOKEN) throw new Error("API_JWT_TOKEN is not set");

	const textToEncrypt = `${process.env.API_JWT_USER}:${process.env.API_JWT_PASS}`;

	const hmac = createHmacApp(process.env.API_JWT_TOKEN, textToEncrypt);

	return new ApolloClient({
		uri: url,
		cache: new InMemoryCache(),

		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${hmac}`,
		},
	});
};
