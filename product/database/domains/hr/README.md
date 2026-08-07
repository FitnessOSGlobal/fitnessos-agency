# HR DATABASE DOMAIN

Version: 1.0.0

Status: Draft

Owner: Database Architecture

---

# Purpose

This directory contains the complete database design for the Human Resources (HR) Domain.

The HR Domain is the authoritative owner of all employee-related business data within FitnessOS. It manages employees, organizational structure, positions, departments, leave management, payroll references, performance management, and employee lifecycle information.

The domain provides workforce management capabilities while integrating with Platform, Scheduling, Attendance, Reporting, and Communication domains.

---

# Scope

The HR Domain includes:

- Employees
- Departments
- Positions
- Employment Records
- Compensation References
- Leave Management
- Employee Attendance
- Performance Reviews
- Certifications
- Skills
- Training Records
- Employee Documents

---

# Documents

- BUSINESS_ANALYSIS.md
- AGGREGATE_MODEL.md
- ENTITY_CATALOG.md
- SCHEMA_ARCHITECTURE.md
- LOGICAL_DATABASE_MODEL.md
- DATABASE_SPECIFICATION.md

---

# Dependencies

Depends On

- Platform Domain

Referenced By

- Scheduling
- Reporting
- Communication
- AI

---

# Database Schema

hr

---

# Ownership

The HR Domain owns all employee and workforce management data.

Other domains reference HR entities using identifiers only.

---

# Status

Implementation Ready after approval.

---

# End of Document