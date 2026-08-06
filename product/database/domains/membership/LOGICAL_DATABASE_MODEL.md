# LOGICAL DATABASE MODEL

| Property | Value |
|----------|-------|
| Project | FitnessOS |
| Domain | Membership |
| Document | Logical Database Model |
| Version | 1.0.0 |
| Status | Draft |
| Owner | Membership Domain |
| Classification | Domain Architecture |
| Last Updated | 2026-08-06 |
| Depends On | SCHEMA_ARCHITECTURE.md |
| Referenced By | DATABASE_SPECIFICATION.md |

---

# Purpose

This document defines the logical relationships, ownership model, cardinality, lifecycle dependencies, and integrity rules for all entities within the Membership domain.

It serves as the implementation-neutral blueprint for the physical database specification.

This document SHALL NOT define:

- Database tables
- Column definitions
- SQL
- Data types
- Indexes
- Constraints
- Migration scripts

Those concerns are addressed in the Database Specification.

---

# Logical Model Overview

The Membership domain consists of three Aggregate Roots:

| Aggregate | Primary Entity |
|-----------|----------------|
| Member | Member |
| Membership | Membership |
| Membership Plan | Membership Plan |

Relationships are expressed logically and remain independent of physical implementation.

---

# Aggregate Relationship Model

```text
Organization
      │
      │
      ▼
Member
      │ 1
      │
      │ owns
      │
      ▼ ∞
Member Profile
Member Contact
Member Address
Emergency Contact
Medical Information
Identity Document
Member Note
Member Tag
Member Preference

Member
      │ 1
      │
      │ has
      ▼ ∞
Membership
      │
      │ references
      ▼
Membership Plan

Membership
      │
      ▼
Membership Benefit
Membership Freeze
Membership Renewal
Membership Upgrade
Membership Downgrade
Membership Suspension
Membership Cancellation
Membership History

Membership Plan
      │
      ▼
Plan Pricing
Plan Benefit
Plan Rule
Plan Availability
```

---

# Entity Relationship Matrix

| Parent Entity | Child Entity | Relationship |
|---------------|--------------|--------------|
| Member | Member Profile | One-to-One |
| Member | Member Contact | One-to-Many |
| Member | Member Address | One-to-Many |
| Member | Emergency Contact | One-to-Many |
| Member | Medical Information | One-to-One |
| Member | Identity Document | One-to-Many |
| Member | Member Note | One-to-Many |
| Member | Member Tag | One-to-Many |
| Member | Member Preference | One-to-One |
| Member | Membership | One-to-Many |
| Membership Plan | Membership | One-to-Many |
| Membership | Membership Benefit | One-to-Many |
| Membership | Membership Freeze | One-to-Many |
| Membership | Membership Renewal | One-to-Many |
| Membership | Membership Upgrade | One-to-Many |
| Membership | Membership Downgrade | One-to-Many |
| Membership | Membership Suspension | One-to-Many |
| Membership | Membership Cancellation | One-to-Many |
| Membership | Membership History | One-to-Many |
| Membership Plan | Plan Pricing | One-to-Many |
| Membership Plan | Plan Benefit | One-to-Many |
| Membership Plan | Plan Rule | One-to-Many |
| Membership Plan | Plan Availability | One-to-Many |

---

# Relationship Cardinality

The Membership domain uses the following logical cardinalities:

- One Organization → Many Members
- One Member → Many Memberships
- One Membership Plan → Many Memberships
- One Membership → Many Membership Events
- One Aggregate Root → Many Internal Entities

Aggregate ownership SHALL remain exclusive.

---

# Ownership Matrix

| Entity | Owned By |
|---------|----------|
| Member | Member Aggregate |
| Member Profile | Member Aggregate |
| Member Contact | Member Aggregate |
| Member Address | Member Aggregate |
| Emergency Contact | Member Aggregate |
| Medical Information | Member Aggregate |
| Identity Document | Member Aggregate |
| Member Note | Member Aggregate |
| Member Tag | Member Aggregate |
| Member Preference | Member Aggregate |
| Membership | Membership Aggregate |
| Membership Benefit | Membership Aggregate |
| Membership Freeze | Membership Aggregate |
| Membership Renewal | Membership Aggregate |
| Membership Upgrade | Membership Aggregate |
| Membership Downgrade | Membership Aggregate |
| Membership Suspension | Membership Aggregate |
| Membership Cancellation | Membership Aggregate |
| Membership History | Membership Aggregate |
| Membership Plan | Membership Plan Aggregate |
| Plan Pricing | Membership Plan Aggregate |
| Plan Benefit | Membership Plan Aggregate |
| Plan Rule | Membership Plan Aggregate |
| Plan Availability | Membership Plan Aggregate |

---

# Lifecycle Dependencies

The following lifecycle dependencies SHALL be maintained:

- A Member SHALL exist before a Membership can be created.
- A Membership Plan SHALL exist before a Membership references it.
- Internal entities SHALL NOT exist without their owning Aggregate Root.
- Historical entities SHALL remain after operational entities become inactive.

---

# Cross-Domain References

The Membership domain references:

- Platform.Organization
- Platform.Branch

The following domains reference Membership Aggregate Roots:

- CRM
- Attendance
- Commerce
- Scheduling
- Reporting
- AI

Cross-domain references SHALL use Aggregate Root identifiers only.

---

# Logical Integrity Rules

The logical model SHALL satisfy the following rules:

- Every entity belongs to exactly one Aggregate Root.
- Internal entities SHALL NOT be referenced directly by external domains.
- Aggregate ownership SHALL remain immutable.
- Historical data SHALL remain auditable.
- Circular ownership SHALL NOT exist.

---

# Normalization Strategy

The Membership logical model targets Third Normal Form (3NF).

Denormalization SHALL only occur where justified by documented performance requirements.

Business consistency SHALL take precedence over storage optimization.

---

# Read / Write Model

The Membership domain is the authoritative source for:

- Member identity
- Membership lifecycle
- Membership plans

Other domains MAY consume Membership data through approved interfaces but SHALL NOT modify Membership-owned entities.

---

# Logical Model Validation

The logical model is complete when:

- Aggregate relationships are defined.
- Entity relationships are documented.
- Cardinality is specified.
- Ownership is documented.
- Lifecycle dependencies are identified.
- Cross-domain references are defined.
- Integrity rules are documented.
- Normalization strategy is established.
- Read/write responsibilities are defined.

---

# Cross References

Related documents:

- README.md
- BUSINESS_ANALYSIS.md
- AGGREGATE_MODEL.md
- ENTITY_CATALOG.md
- SCHEMA_ARCHITECTURE.md
- DATABASE_SPECIFICATION.md

Enterprise standards:

- `product/database/LOGICAL_DATABASE_MODEL.md`
- Business Glossary
- Enum Catalog
- PostgreSQL Standards
- Naming Conventions

---

# Next Document

DATABASE_SPECIFICATION.md

---

# End of Logical Database Model