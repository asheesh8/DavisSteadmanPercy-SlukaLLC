// Kept in its own file (no Node.js imports) so the Edge middleware can read
// the cookie name without pulling in lib/auth.ts's `crypto` import, which
// Edge Runtime doesn't support.
export const SESSION_COOKIE = "dspls_admin_session";
