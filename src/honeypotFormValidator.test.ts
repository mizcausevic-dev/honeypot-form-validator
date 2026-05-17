import { describe, expect, it } from "vitest";

import { abuseSignals, payload, rules, summary } from "./services/honeypotService";

describe("honeypot-form-validator", () => {
  it("summary exposes lead-protection posture", () => {
    const result = summary();

    expect(result.submissionCount).toBeGreaterThan(0);
    expect(result.crmLeakageUsd).toBeGreaterThan(0);
    expect(result.recommendation).toContain("CRM");
  });

  it("rules and signals stay commercially legible", () => {
    expect(rules().length).toBeGreaterThan(1);
    expect(
      abuseSignals().some(
        (signal) => signal.title.toLowerCase().includes("form") || signal.title.toLowerCase().includes("partner")
      )
    ).toBe(true);
  });

  it("payload bundles the full surface", () => {
    const result = payload();

    expect(result.dashboard.submissionCount).toBe(result.submissions.length);
    expect(result.rules.length).toBeGreaterThan(0);
    expect(result.signals.length).toBeGreaterThan(0);
    expect(result.verification.length).toBe(3);
  });
});
