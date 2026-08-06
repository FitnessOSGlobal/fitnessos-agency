# <DOMAIN NAME> LOGICAL DATABASE MODEL

Version: <VERSION>

Status: <STATUS>

Owner: <OWNER>

---

# Purpose

This document defines the logical database model for the <DOMAIN NAME> Domain.

It establishes logical entities, relationships, normalization rules, lifecycle, and ownership without committing to implementation technology.

---

# Logical Entities

List all logical entities.

Example:

1. Entity
2. Entity
3. Entity

---

# Entity Relationships

Document logical relationships.

Example:

Entity A

↓

Entity B

↓

Entity C

---

# Cardinality

| Parent | Child | Cardinality |
|---------|-------|------------:|
| Entity | Entity | 1 : N |

Document every relationship.

---

# Normalization

Target normalization level:

Third Normal Form (3NF)

Document any intentional denormalization.

---

# Multi-Tenant Model

Document tenant ownership.

Example:

organization_id

---

# Audit Model

Standard fields:

- created_at
- updated_at
- created_by
- updated_by

---

# Data Lifecycle

Document lifecycle for each entity.

Example:

Created

↓

Active

↓

Archived

---

# Future Extensions

Document anticipated logical entities.

---

# Relationship to Other Documents

Preceded By:

SCHEMA_ARCHITECTURE.md

Followed By:

DATABASE_SPECIFICATION.md

---

# Review Notes

Reviewer:

Review Date:

Comments:

---

# End of Document