import type { GraphQLUserPayload } from "../interfaces/DataTypes";
import { GRAPHQL_SERVER } from "./constants";

export const graphQLRequest = async (payload : GraphQLUserPayload, options = {}) => {
  if (localStorage.getItem('accessToken')) {
    try {
      // console.log(`graphQLRequest payload: ${ JSON.stringify(payload.query)}`);
      const res = await fetch(`${GRAPHQL_SERVER}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          ...options,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        if (res.status === 403) {
          return null;
        }
      }

      const { data } = await res.json();
      return data;

    } catch (error) {
      console.error(error);
    }
  }
  return null;
};
