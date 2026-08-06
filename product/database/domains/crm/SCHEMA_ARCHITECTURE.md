# CRM DATABASE SCHEMA ARCHITECTURE

Version: 1.0.0

Status: Draft

Owner: Database Architecture

---

# Schema

crm

---

# Owned Tables

- leads
- opportunities
- crm_activities
- crm_notes
- campaigns
- communication_timelines

---

# External References

Platform

- organization_id
- branch_id
- user_id

Membership

- member_id

Commerce

- sale_id

---

# Audit Fields

Every table includes:

- created_at
- updated_at
- created_by
- updated_by

---

# Multi-Tenant

organization_id is mandatory.

---

# Index Strategy

Indexes:

- owner_id
- status
- stage
- follow_up_date
- created_at

Composite indexes:

- organization_id + status
- organization_id + owner_id

---

# End