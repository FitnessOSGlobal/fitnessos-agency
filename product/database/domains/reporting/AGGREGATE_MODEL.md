# REPORTING AGGREGATE MODEL

Version: 1.0.0

Status: Draft

Owner: Database Architecture

---

# Purpose

Defines aggregate boundaries for the Reporting Domain.

Each aggregate establishes ownership of analytical artifacts while consuming published data from operational domains.

---

# Aggregate Overview

The Reporting Domain contains the following primary aggregates:

1. Dashboard
2. Report
3. KPI
4. Snapshot
5. Analytics

---

# Aggregate — Dashboard

Owns

- Dashboard
- Dashboard Widget

Business Rules

- Dashboards are organization-specific.
- Widgets reference analytical datasets.

---

# Aggregate — Report

Owns

- Report
- Report Template
- Scheduled Report

Business Rules

- Reports are generated from analytical models.
- Scheduled reports execute automatically.

---

# Aggregate — KPI

Owns

- KPI Definition
- KPI Snapshot

Business Rules

- KPI definitions are versioned.
- Snapshots are immutable.

---

# Aggregate — Snapshot

Owns

- Data Snapshot
- Aggregated Metrics

Business Rules

- Snapshots preserve historical state.
- Aggregations never modify source data.

---

# Aggregate — Analytics

Owns

- Analytical Model

Business Rules

- Analytical models consume published data only.
- Analytics never update operational domains.

---

# Cross-Domain References

Consumes published data from:

- Platform
- Membership
- Attendance
- CRM
- Commerce
- Inventory
- HR
- Scheduling
- Communication

Referenced By

- AI

---

# Transaction Boundaries

Reporting maintains independent transactional consistency.

Operational domains remain the source of truth.

---

# End of Document