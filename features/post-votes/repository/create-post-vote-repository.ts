import { EmptyPostVoteRepository } from "@/features/post-votes/repository/empty-post-vote-repository";
import { MongoPostVoteRepository } from "@/features/post-votes/repository/mongodb-post-vote-repository";
import type { PostVoteRepository } from "@/features/post-votes/repository/post-vote-repository";
import { shouldUseMongoDatabase } from "@/lib/mongodb/config";

export function createPostVoteRepository(): PostVoteRepository {
  if (shouldUseMongoDatabase()) {
    return new MongoPostVoteRepository();
  }

  return new EmptyPostVoteRepository();
}
