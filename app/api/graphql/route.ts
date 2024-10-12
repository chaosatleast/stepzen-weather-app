import { typeDefs } from "@/apollo-graphql/scheme";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { resolvers } from "@/apollo-graphql/resolver";

const server: any = new ApolloServer({
	typeDefs,
	resolvers,
});

export const config = {
	api: {
		bodyParser: false,
	},
};

const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };
