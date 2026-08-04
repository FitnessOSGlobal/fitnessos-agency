# FITNESSOS INFORMATION ARCHITECTURE

Version: 1.0.0

Status: Draft

Owner: Architecture Department

Depends On:

- FITNESSOS_MASTER_SPECIFICATION.md
- ORGANIZATION_MODEL.md
- DOMAIN_ARCHITECTURE.md

---

# Purpose

The Information Architecture defines the canonical business information model for FitnessOS.

It establishes the core business entities, ownership boundaries, relationships, identifiers, and lifecycle rules that every domain must follow.

This document is the single source of truth for information modelling.

No domain may redefine an entity owned by another domain.

---

# Objectives

The Information Architecture must:

- Define canonical business entities.
- Assign a single owning domain to every entity.
- Eliminate duplicate concepts.
- Maintain tenant isolation.
- Support enterprise scalability.
- Support future expansion without redesign.

---

# Information Principles

## Single Source of Truth

Every business entity has exactly one authoritative owner.

Example:

Member

Owner → Membership Domain

Invoice

Owner → Commerce Domain

Employee

Owner → HR Domain

Attendance Record

Owner → Attendance Domain

---

## Single Ownership

Only the owning domain may:

- Create
- Update
- Delete
- Validate

its entities.

Other domains interact only through published APIs or events.

---

## Stable Identity

Every entity has a globally unique identifier.

Identifiers are immutable.

Human-readable numbers may change.

Internal identifiers never change.

---

## Tenant Isolation

Every tenant-owned entity belongs to exactly one Organization.

Cross-tenant access is prohibited unless explicitly supported by platform administration.

---

## Auditability

All business entities must support:

- Created By
- Created At
- Updated By
- Updated At

Sensitive entities additionally require:

- Audit History
- Version History (where applicable)

---

# Canonical Business Entities

The following entities represent the core information model of FitnessOS.

## Platform Domain

- Organization
- Brand
- Region
- Branch
- Facility
- Department
- User
- Role
- Permission
- Tenant
- License
- Feature Flag
- Theme
- Notification
- Audit Log
- File

---

## Membership Domain

- Member
- Membership
- Membership Plan
- Membership Agreement
- Family Account
- Corporate Account
- Medical Profile

---

## Attendance Domain

- Attendance Record
- Check-In
- Check-Out
- Access Event
- Occupancy Record

---

## CRM Domain

- Lead
- Prospect
- Opportunity
- Follow-Up
- Campaign
- Referral

---

## Commerce Domain

- Product
- Service
- Price
- Cart
- Invoice
- Invoice Item
- Payment
- Refund
- Discount
- Coupon
- Gift Card

---

## Inventory Domain

- Inventory Item
- Warehouse
- Stock Transaction
- Supplier
- Purchase Order
- Goods Receipt

---

## HR Domain

- Employee
- Employment Contract
- Shift
- Leave Request
- Certification
- Payroll Record

---

## Scheduling Domain

- Class
- Session
- Booking
- Waitlist
- Calendar Event
- Resource Allocation

---

## Communication Domain

- Email
- SMS
- WhatsApp Message
- Push Notification
- Template
- Campaign Delivery

---

## Reporting Domain

- Dashboard
- Report
- KPI
- Export

---

## AI Domain

- Insight
- Recommendation
- Prediction
- AI Conversation
- Automation Suggestion

---

## Integration Domain

- Integration
- Plugin
- API Credential
- Webhook
- Synchronization Job

---

# Entity Relationships

Business entities are connected through well-defined relationships.

Example hierarchy:

Organization
└── Brand
    └── Branch
        ├── Facility
        ├── Department
        ├── Employee
        └── Member

Business domains must reference canonical entities rather than redefining them.

---

# Entity Lifecycle

Every entity follows a lifecycle.

Typical stages include:

- Created
- Active
- Suspended (optional)
- Archived
- Deleted (logical where appropriate)

Physical deletion should be avoided for business-critical records.

---

# Data Integrity Rules

The platform must enforce:

- Referential integrity
- Tenant isolation
- Ownership validation
- Duplicate prevention
- Consistent identifiers

No domain may bypass these rules.

---

# Naming Standards

Business entities use singular names.

Examples:

Member

Invoice

Payment

Employee

Branch

API resources may use plural naming where appropriate.

---

# Future Expansion

The Information Architecture must accommodate future entities without changing existing ownership rules.

New entities must:

- Belong to one primary domain.
- Follow identifier standards.
- Respect tenant boundaries.
- Integrate through published contracts.

---

# Acceptance Criteria

The Information Architecture is complete when:

- Every core entity has one owning domain.
- No duplicated ownership exists.
- Domain boundaries are unambiguous.
- All domains reference the same canonical information model.
- Future database design can be derived directly from this document.

---

# End of Document