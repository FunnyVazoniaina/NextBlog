export type VoteDirection = "up" | "down";

export interface PostVoteDocument {
  postSlug: string;
  visitorId: string;
  direction: VoteDirection;
  createdAt: string;
  updatedAt: string;
}

export interface PostVoteSummary {
  upvotes: number;
  downvotes: number;
  userVote: VoteDirection | null;
}
