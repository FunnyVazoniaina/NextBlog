const DEFAULT_DATABASE_NAME = "monblog";
const DEFAULT_POSTS_COLLECTION_NAME = "posts";
const DEFAULT_POST_VOTES_COLLECTION_NAME = "post_votes";
const PLACEHOLDER_ATLAS_HOST = "cluster0.example.mongodb.net";

export type MongoRuntimeMode = "configured" | "placeholder" | "unconfigured";

export const mongoConfig = {
  uri: process.env.MONGODB_URI?.trim() ?? "",
  databaseName:
    process.env.MONGODB_DB_NAME?.trim() || DEFAULT_DATABASE_NAME,
  postsCollectionName:
    process.env.MONGODB_POSTS_COLLECTION?.trim() ||
    DEFAULT_POSTS_COLLECTION_NAME,
  postVotesCollectionName:
    process.env.MONGODB_POST_VOTES_COLLECTION?.trim() ||
    DEFAULT_POST_VOTES_COLLECTION_NAME,
};

export function isPlaceholderMongoUri(uri = mongoConfig.uri) {
  return Boolean(uri) && uri.includes(PLACEHOLDER_ATLAS_HOST);
}

export function getMongoRuntimeMode(): MongoRuntimeMode {
  if (!mongoConfig.uri) {
    return "unconfigured";
  }

  if (isPlaceholderMongoUri()) {
    return "placeholder";
  }

  return "configured";
}

export function shouldUseMongoDatabase() {
  return getMongoRuntimeMode() === "configured";
}

export async function getDatabaseHealth() {
  const mode = getMongoRuntimeMode();

  if (mode === "unconfigured") {
    return {
      provider: "mongodb-atlas",
      status: "unconfigured" as const,
      reason: "MONGODB_URI is missing.",
    };
  }

  if (mode === "placeholder") {
    return {
      provider: "mongodb-atlas",
      status: "unconfigured" as const,
      reason: "Placeholder MongoDB Atlas URI detected.",
    };
  }

  try {
    const { getMongoDatabase } = await import("@/lib/mongodb/client");
    const database = await getMongoDatabase();

    await database.command({ ping: 1 });

    return {
      provider: "mongodb-atlas",
      status: "connected" as const,
      database: mongoConfig.databaseName,
      collection: mongoConfig.postsCollectionName,
      votesCollection: mongoConfig.postVotesCollectionName,
    };
  } catch (error) {
    return {
      provider: "mongodb-atlas",
      status: "error" as const,
      database: mongoConfig.databaseName,
      collection: mongoConfig.postsCollectionName,
      votesCollection: mongoConfig.postVotesCollectionName,
      reason:
        error instanceof Error
          ? error.message
          : "Unknown MongoDB connection error.",
    };
  }
}
