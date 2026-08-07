# HR DATABASE SCHEMA ARCHITECTURE

Version: 1.0.0

Status: Draft

Owner: Database Architecture

---

# Purpose

Defines the PostgreSQL schema architecture for the HR Domain.

The schema owns all workforce management persistence objects.

---

# Schema Name

hr

---

# Schema Ownership

Owns:

- employees
- employment_records
- employee_documents
- departments
- positions
- leave_requests
- leave_balances
- performance_reviews
- performance_objectives
- certifications
- skills
- employee_skills
- training_records

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

HR never owns external entities.

---

# Table Relationships

departments

↓

positions

↓

employees

↓

employment_records

↓

employee_documents

employees

↓

leave_requests

↓

leave_balances

employees

↓

performance_reviews

↓

performance_objectives

employees

↓

certifications

↓

skills

↓

training_records

---

# Primary Keys

All tables use UUID primary keys.

---

# Foreign Keys

Platform references:

- organization_id
- branch_id
- user_id

Manager hierarchy:

- manager_employee_id

Department references:

- department_id

Position references:

- position_id

---

# Audit Strategy

Every business table includes:

- created_at
- updated_at
- created_by
- updated_by

Optional:

- deleted_at
- deleted_by

Performance reviews and employment records are immutable after finalization.

---

# Index Strategy

Primary indexes:

- organization_id
- employee_number
- department_id
- position_id
- manager_employee_id
- employment_status
- created_at

Composite indexes:

- organization_id + employee_number
- department_id + employment_status
- manager_employee_id + employment_status

---

# Multi-Tenant Strategy

Every business table contains:

organization_id

Tenant isolation is mandatory.

---

# Retention Strategy

Employment history is retained permanently.

Performance history is immutable.

Training history is retained permanently.

---

# Performance Considerations

Optimized for:

- Employee Search
- Organizational Hierarchy
- Leave Processing
- Workforce Reporting
- Performance Analytics

---

# Future Expansion

Future tables may include:

- payroll_profiles
- employee_benefits
- recruitment_candidates
- interview_records
- succession_plans

---

# End of Document