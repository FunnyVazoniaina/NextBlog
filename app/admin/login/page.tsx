import type { Route } from "next";
import { redirect } from "next/navigation";

import { Container } from "@/components/layout/container";
import { signInAdminAction } from "@/app/admin/actions";
import { isAdminAuthenticated } from "@/features/admin-auth/service/admin-auth-service";

interface AdminLoginPageProps {
  searchParams: Promise<{
    error?: string;
  }>;
}

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  const isAuthenticated = await isAdminAuthenticated();

  if (isAuthenticated) {
    redirect("/admin/posts/new" as Route);
  }

  const { error } = await searchParams;

  return (
    <Container className="py-16 sm:py-20">
      <div className="mx-auto max-w-md rounded-[2rem] border border-black/10 bg-white p-8 shadow-[0_20px_60px_rgba(41,37,36,0.06)]">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-700">
            Backoffice
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-stone-950">
            Sign in to your private dashboard
          </h1>
          <p className="text-sm leading-7 text-stone-600">
            Only your configured admin credentials can access post publishing.
          </p>
        </div>

        {error ? (
          <p className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        <form action={signInAdminAction} className="mt-8 space-y-5">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-stone-700">Username</span>
            <input
              type="text"
              name="username"
              className="w-full rounded-2xl border border-black/10 bg-stone-50 px-4 py-3 text-sm text-stone-950 outline-none transition focus:border-amber-500 focus:bg-white"
              required
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-stone-700">Password</span>
            <input
              type="password"
              name="password"
              className="w-full rounded-2xl border border-black/10 bg-stone-50 px-4 py-3 text-sm text-stone-950 outline-none transition focus:border-amber-500 focus:bg-white"
              required
            />
          </label>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-700"
          >
            Sign in
          </button>
        </form>
      </div>
    </Container>
  );
}
