import { createPostVoteRepository } from "@/features/post-votes/repository/create-post-vote-repository";
import type {
  PostVoteSummary,
  VoteDirection,
} from "@/features/post-votes/types/post-vote";

const postVoteRepository = createPostVoteRepository();

export class PostVoteService {
  constructor(private readonly repository = postVoteRepository) {}

  async getSummary(postSlug: string, visitorId?: string) {
    return this.repository.getSummary(postSlug, visitorId);
  }

  async toggleVote(
    postSlug: string,
    visitorId: string,
    direction: VoteDirection,
  ): Promise<PostVoteSummary> {
    const currentSummary = await this.repository.getSummary(postSlug, visitorId);

    if (currentSummary.userVote === direction) {
      return this.repository.removeVote(postSlug, visitorId);
    }

    return this.repository.saveVote(postSlug, visitorId, direction);
  }
}

export const postVoteService = new PostVoteService();
