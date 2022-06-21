export const ENS_QUERY = /* GraphQL */ `
  query lookup($name: String!, $amount: Int!) {
    domains(
      first: $amount
      where: { name_contains: $name, resolvedAddress_not: null }
    ) {
      name
      resolver {
        addr {
          id
        }
      }
    }
  }
`;

export const ENS_RESOLVE_NAME_QUERY = /* GraphQL */ `
  query lookup($name: String!) {
    domains(where: { name: $name }) {
      name
      resolvedAddress {
        id
      }
    }
  }
`;
