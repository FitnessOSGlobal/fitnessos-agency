# INVENTORY ENTITY CATALOG

Version: 1.0.0

Status: Draft

Owner: Database Architecture

---

# Purpose

This document defines every entity owned by the Inventory Domain.

Each entity includes:

- Purpose
- Ownership
- Lifecycle
- Relationships

The Inventory Domain is the authoritative owner of all inventory assets and stock-related entities.

---

# Aggregate — Product

## Entity

Product

### Purpose

Represents a sellable or consumable inventory item.

### Lifecycle

Created

↓

Active

↓

Inactive

↓

Archived

### Owns

- SKU
- Name
- Description
- Product Type
- Brand
- Category
- Unit of Measure
- Status

---

## Entity

Product Variant

### Purpose

Represents a variation of a product.

### Owns

- Variant Name
- Variant SKU
- Attributes

---

## Entity

Product Category

### Purpose

Organizes products into hierarchical classifications.

---

## Entity

Brand

### Purpose

Represents the manufacturer or commercial brand.

---

# Aggregate — Supplier

## Entity

Supplier

### Purpose

Represents a vendor supplying inventory items.

### Owns

- Supplier Information
- Contact Details
- Status

---

## Entity

Supplier Contact

### Purpose

Stores supplier contact persons.

---

# Aggregate — Warehouse

## Entity

Warehouse

### Purpose

Represents a physical inventory storage location.

### Owns

- Warehouse Details
- Address
- Status

---

## Entity

Storage Location

### Purpose

Represents logical storage areas within a warehouse.

---

# Aggregate — Stock

## Entity

Stock

### Purpose

Represents current inventory availability.

### Owns

- Quantity On Hand
- Reserved Quantity
- Available Quantity

---

## Entity

Stock Movement

### Purpose

Records every inventory movement.

Movement Types include:

- Purchase
- Sale
- Transfer
- Adjustment
- Return

Stock movements are immutable.

---

## Entity

Stock Adjustment

### Purpose

Represents manual inventory corrections.

---

# Aggregate — Procurement

## Entity

Purchase Order

### Purpose

Represents an inventory purchase request.

---

## Entity

Purchase Order Item

### Purpose

Represents products ordered from suppliers.

---

## Entity

Goods Receipt

### Purpose

Represents inventory received from suppliers.

---

# Aggregate — Transfers

## Entity

Stock Transfer

### Purpose

Represents movement of inventory between warehouses.

---

## Entity

Transfer Item

### Purpose

Represents products included in a transfer.

---

# Cross-Domain References

Platform

- Organization
- Branch
- User

Commerce

- Order Item
- Product Reference

Reporting

- Inventory Metrics

AI

- Demand Forecast

---

# Ownership Summary

Inventory owns:

- Products
- Product Variants
- Categories
- Brands
- Suppliers
- Warehouses
- Storage Locations
- Stock
- Stock Movements
- Stock Adjustments
- Purchase Orders
- Goods Receipts
- Stock Transfers

Inventory references:

- Organization
- Branch
- User

---

# Future Entities

Future expansion may include:

- Serial Numbers
- Batch Numbers
- Expiry Lots
- Barcode Registry
- RFID Tags
- Inventory Reservations

---

# End of Document