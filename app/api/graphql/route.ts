import { resolvers } from "@/apollo-graphql/resolver";
import { typeDefs } from "@/apollo-graphql/scheme";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

const server: any = new ApolloServer({
	typeDefs,
	resolvers,
});

const handler = startServerAndCreateNextHandler(server, {
	context: async (req, res) => {
		console.log("Your auth code is correct");
		return { req, res };
	},
});

export { handler as GET, handler as POST };
