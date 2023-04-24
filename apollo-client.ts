import { ApolloClient, InMemoryCache } from "@apollo/client";

const url = process.env.API_URL;

const apikey = process.env.STEPZEN_API_KEY;

export const getClient = () => {
  const client = new ApolloClient({
    uri: url,
    cache: new InMemoryCache(),
    headers: {
      Authorization: `apikey ${apikey}`,
    },
  });

  return client;
};
