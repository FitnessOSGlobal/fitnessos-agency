# INVENTORY DATABASE SCHEMA ARCHITECTURE

Version: 1.0.0

Status: Draft

Owner: Database Architecture

---

# Purpose

This document defines the PostgreSQL schema architecture for the Inventory Domain.

The Inventory schema owns all persistence objects related to products, stock, procurement, warehouses, and inventory movement.

---

# Schema Name

inventory

---

# Schema Ownership

Owns:

- products
- product_variants
- product_categories
- brands
- suppliers
- supplier_contacts
- warehouses
- storage_locations
- stock
- stock_movements
- stock_adjustments
- purchase_orders
- purchase_order_items
- goods_receipts
- goods_receipt_items
- stock_transfers
- stock_transfer_items

Only the Inventory Domain may modify these tables.

---

# External References

## Platform

- organization_id
- branch_id
- user_id

## Commerce

- order_item_id

Inventory never owns external entities.

---

# Table Relationships

products

↓

product_variants

↓

stock

↓

stock_movements

purchase_orders

↓

goods_receipts

↓

stock

warehouses

↓

storage_locations

↓

stock

stock_transfers

↓

stock_transfer_items

---

# Primary Keys

All tables use UUID primary keys.

---

# Foreign Keys

Inventory references:

- organization_id
- branch_id
- user_id

Cross-domain ownership is prohibited.

---

# Audit Strategy

Every business table contains:

- created_at
- updated_at
- created_by
- updated_by

Optional:

- deleted_at
- deleted_by

Stock movements additionally contain immutable business timestamps.

---

# Index Strategy

Primary indexes:

- organization_id
- sku
- supplier_id
- warehouse_id
- category_id
- status
- created_at

Composite indexes:

- organization_id + sku
- warehouse_id + product_id
- supplier_id + status

---

# Multi-Tenant Strategy

Every business table contains:

organization_id

Tenant isolation is mandatory.

---

# Retention Strategy

Inventory history is retained permanently.

Operational entities may support soft delete.

Stock movement history is immutable.

---

# Performance Considerations

Optimized for:

- Product Search
- SKU Lookup
- Stock Availability
- Warehouse Operations
- Procurement
- Inventory Reporting

---

# Future Expansion

Future tables may include:

- inventory_batches
- inventory_serial_numbers
- inventory_expiry
- barcode_registry
- rfid_registry

---

# End of Document