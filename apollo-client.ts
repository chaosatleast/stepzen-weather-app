import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const createApolloClient = () => {
	if (!process.env.NODE_ENV) throw new Error(`NODE_ENV is not set`);

	const url =
		process.env.NODE_ENV === "development"
			? "http://localhost:3000/api/graphql"
			: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/graphql`;
	return new ApolloClient({
		uri: url,
		cache: new InMemoryCache(),

		headers: {
			"Content-Type": "application/json",
		},
	});
};
