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

export const GALAXY_CREDENTIAL_QUERY = /* GraphQL */ `
  query lookup($id: String!) {
    campaign(id: $id) {
      id
      name
      thumbnail
    }
  }
`;
