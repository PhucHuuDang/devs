import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

/**
 * Better Auth Route Handler
 * 
 * Handles all authentication routes:
 * - /api/auth/sign-in
 * - /api/auth/sign-up
 * - /api/auth/sign-out
 * - /api/auth/callback/*
 * - etc.
 * 
 * Learn more: https://www.better-auth.com/docs
 */

export const { GET, POST } = toNextJsHandler(auth);

