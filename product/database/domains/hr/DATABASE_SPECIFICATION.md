# HR DATABASE SPECIFICATION

Version: 1.0.0

Status: Draft

Owner: Database Engineering

---

# Purpose

This document defines the implementation-ready database specification for the HR Domain.

It serves as the authoritative implementation reference for PostgreSQL and Drizzle ORM.

---

# Schema

hr

---

# Owned Tables

| Table | Purpose |
|--------|---------|
| employees | Employee master data |
| employment_records | Employment history |
| employee_documents | Employment documentation |
| departments | Organizational departments |
| positions | Job positions |
| leave_requests | Leave applications |
| leave_balances | Leave allocations |
| performance_reviews | Employee evaluations |
| performance_objectives | Performance goals |
| certifications | Employee certifications |
| skills | Skill catalog |
| employee_skills | Employee skill assignments |
| training_records | Employee training history |

Only the HR Domain owns these tables.

---

# External References

Platform

- organization_id
- branch_id
- user_id

Scheduling

- trainer_assignment_id

Communication

- notification_id

Reporting

- reporting_snapshot_id

---

# Primary Keys

Every table uses UUID primary keys.

---

# Standard Audit Columns

Every table includes:

- created_at
- updated_at
- created_by
- updated_by

Optional:

- deleted_at
- deleted_by

Employment history and performance reviews remain immutable after finalization.

---

# Table Specifications

Each table should define:

- Purpose
- Required attributes
- Constraints
- Relationships
- Business rules
- Required indexes

Implementation must remain synchronized with this specification.

---

# Constraint Strategy

Unique Constraints

- Employee Number unique within organization.
- Department Code unique within organization.
- Position Code unique within organization.

Check Constraints

- Valid employment status.
- Valid leave balance.
- Valid performance score ranges.

Referential Constraints

- Every employee belongs to one department.
- Every employee occupies one position.
- Every leave request references one employee.
- Every performance review references one employee.

---

# Business Rules

Employees

- One active employment record at a time.
- Employment history is permanent.

Departments

- Departments may contain multiple positions.
- Departments may contain multiple employees.

Leave

- Approval workflow required.
- Leave balances cannot become negative unless organizational policy allows.

Performance

- Finalized reviews cannot be edited.
- Objectives belong to one review cycle.

Training

- Training history retained permanently.

---

# Multi-Tenant Rules

Every business table contains:

organization_id

Requirements:

- Tenant isolation.
- Organization-scoped queries by default.
- Cross-tenant access prohibited.

---

# Soft Delete Policy

Soft delete permitted for:

- Departments
- Positions
- Skills

Soft delete prohibited for:

- Employment Records
- Performance Reviews
- Training Records

Employees follow organizational archival policy rather than deletion.

---

# Retention Policy

Employment history retained permanently.

Performance history retained permanently.

Training history retained permanently.

Employee documentation retained according to organizational compliance policy.

---

# Performance Targets

Optimized for:

- Employee Search
- Workforce Reporting
- Organizational Hierarchy
- Leave Processing
- Performance Analytics
- AI Workforce Insights

---

# Migration Strategy

Implementation principles:

- Forward-only migrations.
- Version-controlled schema changes.
- No destructive migrations without approval.

---

# Seed Data

Initial seed data includes:

- Default Employment Statuses
- Default Leave Types
- Default Performance Ratings
- Default Department Types
- Default Position Categories

---

# Implementation Sequence

1. Drizzle Schema
2. Database Migration
3. Repository
4. Service
5. Controller
6. API Documentation
7. Tests
8. Production Validation

---

# Acceptance Criteria

HR implementation is complete when:

- Schema implemented
- Migration verified
- Repository completed
- Services completed
- Controllers completed
- API documented
- Tests passing
- Documentation synchronized

---

# End of Document