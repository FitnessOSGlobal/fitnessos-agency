# SCHEDULING LOGICAL DATABASE MODEL

Version: 1.0.0

Status: Draft

Owner: Database Architecture

---

# Purpose

This document defines the logical database model for the Scheduling Domain.

It establishes logical entities, relationships, ownership, normalization, lifecycle, and business constraints independent of implementation technology.

---

# Logical Entities

The Scheduling Domain consists of the following logical entities:

1. Calendar
2. Calendar Event
3. Class Template
4. Class Session
5. Booking
6. Booking Status
7. Trainer Assignment
8. Room Reservation
9. Equipment Reservation
10. Availability Schedule
11. Time Slot
12. Waitlist Entry

Each logical entity maps to one primary database table.

---

# Entity Relationships

Organization

↓

Calendar

↓

Calendar Event

↓

Class Template

↓

Class Session

↓

Booking

↓

Waitlist Entry

Class Session

↓

Trainer Assignment

↓

Room Reservation

↓

Equipment Reservation

Availability Schedule

↓

Time Slot

---

# Cardinality

| Parent | Child | Cardinality |
|---------|-------|------------:|
| Organization | Calendar | 1 : N |
| Calendar | Calendar Event | 1 : N |
| Class Template | Class Session | 1 : N |
| Class Session | Booking | 1 : N |
| Class Session | Trainer Assignment | 1 : N |
| Class Session | Room Reservation | 1 : N |
| Class Session | Equipment Reservation | 1 : N |
| Availability Schedule | Time Slot | 1 : N |
| Booking | Waitlist Entry | 1 : N |

---

# Normalization

Target normalization:

Third Normal Form (3NF)

Principles:

- Calendar data stored once.
- Class templates separated from class sessions.
- Bookings normalized.
- Resources normalized.
- Availability maintained independently.

---

# Multi-Tenant Model

Every logical business entity contains:

- organization_id

Tenant isolation is mandatory.

---

# Audit Model

Every logical entity includes:

- created_at
- updated_at
- created_by
- updated_by

Scheduling history additionally records immutable scheduling timestamps.

---

# Data Lifecycle

Calendar

Created

↓

Active

↓

Archived

Class Session

Scheduled

↓

Open

↓

In Progress

↓

Completed

↓

Cancelled

Booking

Pending

↓

Confirmed

↓

Checked In

↓

Completed

↓

Cancelled

↓

No Show

Trainer Assignment

Assigned

↓

Confirmed

↓

Completed

Availability Schedule

Created

↓

Published

↓

Retired

---

# Future Extensions

The logical model supports:

- AI Schedule Optimization
- Calendar Synchronization
- Facility Booking
- Court Reservations
- Tournament Scheduling
- Public Booking Portal

---

# End of Document