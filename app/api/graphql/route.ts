import { resolvers } from "@/apollo-graphql/resolver";
import { typeDefs } from "@/apollo-graphql/scheme";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";

const server: any = new ApolloServer({
	typeDefs,
	resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
	context: async (req) => {
		console.log(req);
		return { req };
	},
});

export { handler as GET, handler as POST };
