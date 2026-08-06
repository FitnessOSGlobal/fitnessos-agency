# CRM DATABASE SPECIFICATION

Version: 1.0.0

Status: Draft

Owner: Database Architecture

---

# Schema

crm

---

# Tables

| Table | Purpose |
|--------|---------|
| leads | Customer acquisition |
| opportunities | Sales pipeline |
| crm_activities | Calls, meetings, emails |
| crm_notes | Internal notes |
| campaigns | Marketing attribution |
| communication_timelines | Customer interaction history |

---

# Primary Keys

UUID

---

# Audit Columns

- created_at
- updated_at
- created_by
- updated_by

---

# Foreign Keys

Platform

- organization_id
- branch_id
- owner_id

Membership

- member_id

---

# Business Rules

- Lead email should be unique within an organization when present.
- Every opportunity belongs to exactly one lead.
- Activities are append-only.
- Notes support soft deletion.
- Campaign attribution is immutable after lead conversion.
- Converting a lead creates a reference to the Membership domain but does not transfer ownership.

---

# Performance Targets

Optimized for:

- Sales dashboards
- Pipeline reporting
- Follow-up scheduling
- Lead conversion analytics
- Campaign performance

---

# Implementation Sequence

1. Drizzle Schema
2. Migration
3. Repository
4. Service
5. Controller
6. Tests

---

# End