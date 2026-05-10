import type { PostVoteRepository } from "@/features/post-votes/repository/post-vote-repository";
import type {
  PostVoteSummary,
  VoteDirection,
} from "@/features/post-votes/types/post-vote";

export class EmptyPostVoteRepository implements PostVoteRepository {
  async getSummary() {
    return {
      upvotes: 0,
      downvotes: 0,
      userVote: null,
    };
  }

  async saveVote(
    postSlug: string,
    visitorId: string,
    direction: VoteDirection,
  ): Promise<PostVoteSummary> {
    void postSlug;
    void visitorId;
    void direction;

    throw new Error("Voting is unavailable until MongoDB Atlas is configured.");
  }

  async removeVote(
    postSlug: string,
    visitorId: string,
  ): Promise<PostVoteSummary> {
    void postSlug;
    void visitorId;

    throw new Error("Voting is unavailable until MongoDB Atlas is configured.");
  }
}
