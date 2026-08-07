# INVENTORY DATABASE SPECIFICATION

Version: 1.0.0

Status: Draft

Owner: Database Engineering

---

# Purpose

This document defines the implementation-ready database specification for the Inventory Domain.

It serves as the authoritative reference for implementing the Inventory schema using PostgreSQL and Drizzle ORM.

---

# Schema

inventory

---

# Owned Tables

| Table | Purpose |
|--------|---------|
| products | Product catalog |
| product_variants | Product variations |
| product_categories | Product hierarchy |
| brands | Product brands |
| suppliers | Supplier master |
| supplier_contacts | Supplier contacts |
| warehouses | Warehouse master |
| storage_locations | Warehouse locations |
| stock | Current stock levels |
| stock_movements | Immutable inventory movements |
| stock_adjustments | Manual adjustments |
| purchase_orders | Procurement orders |
| purchase_order_items | Procurement line items |
| goods_receipts | Goods received |
| goods_receipt_items | Received inventory |
| stock_transfers | Warehouse transfers |
| stock_transfer_items | Transfer line items |

Only the Inventory Domain owns these tables.

---

# External References

Platform

- organization_id
- branch_id
- user_id

Commerce

- order_item_id

Reporting

- reporting_snapshot_id (future)

---

# Primary Keys

All tables use UUID primary keys.

---

# Standard Audit Columns

Every table includes:

- created_at
- updated_at
- created_by
- updated_by

Optional:

- deleted_at
- deleted_by

Stock movement records additionally include immutable transaction timestamps.

---

# Table Specifications

Every table should define:

- Purpose
- Required attributes
- Constraints
- Relationships
- Business rules
- Required indexes

Implementation must remain consistent with this specification.

---

# Constraint Strategy

Unique Constraints

- SKU unique within organization.
- Warehouse code unique within organization.
- Supplier code unique within organization.

Check Constraints

- Quantity cannot be negative where prohibited.
- Purchase quantities greater than zero.
- Valid status transitions only.

Referential Constraints

- Every stock movement references one product.
- Every goods receipt references one purchase order.
- Every transfer references source and destination warehouses.

---

# Business Rules

Products

- SKU uniqueness enforced.
- Products may have multiple variants.

Stock

- Stock movement history is immutable.
- Available stock is calculated.
- Reserved stock cannot exceed available stock.

Purchase Orders

- Partial receipts supported.
- Closed purchase orders cannot be modified.

Goods Receipts

- Goods receipt creates stock movements.
- Received quantities cannot exceed ordered quantities unless explicitly approved.

Transfers

- Source warehouse stock decreases.
- Destination warehouse stock increases.
- Every transfer creates paired stock movement records.

---

# Multi-Tenant Rules

Every business table contains:

organization_id

Requirements:

- Tenant isolation.
- Organization-scoped queries by default.
- Cross-tenant access prohibited.

---

# Soft Delete Policy

Soft delete permitted for:

- Products
- Suppliers
- Warehouses

Soft delete prohibited for:

- Stock Movements
- Purchase Orders
- Goods Receipts

---

# Retention Policy

Inventory history retained permanently.

Stock movements never deleted.

Procurement records permanently retained.

---

# Performance Targets

Optimized for:

- Product Search
- SKU Lookup
- Stock Availability
- Procurement
- Warehouse Operations
- Inventory Valuation
- Reporting
- AI Forecasting

---

# Migration Strategy

Implementation principles:

- Forward-only migrations.
- Version-controlled schema changes.
- No destructive migrations without approval.

---

# Seed Data

Initial seed data includes:

- Default Units of Measure
- Default Product Statuses
- Default Warehouse Statuses
- Default Stock Movement Types

---

# Implementation Sequence

1. Drizzle Schema
2. Database Migration
3. Repository
4. Service
5. Controller
6. API Documentation
7. Tests
8. Production Validation

---

# Acceptance Criteria

Inventory implementation is complete when:

- Schema implemented
- Migration verified
- Repository completed
- Services completed
- Controllers completed
- API documented
- Tests passing
- Documentation synchronized

---

# End of Document