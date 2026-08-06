# DATABASE SPECIFICATION

| Property | Value |
|----------|-------|
| Project | FitnessOS |
| Domain | Membership |
| Document | Database Specification |
| Version | 1.0.0 |
| Status | Draft |
| Owner | Membership Domain |
| Classification | Physical Database Design |
| Last Updated | 2026-08-06 |
| Depends On | LOGICAL_DATABASE_MODEL.md |
| Implementation Target | PostgreSQL 17+ |

---

# Purpose

This document defines the physical database implementation for the Membership domain.

It translates the logical data model into PostgreSQL structures while complying with all enterprise database standards.

This document defines:

- Database schema
- Tables
- Primary keys
- Foreign keys
- Constraints
- Indexes
- Audit fields
- Soft deletion
- Partitioning readiness
- Retention strategy

Application code, APIs, and business workflows are outside the scope of this document.

---

# Schema

| Schema | Purpose |
|---------|---------|
| membership | Membership domain database objects |

---

# Table Catalog

## Member Aggregate

| Table | Purpose |
|---------|---------|
| member | Primary member record |
| member_profile | Personal profile information |
| member_contact | Contact methods |
| member_address | Addresses |
| member_emergency_contact | Emergency contacts |
| member_medical_information | Medical information |
| member_identity_document | Identity verification |
| member_note | Internal notes |
| member_tag | Member categorization |
| member_preference | Member preferences |

---

## Membership Aggregate

| Table | Purpose |
|---------|---------|
| membership | Membership agreements |
| membership_benefit | Membership benefits |
| membership_freeze | Freeze history |
| membership_renewal | Renewal history |
| membership_upgrade | Upgrade history |
| membership_downgrade | Downgrade history |
| membership_suspension | Suspensions |
| membership_cancellation | Cancellation history |
| membership_history | Immutable lifecycle history |

---

## Membership Plan Aggregate

| Table | Purpose |
|---------|---------|
| membership_plan | Membership products |
| membership_plan_pricing | Pricing |
| membership_plan_benefit | Included benefits |
| membership_plan_rule | Business rules |
| membership_plan_availability | Availability rules |

---

# Primary Key Strategy

All tables SHALL use:

- UUID Version 7
- Immutable identifiers
- Surrogate primary keys

Natural keys SHALL NOT be used as primary keys.

---

# Foreign Key Strategy

All relationships SHALL enforce referential integrity.

Examples include:

- Membership → Member
- Membership → Membership Plan
- Member Contact → Member
- Membership Benefit → Membership

Cross-schema foreign keys SHALL reference Aggregate Roots only.

---

# Naming Standards

This specification adopts:

- Database Foundation
- Naming Conventions
- PostgreSQL Standards

No naming rules are duplicated.

---

# Audit Columns

Every table SHALL contain the enterprise audit columns:

- created_at
- created_by
- updated_at
- updated_by
- deleted_at
- deleted_by
- row_version

Audit implementation SHALL follow the enterprise Audit Strategy.

---

# Soft Delete Policy

Operational entities SHALL support soft deletion.

Historical entities SHALL remain immutable.

Soft deletion SHALL never physically remove business history.

---

# Index Strategy

Indexes SHALL follow the enterprise Indexing Strategy.

Minimum indexes include:

- Primary Key
- Foreign Keys
- Frequently searched business identifiers
- Active status fields
- Organization identifier
- Branch identifier

Additional indexes SHALL be justified through performance analysis.

---

# Constraints

The following constraint categories SHALL be implemented:

- Primary Keys
- Foreign Keys
- Unique Constraints
- Check Constraints
- NOT NULL Constraints

Business rules SHALL be enforced whenever possible through database constraints.

---

# Partitioning Readiness

The following tables SHALL support future partitioning:

- membership_history
- membership_renewal
- membership_freeze

Partitioning SHALL follow the enterprise Partitioning Strategy.

---

# Data Retention

Retention SHALL follow the enterprise Data Retention Policy.

General principles:

- Active operational data remains online.
- Historical data remains immutable.
- Archived data SHALL remain recoverable.
- No business history SHALL be lost.

---

# Performance Considerations

The implementation SHALL optimize for:

- Member lookup
- Active membership validation
- Membership history queries
- Organization-level filtering
- Branch-level filtering

Premature optimization SHALL be avoided.

---

# Implementation Readiness Checklist

The Membership database design is implementation-ready when:

- Schema is defined.
- Table catalog is complete.
- Primary key strategy is defined.
- Foreign key strategy is defined.
- Constraints are documented.
- Audit strategy is applied.
- Soft delete policy is defined.
- Index strategy is adopted.
- Partitioning readiness is documented.
- Retention strategy is documented.
- Performance considerations are identified.

---

# Cross References

Related documents:

- README.md
- BUSINESS_ANALYSIS.md
- AGGREGATE_MODEL.md
- ENTITY_CATALOG.md
- SCHEMA_ARCHITECTURE.md
- LOGICAL_DATABASE_MODEL.md

Enterprise standards:

- product/database/DATABASE_FOUNDATION.md
- product/database/NAMING_CONVENTIONS.md
- product/database/shared/03_POSTGRESQL_STANDARDS.md
- product/database/shared/04_INDEXING_STRATEGY.md
- product/database/shared/05_PARTITIONING_STRATEGY.md
- product/database/shared/06_AUDIT_STRATEGY.md
- product/database/shared/10_DATA_RETENTION_POLICY.md

---

# Next Phase

Backend Implementation

- PostgreSQL Schema
- Drizzle ORM Models
- NestJS Entities
- Repository Layer
- Service Layer

---

# End of Database Specification