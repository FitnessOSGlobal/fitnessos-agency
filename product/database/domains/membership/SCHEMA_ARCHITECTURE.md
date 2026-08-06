# SCHEMA ARCHITECTURE

| Property | Value |
|----------|-------|
| Project | FitnessOS |
| Domain | Membership |
| Document | Schema Architecture |
| Version | 1.0.0 |
| Status | Draft |
| Owner | Membership Domain |
| Classification | Domain Architecture |
| Last Updated | 2026-08-06 |
| Depends On | ENTITY_CATALOG.md |
| Referenced By | LOGICAL_DATABASE_MODEL.md |

---

# Purpose

This document defines the logical schema architecture for the Membership domain.

It identifies schema ownership, aggregate placement, entity placement, cross-schema references, dependency rules, and boundary responsibilities while remaining independent of physical database implementation.

This document SHALL NOT define:

- Database tables
- Column definitions
- Data types
- Indexes
- Constraints
- SQL implementation

Those concerns are defined in the Database Specification.

---

# Schema Overview

The Membership domain is implemented within a single logical schema.

| Schema | Responsibility |
|--------|----------------|
| membership | Owns all Membership domain entities and aggregates |

The schema represents the authoritative ownership boundary for the Membership domain.

---

# Schema Ownership

The Membership schema owns the following Aggregate Roots:

| Aggregate | Responsibility |
|-----------|----------------|
| Member | Member identity and profile management |
| Membership | Membership lifecycle and contractual entitlement |
| Membership Plan | Reusable membership products |

No aggregate owned by another domain SHALL reside within this schema.

---

# Aggregate Placement

## Member Aggregate

Contains:

- Member
- Member Profile
- Member Contact
- Member Address
- Emergency Contact
- Medical Information
- Identity Document
- Member Note
- Member Tag
- Member Preference

---

## Membership Aggregate

Contains:

- Membership
- Membership Benefit
- Membership Freeze
- Membership Renewal
- Membership Upgrade
- Membership Downgrade
- Membership Suspension
- Membership Cancellation
- Membership History

---

## Membership Plan Aggregate

Contains:

- Membership Plan
- Plan Pricing
- Plan Benefit
- Plan Rule
- Plan Availability

---

# Entity Placement

Every entity defined in the Membership Entity Catalog SHALL reside within the Membership schema.

Aggregate ownership SHALL determine entity placement.

Internal entities SHALL NOT be placed outside the aggregate that owns them.

---

# Cross-Schema References

The Membership schema references entities owned by other schemas.

## References From Platform

- Organization
- Branch

## Referenced By

The following domains reference Membership Aggregate Roots:

- CRM
- Attendance
- Commerce
- Scheduling
- Reporting
- AI

Cross-schema references SHALL occur only through Aggregate Root identifiers.

Internal entities SHALL NEVER be referenced directly.

---

# Schema Boundary Rules

The Membership schema SHALL own:

- Member
- Membership
- Membership Plan
- All entities owned by these aggregates

The Membership schema SHALL NOT own:

- Organization
- Branch
- User
- Lead
- Invoice
- Attendance
- Employee
- Inventory

Ownership boundaries SHALL remain stable throughout the system lifecycle.

---

# Schema Dependency Rules

The Membership schema depends only on the Platform domain for shared organizational context.

Dependency direction is defined as follows:

```text
Platform
    ↓
Membership
    ↓
Attendance

Membership
    ↓
Commerce

Membership
    ↓
CRM

Membership
    ↓
Scheduling

Membership
    ↓
Reporting

Membership
    ↓
AI
```

Circular schema dependencies SHALL NOT be introduced.

---

# Shared Objects

The Membership schema reuses shared enterprise standards.

## Platform

- Organization Identifier
- Branch Identifier

## Shared Standards

- Business Glossary
- Enum Catalog
- PostgreSQL Standards
- Naming Conventions
- Audit Strategy
- Indexing Strategy
- Security Guidelines

No shared objects SHALL be duplicated within the Membership schema.

---

# Read / Write Responsibility

The Membership schema is the authoritative source for:

- Member records
- Membership agreements
- Membership plans

External domains MAY read Membership data through approved interfaces but SHALL NOT modify Membership-owned entities directly.

---

# Schema Validation

The Membership Schema Architecture is complete when:

- Schema ownership is defined.
- Aggregate placement is documented.
- Entity placement is documented.
- Cross-schema references are documented.
- Schema boundaries are defined.
- Dependency rules are documented.
- Shared objects are identified.
- Read/write responsibilities are defined.
- The architecture complies with the enterprise Schema Architecture standard.

---

# Cross References

Related documents:

- README.md
- BUSINESS_ANALYSIS.md
- AGGREGATE_MODEL.md
- ENTITY_CATALOG.md
- LOGICAL_DATABASE_MODEL.md
- DATABASE_SPECIFICATION.md

Enterprise standards:

- `product/database/SCHEMA_ARCHITECTURE.md`
- Business Glossary
- Enum Catalog
- PostgreSQL Standards
- Naming Conventions

---

# Next Document

LOGICAL_DATABASE_MODEL.md

---

# End of Schema Architecture