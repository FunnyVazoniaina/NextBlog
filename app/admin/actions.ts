"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { Route } from "next";

import {
  requireAdminSession,
  signInAdmin,
  signOutAdmin,
} from "@/features/admin-auth/service/admin-auth-service";
import { postService } from "@/features/posts/service/post-service";

function readFormValue(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value : "";
}

function readFormValues(formData: FormData, key: string) {
  return formData
    .getAll(key)
    .filter((value): value is string => typeof value === "string");
}

function encodeMessage(message: string) {
  return encodeURIComponent(message);
}

function asRoute(path: string) {
  return path as Route;
}

export async function signInAdminAction(formData: FormData) {
  const username = readFormValue(formData, "username");
  const password = readFormValue(formData, "password");

  try {
    await signInAdmin(username, password);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "The admin session could not be created.";

    redirect(asRoute(`/admin/login?error=${encodeMessage(message)}`));
  }

  redirect(asRoute("/admin/posts/new"));
}

export async function signOutAdminAction() {
  await signOutAdmin();

  redirect(asRoute("/admin/login"));
}

export async function createPostAction(formData: FormData) {
  await requireAdminSession();

  let createdPostSlug = "";
  let createdPostTitle = "";

  try {
    const post = postService.parseCreatePostInput({
      slug: readFormValue(formData, "slug"),
      title: readFormValue(formData, "title"),
      excerpt: readFormValue(formData, "excerpt"),
      category: readFormValue(formData, "category"),
      tags: readFormValue(formData, "tags"),
      coverLabel: readFormValue(formData, "coverLabel"),
      publishedAt: readFormValue(formData, "publishedAt"),
      readingTimeInMinutes: readFormValue(formData, "readingTimeInMinutes"),
      featured: formData.get("featured") === "on",
      status: readFormValue(formData, "status"),
      content: readFormValue(formData, "content"),
      sourceLinkLabels: readFormValues(formData, "sourceLinkLabel"),
      sourceLinkUrls: readFormValues(formData, "sourceLinkUrl"),
    });

    await postService.createPost(post);
    createdPostSlug = post.slug;
    createdPostTitle = post.title;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "The post could not be created.";

    redirect(asRoute(`/admin/posts/new?error=${encodeMessage(message)}`));
  }

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${createdPostSlug}`);
  revalidatePath("/sitemap.xml");

  redirect(asRoute(`/admin/posts/new?success=${encodeMessage(createdPostTitle)}`));
}

export async function toggleFeaturedPostAction(formData: FormData) {
  await requireAdminSession();

  const slug = readFormValue(formData, "slug");
  const featured = readFormValue(formData, "featured") === "true";

  try {
    await postService.updatePostFeatured(slug, featured);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "The featured post could not be updated.";

    redirect(asRoute(`/admin/posts/new?error=${encodeMessage(message)}`));
  }

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/sitemap.xml");

  redirect(asRoute("/admin/posts/new"));
}
