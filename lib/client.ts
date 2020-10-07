import { GraphQLClient } from "graphql-request";
import { RequestDocument } from "graphql-request/dist/types";
import useSWR from "swr";

const CONTENTFUL_ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT
  ? process.env.CONTENTFUL_ENVIRONMENT
  : "master";

const CONTENTFUL_GRAPHQL_URL = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}`;

let _client: GraphQLClient | null = null;

const createGraphQLClient = async () => {
  if (_client) return _client;

  _client = new GraphQLClient(CONTENTFUL_GRAPHQL_URL, {
    headers: {
      Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
    },
  });

  return _client;
};

export const graphQLRequest = async (
  query: RequestDocument = ``,
  variables: any = {}
) => {
  const client = _client || (await createGraphQLClient());

  if (!client) return;

  return await client.request(query, variables);
};

export const useQuery = (query = "") => {
  const { data, error, isValidating } = useSWR(query, graphQLRequest, {
    suspense: false,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    refreshInterval: 10000,
    refreshWhenHidden: true,
    refreshWhenOffline: false,
    shouldRetryOnError: true,
    errorRetryInterval: 5000,
    errorRetryCount: 5,
  });

  return {
    data,
    error,
    isLoading: (!error && !data) || isValidating,
    isValidating,
  };
};
