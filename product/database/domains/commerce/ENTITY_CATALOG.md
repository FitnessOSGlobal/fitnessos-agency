# COMMERCE ENTITY CATALOG

Version: 1.0.0

Status: Draft

Owner: Database Architecture

---

# Purpose

This document defines every entity owned by the Commerce Domain.

Each entity includes its purpose, ownership, lifecycle, and relationships.

Entities are grouped according to their aggregate ownership.

---

# Aggregate: Order

## Entity

Order

### Purpose

Represents a commercial transaction initiated by a customer.

### Lifecycle

Draft

↓

Confirmed

↓

Completed

↓

Cancelled

↓

Archived

### Owns

- Order Identifier
- Organization Reference
- Branch Reference
- Member Reference
- Order Date
- Order Status
- Currency
- Financial Totals

### Relationships

One Order

↓

Many Order Items

↓

Many Payments

↓

One Invoice

---

## Entity

Order Item

### Purpose

Represents a purchasable product or service within an order.

### Owns

- Product Reference
- Quantity
- Unit Price
- Discount
- Tax
- Line Total

---

# Aggregate: Invoice

## Entity

Invoice

### Purpose

Represents the financial document issued for an order.

### Lifecycle

Draft

↓

Issued

↓

Paid

↓

Cancelled

↓

Archived

### Owns

- Invoice Number
- Invoice Date
- Status
- Financial Totals

---

## Entity

Invoice Item

### Purpose

Stores invoice line items.

---

# Aggregate: Payment

## Entity

Payment

### Purpose

Represents money received for an invoice or order.

### Lifecycle

Pending

↓

Authorized

↓

Completed

↓

Failed

↓

Refunded

### Owns

- Payment Method
- Amount
- Currency
- Transaction Reference
- Settlement Status

---

# Aggregate: Refund

## Entity

Refund

### Purpose

Represents money returned to the customer.

### Owns

- Refund Amount
- Refund Reason
- Approval Status
- Original Payment Reference

---

# Aggregate: Subscription

## Entity

Subscription

### Purpose

Represents recurring commercial billing.

### Owns

- Billing Cycle
- Renewal Date
- Subscription Status

---

# Aggregate: Discount

## Entity

Discount

### Purpose

Represents pricing reductions.

### Owns

- Discount Rule
- Discount Type
- Percentage
- Fixed Amount

---

# Aggregate: Tax

## Entity

Tax Rule

### Purpose

Represents applicable taxation.

### Owns

- Tax Name
- Tax Rate
- Effective Date

---

# Aggregate: Receipt

## Entity

Receipt

### Purpose

Represents proof of successful payment.

### Owns

- Receipt Number
- Payment Reference
- Issue Date

---

# Cross-Domain References

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

# Ownership Summary

Commerce owns:

- Orders
- Order Items
- Invoices
- Invoice Items
- Payments
- Refunds
- Discounts
- Tax Rules
- Receipts
- Subscriptions

Commerce references:

- Organization
- Branch
- User
- Member
- Membership
- Product
- Opportunity

---

# Future Entities

The model supports future entities including:

- Wallet Transaction
- Loyalty Points
- Gift Card
- Installment Plan
- Credit Note
- Settlement Batch

---

# End