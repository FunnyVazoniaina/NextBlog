import type {
  PostVoteSummary,
  VoteDirection,
} from "@/features/post-votes/types/post-vote";

export interface PostVoteRepository {
  getSummary(postSlug: string, visitorId?: string): Promise<PostVoteSummary>;
  saveVote(
    postSlug: string,
    visitorId: string,
    direction: VoteDirection,
  ): Promise<PostVoteSummary>;
  removeVote(postSlug: string, visitorId: string): Promise<PostVoteSummary>;
}
