import { ApiLinks } from "@lightdotso/const";
import {
  SNAPSHOT_SPACE_QUERY,
  SNAPSHOT_VOTERS_QUERY,
  SNAPSHOT_VOTES_QUERY,
} from "@lightdotso/queries";
import type {
  SnapshotSpace,
  SnapshotVoters,
  SnapshotVotes,
} from "@lightdotso/types";
import { request } from "graphql-request";

import type { Validator } from "./result";
import { safeParse } from "./result";

export const fetchSnapshotSpace = (spaceId: string): Promise<SnapshotSpace> => {
  return request(ApiLinks.SNAPSHOT, SNAPSHOT_SPACE_QUERY, {
    id: spaceId,
  });
};

export const safeFetchSnapshotSpace = (spaceId: string) => {
  return (validator?: Validator<SnapshotSpace>) => {
    return safeParse<SnapshotSpace>(fetchSnapshotSpace)(spaceId)(validator);
  };
};

export const fetchSnapshotVoters = (
  spaceId: string,
  first: number,
  skip?: number,
) => {
  return request(ApiLinks.SNAPSHOT, SNAPSHOT_VOTERS_QUERY, {
    id: spaceId,
    first: first,
    skip: skip ? skip : 0,
  });
};

export const safeFetchSnapshotVoters = (
  spaceId: string,
  first: number,
  skip?: number,
) => {
  return (validator?: Validator<SnapshotVoters>) => {
    return safeParse<SnapshotVoters>(fetchSnapshotVoters)(spaceId, first, skip)(
      validator,
    );
  };
};

export const fetchSnapshotVotes = (address: string) => {
  return request(ApiLinks.SNAPSHOT, SNAPSHOT_VOTES_QUERY, {
    address: address,
  });
};

export const safeFetchSnapshotVotes = (address: string) => {
  return (validator?: Validator<SnapshotVotes>) => {
    return safeParse<SnapshotVotes>(fetchSnapshotVotes)(address)(validator);
  };
};
