export const SITE_NAME = "I Really Like Clouds";
export const SITE_DOMAIN = "ireallylikeclouds.xyz";
export const SITE_TAGLINE = "Identify clouds. Catch the next incredible sky.";

export function siteUrl(pathname = "/") {
  const base = process.env.SITE_URL || `https://${SITE_DOMAIN}`;
  return new URL(pathname, base).toString();
}
