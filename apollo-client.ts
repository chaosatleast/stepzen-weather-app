import { ApolloClient, InMemoryCache } from "@apollo/client";
import getHostPath from "./helper/getHostPath";

const url = getHostPath();

// const apikey = process.env.STEPZEN_API_KEY;

// console.log(url, apikey);

export const getClient = () => {
	const client = new ApolloClient({
		uri: url + "/api/graphql",
		cache: new InMemoryCache(),
	});

	console.log(client);
	return client;
};
