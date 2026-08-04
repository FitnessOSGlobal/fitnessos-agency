# FITNESSOS DOMAIN IMPLEMENTATION CONTRACT

# Commerce Domain

Version: 2.1.0

Status: Architecture Approved

Owner: Commerce Engineering

Depends On:

- FITNESSOS_MASTER_SPECIFICATION.md
- PRODUCT_DECISIONS.md
- ORGANIZATION_MODEL.md
- DOMAIN_ARCHITECTURE.md
- INFORMATION_ARCHITECTURE.md
- API_ARCHITECTURE.md
- EVENT_ARCHITECTURE.md
- SECURITY_ARCHITECTURE.md
- PLATFORM_DOMAIN.md
- MEMBERSHIP_DOMAIN.md
- CRM_DOMAIN.md

---

# Executive Summary

The Commerce Domain manages all commercial and financial transactions within FitnessOS.

It is the authoritative source for invoices, payments, point-of-sale (POS) transactions, pricing, discounts, taxes, refunds, subscriptions, and financial records.

The Commerce Domain enables organizations to monetize products, services, memberships, and other offerings while maintaining accurate financial history.

Commerce owns financial transactions but does not own customer identities, memberships, inventory, or accounting systems.

---

# Purpose

Provide a complete commercial transaction platform for FitnessOS.

The Commerce Domain ensures that every sale, payment, invoice, subscription, and refund is processed consistently, securely, and auditable throughout its lifecycle.

---

# Scope

The Commerce Domain owns:

- Products (Commercial Catalog)
- Services
- Pricing
- Price Lists
- Invoices
- Invoice Items
- Payments
- Payment Methods
- Payment Transactions
- POS Sales
- Discounts
- Promotions
- Taxes
- Refunds
- Credit Notes
- Gift Cards (future)
- Wallet Transactions (future)
- Subscription Billing
- Financial Receipts

---

# Responsibilities

The Commerce Domain is responsible for:

## Product & Service Catalog

Managing commercially sellable products and services.

Commercial ownership only.

Physical inventory is managed by the Inventory Domain.

---

## Pricing Management

Managing:

- Price Lists
- Branch Pricing
- Promotional Pricing
- Membership Pricing
- Service Pricing

---

## Invoice Management

Managing the complete invoice lifecycle including:

- Invoice Creation
- Invoice Updates
- Invoice Cancellation
- Invoice History

---

## Payment Processing

Managing:

- Cash Payments
- Card Payments
- Bank Transfers
- Online Payments
- Digital Wallets (future)
- Split Payments

Payment authorization with external gateways is performed through approved integrations.

---

## Point of Sale (POS)

Managing retail and service sales including:

- Membership Sales
- Product Sales
- Service Sales
- Mixed Transactions

---

## Discount & Promotion Management

Managing:

- Percentage Discounts
- Fixed Discounts
- Promotional Campaign Pricing
- Coupon Codes
- Membership Promotions

---

## Tax Management

Managing applicable taxes according to regional requirements.

---

## Refund Management

Managing:

- Refund Requests
- Refund Approval
- Refund Processing
- Refund History

---

## Subscription Billing

Managing recurring billing for memberships and subscription-based services.

Membership lifecycle remains owned by the Membership Domain.

---

# Out of Scope

The Commerce Domain does NOT own:

- Members
- Membership Lifecycle
- Attendance
- Inventory Stock
- Employees
- Authentication
- Authorization
- Accounting Ledger
- Financial Reporting
- Notifications

These responsibilities belong to their respective domains.

---

# Client Applications

The Commerce Domain is consumed by:

- Gym Owner Web Application
- Staff Web Application
- Staff Mobile Application
- POS Terminal
- Member Mobile Application

---

# Domain Relationships

## Provides Services To

- Membership Domain
- Inventory Domain
- Reporting Domain
- AI Domain
- Communication Domain

---

## Depends On

- Platform Domain
- Membership Domain
- CRM Domain
- Inventory Domain
- Communication Domain

---

# Architecture Principles

The Commerce Domain follows these principles:

- Every financial transaction is auditable.
- Financial history is immutable.
- Pricing is configuration-driven.
- Payments never modify membership state directly.
- Commerce owns financial transactions only.
- API-first.
- Event-driven.
- Tenant isolation by default.

---

# End of Part 1

---

# Business Capabilities

The Commerce Domain provides the complete set of commercial capabilities required to sell products, services, memberships, and subscriptions while maintaining accurate financial records.

---

## Product & Service Catalog Management

Provides:

- Commercial Product Management
- Service Catalog Management
- Product Categories
- Service Categories
- Product Availability
- Product Pricing Association

The Inventory Domain manages physical stock.

---

## Pricing Management

Provides:

- Price Lists
- Branch-Specific Pricing
- Promotional Pricing
- Membership Pricing
- Service Pricing
- Effective Date Pricing

Pricing is configuration-driven and historically auditable.

---

## Invoice Management

Provides:

- Invoice Creation
- Invoice Updates
- Invoice Cancellation
- Invoice Adjustments
- Credit Notes
- Invoice History

Invoices remain immutable after finalization except through approved adjustment mechanisms.

---

## Payment Management

Provides:

- Cash Payments
- Card Payments
- Online Payments
- Bank Transfers
- Split Payments
- Partial Payments
- Payment Confirmation
- Payment History

Payment authorization with external providers is managed through integrations.

---

## Point of Sale (POS)

Provides:

- Product Sales
- Service Sales
- Membership Sales
- Mixed Sales
- Retail Checkout
- Receipt Generation

POS operations remain part of the Commerce Domain.

---

## Discount & Promotion Management

Provides:

- Percentage Discounts
- Fixed Amount Discounts
- Coupon Codes
- Promotional Campaign Pricing
- Membership Promotions
- Time-Limited Promotions

---

## Tax Management

Provides:

- Tax Rules
- Tax Calculation
- Tax Exemptions
- Regional Tax Configuration

---

## Refund Management

Provides:

- Refund Requests
- Refund Approval
- Refund Processing
- Partial Refunds
- Refund History

Refunds remain permanently auditable.

---

## Subscription Billing

Provides:

- Recurring Billing
- Billing Cycles
- Billing Schedules
- Subscription Renewals
- Subscription History

Subscription billing supports memberships without owning the membership lifecycle.

---

# Business Rules

## Rule 1

Every financial transaction belongs to exactly one organization.

---

## Rule 2

Every finalized invoice is immutable.

Corrections are made through credit notes or adjustment records.

---

## Rule 3

Payments confirm financial settlement only.

Payments never activate memberships directly.

---

## Rule 4

Products sold through Commerce may reference Inventory but never own stock.

---

## Rule 5

Every payment must be associated with an invoice or approved commercial transaction.

---

## Rule 6

Refunds require traceability to the original financial transaction.

---

## Rule 7

Every commercial transaction is auditable.

---

## Rule 8

Pricing changes do not modify historical invoices.

Historical pricing remains preserved.

---

## Rule 9

Taxes are calculated using organization configuration and applicable regional rules.

---

## Rule 10

Financial history must never be physically deleted.

Logical archival is preferred.

---

# Business Policies

Organizations may configure policies including:

- Refund Policy
- Discount Approval Rules
- Maximum Discount Limits
- Subscription Grace Period
- Accepted Payment Methods
- Invoice Numbering Rules
- Tax Policies
- Promotion Eligibility
- Membership Billing Policy

Policies may differ between organizations without changing software behavior.

---

# Business Configuration

Organizations may configure:

- Product Categories
- Service Categories
- Price Lists
- Tax Rates
- Discount Types
- Payment Methods
- Invoice Templates
- Receipt Templates
- Billing Cycles
- Currency Settings

Configuration is tenant-specific.

---

# Commerce Lifecycle

The Commerce Domain owns the commercial transaction lifecycle.

```
Commercial Item
        │
        ▼
Quotation (future)
        │
        ▼
Invoice Created
        │
        ▼
Payment Pending
        │
 ┌──────┴─────────┐
 │                │
 ▼                ▼
Paid          Cancelled
 │
 ▼
Receipt Issued
 │
 ▼
Completed
 │
 ├─────────────┐
 ▼             ▼
Refunded   Credit Note
```

The Commerce Domain owns this lifecycle.

Business domains consume financial outcomes through APIs and events.

---

# Canonical Business Entities

The Commerce Domain owns:

- Product Catalog Item
- Service Catalog Item
- Price List
- Invoice
- Invoice Item
- Payment
- Payment Transaction
- POS Sale
- Discount
- Promotion
- Tax Rule
- Refund
- Credit Note
- Receipt
- Subscription Billing Record

---

# Entity Ownership

The Commerce Domain is the authoritative source for commercial transactions and financial records.

Other domains may reference commercial information through APIs and published events but must never redefine or modify Commerce entities.

---

# End of Part 2

---

# Public Commerce Services

The Commerce Domain exposes reusable business services responsible for commercial transactions and financial processing.

Business services encapsulate commercial rules while remaining independent of client applications.

---

## Product Catalog Service

Provides:

- Create Product
- Update Product
- Archive Product
- Retrieve Product
- Search Products
- Assign Product Categories

The Product Catalog represents commercially sellable items.

Stock management remains the responsibility of the Inventory Domain.

---

## Service Catalog Service

Provides:

- Create Service
- Update Service
- Archive Service
- Retrieve Service
- Search Services

Services represent commercially sellable business offerings.

---

## Pricing Service

Provides:

- Create Price List
- Update Price List
- Retrieve Pricing
- Validate Pricing
- Promotional Pricing
- Membership Pricing
- Branch Pricing

Historical pricing remains immutable.

---

## Invoice Service

Provides:

- Create Invoice
- Update Draft Invoice
- Finalize Invoice
- Cancel Invoice
- Create Credit Note
- Retrieve Invoice History

Finalized invoices remain immutable except through approved financial adjustments.

---

## Payment Service

Provides:

- Record Payment
- Confirm Payment
- Reverse Payment
- Record Partial Payment
- Split Payment
- Retrieve Payment History

Payment authorization with external gateways is performed through approved integrations.

---

## Point of Sale (POS) Service

Provides:

- Retail Sale
- Membership Sale
- Service Sale
- Mixed Sale
- Receipt Generation
- Cash Drawer Session (future)

---

## Discount & Promotion Service

Provides:

- Create Discount
- Apply Discount
- Validate Discount
- Create Promotion
- Validate Promotion
- Coupon Validation

---

## Tax Service

Provides:

- Tax Calculation
- Tax Validation
- Regional Tax Configuration
- Tax Exemption Validation

---

## Refund Service

Provides:

- Create Refund Request
- Approve Refund
- Process Refund
- Record Refund History

---

## Subscription Billing Service

Provides:

- Create Subscription
- Schedule Billing
- Renew Subscription
- Suspend Billing
- Resume Billing
- Cancel Subscription

Membership lifecycle changes remain owned by the Membership Domain.

---

# API Responsibilities

The Commerce Domain exposes APIs for:

- Product Catalog
- Service Catalog
- Pricing
- Invoices
- Invoice Items
- Payments
- POS Sales
- Discounts
- Promotions
- Tax Rules
- Refunds
- Credit Notes
- Subscription Billing
- Receipts

All APIs comply with API_ARCHITECTURE.md.

Internal implementation details remain private.

---

# Published Events

The Commerce Domain publishes business events including:

- ProductCreated
- ProductUpdated
- PriceChanged
- InvoiceCreated
- InvoiceFinalized
- PaymentRecorded
- PaymentConfirmed
- PaymentFailed
- SaleCompleted
- ReceiptIssued
- DiscountApplied
- PromotionApplied
- RefundRequested
- RefundApproved
- RefundProcessed
- CreditNoteIssued
- SubscriptionCreated
- SubscriptionRenewed
- SubscriptionCancelled

Published events represent completed commercial activities.

---

# Consumed Events

The Commerce Domain consumes events where financial processing depends on external business activities.

Examples include:

Membership Domain

- MembershipCreated
- MembershipRenewalRequested
- MembershipUpgradeRequested
- MembershipDowngradeRequested

CRM Domain

- CustomerConvertedToMember
- TrialConverted

Platform Domain

- OrganizationCreated
- BranchCreated
- UserCreated

Inventory Domain

- StockAvailabilityUpdated
- ProductDiscontinued

The Commerce Domain consumes these events without assuming ownership of external business entities.

---

# Event Responsibilities

The Commerce Domain is responsible for:

- Publishing commercial events
- Maintaining event version compatibility
- Preserving complete financial history
- Supporting downstream business automation
- Ensuring event auditability

Commercial events are immutable once published.

---

# Integration Responsibilities

The Commerce Domain supports integrations with:

- Payment Gateways
- Banking Systems
- Card Terminals
- Online Payment Providers
- Accounting Platforms
- Tax Systems
- E-Commerce Platforms
- POS Hardware
- Receipt Printers

All integrations use approved APIs and published events.

Direct database integration is prohibited.

---

# Service Boundaries

The Commerce Domain must never implement:

- Membership lifecycle management
- Attendance processing
- Inventory stock management
- Employee management
- Authentication
- Authorization
- Notification delivery
- General ledger accounting

These responsibilities remain with their owning domains.

---

# End of Part 3

---

# Permission Model

The Commerce Domain defines the business permissions required to manage commercial and financial operations.

Authentication and authorization are enforced by the Platform Domain.

The Commerce Domain defines which permissions are required for each commercial capability.

---

## Product & Service Catalog Permissions

Examples:

- Create Product
- Edit Product
- Archive Product
- View Product
- Create Service
- Edit Service
- Archive Service

---

## Pricing Permissions

Examples:

- Create Price List
- Edit Price List
- Activate Price List
- Archive Price List
- Override Price
- View Pricing History

Pricing overrides should require elevated permissions.

---

## Invoice Permissions

Examples:

- Create Invoice
- Edit Draft Invoice
- Finalize Invoice
- Cancel Invoice
- Issue Credit Note
- View Invoice History

Finalized invoices must not be edited directly.

---

## Payment Permissions

Examples:

- Record Payment
- Confirm Payment
- Reverse Payment
- Record Partial Payment
- Record Split Payment
- View Payment History

Payment reversals should require elevated authorization.

---

## POS Permissions

Examples:

- Open POS Session
- Close POS Session
- Complete Sale
- Void Sale
- Reprint Receipt
- Apply Discount

---

## Refund Permissions

Examples:

- Create Refund Request
- Approve Refund
- Reject Refund
- Process Refund
- View Refund History

Refund approval should follow organization policy.

---

## Promotion Permissions

Examples:

- Create Promotion
- Edit Promotion
- Activate Promotion
- Archive Promotion
- Create Coupon
- Disable Coupon

---

# Security Responsibilities

The Commerce Domain follows the Security Architecture.

Responsibilities include:

- Protecting financial information
- Protecting pricing information
- Securing payment records
- Enforcing organization ownership
- Respecting tenant isolation
- Auditing commercial transactions

Financial information is considered highly sensitive business data.

---

# Tenant Boundaries

Every commercial transaction belongs to exactly one organization.

Invoices, payments, pricing, and refunds must remain isolated between tenants.

Cross-tenant financial access is prohibited except where explicitly authorized for platform administration.

---

# UI Responsibilities

The Commerce Domain provides user interfaces for:

- Product Catalog
- Service Catalog
- Pricing Management
- POS
- Invoice Management
- Payment Processing
- Refund Management
- Promotions
- Subscription Billing

Business rules remain centralized within the Commerce Domain.

---

# Mobile Responsibilities

Mobile applications consume Commerce services for:

- Mobile POS
- Invoice Lookup
- Payment Collection
- Digital Receipts
- Membership Purchase
- Product Purchase

Mobile clients never implement commercial business rules independently.

---

# Reporting Responsibilities

The Commerce Domain supplies data for reports including:

- Sales Revenue
- Daily Sales
- Monthly Sales
- Product Sales
- Service Sales
- Membership Sales
- Payment Method Distribution
- Discount Usage
- Refund Analysis
- Tax Summary
- Subscription Revenue

Report generation belongs to the Reporting Domain.

---

# AI Responsibilities

The Commerce Domain supplies information to AI services including:

- Revenue Forecasting
- Sales Trend Analysis
- Product Recommendation
- Dynamic Pricing Insights
- Promotion Optimization
- Refund Anomaly Detection
- Subscription Revenue Prediction

AI services analyze commercial data but never modify financial records directly.

---

# Key Performance Indicators (KPIs)

Examples include:

- Total Revenue
- Average Transaction Value
- Sales Conversion Rate
- Membership Sales Revenue
- Product Sales Revenue
- Refund Rate
- Discount Utilization
- Payment Success Rate
- Subscription Renewal Revenue
- Gross Sales vs Net Sales

KPIs support executive reporting, operational monitoring, and business intelligence.

---

# End of Part 4

---

# Domain Risks

The Commerce Domain must proactively identify and mitigate commercial and financial risks.

Examples include:

- Duplicate invoices
- Duplicate payments
- Payment gateway failures
- Incorrect pricing
- Unauthorized discounts
- Refund fraud
- Tax calculation errors
- Subscription billing failures
- Financial data inconsistency
- Duplicate commercial transactions

Risk monitoring supports operational visibility, auditing, and fraud prevention.

---

# Non-Functional Requirements

The Commerce Domain must satisfy the following quality attributes.

## Availability

Commerce services should remain available during business operating hours.

Critical financial operations should support graceful recovery during temporary failures.

---

## Scalability

The Commerce Domain must support:

- High transaction volumes
- Multi-branch organizations
- Franchise networks
- Enterprise fitness organizations

Commercial scalability must be achieved without modifying business rules.

---

## Performance

Performance-sensitive operations include:

- POS checkout
- Payment confirmation
- Invoice retrieval
- Product search
- Price validation
- Refund processing

Commerce operations should remain responsive under heavy transaction loads.

---

## Reliability

Commerce operations must support:

- Transaction consistency
- Reliable event publication
- Retry mechanisms
- Failure recovery
- Monitoring

Financial records must never be silently lost.

---

## Security

The Commerce Domain follows the Security Architecture.

Responsibilities include:

- Protecting financial information
- Protecting payment records
- Protecting pricing information
- Auditing commercial activities
- Tenant isolation
- Organization ownership enforcement

Commercial information is highly sensitive business data.

---

## Maintainability

Commercial business rules should remain centralized.

Client applications must never duplicate pricing, billing, or payment logic.

---

## Extensibility

The Commerce Domain should support future capabilities including:

- Customer Wallets
- Gift Cards
- Store Credit
- Buy Now Pay Later
- Multi-Currency Support
- Marketplace Sales
- E-Commerce Integration
- Dynamic Pricing
- Promotional Rule Engine

Future enhancements must extend existing capabilities without changing domain ownership.

---

# Future Database Implications

The Commerce Domain is expected to own persistent storage for:

- Product Catalog
- Service Catalog
- Price Lists
- Invoices
- Invoice Items
- Payments
- Payment Transactions
- POS Sales
- Discounts
- Promotions
- Tax Rules
- Refunds
- Credit Notes
- Receipts
- Subscription Billing Records

Logical ownership is defined here.

Physical database design will be completed during the Database Architecture milestone.

---

# Future Service Boundaries

As FitnessOS evolves, the Commerce Domain may be implemented as multiple deployable services while remaining a single logical business domain.

Potential service boundaries include:

- Product Catalog Service
- Pricing Service
- Invoice Service
- Payment Service
- POS Service
- Promotion Service
- Refund Service
- Subscription Billing Service

Deployment decisions must not alter business ownership or domain boundaries.

---

# Future Enhancements

Potential future capabilities include:

- Digital Wallet
- Gift Card Management
- Loyalty Points
- Promotional Rule Engine
- AI Pricing Optimization
- Multi-Currency Transactions
- Marketplace Integration
- E-Commerce Storefront
- Subscription Bundles
- Installment Payments

---

# Cross-Domain Responsibilities

The Commerce Domain provides commercial and financial information to other domains.

Examples:

Membership Domain

- Payment confirmation
- Subscription billing status

Inventory Domain

- Product sales
- Stock deduction requests

Communication Domain

- Invoice notifications
- Receipt delivery
- Payment reminders

Reporting Domain

- Revenue analytics
- Financial dashboards
- Sales reporting

AI Domain

- Revenue forecasting
- Pricing optimization
- Sales trend analysis
- Fraud detection

External Accounting Systems

- Financial transaction synchronization
- Tax reporting
- Journal export (future)

The Commerce Domain owns commercial transactions.

Other domains consume Commerce information but never modify commercial ownership.

---

# Acceptance Criteria

The Commerce Domain implementation contract is complete when:

- Domain responsibilities are clearly defined.
- Business boundaries are explicit.
- Commerce lifecycle is documented.
- Business capabilities are complete.
- Business rules are defined.
- Business policies are configurable.
- Business configuration is documented.
- Canonical entities are assigned.
- Public services are identified.
- API responsibilities are documented.
- Event responsibilities are documented.
- Permission requirements are documented.
- Security responsibilities are defined.
- Tenant boundaries are enforced.
- UI responsibilities are defined.
- Mobile responsibilities are defined.
- Reporting responsibilities are documented.
- AI responsibilities are documented.
- KPIs are defined.
- Domain risks are identified.
- Non-functional requirements are documented.
- Future database implications are identified.
- Future service boundaries are documented.
- Future enhancements are identified.

---

# Domain Summary

The Commerce Domain is the authoritative source for all commercial and financial transactions within FitnessOS.

It governs pricing, invoices, payments, POS, discounts, taxes, refunds, and subscription billing while ensuring every commercial transaction is secure, auditable, and historically traceable.

The Commerce Domain provides financial capabilities to other domains without owning customer identity, memberships, inventory, or accounting systems.

This implementation contract serves as the reference specification for commercial functionality throughout the FitnessOS platform.

---

# End of Commerce Domain

Status: Architecture Complete

Milestone:

Complete Architecture

Document Classification:

Domain Implementation Contract