# REPORTING DATABASE DOMAIN

Version: 1.0.0

Status: Draft

Owner: Database Architecture

---

# Purpose

This directory contains the complete database design for the Reporting Domain.

The Reporting Domain is the authoritative owner of reporting, analytics, dashboards, KPIs, snapshots, aggregated metrics, and business intelligence models within FitnessOS.

Unlike operational domains, Reporting does not own transactional business data. Instead, it consumes published data from other domains to produce analytical views and decision-support information.

---

# Scope

The Reporting Domain includes:

- Reports
- Dashboards
- KPI Definitions
- KPI Snapshots
- Aggregated Metrics
- Data Snapshots
- Report Templates
- Scheduled Reports
- Report Execution History
- Business Intelligence Models

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

- Platform
- Membership
- Attendance
- CRM
- Commerce
- Inventory
- HR
- Scheduling
- Communication

Referenced By

- AI

---

# Database Schema

reporting

---

# Ownership

The Reporting Domain owns analytical and reporting persistence objects only.

Operational business data remains owned by its originating domains.

---

# Status

Implementation Ready after approval.

---

# End of Document