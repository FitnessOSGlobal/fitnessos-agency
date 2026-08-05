# FITNESSOS INDEXING STRATEGY

Version: 1.0.0

Status: Enterprise Standard

Owner: Platform Architecture

Classification

Shared Database Standard

---

# Purpose

The Indexing Strategy defines how PostgreSQL indexes are designed, implemented, monitored, and maintained throughout FitnessOS.

Proper indexing improves query performance while preserving data integrity and minimizing unnecessary maintenance overhead.

These standards apply to every database domain.

---

# Objectives

The indexing strategy ensures:

- Predictable query performance
- Efficient data retrieval
- Scalable growth
- Consistent implementation
- Maintainable database structures
- AI-friendly schema generation

---

# Scope

These standards apply to:

- Primary Key Indexes
- Unique Indexes
- Foreign Key Indexes
- Composite Indexes
- Partial Indexes
- Expression Indexes
- GIN Indexes
- GiST Indexes
- BRIN Indexes
- Covering Indexes

---

# Design Principles

## Principle 1

Indexes exist to support business queries.

Never create indexes "just in case."

---

## Principle 2

Every index should have measurable value.

Unused indexes should be reviewed and removed.

---

## Principle 3

Correct schema design has higher priority than indexing.

Indexes cannot compensate for poor data modeling.

---

## Principle 4

Write performance is as important as read performance.

Every additional index increases INSERT, UPDATE, and DELETE cost.

---

## Principle 5

Indexes should remain simple whenever practical.

Prefer fewer well-designed indexes over many overlapping indexes.

---

# Relationship to Other Standards

This document complements:

- 03_POSTGRESQL_STANDARDS.md
- 05_PARTITIONING_STRATEGY.md
- 06_AUDIT_STRATEGY.md
- 11_NAMING_REFERENCE.md

Implementation details should not be duplicated across these standards.

---

# Index Categories

FitnessOS recognizes the following index categories:

- Primary Key
- Unique
- Foreign Key
- Composite
- Partial
- Expression
- Covering
- Full Text
- JSONB
- Spatial (future)
- Analytical

Each category has specific usage guidelines defined in this document.

---

# End of Part 1

---

# Primary Key Index Standard

Every table primary key automatically creates a unique B-tree index.

Implementation

PRIMARY KEY (id)

Rules

- Every table must have exactly one primary key index.
- Primary key indexes use UUID columns.
- Additional indexes on primary keys are prohibited.

---

# Foreign Key Index Standard

Foreign key columns should normally be indexed.

Purpose

Improve JOIN performance and referential integrity operations.

Examples

organization_id

branch_id

member_id

employee_id

invoice_id

Rules

- Every frequently queried foreign key should have an index.
- Small lookup tables may omit indexes after performance review.

---

# Unique Index Standard

Business uniqueness should be enforced using unique indexes.

Examples

organization.code

user.email

membership.card_number

invoice.invoice_number

Naming

uq_<table>_<columns>

Rules

- Prefer unique constraints rather than application validation.
- Multi-column uniqueness should use composite unique indexes.

---

# Composite Index Standard

Composite indexes support queries filtering by multiple columns.

Examples

(member_id, created_at)

(branch_id, attendance_date)

(organization_id, status)

Rules

- Order columns by query selectivity.
- Equality predicates should precede range predicates.
- Avoid unnecessary composite indexes.

---

# Covering Index Standard

Covering indexes should be used only when measurable performance improvements exist.

Purpose

Reduce table lookups.

Implementation

INCLUDE (...)

Rules

- Include only frequently selected columns.
- Avoid excessively wide indexes.

---

# Partial Index Standard

Partial indexes reduce storage and maintenance costs.

Examples

WHERE deleted_at IS NULL

WHERE status = 'active'

Rules

- Use when only a subset of rows is frequently queried.
- Predicate must match application query patterns.

---

# Expression Index Standard

Expression indexes support computed search values.

Examples

LOWER(email)

LOWER(username)

unaccent(name)

Rules

- Expression must be deterministic.
- Prefer generated columns where appropriate.

---

# JSONB Index Standard

JSONB indexes use GIN indexes.

Purpose

Accelerate metadata searches.

Examples

metadata

preferences

configuration

Rules

- Only index frequently queried JSONB paths.
- Frequently accessed attributes should become relational columns.

---

# Full-Text Search Index Standard

Full-text search uses PostgreSQL GIN indexes.

Purpose

Support efficient searching across text content.

Examples

member notes

product descriptions

knowledge base articles

Rules

- Use generated TSVECTOR columns where appropriate.
- Support multilingual search where required.

---

# End of Part 2

---

# PostgreSQL Index Type Standards

FitnessOS standardizes PostgreSQL index types according to business access patterns.

Selecting the appropriate index type improves performance while minimizing maintenance overhead.

---

# B-Tree Index Standard

Status

Default Index Type

Purpose

Supports equality and range queries.

Typical Usage

- Primary Keys
- Foreign Keys
- Unique Constraints
- Dates
- Numbers
- Status Columns

Examples

member_id

organization_id

created_at

invoice_date

status

Rules

B-tree indexes are the default choice unless another index type provides measurable advantages.

---

# GIN Index Standard

Purpose

Supports indexing of composite values.

Typical Usage

- JSONB
- Full-text search
- Arrays

Examples

metadata

preferences

search_vector

Rules

GIN indexes should only be used for data structures that cannot be efficiently indexed using B-tree.

Avoid GIN indexes on frequently updated large documents unless justified.

---

# GiST Index Standard

Purpose

Supports specialized search operations.

Typical Usage

- Geospatial data
- Range types
- Exclusion constraints

Examples

Room booking ranges

Future location services

Rules

Use only when application requirements demand GiST capabilities.

---

# BRIN Index Standard

Purpose

Supports efficient indexing of extremely large sequential datasets.

Typical Usage

- Audit logs
- Attendance history
- Event streams
- Time-series reporting

Rules

BRIN indexes are appropriate only where physical row order closely matches query order.

Examples

created_at

attendance_date

event_timestamp

---

# Hash Index Standard

Purpose

Optimized equality comparison.

Policy

FitnessOS does not standardize Hash indexes.

B-tree indexes provide equivalent functionality with broader capabilities.

Hash indexes require explicit architectural approval.

---

# Expression Index Standard

Purpose

Indexes computed values.

Examples

LOWER(email)

LOWER(username)

unaccent(full_name)

Rules

Expression indexes should remain deterministic.

Generated columns should be considered before complex expressions.

---

# Covering Index Standard

Purpose

Reduce heap access by storing additional non-key columns.

Implementation

INCLUDE (...)

Example

(member_id, attendance_date)

INCLUDE

(status, check_in_time)

Rules

Use only after performance analysis demonstrates measurable improvement.

---

# Multi-Column Ordering Standard

Column order follows query selectivity.

General Order

Equality filters

↓

Range filters

↓

Sorting columns

Example

organization_id

status

created_at

Supports:

WHERE organization_id = ?

AND status = ?

ORDER BY created_at DESC

---

# Index Selection Matrix

Equality Lookup

B-tree

Range Query

B-tree

JSONB

GIN

Full Text Search

GIN

Large Sequential Data

BRIN

Geospatial

GiST

Exclusion Constraints

GiST

Case-Insensitive Search

Expression Index

---

# End of Part 3

---

# Index Naming Standard

Indexes follow the naming convention defined in:

11_NAMING_REFERENCE.md

Standard Format

idx_<table>_<columns>

Examples

idx_member_email

idx_membership_status

idx_invoice_date

idx_attendance_member_date

Composite indexes should list indexed columns in declaration order.

---

# Query Pattern Analysis

Indexes must be designed using actual business access patterns.

Typical query categories include:

- Primary key lookup
- Foreign key joins
- Status filtering
- Date range filtering
- Search operations
- Reporting queries
- Dashboard summaries

Database specifications should identify expected query patterns before introducing new indexes.

---

# Index Monitoring

Indexes should be reviewed regularly using PostgreSQL statistics.

Review metrics include:

- Index scans
- Sequential scans
- Index size
- Table size
- Index usage ratio
- Cache hit ratio
- Query execution time

Unused indexes should be evaluated for removal.

---

# Index Maintenance

Routine maintenance includes:

- REINDEX where necessary
- Statistics updates
- VACUUM
- ANALYZE
- Bloat monitoring

Maintenance should be automated where practical.

---

# Redundant Index Detection

Avoid overlapping indexes.

Examples

Existing

(organization_id, status)

Avoid adding

(organization_id)

unless supported by distinct query patterns.

Rules

Every new index should be compared against existing indexes before implementation.

---

# Performance Review Process

Index effectiveness should be validated using:

- EXPLAIN
- EXPLAIN ANALYZE
- Query execution statistics
- Production monitoring

Indexes should be evidence-driven rather than assumption-driven.

---

# Lifecycle Management

Indexes evolve with the application.

Lifecycle

Proposed

↓

Implemented

↓

Monitored

↓

Optimized

↓

Retired

Indexes no longer supporting business queries should be removed after review.

---

# Architectural Review

New indexes should answer the following questions:

- Which query does this support?
- Why is an existing index insufficient?
- What is the write-performance impact?
- Does the index duplicate another index?
- Can the same result be achieved through improved schema design?

Indexes without clear business justification should not be approved.

---

# Cross-Document References

Related standards:

- 03_POSTGRESQL_STANDARDS.md
- 05_PARTITIONING_STRATEGY.md
- 06_AUDIT_STRATEGY.md
- 11_NAMING_REFERENCE.md

Database specifications should reference this document rather than redefining indexing guidance.

---

# Compliance Checklist

Every database implementation should verify:

✓ Primary keys indexed

✓ Foreign keys reviewed

✓ Unique constraints indexed

✓ Composite indexes justified

✓ Query patterns documented

✓ Index names compliant

✓ Redundant indexes avoided

✓ Monitoring strategy defined

---

# Summary

The FitnessOS Indexing Strategy provides a consistent approach to designing, implementing, monitoring, and maintaining PostgreSQL indexes.

The strategy emphasizes:

- Business-driven index design
- Measurable performance improvements
- Minimal maintenance overhead
- Predictable scalability
- Consistent naming
- Long-term maintainability

All database domains must reference this strategy when defining indexes.

---

Document Classification

Shared Database Standard

Owner

Platform Architecture

Status

Enterprise Standard

Version

1.0.0

Review Frequency

Quarterly

---

# End of Indexing Strategy