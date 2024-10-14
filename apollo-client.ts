import { HttpLink } from "@apollo/client";
import {
	ApolloClient,
	InMemoryCache,
	registerApolloClient,
} from "@apollo/experimental-nextjs-app-support";

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
	if (!process.env.NODE_ENV) throw new Error(`NODE_ENV is not set`);

	const url =
		process.env.NODE_ENV === "development"
			? "http://localhost:3000/api/graphql"
			: `https://${process.env.VERCEL_URL}/api/graphql`;
	return new ApolloClient({
		cache: new InMemoryCache(),
		link: new HttpLink({
			// this needs to be an absolute url, as relative urls cannot be used in SSR
			uri: url,
			// you can disable result caching here if you want to
			// (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
			// fetchOptions: { cache: "no-store" },
		}),
	});
});
