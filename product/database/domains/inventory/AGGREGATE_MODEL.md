# INVENTORY AGGREGATE MODEL

Version: 1.0.0

Status: Draft

Owner: Database Architecture

---

# Purpose

Defines aggregate boundaries for the Inventory Domain.

Each aggregate establishes ownership, transactional consistency, and lifecycle for inventory operations.

---

# Aggregate Overview

The Inventory Domain contains the following primary aggregates:

1. Product
2. Supplier
3. Warehouse
4. Stock
5. Purchase Order
6. Goods Receipt
7. Stock Transfer

---

# Aggregate — Product

Owns

- Product
- Product Variant
- Product Category
- Brand

Business Rules

- Products belong to one organization.
- Product variants belong to one product.
- Categories are hierarchical.
- Products may be active or inactive.

---

# Aggregate — Supplier

Owns

- Supplier
- Supplier Contacts

Business Rules

- Suppliers belong to one organization.
- Supplier history is retained.

---

# Aggregate — Warehouse

Owns

- Warehouse
- Storage Locations

Business Rules

- Warehouses belong to one organization.
- Warehouses may contain multiple storage locations.

---

# Aggregate — Stock

Owns

- Stock Levels
- Stock Movements
- Stock Adjustments

Business Rules

- Every stock movement is immutable.
- Stock quantities are calculated from movement history.

---

# Aggregate — Purchase Order

Owns

- Purchase Order
- Purchase Order Items

Business Rules

- Purchase Orders reference one supplier.
- Purchase Orders support partial receipt.

---

# Aggregate — Goods Receipt

Owns

- Goods Receipt
- Received Items

Business Rules

- Goods Receipts reference Purchase Orders.
- Received quantities update stock through stock movements.

---

# Aggregate — Stock Transfer

Owns

- Transfer Header
- Transfer Items

Business Rules

- Transfers occur between warehouses.
- Every transfer generates stock movements.

---

# Cross-Domain References

Platform

- Organization
- Branch
- User

Commerce

- Product References

Reporting

- Inventory Analytics

---

# Transaction Boundaries

Each aggregate owns its own transactional consistency.

Cross-domain consistency occurs through events and foreign key references.

---

# End of Document