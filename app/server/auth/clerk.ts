import { createClerkClient } from "@clerk/backend";
const API_VERSION = process.env.VITE_CLERK_API_VERSION || "v1";
const SECRET_KEY = process.env.CLERK_SECRET_KEY || "";
const PUBLISHABLE_KEY = process.env.VITE_CLERK_PUBLISHABLE_KEY || "";
const API_URL = process.env.CLERK_API_URL || "";
const JWT_KEY = process.env.CLERK_JWT_KEY || "";
const SDK_METADATA = {
  name: "react-twitter",
  version: "0.1.0",
  environment: process.env.NODE_ENV,
};

export const clerkAuthClient = createClerkClient({
  publishableKey: PUBLISHABLE_KEY,
  secretKey: SECRET_KEY,
  apiUrl: API_URL,
  apiVersion: API_VERSION,
  jwtKey: JWT_KEY,
  userAgent: `react-twitter@0.1.0`,
  sdkMetadata: SDK_METADATA,
});
