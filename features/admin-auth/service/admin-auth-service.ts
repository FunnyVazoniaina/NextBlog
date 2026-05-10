import { createHmac, timingSafeEqual } from "node:crypto";

import type { Route } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ADMIN_SESSION_COOKIE = "monblog-admin-session";
const SESSION_DURATION_IN_SECONDS = 60 * 60 * 24 * 7;

function getAdminConfig() {
  return {
    username: process.env.ADMIN_USERNAME?.trim() ?? "",
    password: process.env.ADMIN_PASSWORD?.trim() ?? "",
    sessionSecret: process.env.ADMIN_SESSION_SECRET?.trim() ?? "",
  };
}

function safeCompare(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

function signPayload(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

function createSessionValue(username: string, secret: string) {
  const expiresAt = Date.now() + SESSION_DURATION_IN_SECONDS * 1000;
  const payload = `${username}:${expiresAt}`;
  const signature = signPayload(payload, secret);

  return `${payload}:${signature}`;
}

function isSessionValid(value: string, secret: string) {
  const [username, expiresAt, signature] = value.split(":");

  if (!username || !expiresAt || !signature) {
    return false;
  }

  const payload = `${username}:${expiresAt}`;
  const expectedSignature = signPayload(payload, secret);

  if (!safeCompare(signature, expectedSignature)) {
    return false;
  }

  return Number(expiresAt) > Date.now();
}

export async function signInAdmin(username: string, password: string) {
  const config = getAdminConfig();

  if (!config.username || !config.password || !config.sessionSecret) {
    throw new Error("Admin credentials are not fully configured in the environment.");
  }

  if (
    !safeCompare(username.trim(), config.username) ||
    !safeCompare(password, config.password)
  ) {
    throw new Error("The provided admin credentials were invalid.");
  }

  const cookieStore = await cookies();

  cookieStore.set(ADMIN_SESSION_COOKIE, createSessionValue(config.username, config.sessionSecret), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DURATION_IN_SECONDS,
  });
}

export async function signOutAdmin() {
  const cookieStore = await cookies();

  cookieStore.delete(ADMIN_SESSION_COOKIE);
}

export async function isAdminAuthenticated() {
  const config = getAdminConfig();

  if (!config.sessionSecret) {
    return false;
  }

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!sessionCookie) {
    return false;
  }

  return isSessionValid(sessionCookie, config.sessionSecret);
}

export async function requireAdminSession() {
  const isAuthenticated = await isAdminAuthenticated();

  if (!isAuthenticated) {
    redirect("/admin/login" as Route);
  }
}
