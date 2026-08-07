# SCHEDULING DATABASE DOMAIN

Version: 1.0.0

Status: Draft

Owner: Database Architecture

---

# Purpose

This directory contains the complete database design for the Scheduling Domain.

The Scheduling Domain is the authoritative owner of all scheduling-related business data within FitnessOS. It manages calendars, classes, appointments, trainer assignments, resource allocation, bookings, recurring schedules, and availability.

The domain coordinates time-based operations across members, employees, facilities, and organizational resources.

---

# Scope

The Scheduling Domain includes:

- Calendars
- Class Templates
- Classes
- Sessions
- Bookings
- Trainer Assignments
- Resource Scheduling
- Room Scheduling
- Equipment Reservations
- Availability
- Time Slots
- Recurring Schedules
- Waitlists

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

- Platform Domain
- Membership Domain
- HR Domain

Referenced By

- Communication
- Reporting
- AI

---

# Database Schema

scheduling

---

# Ownership

The Scheduling Domain owns all scheduling persistence objects.

Other domains reference scheduling entities using identifiers only.

---

# Status

Implementation Ready after approval.

---

# End of Document