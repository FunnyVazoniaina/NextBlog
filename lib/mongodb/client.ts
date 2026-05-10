import { MongoClient, ServerApiVersion, type Collection, type Db } from "mongodb";

import { mongoConfig, shouldUseMongoDatabase } from "@/lib/mongodb/config";
import type { PostVoteDocument } from "@/features/post-votes/types/post-vote";
import type { PostDocument } from "@/types/post";

declare global {
  var __mongoClientPromise: Promise<MongoClient> | undefined;
}

function createMongoClientPromise() {
  const client = new MongoClient(mongoConfig.uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  return client.connect();
}

export function getMongoClientPromise() {
  if (!shouldUseMongoDatabase()) {
    throw new Error("MongoDB Atlas is not configured with a real connection URI yet.");
  }

  if (!globalThis.__mongoClientPromise) {
    globalThis.__mongoClientPromise = createMongoClientPromise().catch((error) => {
      globalThis.__mongoClientPromise = undefined;
      throw error;
    });
  }

  return globalThis.__mongoClientPromise;
}

export async function getMongoDatabase(): Promise<Db> {
  const client = await getMongoClientPromise();

  return client.db(mongoConfig.databaseName);
}

export async function getPostsCollection(): Promise<Collection<PostDocument>> {
  const database = await getMongoDatabase();

  return database.collection<PostDocument>(mongoConfig.postsCollectionName);
}

export async function getPostVotesCollection(): Promise<
  Collection<PostVoteDocument>
> {
  const database = await getMongoDatabase();

  return database.collection<PostVoteDocument>(
    mongoConfig.postVotesCollectionName,
  );
}
