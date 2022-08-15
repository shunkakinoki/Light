export const GALAXY_OAT_QUERY = /* GraphQL */ `
  query lookup($address: String!) {
    addressInfo(address: $address) {
      recentParticipation(input: { first: 30 }) {
        list {
          campaign {
            id
            name
            thumbnail
          }
        }
      }
    }
  }
`;
