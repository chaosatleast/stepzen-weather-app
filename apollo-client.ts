import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createHmac } from "./helper/createHmac";
import getHostPath from "./helper/getHostPath";
const url = getHostPath();

// const apikey = process.env.STEPZEN_API_KEY;

// console.log(url, apikey);

export const getClient = () => {
	if (!process.env.API_JWT_PASS) {
		throw new Error("API_JWT_PASS is not set");
	}
	if (!process.env.API_JWT_USER) {
		throw new Error("API_JWT_USER is not set");
	}

	if (!process.env.API_JWT_TOKEN) {
		throw new Error("API_JWT_USER is not set");
	}

	const textToEncrypt =
		process.env.API_JWT_PASS + "|" + process.env.API_JWT_USER;

	const hmac = createHmac(process.env.API_JWT_TOKEN, textToEncrypt);

	const client = new ApolloClient({
		uri: url + "/api/graphql",
		cache: new InMemoryCache(),
		headers: {
			Authorization: `Bearer ${hmac}`,
		},
	});

	console.log(client);
	return client;
};
