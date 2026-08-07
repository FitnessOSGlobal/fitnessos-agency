# REPORTING ENTITY CATALOG

Version: 1.0.0

Status: Draft

Owner: Database Architecture

---

# Purpose

This document defines every entity owned by the Reporting Domain.

The Reporting Domain is the authoritative owner of reporting artifacts, analytical models, KPI history, and dashboard metadata.

---

# Aggregate — Dashboard

## Entity

Dashboard

### Purpose

Represents a configurable analytical dashboard.

### Lifecycle

Draft

↓

Published

↓

Archived

### Owns

- Name
- Description
- Layout
- Visibility

---

## Entity

Dashboard Widget

### Purpose

Represents reusable dashboard visualizations.

---

# Aggregate — Report

## Entity

Report

### Purpose

Represents an analytical report.

---

## Entity

Report Template

### Purpose

Defines reusable report layouts.

---

## Entity

Scheduled Report

### Purpose

Defines automated report execution.

---

# Aggregate — KPI

## Entity

KPI Definition

### Purpose

Defines business KPIs.

---

## Entity

KPI Snapshot

### Purpose

Stores historical KPI values.

---

# Aggregate — Snapshot

## Entity

Data Snapshot

### Purpose

Represents historical analytical data.

---

## Entity

Aggregated Metric

### Purpose

Stores summarized business metrics.

---

# Aggregate — Analytics

## Entity

Analytical Model

### Purpose

Represents reusable analytical models.

---

# Cross-Domain References

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

---

# Ownership Summary

Reporting owns:

- Dashboards
- Dashboard Widgets
- Reports
- Report Templates
- Scheduled Reports
- KPI Definitions
- KPI Snapshots
- Data Snapshots
- Aggregated Metrics
- Analytical Models

Reporting references all operational domains through published data only.

---

# Future Entities

Supports:

- Predictive Reports
- Forecast Models
- Executive Scorecards
- Data Warehouse Views
- BI Connectors

---

# End of Document