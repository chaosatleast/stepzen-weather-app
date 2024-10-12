import { typeDefs } from "@/apollo-graphql/scheme";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { resolvers } from "@/apollo-graphql/resolver";
import { headers } from "next/headers";
import { createHmac } from "@/helper/createHmac";
import { NextResponse } from "next/server";
import { error } from "console";

const server: any = new ApolloServer({
	typeDefs,
	resolvers,
});

const handler = startServerAndCreateNextHandler(server, {
	context: async (req, res) => {
		const headersList = headers();
		const accessToken = headersList
			.get("Authorization")
			?.replace("Bearer ", "");

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
		if (accessToken === hmac) {
			return { req, res };
		} else {
			return new NextResponse("Your auth code is incorrect", {
				status: 400, // Set the status code
			});
		}
	},
});

export { handler as GET, handler as POST };
