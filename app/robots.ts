import type { MetadataRoute } from "next";

/**
 * The robots.txt route.
 *
 * This route returns a robots.txt response for search engines (like Google) to
 * inform them about which pages they should crawl and index.
 *
 * @returns The robots.txt response.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/finance_management"],
    },
  };
}
