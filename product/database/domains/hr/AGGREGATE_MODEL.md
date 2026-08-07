# HR AGGREGATE MODEL

Version: 1.0.0

Status: Draft

Owner: Database Architecture

---

# Purpose

Defines aggregate boundaries for the HR Domain.

Each aggregate establishes ownership, transactional consistency, and business responsibility for workforce management.

---

# Aggregate Overview

The HR Domain contains the following primary aggregates:

1. Employee
2. Department
3. Position
4. Leave
5. Performance
6. Certification
7. Training

---

# Aggregate — Employee

Owns

- Employee
- Employment Record
- Employee Document

Business Rules

- Every employee belongs to one organization.
- Employees may hold one active position.
- Employment history is retained permanently.

---

# Aggregate — Department

Owns

- Department

Business Rules

- Departments belong to one organization.
- Departments may contain multiple employees.

---

# Aggregate — Position

Owns

- Position

Business Rules

- Positions define organizational responsibilities.
- Employees occupy positions.

---

# Aggregate — Leave

Owns

- Leave Request
- Leave Balance

Business Rules

- Leave requires approval.
- Leave balances cannot become negative unless organizational policy permits.

---

# Aggregate — Performance

Owns

- Performance Review
- Performance Objective

Business Rules

- Reviews are immutable once finalized.
- Objectives belong to one review cycle.

---

# Aggregate — Certification

Owns

- Certification
- Skill

Business Rules

- Certifications may expire.
- Skills support employee qualification.

---

# Aggregate — Training

Owns

- Training Record

Business Rules

- Training history is retained permanently.

---

# Cross-Domain References

Platform

- Organization
- Branch
- User

Scheduling

- Trainer Assignment

Reporting

- Workforce Metrics

Communication

- Employee Notifications

---

# Transaction Boundaries

Each aggregate maintains independent transactional consistency.

Cross-domain collaboration occurs through identifiers and published events.

---

# End of Document