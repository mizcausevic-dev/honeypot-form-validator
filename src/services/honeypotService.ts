import { abuseSignalsData, submissionEvents, validationRules } from "../data/sampleHoneypot";

export function summary() {
  const dropped = submissionEvents.filter((event) => event.decision === "drop").length;
  const challenged = submissionEvents.filter((event) => event.decision === "challenge").length;
  const clean = submissionEvents.filter((event) => event.decision === "allow").length;
  const crmLeakageUsd = submissionEvents.reduce((total, event) => total + event.crmLeakageUsd, 0);

  return {
    submissionCount: submissionEvents.length,
    dropped,
    challenged,
    clean,
    crmLeakageUsd,
    recommendation:
      "Tighten the demo and partner honeypot posture first, because those routes leak the most expensive spam into CRM routing, SDR follow-up, and conversion reporting."
  };
}

export function submissionLane() {
  return submissionEvents;
}

export function rules() {
  return validationRules;
}

export function abuseSignals() {
  return abuseSignalsData;
}

export function verification() {
  return [
    "Submission decisions are modeled before CRM and nurture ingestion so form abuse cannot masquerade as real demand.",
    "Rule coverage makes it clear where a hidden-field trap is enough and where timing heuristics still need a challenge path.",
    "Abuse signals connect validation posture back to pipeline cost so Growth and RevOps can see why clean lead capture matters."
  ];
}

export function payload() {
  return {
    dashboard: summary(),
    submissions: submissionLane(),
    rules: rules(),
    signals: abuseSignals(),
    verification: verification()
  };
}
