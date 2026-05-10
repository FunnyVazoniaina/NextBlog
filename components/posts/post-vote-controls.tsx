"use client";

import { useEffect, useState, useTransition } from "react";

import type {
  PostVoteSummary,
  VoteDirection,
} from "@/features/post-votes/types/post-vote";

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
    <section className="rounded-[1.5rem] border border-line bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
        Reader vote
      </p>

      <div className="mt-5 rounded-[1.5rem] border border-line bg-surface-soft p-4">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => handleVote("up")}
            disabled={isPending}
            className={`flex h-12 w-12 items-center justify-center rounded-full border text-lg font-bold transition ${
              summary.userVote === "up"
                ? "border-accent bg-accent text-white"
                : "border-line bg-white text-zinc-700 hover:border-accent hover:text-accent"
            }`}
          >
            ▲
          </button>

          <div className="text-center">
            <p className="font-display text-3xl font-semibold text-zinc-950">
              {summary.upvotes - summary.downvotes}
            </p>
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
              community score
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleVote("down")}
            disabled={isPending}
            className={`flex h-12 w-12 items-center justify-center rounded-full border text-lg font-bold transition ${
              summary.userVote === "down"
                ? "border-zinc-950 bg-zinc-950 text-white"
                : "border-line bg-white text-zinc-700 hover:border-zinc-950 hover:text-zinc-950"
            }`}
          >
            ▼
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-2xl bg-white p-3 text-center">
            <p className="font-semibold text-zinc-950">{summary.upvotes}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-zinc-500">
              upvotes
            </p>
          </div>
          <div className="rounded-2xl bg-white p-3 text-center">
            <p className="font-semibold text-zinc-950">{summary.downvotes}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-zinc-500">
              downvotes
            </p>
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm leading-7 text-zinc-600">
        Tap the same arrow again to remove your vote.
      </p>

      {errorMessage ? (
        <p className="mt-4 rounded-2xl bg-accent-soft px-4 py-3 text-sm text-accent">
          {errorMessage}
        </p>
      ) : null}
    </section>
  );
}
