# COMMERCE DATABASE DOMAIN

Version: 1.0.0

Status: Draft

Owner: Database Architecture

---

# Purpose

This directory contains the complete database design for the Commerce Domain.

The Commerce Domain is responsible for managing all financial transactions within FitnessOS, including orders, invoices, payments, subscriptions, refunds, discounts, taxation, and financial audit history.

It serves as the authoritative specification for implementing the financial persistence layer using PostgreSQL and Drizzle ORM.

---

# Scope

The Commerce Domain includes:

- Product Sales
- Orders
- Order Items
- Invoices
- Invoice Items
- Payments
- Payment Methods
- Refunds
- Discounts
- Taxes
- Receipts
- POS Transactions
- Subscription Billing
- Wallet & Credits (Future)

---

# Documents

- BUSINESS_ANALYSIS.md
- AGGREGATE_MODEL.md
- ENTITY_CATALOG.md
- SCHEMA_ARCHITECTURE.md
- LOGICAL_DATABASE_MODEL.md
- DATABASE_SPECIFICATION.md

---

# Dependencies

Depends On

- Platform Domain
- Membership Domain
- Inventory Domain

Referenced By

- Reporting
- AI
- Communication

---

# Database Schema

commerce

---

# Status

Implementation Ready after approval.

---

# End