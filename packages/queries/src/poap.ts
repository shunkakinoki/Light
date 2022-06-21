export const POAP_GRAPH_QUERY = /* GraphQL */ `
  query lookup($address: String!) {
    accounts(where: { id: $address }) {
      tokens {
        id
        event {
          id
        }
      }
      tokensOwned
    }
  }
`;
