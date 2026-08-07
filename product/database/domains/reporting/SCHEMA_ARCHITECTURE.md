# REPORTING DATABASE SCHEMA ARCHITECTURE

Version: 1.0.0

Status: Draft

Owner: Database Architecture

---

# Purpose

Defines the PostgreSQL schema architecture for the Reporting Domain.

The Reporting schema owns analytical persistence objects while consuming published data from operational domains.

---

# Schema Name

reporting

---

# Schema Ownership

Owns:

- dashboards
- dashboard_widgets
- reports
- report_templates
- scheduled_reports
- kpi_definitions
- kpi_snapshots
- data_snapshots
- aggregated_metrics
- analytical_models

---

# External References

Consumes published data from:

- Platform
- Membership
- Attendance
- CRM
- Commerce
- Inventory
- HR
- Scheduling
- Communication

No direct ownership of operational tables.

---

# Table Relationships

dashboards

↓

dashboard_widgets

reports

↓

report_templates

↓

scheduled_reports

kpi_definitions

↓

kpi_snapshots

data_snapshots

↓

aggregated_metrics

↓

analytical_models

---

# Primary Keys

Every table uses UUID primary keys.

---

# Foreign Keys

Platform

- organization_id
- user_id

Reporting never directly references operational tables for ownership.

Relationships use published analytical identifiers.

---

# Audit Strategy

Every business table includes:

- created_at
- updated_at
- created_by
- updated_by

Snapshots remain immutable after creation.

---

# Index Strategy

Primary indexes:

- organization_id
- report_type
- dashboard_type
- snapshot_date
- created_at

Composite indexes:

- organization_id + snapshot_date
- organization_id + report_type
- organization_id + dashboard_type

---

# Multi-Tenant Strategy

Every business table contains:

organization_id

Tenant isolation is mandatory.

---

# Retention Strategy

Reporting history retained permanently.

Snapshots are immutable.

Aggregated metrics are versioned.

---

# Performance Considerations

Optimized for:

- Dashboard rendering
- KPI calculations
- Historical reporting
- Trend analysis
- Executive analytics

---

# Future Expansion

Supports:

- Data warehouse
- Materialized views
- OLAP cubes
- External BI integration
- AI analytics

---

# End of Document