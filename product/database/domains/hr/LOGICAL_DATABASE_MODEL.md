# HR LOGICAL DATABASE MODEL

Version: 1.0.0

Status: Draft

Owner: Database Architecture

---

# Purpose

This document defines the logical database model for the HR Domain.

It establishes logical entities, ownership, relationships, normalization, lifecycle, and business constraints independent of implementation technology.

---

# Logical Entities

The HR Domain consists of the following logical entities:

1. Employee
2. Employment Record
3. Employee Document
4. Department
5. Position
6. Leave Request
7. Leave Balance
8. Performance Review
9. Performance Objective
10. Certification
11. Skill
12. Employee Skill
13. Training Record

Each logical entity maps to one primary database table.

---

# Entity Relationships

Organization

↓

Department

↓

Position

↓

Employee

↓

Employment Record

↓

Employee Document

Employee

↓

Leave Request

↓

Leave Balance

Employee

↓

Performance Review

↓

Performance Objective

Employee

↓

Employee Skill

↓

Skill

Employee

↓

Training Record

Employee

↓

Certification

---

# Cardinality

| Parent | Child | Cardinality |
|---------|-------|------------:|
| Organization | Department | 1 : N |
| Department | Position | 1 : N |
| Department | Employee | 1 : N |
| Position | Employee | 1 : N |
| Employee | Employment Record | 1 : N |
| Employee | Employee Document | 1 : N |
| Employee | Leave Request | 1 : N |
| Employee | Performance Review | 1 : N |
| Employee | Certification | 1 : N |
| Employee | Training Record | 1 : N |
| Employee | Employee Skill | 1 : N |
| Skill | Employee Skill | 1 : N |

---

# Normalization

Target normalization:

Third Normal Form (3NF)

Principles:

- Employee master data stored once.
- Departments normalized.
- Positions normalized.
- Skills maintained separately through a junction table.
- Performance history preserved.
- Leave history preserved.

---

# Multi-Tenant Model

Every logical business entity contains:

- organization_id

Tenant isolation is mandatory.

---

# Audit Model

Every logical entity includes:

- created_at
- updated_at
- created_by
- updated_by

Employment records and performance reviews additionally maintain immutable business timestamps.

---

# Data Lifecycle

Employee

Candidate

↓

Hired

↓

Active

↓

On Leave

↓

Inactive

↓

Terminated

↓

Archived

Department

Created

↓

Active

↓

Archived

Position

Created

↓

Open

↓

Filled

↓

Closed

Leave Request

Submitted

↓

Approved

↓

Rejected

↓

Completed

Performance Review

Planned

↓

In Progress

↓

Completed

↓

Archived

Certification

Issued

↓

Active

↓

Expired

Training Record

Scheduled

↓

Completed

↓

Archived

---

# Future Extensions

The logical model supports:

- Payroll
- Benefits Administration
- Recruitment
- Applicant Tracking
- Shift Planning
- Succession Planning

---

# End of Document