# INTEGRATION DATABASE SPECIFICATION

Version: 1.0.0

Status: Draft

Owner: Database Engineering

---

# Purpose

This document defines the implementation-ready database specification for the Integration Domain.

It serves as the authoritative implementation reference for PostgreSQL and Drizzle ORM.

---

# Schema

integration

---

# Owned Tables

| Table | Purpose |
|--------|---------|
| external_systems | External platform registry |
| connectors | Integration connectors |
| connector_configurations | Connector configuration metadata |
| credential_references | References to secret storage |
| incoming_webhooks | Incoming webhook requests |
| outgoing_webhooks | Outgoing webhook deliveries |
| synchronization_jobs | Scheduled synchronization |
| synchronization_executions | Synchronization execution history |
| import_jobs | Data import processing |
| export_jobs | Data export processing |
| integration_events | Published integration events |
| delivery_attempts | Event delivery attempts |

Only the Integration Domain owns these tables.

---

# External References

Platform

- organization_id
- user_id

Business domains interact through events and contracts.

Operational entities remain owned by their originating domains.

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

Execution history is immutable.

---

# Table Specifications

Each table defines:

- Purpose
- Attributes
- Constraints
- Relationships
- Business Rules
- Required Indexes

Implementation must remain synchronized with this specification.

---

# Constraint Strategy

Unique Constraints

- Connector name unique within organization.
- External system code unique within organization.

Check Constraints

- Valid connector status.
- Valid execution status.
- Retry count cannot be negative.

Referential Constraints

- Connector configuration belongs to one connector.
- Synchronization execution belongs to one synchronization job.
- Delivery attempt belongs to one integration event.

---

# Business Rules

Connectors

- Connector configuration is versioned.
- Disabled connectors cannot execute new jobs.

Synchronization

- Executions preserve complete history.
- Retry policy is configurable.

Webhooks

- Every delivery attempt is logged.
- Payloads are immutable after receipt.

Credentials

- Only references are stored.
- Secret values are managed externally.

Events

- Every published event is auditable.
- Failed deliveries may be retried according to policy.

---

# Multi-Tenant Rules

Every business table contains:

organization_id

Requirements:

- Tenant isolation.
- Organization-scoped integrations.
- Cross-tenant access prohibited.

---

# Soft Delete Policy

Soft delete permitted for:

- External Systems
- Connectors

Soft delete prohibited for:

- Synchronization Executions
- Delivery Attempts
- Integration Events

Historical execution data is retained permanently.

---

# Retention Policy

Execution history retained permanently.

Webhook history retained permanently.

Integration events retained permanently.

---

# Performance Targets

Optimized for:

- Connector lookup
- Event publishing
- Synchronization execution
- Retry processing
- Background workers

---

# Migration Strategy

Implementation principles:

- Forward-only migrations.
- Version-controlled schema changes.
- No destructive migrations without approval.

---

# Seed Data

Initial seed data includes:

- Default Connector Types
- Default Integration Providers
- Default Execution Statuses
- Default Retry Policies

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

Integration implementation is complete when:

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