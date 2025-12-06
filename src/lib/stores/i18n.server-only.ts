/* eslint-disable @typescript-eslint/no-explicit-any */
// Server-only translation manager
// This file should only be imported in server-side code
import { serverI18n } from "./i18n.server.ts";

export const translationManager = serverI18n.gt;

