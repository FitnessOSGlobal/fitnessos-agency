# ENTITY CATALOG

| Property | Value |
|----------|-------|
| Project | FitnessOS |
| Domain | Membership |
| Document | Entity Catalog |
| Version | 1.0.0 |
| Status | Draft |
| Owner | Membership Domain |
| Classification | Domain Architecture |
| Last Updated | 2026-08-06 |
| Depends On | AGGREGATE_MODEL.md |
| Referenced By | SCHEMA_ARCHITECTURE.md |

---

# Purpose

This document defines the authoritative catalog of all business entities within the Membership domain.

It identifies entity ownership, classification, lifecycle, identity, responsibilities, and relationships required to implement the Membership domain while remaining independent of physical database implementation.

This document SHALL NOT define:

- Database tables
- PostgreSQL implementation
- API contracts
- User interfaces
- Infrastructure

Those concerns are addressed by subsequent architectural documents.

---

# Entity Classification

The Membership domain contains the following entity classifications.

| Classification | Purpose |
|---------------|---------|
| Aggregate Root | Transactional consistency boundary |
| Internal Entity | Business entity owned by an Aggregate Root |
| Value Object | Immutable descriptive object without independent identity |

---

# Member Aggregate

## Entity: Member

### Classification

Aggregate Root

### Owned By

None

### Business Responsibility

Represents a person throughout their complete relationship with the organization.

### Lifecycle

Registered

↓

Active

↓

Archived

### Identity

Member Identifier

### References

- Organization
- Branch

### Referenced By

- Membership
- Attendance
- Commerce
- Scheduling
- Reporting

### Business Rules

- A Member belongs to exactly one Organization.
- A Member may exist without an active Membership.
- Member identity remains immutable.
- Historical information remains auditable.

---

## Entity: Member Profile

### Classification

Internal Entity

### Owned By

Member

### Business Responsibility

Stores personal profile information.

---

## Entity: Member Contact

### Classification

Internal Entity

### Owned By

Member

### Business Responsibility

Stores contact methods including phone numbers and email addresses.

---

## Entity: Member Address

### Classification

Internal Entity

### Owned By

Member

### Business Responsibility

Stores residential and mailing addresses.

---

## Entity: Emergency Contact

### Classification

Internal Entity

### Owned By

Member

### Business Responsibility

Stores emergency contact information.

---

## Entity: Medical Information

### Classification

Internal Entity

### Owned By

Member

### Business Responsibility

Stores medically relevant information required for safe operation.

---

## Entity: Identity Document

### Classification

Internal Entity

### Owned By

Member

### Business Responsibility

Stores identity verification records.

---

## Entity: Member Note

### Classification

Internal Entity

### Owned By

Member

### Business Responsibility

Stores operational notes created by staff.

---

## Entity: Member Tag

### Classification

Internal Entity

### Owned By

Member

### Business Responsibility

Provides business categorization for members.

---

## Entity: Member Preference

### Classification

Internal Entity

### Owned By

Member

### Business Responsibility

Stores configurable member preferences.

---

# Membership Aggregate

## Entity: Membership

### Classification

Aggregate Root

### Owned By

None

### Business Responsibility

Represents a contractual agreement granting access to organizational services.

### Lifecycle

Created

↓

Active

↓

Expired

↓

Archived

### Identity

Membership Identifier

### References

- Member
- Membership Plan

### Referenced By

- Attendance
- Commerce
- Reporting
- AI

### Business Rules

- Every Membership belongs to one Member.
- Every Membership references one Membership Plan.
- Historical Memberships remain immutable.
- Only Active Memberships grant entitlement.

---

## Entity: Membership Benefit

### Classification

Internal Entity

### Owned By

Membership

### Business Responsibility

Represents benefits granted through a Membership.

---

## Entity: Membership Freeze

### Classification

Internal Entity

### Owned By

Membership

### Business Responsibility

Records temporary suspension periods.

---

## Entity: Membership Renewal

### Classification

Internal Entity

### Owned By

Membership

### Business Responsibility

Records renewal history.

---

## Entity: Membership Upgrade

### Classification

Internal Entity

### Owned By

Membership

### Business Responsibility

Records membership upgrades.

---

## Entity: Membership Downgrade

### Classification

Internal Entity

### Owned By

Membership

### Business Responsibility

Records membership downgrades.

---

## Entity: Membership Suspension

### Classification

Internal Entity

### Owned By

Membership

### Business Responsibility

Records operational suspensions.

---

## Entity: Membership Cancellation

### Classification

Internal Entity

### Owned By

Membership

### Business Responsibility

Records membership cancellations.

---

## Entity: Membership History

### Classification

Internal Entity

### Owned By

Membership

### Business Responsibility

Maintains immutable historical membership records.

---

# Membership Plan Aggregate

## Entity: Membership Plan

### Classification

Aggregate Root

### Owned By

None

### Business Responsibility

Defines reusable membership products offered by the organization.

### Lifecycle

Draft

↓

Active

↓

Retired

### Identity

Membership Plan Identifier

### References

None

### Referenced By

- Membership

### Business Rules

- Membership Plans are reusable.
- Historical Memberships continue referencing retired plans.
- Plans contain no member-specific operational data.

---

## Entity: Plan Pricing

### Classification

Internal Entity

### Owned By

Membership Plan

### Business Responsibility

Defines pricing for a Membership Plan.

---

## Entity: Plan Benefit

### Classification

Internal Entity

### Owned By

Membership Plan

### Business Responsibility

Defines benefits included within a Membership Plan.

---

## Entity: Plan Rule

### Classification

Internal Entity

### Owned By

Membership Plan

### Business Responsibility

Defines operational rules governing a Membership Plan.

---

## Entity: Plan Availability

### Classification

Internal Entity

### Owned By

Membership Plan

### Business Responsibility

Defines where and when a Membership Plan may be offered.

---

# Entity Ownership Rules

- Every entity belongs to exactly one Aggregate Root.
- Internal entities SHALL NOT be referenced directly by external domains.
- Aggregate Roots expose business operations on behalf of owned entities.
- Entity ownership SHALL remain immutable throughout the entity lifecycle.

---

# Entity Summary

| Classification | Count |
|---------------|------:|
| Aggregate Roots | 3 |
| Internal Entities | 13 |
| Value Objects | 0 |

---

# Cross References

Related documents:

- README.md
- BUSINESS_ANALYSIS.md
- AGGREGATE_MODEL.md
- SCHEMA_ARCHITECTURE.md
- LOGICAL_DATABASE_MODEL.md
- DATABASE_SPECIFICATION.md

Enterprise standards:

- `product/database/ENTITY_CATALOG.md`
- Business Glossary
- Enum Catalog
- PostgreSQL Standards
- Naming Conventions

---

# Next Document

SCHEMA_ARCHITECTURE.md

---

# End of Entity Catalog