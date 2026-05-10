"use client";

import { useEffect, useState, useTransition } from "react";

import type {
  PostVoteSummary,
  VoteDirection,
} from "@/features/post-votes/types/post-vote";
import { VoteArrowIcon } from "@/components/posts/vote-arrow-icon";

interface PostVoteControlsProps {
  slug: string;
}

const initialSummary: PostVoteSummary = {
  upvotes: 0,
  downvotes: 0,
  userVote: null,
};

export function PostVoteControls({ slug }: PostVoteControlsProps) {
  const [summary, setSummary] = useState(initialSummary);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let isMounted = true;

    async function loadSummary() {
      const response = await fetch(`/api/posts/${slug}/vote`, {
        cache: "no-store",
      });
      const body = (await response.json().catch(() => null)) as
        | { data?: PostVoteSummary; message?: string }
        | null;

      if (!isMounted) {
        return;
      }

      if (!response.ok || !body?.data) {
        setErrorMessage(body?.message ?? "Votes could not be loaded right now.");
        return;
      }

      setSummary(body.data);
    }

    loadSummary();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  function handleVote(direction: VoteDirection) {
    startTransition(async () => {
      setErrorMessage("");

      const response = await fetch(`/api/posts/${slug}/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ direction }),
      });
      const body = (await response.json().catch(() => null)) as
        | { data?: PostVoteSummary; message?: string }
        | null;

      if (!response.ok || !body?.data) {
        setErrorMessage(body?.message ?? "Your vote could not be saved.");
        return;
      }

      setSummary(body.data);
    });
  }

  return (
    <section className="space-y-4">
      <p className="text-sm font-medium text-zinc-700">
        Reader vote
      </p>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 rounded-full bg-zinc-100 px-1.5 py-1">
          <button
            type="button"
            onClick={() => handleVote("up")}
            disabled={isPending}
            className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
              summary.userVote === "up"
                ? "bg-accent text-white"
                : "text-zinc-500 hover:bg-white hover:text-accent"
            }`}
          >
            <VoteArrowIcon direction="up" className="h-4 w-4" />
          </button>

          <span className="min-w-8 text-center text-xl font-semibold text-zinc-950">
            {summary.upvotes - summary.downvotes}
          </span>

          <button
            type="button"
            onClick={() => handleVote("down")}
            disabled={isPending}
            className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
              summary.userVote === "down"
                ? "bg-zinc-950 text-white"
                : "text-zinc-500 hover:bg-white hover:text-zinc-950"
            }`}
          >
            <VoteArrowIcon direction="down" className="h-4 w-4" />
          </button>
        </div>

        <div className="text-sm text-zinc-600">
          <p>{summary.upvotes} upvotes</p>
          <p>{summary.downvotes} downvotes</p>
        </div>
      </div>

      <p className="text-sm leading-7 text-zinc-600">
        Tap the same arrow again to remove your vote.
      </p>

      {errorMessage ? (
        <p className="text-sm text-accent">
          {errorMessage}
        </p>
      ) : null}
    </section>
  );
}
