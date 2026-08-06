# COMMERCE DATABASE SPECIFICATION

Version: 1.0.0

Status: Draft

Owner: Database Architecture

---

# Purpose

This document defines the implementation specification for the Commerce Domain database.

It establishes the database objects, ownership boundaries, relationships, constraints, indexing strategy, audit requirements, and implementation sequence required for PostgreSQL and Drizzle ORM.

This specification is the authoritative reference for implementation.

---

# Schema

commerce

---

# Owned Tables

| Table | Purpose |
|--------|---------|
| orders | Commercial transactions |
| order_items | Purchased products and services |
| invoices | Financial billing documents |
| invoice_items | Invoice line items |
| payments | Payment records |
| payment_methods | Payment configuration |
| refunds | Refund transactions |
| discounts | Pricing rules |
| tax_rules | Tax configuration |
| subscriptions | Recurring billing |
| receipts | Proof of payment |

Only the Commerce Domain owns these tables.

---

# External References

Platform

- organization_id
- branch_id
- user_id

Membership

- member_id
- membership_id

Inventory

- product_id

CRM

- opportunity_id

Commerce references these entities using foreign keys only.

---

# Primary Keys

All tables use PostgreSQL UUID primary keys.

---

# Standard Audit Columns

Every table includes:

- created_at
- updated_at
- created_by
- updated_by

Financial records additionally include immutable business timestamps.

---

# Business Rules

## Orders

- Draft orders may be modified.
- Completed orders are immutable.
- Cancelled orders remain available for audit.

## Invoices

- Invoice numbers are unique.
- Posted invoices cannot be modified.
- Historical invoices are never deleted.

## Payments

- Payments are append-only.
- Failed payments remain recorded.
- Every payment references an invoice.

## Refunds

- Every refund references one payment.
- Refund amount cannot exceed the original payment.
- Refund history is immutable.

## Subscriptions

- Billing history is preserved.
- Renewals generate new billing records.
- Status changes are historically retained.

## Discounts

- Discounts are snapshot at transaction time.
- Historical discounts never change.

## Taxes

- Tax calculations are preserved historically.
- Tax rules support effective dating.

## Receipts

- Generated only after successful payment.
- Receipt numbers are unique.

---

# Foreign Key Rules

Commerce references authoritative entities from:

- Platform
- Membership
- Inventory
- CRM

Cross-domain ownership is prohibited.

---

# Index Strategy

Indexes required:

- organization_id
- member_id
- order_status
- invoice_status
- payment_status
- subscription_status
- invoice_number
- receipt_number
- created_at

Composite indexes support:

- Revenue reporting
- Outstanding invoices
- Subscription renewals
- Member purchase history
- Financial reconciliation
- Tax reporting

---

# Multi-Tenant Rules

Every business table contains:

organization_id

Tenant isolation is mandatory.

Cross-tenant financial access is prohibited except for authorized platform administration.

---

# Retention Policy

Financial records are retained permanently.

Operational deletion is prohibited.

Historical records may be archived but remain recoverable.

---

# Performance Targets

The Commerce database must support:

- High-volume POS transactions
- Concurrent payment processing
- Subscription billing
- Financial reconciliation
- AI-driven revenue analytics
- Enterprise financial reporting

---

# Implementation Sequence

1. Drizzle Schema
2. Database Migration
3. Repository
4. Service
5. Controller
6. Tests

This sequence must be followed for every Commerce aggregate.

---

# End