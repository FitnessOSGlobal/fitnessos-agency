# SCHEDULING ENTITY CATALOG

Version: 1.0.0

Status: Draft

Owner: Database Architecture

---

# Purpose

This document defines every entity owned by the Scheduling Domain.

The Scheduling Domain is the authoritative owner of all scheduling, booking, resource allocation, and calendar entities.

---

# Aggregate — Calendar

## Entity

Calendar

### Purpose

Represents an organizational scheduling calendar.

### Owns

- Name
- Calendar Type
- Time Zone
- Status

---

## Entity

Calendar Event

### Purpose

Represents scheduled events within a calendar.

---

# Aggregate — Class

## Entity

Class Template

### Purpose

Defines reusable class configurations.

---

## Entity

Class Session

### Purpose

Represents an individual scheduled class occurrence.

---

# Aggregate — Booking

## Entity

Booking

### Purpose

Represents a member reservation.

---

## Entity

Booking Status

### Purpose

Tracks booking lifecycle.

States include:

- Pending
- Confirmed
- Checked In
- Cancelled
- No Show

---

# Aggregate — Resources

## Entity

Trainer Assignment

### Purpose

Assigns trainers to scheduled sessions.

---

## Entity

Room Reservation

### Purpose

Allocates rooms for scheduled activities.

---

## Entity

Equipment Reservation

### Purpose

Allocates equipment for scheduled sessions.

---

# Aggregate — Availability

## Entity

Availability Schedule

### Purpose

Defines resource availability.

---

## Entity

Time Slot

### Purpose

Represents bookable periods.

---

# Aggregate — Waitlist

## Entity

Waitlist Entry

### Purpose

Maintains booking priority when sessions are full.

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

- Schedule Metrics

---

# Ownership Summary

Scheduling owns:

- Calendars
- Calendar Events
- Class Templates
- Class Sessions
- Bookings
- Booking Status
- Trainer Assignments
- Room Reservations
- Equipment Reservations
- Availability Schedules
- Time Slots
- Waitlists

Scheduling references:

- Organization
- Member
- Employee

---

# Future Entities

Supports future additions:

- Facility Reservations
- Court Reservations
- Tournament Scheduling
- Multi-Resource Booking
- Calendar Synchronization

---

# End of Document