# FITNESSOS NAMING REFERENCE

Version: 1.0.0

Status: Enterprise Standard

Owner: Platform Architecture

Classification

Shared Database Standard

---

# Purpose

This document defines the authoritative naming conventions for all database objects used throughout FitnessOS.

---

# General Rules

- Use snake_case.
- Use descriptive business terminology.
- Avoid abbreviations unless industry standard.
- Use singular names for entities unless representing collections.

---

# Schemas

Format

<domain>

Examples

platform
membership
attendance
commerce

---

# Tables

Format

<entity_name>

Examples

member
membership
attendance_event
invoice

---

# Columns

Format

<business_name>

Examples

organization_id
created_at
updated_at
deleted_at

Foreign keys end with _id.

---

# Primary Keys

id

---

# Constraints

Primary Key

pk_<table>

Foreign Key

fk_<table>_<referenced_table>

Unique

uq_<table>_<columns>

Check

chk_<table>_<rule>

---

# Indexes

idx_<table>_<columns>

Examples

idx_member_email
idx_attendance_member_date

---

# Views

vw_<business_name>

---

# Materialized Views

mv_<business_name>

---

# Functions

fn_<business_name>

---

# Procedures

sp_<business_name>

---

# Triggers

trg_<table>_<event>

---

# Sequences

seq_<table>_<column>

---

# Enums

<business_name>_type

Examples

member_status_type
payment_status_type

---

# Files

UPPER_SNAKE_CASE.md

Examples

DATABASE_SPECIFICATION.md
ENTITY_CATALOG.md

Shared standards use numeric prefixes.

Example

01_BUSINESS_GLOSSARY.md

---

# Cross References

- 02_ENUM_CATALOG.md
- 03_POSTGRESQL_STANDARDS.md
- 04_INDEXING_STRATEGY.md

---

# Compliance Checklist

✓ snake_case

✓ Consistent suffixes

✓ Business terminology

✓ Constraint naming compliant

✓ Index naming compliant

---

# Summary

This document is the authoritative naming reference for every database object and shared database document in FitnessOS.

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

# End of Naming Reference
