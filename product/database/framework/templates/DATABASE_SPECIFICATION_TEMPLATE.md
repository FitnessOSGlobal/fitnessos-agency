# <DOMAIN NAME> DATABASE SPECIFICATION

Version: <VERSION>

Status: <STATUS>

Owner: <OWNER>

Depends On:

- README.md
- BUSINESS_ANALYSIS.md
- AGGREGATE_MODEL.md
- ENTITY_CATALOG.md
- SCHEMA_ARCHITECTURE.md
- LOGICAL_DATABASE_MODEL.md

---

# Purpose

This document defines the implementation-ready database specification for the <DOMAIN NAME> Domain.

It serves as the authoritative implementation reference for:

- PostgreSQL
- Drizzle ORM
- Database Migrations
- Repository Layer
- Services
- Controllers
- API Contracts
- Testing

This document bridges architecture and production implementation.

---

# Schema

<SCHEMA_NAME>

---

# Owned Tables

| Table | Purpose |
|--------|---------|
| <TABLE> | <PURPOSE> |
| <TABLE> | <PURPOSE> |
| <TABLE> | <PURPOSE> |

Only this domain owns these tables.

Cross-domain ownership is prohibited.

---

# External References

## Platform

- organization_id
- branch_id
- user_id

## Other Domains

- <FOREIGN_KEY>

Only reference identifiers owned by external domains.

---

# Primary Key Strategy

Standard:

- UUID
- PostgreSQL Generated
- Immutable

Every business table uses UUID unless an approved exception exists.

---

# Foreign Key Strategy

Document:

- Referenced table
- Cascade policy
- Update policy
- Delete policy

Foreign keys must preserve referential integrity.

---

# Standard Audit Columns

Every business table includes:

- created_at
- updated_at
- created_by
- updated_by

Optional:

- deleted_at
- deleted_by

Business events additionally contain immutable event timestamps.

---

# Table Specifications

Repeat this section for every table.

## Table

<TABLE_NAME>

### Purpose

Describe the business purpose.

### Required Attributes

- Attribute
- Attribute
- Attribute

### Constraints

- Constraint
- Constraint
- Constraint

### Business Rules

- Rule
- Rule
- Rule

### Relationships

Parent:

<ENTITY>

Children:

<ENTITY>

### Indexes

Required indexes:

- Primary Key
- Foreign Key
- Status
- Timestamp

Composite indexes:

- <INDEX>

Repeat for every owned table.

---

# Constraint Strategy

Document:

- Unique Constraints
- Check Constraints
- Default Values
- Referential Constraints

Every constraint should support a business rule.

---

# Business Rules

Document implementation-critical rules.

Examples:

- Immutable records
- Status transitions
- Validation requirements
- Lifecycle restrictions

Rules should be deterministic and testable.

---

# Multi-Tenant Rules

Every business table includes:

organization_id

Requirements:

- Tenant isolation
- No cross-tenant updates
- Tenant-scoped queries by default

---

# Soft Delete Policy

Document:

- Which tables support soft delete
- Which tables prohibit deletion
- Restoration policy
- Archival strategy

---

# Retention Policy

Document:

- Retention period
- Archive strategy
- Compliance requirements
- Historical preservation

---

# Performance Targets

Document expected:

- Read throughput
- Write throughput
- Reporting workload
- Growth expectations
- Index usage

Avoid premature optimization while documenting scalability expectations.

---

# Migration Strategy

Document migration principles.

Examples:

- Forward-only migrations
- Versioned migrations
- Repeatable migrations
- Rollback policy

---

# Seed Data

Document required seed data.

Examples:

- Default Roles
- Default Statuses
- System Configuration
- Lookup Tables

If none exist, explicitly state so.

---

# Implementation Sequence

Implementation follows this exact order:

1. Drizzle Schema
2. Database Migration
3. Repository
4. Service
5. Controller
6. API Documentation
7. Tests
8. Production Validation

No implementation may skip this sequence.

---

# Acceptance Criteria

Implementation is complete when:

- Schema implemented
- Migration generated
- Migration verified
- Repository implemented
- Services implemented
- Controllers implemented
- Tests passing
- Documentation synchronized

---

# Relationship to Other Documents

Preceded By:

- LOGICAL_DATABASE_MODEL.md

Followed By:

- Drizzle Schema
- Migration
- Repository

---

# Review Notes

Reviewer:

Review Date:

Comments:

Approval:

Architecture:

Database:

Engineering:

---

# End of Document