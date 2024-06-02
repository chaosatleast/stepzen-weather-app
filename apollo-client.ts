import { ApolloClient, InMemoryCache } from "@apollo/client";

const url = process.env.STEPZEN_API_URL;

const apikey = process.env.STEPZEN_API_KEY;

console.log(url, apikey);

export const getClient = () => {
  const client = new ApolloClient({
    uri: url,
    cache: new InMemoryCache(),
    headers: {
      Authorization: `apikey ${apikey}`,
    },
  });

  console.log(client);
  return client;
};
