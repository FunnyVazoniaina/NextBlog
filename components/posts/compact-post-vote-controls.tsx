"use client";

import { useEffect, useState, useTransition } from "react";

import type {
  PostVoteSummary,
  VoteDirection,
} from "@/features/post-votes/types/post-vote";
import { VoteArrowIcon } from "@/components/posts/vote-arrow-icon";

interface CompactPostVoteControlsProps {
  slug: string;
}

const initialSummary: PostVoteSummary = {
  upvotes: 0,
  downvotes: 0,
  userVote: null,
};

export function CompactPostVoteControls({
  slug,
}: CompactPostVoteControlsProps) {
  const [summary, setSummary] = useState(initialSummary);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let isMounted = true;

    async function loadSummary() {
      const response = await fetch(`/api/posts/${slug}/vote`, {
        cache: "no-store",
      });
      const body = (await response.json().catch(() => null)) as
        | { data?: PostVoteSummary }
        | null;

      if (!isMounted || !response.ok || !body?.data) {
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
      const response = await fetch(`/api/posts/${slug}/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ direction }),
      });
      const body = (await response.json().catch(() => null)) as
        | { data?: PostVoteSummary }
        | null;

      if (!response.ok || !body?.data) {
        return;
      }

      setSummary(body.data);
    });
  }

  return (
    <div className="flex items-center gap-1 rounded-full bg-zinc-100 px-1.5 py-1">
      <button
        type="button"
        onClick={() => handleVote("up")}
        disabled={isPending}
        className={`flex h-7 w-7 items-center justify-center rounded-full transition ${
          summary.userVote === "up"
            ? "bg-accent text-white"
            : "text-zinc-500 hover:bg-white hover:text-accent"
        }`}
      >
        <VoteArrowIcon direction="up" className="h-3.5 w-3.5" />
      </button>

      <span className="min-w-7 text-center text-sm font-semibold text-zinc-950">
        {summary.upvotes - summary.downvotes}
      </span>

      <button
        type="button"
        onClick={() => handleVote("down")}
        disabled={isPending}
        className={`flex h-7 w-7 items-center justify-center rounded-full transition ${
          summary.userVote === "down"
            ? "bg-zinc-950 text-white"
            : "text-zinc-500 hover:bg-white hover:text-zinc-950"
        }`}
      >
        <VoteArrowIcon direction="down" className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
