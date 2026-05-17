import { abuseSignals, rules, submissionLane, summary, verification } from "./honeypotService";

function layout(title: string, activePath: string, body: string) {
  const nav = [
    { href: "/", label: "Overview" },
    { href: "/validation-lane", label: "Validation Lane" },
    { href: "/abuse-signals", label: "Abuse Signals" },
    { href: "/verification", label: "Verification" },
    { href: "/docs", label: "Docs" }
  ]
    .map((item) => {
      const active = item.href === activePath ? "nav-chip active" : "nav-chip";
      return `<a class="${active}" href="${item.href}">${item.label}</a>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <style>
      :root {
        --bg: #081120;
        --shell: #0d1728;
        --panel-soft: rgba(18, 32, 53, 0.82);
        --line: rgba(122, 161, 255, 0.16);
        --text: #f3f6ff;
        --muted: #95a5c6;
        --accent: #4bd3b1;
        --accent-strong: #2c8cff;
        --good: #31d39a;
        --watch: #f2c14d;
        --bad: #ff6d84;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: "Segoe UI", Inter, sans-serif;
        color: var(--text);
        background:
          radial-gradient(circle at top left, rgba(75, 211, 177, 0.16), transparent 28%),
          radial-gradient(circle at top right, rgba(44, 140, 255, 0.14), transparent 26%),
          linear-gradient(180deg, #06101d 0%, var(--bg) 100%);
      }
      a { color: inherit; text-decoration: none; }
      .shell {
        max-width: 1280px;
        margin: 0 auto;
        padding: 28px 28px 40px;
      }
      .topbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
        padding: 16px 18px;
        border: 1px solid var(--line);
        background: rgba(7, 14, 26, 0.82);
        border-radius: 24px;
        box-shadow: 0 16px 60px rgba(0, 0, 0, 0.28);
      }
      .brand {
        display: flex;
        align-items: center;
        gap: 14px;
      }
      .brand-mark {
        width: 42px;
        height: 42px;
        display: grid;
        place-items: center;
        border-radius: 14px;
        background: linear-gradient(135deg, var(--accent) 0%, var(--accent-strong) 100%);
        font-weight: 800;
      }
      .eyebrow {
        margin: 0 0 2px;
        font-size: 12px;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: #8ec4ff;
      }
      .brand-title {
        margin: 0;
        font-size: 24px;
        font-weight: 700;
      }
      .brand-subtitle {
        margin: 4px 0 0;
        color: var(--muted);
        font-size: 14px;
      }
      nav {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        justify-content: flex-end;
      }
      .nav-chip {
        padding: 12px 16px;
        border-radius: 999px;
        border: 1px solid var(--line);
        background: rgba(16, 27, 43, 0.9);
        color: #d7e6ff;
        font-size: 13px;
        letter-spacing: 0.06em;
        text-transform: uppercase;
      }
      .nav-chip.active {
        background: linear-gradient(135deg, rgba(75, 211, 177, 0.95), rgba(44, 140, 255, 0.92));
        border-color: transparent;
        color: white;
        box-shadow: 0 10px 24px rgba(72, 129, 255, 0.32);
      }
      .hero {
        margin-top: 24px;
        padding: 30px 30px 34px;
        border-radius: 30px;
        border: 1px solid var(--line);
        background: linear-gradient(180deg, rgba(13, 24, 40, 0.95), rgba(9, 19, 33, 0.92));
        box-shadow: 0 20px 70px rgba(0, 0, 0, 0.24);
      }
      .hero h1 {
        margin: 8px 0 10px;
        max-width: 900px;
        font-size: clamp(40px, 4.9vw, 68px);
        line-height: 0.96;
        letter-spacing: -0.04em;
      }
      .hero p {
        max-width: 860px;
        margin: 0;
        font-size: 21px;
        line-height: 1.5;
        color: #b5c7e7;
      }
      .section {
        margin-top: 24px;
        display: grid;
        gap: 20px;
      }
      .metrics {
        display: grid;
        grid-template-columns: repeat(5, minmax(0, 1fr));
        gap: 16px;
      }
      .panel {
        padding: 22px;
        border-radius: 26px;
        border: 1px solid var(--line);
        background: var(--panel-soft);
      }
      .metric-label {
        color: #8fb6ea;
        letter-spacing: 0.18em;
        font-size: 12px;
        text-transform: uppercase;
      }
      .metric-value {
        margin-top: 14px;
        font-size: 44px;
        font-weight: 750;
        line-height: 1;
      }
      .metric-copy {
        margin-top: 12px;
        font-size: 14px;
        color: var(--muted);
        line-height: 1.5;
      }
      .cols-2 {
        display: grid;
        grid-template-columns: 1.2fr 0.8fr;
        gap: 20px;
      }
      .cols-3 {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 16px;
      }
      .table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 14px;
      }
      .table th,
      .table td {
        padding: 14px 10px;
        border-bottom: 1px solid rgba(143, 182, 234, 0.11);
        text-align: left;
        vertical-align: top;
      }
      .table th {
        color: #8fb6ea;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.16em;
      }
      .table td {
        color: #e9f1ff;
        font-size: 14px;
        line-height: 1.45;
      }
      .badge {
        display: inline-flex;
        align-items: center;
        padding: 6px 10px;
        border-radius: 999px;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.12em;
      }
      .healthy { background: rgba(49, 211, 154, 0.14); color: var(--good); }
      .watch { background: rgba(242, 193, 77, 0.14); color: var(--watch); }
      .critical { background: rgba(255, 109, 132, 0.14); color: var(--bad); }
      .section-title {
        margin: 0;
        font-size: 28px;
        line-height: 1.1;
      }
      .section-copy {
        margin: 10px 0 0;
        color: var(--muted);
        font-size: 16px;
        line-height: 1.55;
      }
      ul.clean {
        margin: 16px 0 0;
        padding-left: 18px;
        color: #dbe7fb;
      }
      ul.clean li { margin-top: 10px; line-height: 1.5; }
      .footer-note {
        margin-top: 20px;
        color: #88a5d4;
        font-size: 13px;
        letter-spacing: 0.04em;
      }
      @media (max-width: 1100px) {
        .metrics, .cols-2, .cols-3 { grid-template-columns: 1fr; }
        nav { justify-content: flex-start; }
        .topbar { flex-direction: column; align-items: flex-start; }
      }
    </style>
  </head>
  <body>
    <main class="shell">
      <header class="topbar">
        <div class="brand">
          <div class="brand-mark">HV</div>
          <div>
            <p class="eyebrow">Traffic Integrity</p>
            <h1 class="brand-title">Honeypot Form Validator</h1>
            <p class="brand-subtitle">Lead-capture defense without conversion-killing friction.</p>
          </div>
        </div>
        <nav>${nav}</nav>
      </header>
      ${body}
    </main>
  </body>
</html>`;
}

export function renderOverview() {
  const stats = summary();
  const signalMarkup = abuseSignals()
    .map(
      (signal) => `
      <tr>
        <td>${signal.title}</td>
        <td><span class="badge ${signal.severity}">${signal.severity}</span></td>
        <td>${signal.affectedSubmissions}</td>
        <td>$${signal.crmLeakageUsd}</td>
        <td>${signal.explanation}</td>
      </tr>`
    )
    .join("");

  const body = `
    <section class="hero">
      <p class="eyebrow">Form Defense Control Plane</p>
      <h1>Lead capture should filter bots without punishing real buyers.</h1>
      <p>Use honeypot traps, timing heuristics, and route-aware challenge posture to keep spam out of the CRM while preserving healthy conversion flow on high-intent forms.</p>
    </section>
    <section class="section">
      <div class="metrics">
        <article class="panel">
          <div class="metric-label">Submissions</div>
          <div class="metric-value">${stats.submissionCount}</div>
          <div class="metric-copy">Modeled form submissions currently moving through the validation lane.</div>
        </article>
        <article class="panel">
          <div class="metric-label">Dropped</div>
          <div class="metric-value">${stats.dropped}</div>
          <div class="metric-copy">Submissions blocked before they pollute CRM routing, nurture logic, or pipeline reporting.</div>
        </article>
        <article class="panel">
          <div class="metric-label">Challenged</div>
          <div class="metric-value">${stats.challenged}</div>
          <div class="metric-copy">Borderline submissions that deserve a challenge before a hard drop.</div>
        </article>
        <article class="panel">
          <div class="metric-label">Clean</div>
          <div class="metric-value">${stats.clean}</div>
          <div class="metric-copy">Legitimate submissions preserved for clean attribution and real sales follow-up.</div>
        </article>
        <article class="panel">
          <div class="metric-label">CRM Leakage</div>
          <div class="metric-value">$${stats.crmLeakageUsd}</div>
          <div class="metric-copy">Estimated downstream cost if spam reaches routing, SDR, or partner workflows.</div>
        </article>
      </div>
      <div class="cols-2">
        <article class="panel">
          <p class="eyebrow">Recommendation</p>
          <h2 class="section-title">What to tighten next</h2>
          <p class="section-copy">${stats.recommendation}</p>
          <p class="footer-note">Best use case: protect demo, pricing, and partner forms before spam creates fake demand or wastes sales time.</p>
        </article>
        <article class="panel">
          <p class="eyebrow">Rule Coverage</p>
          <h2 class="section-title">The three validation controls that matter first</h2>
          <ul class="clean">
            ${rules()
              .map((rule) => `<li><strong>${rule.name}</strong> — ${rule.impact}</li>`)
              .join("")}
          </ul>
        </article>
      </div>
      <article class="panel">
        <p class="eyebrow">Abuse Signals</p>
        <h2 class="section-title">The submission patterns threatening lead quality right now.</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Signal</th>
              <th>Severity</th>
              <th>Affected Submissions</th>
              <th>CRM Leakage</th>
              <th>Why it matters</th>
            </tr>
          </thead>
          <tbody>${signalMarkup}</tbody>
        </table>
      </article>
    </section>`;

  return layout("Honeypot Form Validator", "/", body);
}

export function renderFilterLane() {
  const eventMarkup = submissionLane()
    .map(
      (event) => `
      <tr>
        <td>${event.id}</td>
        <td>${event.form}</td>
        <td><span class="badge ${event.threat}">${event.decision}</span></td>
        <td>${event.completionSeconds}s</td>
        <td>${event.honeypotFilled ? "Filled" : "Clear"}</td>
        <td>${event.score}</td>
        <td>${event.spamRiskPct}%</td>
        <td>$${event.crmLeakageUsd}</td>
        <td>${event.reason}</td>
      </tr>`
    )
    .join("");

  const body = `
    <section class="hero">
      <p class="eyebrow">Validation Lane</p>
      <h1>Every form submit gets a trust decision before it earns CRM status.</h1>
      <p>This lane shows the practical choices that protect pipeline quality: allow healthy submissions, challenge ambiguous ones, and drop the obvious automation without hurting real humans.</p>
    </section>
    <section class="section">
      <article class="panel">
        <p class="eyebrow">Submission Events</p>
        <h2 class="section-title">Validation posture by form route.</h2>
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Form</th>
              <th>Decision</th>
              <th>Completion Time</th>
              <th>Honeypot</th>
              <th>Score</th>
              <th>Spam Risk</th>
              <th>CRM Leakage</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>${eventMarkup}</tbody>
        </table>
      </article>
    </section>`;

  return layout("Honeypot Form Validator - Validation Lane", "/validation-lane", body);
}

export function renderAbuseSignals() {
  const signalCards = abuseSignals()
    .map(
      (signal) => `
      <article class="panel">
        <p class="eyebrow">Signal ${signal.id}</p>
        <h2 class="section-title">${signal.title}</h2>
        <p class="section-copy">${signal.explanation}</p>
        <div class="cols-3" style="margin-top:16px;">
          <div>
            <div class="metric-label">Severity</div>
            <div class="metric-value" style="font-size:28px;"><span class="badge ${signal.severity}">${signal.severity}</span></div>
          </div>
          <div>
            <div class="metric-label">Affected Submissions</div>
            <div class="metric-value" style="font-size:34px;">${signal.affectedSubmissions}</div>
          </div>
          <div>
            <div class="metric-label">CRM Leakage</div>
            <div class="metric-value" style="font-size:34px;">$${signal.crmLeakageUsd}</div>
          </div>
        </div>
      </article>`
    )
    .join("");

  const body = `
    <section class="hero">
      <p class="eyebrow">Abuse Signals</p>
      <h1>Bad submissions should be visible in revenue language, not buried in inboxes.</h1>
      <p>These signals turn form abuse into commercial risk language so Growth and RevOps can see why clean lead capture matters to routing quality, nurture integrity, and pipeline trust.</p>
    </section>
    <section class="section">
      ${signalCards}
    </section>`;

  return layout("Honeypot Form Validator - Abuse Signals", "/abuse-signals", body);
}

export function renderVerification() {
  const body = `
    <section class="hero">
      <p class="eyebrow">Verification</p>
      <h1>This build proves form defense belongs in the revenue stack.</h1>
      <p>The point is not generic anti-spam theater. The point is protecting lead quality before fake submissions distort routing, attribution, and conversion metrics.</p>
    </section>
    <section class="section">
      <article class="panel">
        <p class="eyebrow">Release Checks</p>
        <h2 class="section-title">What this repo validates</h2>
        <ul class="clean">
          ${verification().map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </article>
    </section>`;

  return layout("Honeypot Form Validator - Verification", "/verification", body);
}

export function renderDocs() {
  const body = `
    <section class="hero">
      <p class="eyebrow">Docs</p>
      <h1>Modeled as a lead-capture integrity control plane for growth teams.</h1>
      <p>This repo sits at the intersection of form UX, spam prevention, and pipeline quality. It is designed to show how submission validation choices shape downstream sales and analytics trust.</p>
    </section>
    <section class="section">
      <div class="cols-2">
        <article class="panel">
          <p class="eyebrow">Routes</p>
          <h2 class="section-title">UI surface</h2>
          <ul class="clean">
            <li><code>/</code> overview and CRM leakage posture</li>
            <li><code>/validation-lane</code> submission-level decisions</li>
            <li><code>/abuse-signals</code> form-abuse signal cards for executive review</li>
            <li><code>/verification</code> release checks and modeling claims</li>
          </ul>
        </article>
        <article class="panel">
          <p class="eyebrow">API</p>
          <h2 class="section-title">Machine-readable outputs</h2>
          <ul class="clean">
            <li><code>/api/dashboard/summary</code></li>
            <li><code>/api/validation-lane</code></li>
            <li><code>/api/rules</code></li>
            <li><code>/api/abuse-signals</code></li>
            <li><code>/api/verification</code></li>
            <li><code>/api/sample</code></li>
          </ul>
        </article>
      </div>
    </section>`;

  return layout("Honeypot Form Validator - Docs", "/docs", body);
}
