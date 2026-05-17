# Honeypot Form Validator Architecture

## Purpose

`honeypot-form-validator` models the form-defense layer that sits between website lead capture and downstream routing. It turns suspicious submissions into clear allow, challenge, or drop decisions before spam distorts CRM quality, attribution, or SDR workload.

## Application Shape

- `src/app.ts`
  - Express entrypoint
  - HTML routes for overview, validation lane, abuse signals, verification, and docs
  - JSON routes for summary, rules, abuse signals, and sample payloads
- `src/data/sampleHoneypot.ts`
  - modeled submission events
  - validation rule definitions
  - executive abuse-signal objects
- `src/services/honeypotService.ts`
  - summary calculations
  - machine-readable lane outputs
  - verification claims
- `src/services/render.ts`
  - operator UI shell
  - overview metrics and lane tables
  - executive abuse-signal views

## Control Surface Logic

### Overview
- shows how many submissions are being dropped, challenged, or preserved
- translates spam leakage into CRM and pipeline-cost language
- keeps the business impact visible for Growth, RevOps, and SDR teams

### Validation Lane
- makes submission-level trust decisions legible
- compares form route, completion time, honeypot collisions, risk score, and leakage cost
- demonstrates how spam protection happens before CRM and nurture systems absorb bad demand

### Abuse Signals
- summarizes the patterns that threaten lead quality the most
- keeps severity, affected submissions, and CRM leakage visible together
- helps explain why form validation belongs in the revenue stack, not just in a security stack

### Verification
- lists the core claims the build is proving
- keeps the README screenshots tied to real modeled behavior

## Why This Repo Matters

The repo shows how form-abuse prevention can be framed as revenue infrastructure:

- cleaner lead-routing inputs
- less wasted SDR and partner follow-up time
- less noisy attribution and nurture data
- stronger trust between Growth, RevOps, Sales, and Engineering
