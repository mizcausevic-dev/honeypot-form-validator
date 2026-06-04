import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";

import { renderAbuseSignals, renderDocs, renderFilterLane, renderOverview, renderVerification } from "../src/services/render";

const siteDir = join(process.cwd(), "site");

mkdirSync(siteDir, { recursive: true });

const routes = [
  { path: "index.html", content: renderOverview() },
  { path: "validation-lane/index.html", content: renderFilterLane() },
  { path: "abuse-signals/index.html", content: renderAbuseSignals() },
  { path: "verification/index.html", content: renderVerification() },
  { path: "docs/index.html", content: renderDocs() }
];

for (const route of routes) {
  const output = join(siteDir, route.path);
  mkdirSync(join(output, ".."), { recursive: true });
  writeFileSync(output, route.content, "utf8");
}

writeFileSync(
  join(siteDir, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: http://honeypot.kineticgain.com/sitemap.xml\n`,
  "utf8"
);

writeFileSync(
  join(siteDir, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>http://honeypot.kineticgain.com/</loc></url>\n  <url><loc>http://honeypot.kineticgain.com/validation-lane/</loc></url>\n  <url><loc>http://honeypot.kineticgain.com/abuse-signals/</loc></url>\n  <url><loc>http://honeypot.kineticgain.com/verification/</loc></url>\n  <url><loc>http://honeypot.kineticgain.com/docs/</loc></url>\n</urlset>\n`,
  "utf8"
);
