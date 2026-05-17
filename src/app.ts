import express from "express";

import { abuseSignals, payload, rules, submissionLane, summary, verification } from "./services/honeypotService";
import {
  renderAbuseSignals,
  renderDocs,
  renderFilterLane,
  renderOverview,
  renderVerification
} from "./services/render";

const app = express();
const port = Number(process.env.PORT ?? 5346);

app.get("/", (_req, res) => res.type("html").send(renderOverview()));
app.get("/validation-lane", (_req, res) => res.type("html").send(renderFilterLane()));
app.get("/abuse-signals", (_req, res) => res.type("html").send(renderAbuseSignals()));
app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
app.get("/api/validation-lane", (_req, res) => res.json(submissionLane()));
app.get("/api/rules", (_req, res) => res.json(rules()));
app.get("/api/abuse-signals", (_req, res) => res.json(abuseSignals()));
app.get("/api/verification", (_req, res) => res.json(verification()));
app.get("/api/sample", (_req, res) => res.json(payload()));

if (require.main === module) {
  app.listen(port, "127.0.0.1", () => {
    console.log(`Honeypot Form Validator listening on http://127.0.0.1:${port}`);
  });
}

export default app;
