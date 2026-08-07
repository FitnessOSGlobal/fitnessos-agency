# SCHEDULING DATABASE SCHEMA ARCHITECTURE

Version: 1.0.0

Status: Draft

Owner: Database Architecture

---

# Purpose

Defines the PostgreSQL schema architecture for the Scheduling Domain.

The Scheduling schema owns all scheduling persistence objects.

---

# Schema Name

scheduling

---

# Schema Ownership

Owns:

- calendars
- calendar_events
- class_templates
- class_sessions
- bookings
- booking_statuses
- trainer_assignments
- room_reservations
- equipment_reservations
- availability_schedules
- time_slots
- waitlist_entries

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

# Table Relationships

calendars

↓

calendar_events

↓

class_templates

↓

class_sessions

↓

bookings

↓

waitlist_entries

class_sessions

↓

trainer_assignments

↓

room_reservations

↓

equipment_reservations

availability_schedules

↓

time_slots

---

# Primary Keys

Every table uses UUID primary keys.

---

# Foreign Keys

Platform

- organization_id
- branch_id
- user_id

Membership

- member_id

HR

- employee_id

---

# Audit Strategy

Every business table contains:

- created_at
- updated_at
- created_by
- updated_by

Optional:

- deleted_at
- deleted_by

Booking history and scheduling history remain immutable after completion.

---

# Index Strategy

Primary indexes:

- organization_id
- class_session_id
- member_id
- employee_id
- booking_status
- scheduled_start
- scheduled_end

Composite indexes:

- organization_id + scheduled_start
- employee_id + scheduled_start
- member_id + booking_status

---

# Multi-Tenant Strategy

Every business table contains:

organization_id

Tenant isolation is mandatory.

---

# Retention Strategy

Scheduling history is retained permanently.

Bookings remain available for reporting.

---

# Performance Considerations

Optimized for:

- Calendar Queries
- Availability Search
- Booking Operations
- Conflict Detection
- Schedule Reporting

---

# Future Expansion

Supports:

- External Calendar Sync
- AI Scheduling
- Resource Optimization
- Public Booking

---

# End of Document