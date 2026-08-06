# COMMERCE AGGREGATE MODEL

Version: 1.0.0

Status: Draft

Owner: Database Architecture

---

# Purpose

Defines aggregate boundaries for the Commerce Domain.

Each aggregate establishes a transactional consistency boundary and owns its financial lifecycle.

---

# Aggregate Overview

Commerce contains eight primary aggregates:

1. Order
2. Invoice
3. Payment
4. Refund
5. Subscription
6. Discount
7. Tax
8. Receipt

---

# Aggregate — Order

Aggregate Root

Order

Owns

- Order Header
- Order Items
- Pricing Snapshot
- Order Status

Business Rules

- Draft orders may change.
- Completed orders become immutable.
- Cancelled orders retain history.

---

# Aggregate — Invoice

Aggregate Root

Invoice

Owns

- Invoice Header
- Invoice Items
- Invoice Status

Business Rules

- Invoice numbers are unique.
- Posted invoices are immutable.

---

# Aggregate — Payment

Aggregate Root

Payment

Owns

- Payment Method
- Amount
- Currency
- Settlement Status

Business Rules

- Payments are append-only.
- Failed payments remain recorded.

---

# Aggregate — Refund

Aggregate Root

Refund

Owns

- Refund Request
- Refund Amount
- Approval Status

Business Rules

- Refund always references an existing payment.
- Refund history cannot be deleted.

---

# Aggregate — Subscription

Aggregate Root

Subscription

Owns

- Billing Cycle
- Renewal Schedule
- Subscription Status

Business Rules

- Billing history is immutable.
- Subscription changes create historical records.

---

# Aggregate — Discount

Aggregate Root

Discount

Owns

- Discount Rules
- Coupon Codes
- Promotional Conditions

---

# Aggregate — Tax

Aggregate Root

Tax Rule

Owns

- Tax Rate
- Tax Region
- Effective Date

Business Rules

- Historical tax calculations are preserved.

---

# Aggregate — Receipt

Aggregate Root

Receipt

Owns

- Receipt Number
- Receipt Date
- Payment Reference

Business Rules

- Receipts are generated only after successful payment.

---

# Cross Domain References

Platform

- Organization
- Branch
- User

Membership

- Member
- Membership

Inventory

- Product

CRM

- Opportunity

---

# Transaction Boundaries

Each aggregate owns its own transactional consistency.

Cross-domain consistency occurs through domain events.

---

# End