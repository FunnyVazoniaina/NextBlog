import { EmptyPostRepository } from "@/features/posts/repository/empty-post-repository";
import { MongoPostRepository } from "@/features/posts/repository/mongodb-post-repository";
import type { PostRepository } from "@/features/posts/repository/post-repository";
import { getMongoRuntimeMode } from "@/lib/mongodb/config";

let hasWarnedAboutFallback = false;

function warnAboutFallback(mode: ReturnType<typeof getMongoRuntimeMode>) {
  if (
    hasWarnedAboutFallback ||
    process.env.NODE_ENV !== "development"
  ) {
    return;
  }

  const reason =
    mode === "placeholder"
      ? "the placeholder MongoDB Atlas URI is still configured"
      : "MONGODB_URI is missing";

  console.warn(
    `No MongoDB posts will be loaded because ${reason}. Replace the Atlas URI in .env.local to use MongoDB Atlas.`,
  );

  hasWarnedAboutFallback = true;
}

export function createPostRepository(): PostRepository {
  const mode = getMongoRuntimeMode();

  if (mode === "configured") {
    return new MongoPostRepository();
  }

  warnAboutFallback(mode);

  return new EmptyPostRepository();
}
