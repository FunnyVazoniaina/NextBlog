import type { Filter } from "mongodb";

import type { PostVoteRepository } from "@/features/post-votes/repository/post-vote-repository";
import {
  type VoteDirection,
  type PostVoteDocument,
} from "@/features/post-votes/types/post-vote";
import { getPostVotesCollection } from "@/lib/mongodb/client";

export class MongoPostVoteRepository implements PostVoteRepository {
  async getSummary(postSlug: string, visitorId?: string) {
    const collection = await getPostVotesCollection();
    const [upvotes, downvotes, userVoteDocument] = await Promise.all([
      collection.countDocuments({ postSlug, direction: "up" }),
      collection.countDocuments({ postSlug, direction: "down" }),
      visitorId ? collection.findOne({ postSlug, visitorId }) : Promise.resolve(null),
    ]);

    return {
      upvotes,
      downvotes,
      userVote: userVoteDocument?.direction ?? null,
    };
  }

  async saveVote(postSlug: string, visitorId: string, direction: VoteDirection) {
    const collection = await getPostVotesCollection();
    const now = new Date().toISOString();
    const filter = { postSlug, visitorId } satisfies Filter<PostVoteDocument>;

    await collection.updateOne(
      filter,
      {
        $set: {
          direction,
          updatedAt: now,
        },
        $setOnInsert: {
          createdAt: now,
        },
      },
      { upsert: true },
    );

    return this.getSummary(postSlug, visitorId);
  }

  async removeVote(postSlug: string, visitorId: string) {
    const collection = await getPostVotesCollection();

    await collection.deleteOne({ postSlug, visitorId });

    return this.getSummary(postSlug, visitorId);
  }
}
