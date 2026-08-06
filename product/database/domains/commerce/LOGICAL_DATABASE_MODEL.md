# COMMERCE LOGICAL DATABASE MODEL

Version: 1.0.0

Status: Draft

Owner: Database Architecture

---

# Purpose

This document defines the logical database model for the Commerce Domain.

It translates business entities into logical database structures while remaining independent of PostgreSQL or Drizzle ORM implementation details.

The logical model establishes entity ownership, relationships, cardinality, normalization rules, and lifecycle requirements.

---

# Logical Entities

The Commerce Domain consists of the following logical entities:

1. Order
2. Order Item
3. Invoice
4. Invoice Item
5. Payment
6. Refund
7. Subscription
8. Discount
9. Tax Rule
10. Receipt

Each logical entity maps to a primary database table.

---

# Entity Relationships

Organization
│
▼
Branch
│
▼
Member
│
▼
Order
├──────────────┐
▼              ▼
Order Item   Invoice
                 │
                 ▼
             Invoice Item
                 │
                 ▼
              Payment
              │      │
              ▼      ▼
          Receipt   Refund

Subscription
      │
      ▼
Payments

Discount
      │
      ▼
Order

Tax Rule
      │
      ▼
Invoice Item

---

# Cardinality

| Parent | Child | Cardinality |
|---------|-------|------------:|
| Organization | Order | 1 : N |
| Branch | Order | 1 : N |
| Member | Order | 1 : N |
| Order | Order Item | 1 : N |
| Order | Invoice | 1 : 1 |
| Invoice | Invoice Item | 1 : N |
| Invoice | Payment | 1 : N |
| Payment | Receipt | 1 : 1 |
| Payment | Refund | 1 : N |
| Subscription | Payment | 1 : N |
| Discount | Order | 1 : N |
| Tax Rule | Invoice Item | 1 : N |

---

# Normalization

The logical model targets Third Normal Form (3NF).

Principles:

- Financial data is never duplicated.
- Monetary values are stored as transaction snapshots.
- Foreign keys reference authoritative domains.
- Derived values are calculated rather than duplicated where practical.

---

# Multi-Tenant Model

Every logical business entity contains:

- organization_id

Tenant isolation is mandatory.

---

# Audit Model

Every logical entity contains:

- created_at
- updated_at
- created_by
- updated_by

Financial transactions additionally contain immutable business timestamps.

---

# Data Lifecycle

Order

Draft

↓

Confirmed

↓

Completed

↓

Archived

Invoice

Draft

↓

Issued

↓

Paid

↓

Archived

Payment

Pending

↓

Authorized

↓

Completed

↓

Refunded

Refund

Requested

↓

Approved

↓

Processed

↓

Completed

Subscription

Created

↓

Active

↓

Renewed

↓

Expired

↓

Cancelled

---

# Future Extensions

The logical model supports future entities including:

- Wallet Transaction
- Loyalty Points
- Gift Card
- Installment Plan
- Settlement Batch
- Credit Note

These extensions must preserve ownership and aggregate boundaries.

---

# End