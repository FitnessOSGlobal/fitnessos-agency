# SCHEDULING AGGREGATE MODEL

Version: 1.0.0

Status: Draft

Owner: Database Architecture

---

# Purpose

Defines aggregate boundaries for the Scheduling Domain.

Each aggregate establishes ownership, transactional consistency, and scheduling responsibilities.

---

# Aggregate Overview

The Scheduling Domain contains the following primary aggregates:

1. Calendar
2. Class
3. Session
4. Booking
5. Resource
6. Availability
7. Waitlist

---

# Aggregate — Calendar

Owns

- Calendar
- Calendar Event

Business Rules

- Calendars belong to one organization.
- Calendars define scheduling boundaries.

---

# Aggregate — Class

Owns

- Class Template
- Class Session

Business Rules

- Classes may recur.
- Sessions inherit template configuration.

---

# Aggregate — Booking

Owns

- Booking
- Booking Status

Business Rules

- Members may only hold valid bookings.
- Capacity limits are enforced.

---

# Aggregate — Resource

Owns

- Trainer Assignment
- Room Reservation
- Equipment Reservation

Business Rules

- Resources cannot be double-booked.
- Resource allocation is conflict-free.

---

# Aggregate — Availability

Owns

- Availability Schedule
- Time Slot

Business Rules

- Availability determines bookable periods.
- Time slots may repeat through recurrence rules.

---

# Aggregate — Waitlist

Owns

- Waitlist Entry

Business Rules

- Waitlists respect booking priority.
- Promotion occurs automatically when capacity becomes available.

---

# Cross-Domain References

Platform

- Organization
- Branch
- User

Membership

- Member

HR

- Employee
- Trainer

Communication

- Notification

Reporting

- Scheduling Metrics

---

# Transaction Boundaries

Each aggregate maintains its own transactional consistency.

Cross-domain collaboration occurs through identifiers and published events.

---

# End of Document