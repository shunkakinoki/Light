export const SNAPSHOT_SPACE_QUERY = /* GraphQL */ `
  query lookup($id: String!) {
    space(id: $id) {
      id
      name
      private
      about
      avatar
      terms
      location
      website
      twitter
      github
      email
      network
      symbol
      skin
      domain
      strategies {
        name
        params
        network
      }
      admins
      members
      filters {
        minScore
        onlyMembers
      }
      plugins
      voting {
        delay
        period
        type
        quorum
        blind
        hideAbstain
      }
      categories
      validation {
        name
        network
        params
      }
      followersCount
      proposalsCount
    }
  }
`;

export const SNAPSHOT_VOTERS_QUERY = /* GraphQL */ `
  query lookup($id: String!, $first: Int!, $skip: Int!) {
    votes(
      where: { space_in: [$id] }
      first: $first
      skip: $skip
      orderDirection: asc
    ) {
      voter
    }
  }
`;

export const SNAPSHOT_VOTES_QUERY = /* GraphQL */ `
  query lookup($address: String!) {
    votes(where: { voter: $address }) {
      id
      ipfs
      voter
      created
      space {
        id
        name
        private
        about
        avatar
        terms
        location
        website
        twitter
        github
        email
        network
        symbol
        skin
        domain
        strategies {
          name
          params
          network
        }
        admins
        members
        filters {
          minScore
          onlyMembers
        }
        plugins
        voting {
          delay
          period
          type
          quorum
          blind
          hideAbstain
        }
        categories
        validation {
          name
          network
          params
        }
        followersCount
        proposalsCount
      }
      proposal {
        id
        ipfs
        author
        created
        network
        symbol
        type
        strategies {
          name
          params
          network
        }
        plugins
        title
        body
        discussion
        choices
        start
        end
        quorum
        snapshot
        state
        link
        scores
        scores_by_strategy
        scores_state
        scores_total
        scores_updated
        votes
      }
      choice
      metadata
      vp
      vp_by_strategy
      vp_state
    }
  }
`;
