# SCHEDULING DATABASE SPECIFICATION

Version: 1.0.0

Status: Draft

Owner: Database Engineering

---

# Purpose

This document defines the implementation-ready database specification for the Scheduling Domain.

It serves as the authoritative implementation reference for PostgreSQL and Drizzle ORM.

---

# Schema

scheduling

---

# Owned Tables

| Table | Purpose |
|--------|---------|
| calendars | Organizational calendars |
| calendar_events | Calendar events |
| class_templates | Reusable class definitions |
| class_sessions | Scheduled class instances |
| bookings | Member bookings |
| booking_statuses | Booking lifecycle |
| trainer_assignments | Trainer allocation |
| room_reservations | Room allocation |
| equipment_reservations | Equipment allocation |
| availability_schedules | Resource availability |
| time_slots | Bookable time periods |
| waitlist_entries | Session waitlists |

Only the Scheduling Domain owns these tables.

---

# External References

Platform

- organization_id
- branch_id
- user_id

Membership

- member_id

HR

- employee_id

Communication

- notification_id

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

Scheduling history remains immutable after completion.

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

- Calendar name unique within organization.
- Class template code unique within organization.

Check Constraints

- End time must be greater than start time.
- Capacity must be zero or greater.
- Waitlist position must be positive.

Referential Constraints

- Every booking references one class session.
- Every trainer assignment references one employee.
- Every reservation references one scheduled session.

---

# Business Rules

Scheduling

- Sessions cannot overlap for the same resource.
- Sessions inherit configuration from templates.

Bookings

- Capacity limits enforced.
- Waitlist activates automatically when capacity is exceeded.
- Cancelled bookings release capacity.

Resources

- Trainers cannot be double-booked.
- Rooms cannot be double-booked.
- Equipment cannot be allocated to overlapping sessions.

Availability

- Only available resources may be scheduled.
- Availability overrides recurring schedules when blocked.

---

# Multi-Tenant Rules

Every business table contains:

organization_id

Requirements:

- Tenant isolation.
- Organization-scoped scheduling.
- Cross-tenant access prohibited.

---

# Soft Delete Policy

Soft delete permitted for:

- Calendars
- Class Templates

Soft delete prohibited for:

- Bookings
- Class Sessions
- Trainer Assignments

Historical scheduling data is retained.

---

# Retention Policy

Scheduling history retained permanently.

Bookings retained permanently for reporting and analytics.

---

# Performance Targets

Optimized for:

- Calendar Search
- Availability Search
- Booking Operations
- Conflict Detection
- Resource Allocation
- AI Schedule Optimization

---

# Migration Strategy

Implementation principles:

- Forward-only migrations.
- Version-controlled schema changes.
- No destructive migrations without approval.

---

# Seed Data

Initial seed data includes:

- Default Booking Statuses
- Default Calendar Types
- Default Session Statuses
- Default Availability Types

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

Scheduling implementation is complete when:

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