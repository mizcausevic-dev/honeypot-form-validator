export type ThreatLevel = "healthy" | "watch" | "critical";
export type ValidationDecision = "allow" | "challenge" | "drop";
export type FormType = "contact" | "demo" | "ebook" | "pricing" | "partner";

export interface SubmissionEvent {
  id: string;
  form: FormType;
  decision: ValidationDecision;
  threat: ThreatLevel;
  completionSeconds: number;
  honeypotFilled: boolean;
  score: number;
  spamRiskPct: number;
  crmLeakageUsd: number;
  reason: string;
}

export interface ValidationRule {
  id: string;
  name: string;
  action: ValidationDecision;
  coverage: string;
  impact: string;
}

export interface AbuseSignal {
  id: string;
  title: string;
  affectedSubmissions: number;
  crmLeakageUsd: number;
  severity: ThreatLevel;
  explanation: string;
}

export const submissionEvents: SubmissionEvent[] = [
  {
    id: "SUB-8841",
    form: "demo",
    decision: "drop",
    threat: "critical",
    completionSeconds: 4,
    honeypotFilled: true,
    score: 98,
    spamRiskPct: 99,
    crmLeakageUsd: 620,
    reason: "The hidden company-size field was filled instantly, which is classic automation and should never reach SDR routing."
  },
  {
    id: "SUB-8838",
    form: "contact",
    decision: "challenge",
    threat: "watch",
    completionSeconds: 11,
    honeypotFilled: false,
    score: 67,
    spamRiskPct: 64,
    crmLeakageUsd: 190,
    reason: "Submission timing is unnaturally fast for a long contact form, but not strong enough for a hard drop without a challenge."
  },
  {
    id: "SUB-8827",
    form: "pricing",
    decision: "allow",
    threat: "healthy",
    completionSeconds: 43,
    honeypotFilled: false,
    score: 18,
    spamRiskPct: 8,
    crmLeakageUsd: 0,
    reason: "Healthy form completion path with real dwell time, progressive typing behavior, and consistent routing fields."
  },
  {
    id: "SUB-8812",
    form: "ebook",
    decision: "drop",
    threat: "critical",
    completionSeconds: 3,
    honeypotFilled: true,
    score: 95,
    spamRiskPct: 97,
    crmLeakageUsd: 280,
    reason: "The hidden newsletter opt-in trap and impossible completion time both indicate synthetic lead capture abuse."
  },
  {
    id: "SUB-8804",
    form: "partner",
    decision: "challenge",
    threat: "watch",
    completionSeconds: 14,
    honeypotFilled: false,
    score: 58,
    spamRiskPct: 49,
    crmLeakageUsd: 110,
    reason: "The route is high value, so ambiguous submissions should be challenged before partner workflows absorb bad data."
  }
];

export const validationRules: ValidationRule[] = [
  {
    id: "RULE-01",
    name: "Hidden field trap on high-intent forms",
    action: "drop",
    coverage: "Demo, pricing, and partner forms with honeypot fields invisible to humans.",
    impact: "Stops automated submissions before SDRs or partner managers waste time on spam."
  },
  {
    id: "RULE-02",
    name: "Impossible completion timing challenge",
    action: "challenge",
    coverage: "Submissions that complete too quickly for the visible field count and copy length.",
    impact: "Protects UX while forcing borderline automation to prove it is human."
  },
  {
    id: "RULE-03",
    name: "Route-weighted abuse scoring",
    action: "challenge",
    coverage: "Higher scrutiny on partner and demo forms where bad data is more expensive than on low-intent content gates.",
    impact: "Preserves conversion rate without letting premium workflows absorb synthetic volume."
  }
];

export const abuseSignalsData: AbuseSignal[] = [
  {
    id: "SIG-01",
    title: "Demo-form trap collision burst",
    affectedSubmissions: 31,
    crmLeakageUsd: 940,
    severity: "critical",
    explanation: "Demo forms are attracting obvious automation that would otherwise inflate pipeline creation and waste SDR follow-up."
  },
  {
    id: "SIG-02",
    title: "Content-gate farm traffic",
    affectedSubmissions: 44,
    crmLeakageUsd: 360,
    severity: "watch",
    explanation: "Low-quality content-gate traffic is cheap to acquire but dangerous when it seeds attribution and nurture data with fake demand."
  },
  {
    id: "SIG-03",
    title: "Partner route ambiguity",
    affectedSubmissions: 12,
    crmLeakageUsd: 290,
    severity: "watch",
    explanation: "Partner forms are seeing enough suspicious speed and repetition to justify a human-safe challenge posture."
  }
];
