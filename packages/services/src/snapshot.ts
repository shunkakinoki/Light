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

export const fetchSnapshotSpace = (spaceId: string): Promise<SnapshotSpace> => {
  return request(ApiLinks.SNAPSHOT, SNAPSHOT_SPACE_QUERY, {
    id: spaceId,
  });
};

export const fetchSnapshotVoters = (
  spaceId: string,
  first: number,
  skip?: number,
): Promise<SnapshotVoters> => {
  return request(ApiLinks.SNAPSHOT, SNAPSHOT_VOTERS_QUERY, {
    id: spaceId,
    first: first,
    skip: skip ? skip : 0,
  });
};

export const fetchSnapshotVotes = (address: string): Promise<SnapshotVotes> => {
  return request(ApiLinks.SNAPSHOT, SNAPSHOT_VOTES_QUERY, {
    address: address,
  });
};
