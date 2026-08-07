# INVENTORY LOGICAL DATABASE MODEL

Version: 1.0.0

Status: Draft

Owner: Database Architecture

---

# Purpose

This document defines the logical database model for the Inventory Domain.

It establishes logical entities, ownership, relationships, normalization, lifecycle, and business constraints independent of implementation technology.

---

# Logical Entities

The Inventory Domain consists of the following logical entities:

1. Product
2. Product Variant
3. Product Category
4. Brand
5. Supplier
6. Supplier Contact
7. Warehouse
8. Storage Location
9. Stock
10. Stock Movement
11. Stock Adjustment
12. Purchase Order
13. Purchase Order Item
14. Goods Receipt
15. Goods Receipt Item
16. Stock Transfer
17. Stock Transfer Item

Each logical entity maps to one primary database table.

---

# Entity Relationships

Organization

↓

Warehouse

↓

Storage Location

↓

Stock

↓

Stock Movement

Organization

↓

Supplier

↓

Purchase Order

↓

Goods Receipt

↓

Stock Movement

Product Category

↓

Product

↓

Product Variant

↓

Stock

Stock Transfer

↓

Transfer Items

↓

Stock Movement

---

# Cardinality

| Parent | Child | Cardinality |
|---------|-------|------------:|
| Organization | Warehouse | 1 : N |
| Organization | Supplier | 1 : N |
| Product Category | Product | 1 : N |
| Product | Product Variant | 1 : N |
| Product | Stock | 1 : N |
| Warehouse | Stock | 1 : N |
| Stock | Stock Movement | 1 : N |
| Supplier | Purchase Order | 1 : N |
| Purchase Order | Purchase Order Item | 1 : N |
| Purchase Order | Goods Receipt | 1 : N |
| Goods Receipt | Goods Receipt Item | 1 : N |
| Stock Transfer | Stock Transfer Item | 1 : N |

---

# Normalization

Target normalization:

Third Normal Form (3NF)

Principles:

- No duplicated product data.
- Stock quantities derived from stock movements.
- Supplier information stored once.
- Categories normalized.
- Warehouse hierarchy normalized.

---

# Multi-Tenant Model

Every logical business entity contains:

- organization_id

Tenant isolation is mandatory.

---

# Audit Model

Every logical entity includes:

- created_at
- updated_at
- created_by
- updated_by

Inventory events additionally record immutable movement timestamps.

---

# Data Lifecycle

Product

Created

↓

Active

↓

Inactive

↓

Archived

Supplier

Registered

↓

Approved

↓

Active

↓

Inactive

Warehouse

Created

↓

Operational

↓

Closed

Stock

Created

↓

Available

↓

Reserved

↓

Consumed

Purchase Order

Draft

↓

Approved

↓

Ordered

↓

Received

↓

Closed

Stock Transfer

Requested

↓

Approved

↓

In Transit

↓

Completed

---

# Future Extensions

The logical model supports:

- Batch Tracking
- Serial Number Tracking
- Expiry Management
- Barcode Management
- RFID Tracking
- Cycle Counting

---

# End of Document