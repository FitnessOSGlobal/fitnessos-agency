# ATTENDANCE ENTITY CATALOG

Version: 1.0.0

Status: Draft

Owner: Database Architecture

---

# Purpose

This document defines every entity owned by the Attendance Domain.

Each entity includes its purpose, ownership, lifecycle, and relationships.

Entities are grouped by aggregate ownership.

---

# Aggregate: Attendance Session

## Entity

Attendance Session

### Purpose

Represents a complete member visit from check-in until check-out.

### Lifecycle

Created

↓

Active

↓

Completed

↓

Archived

### Owns

- Session Identifier
- Organization Reference
- Branch Reference
- Member Reference
- Membership Reference
- Check-In Timestamp
- Check-Out Timestamp
- Visit Duration
- Session Status

### Relationships

One Session

↓

Many Attendance Events

---

# Aggregate: Attendance Event

## Entity

Attendance Event

### Purpose

Represents a business event generated during an attendance session.

### Lifecycle

Created

↓

Recorded

↓

Archived

### Owns

- Event Identifier
- Session Reference
- Event Type
- Event Timestamp
- Validation Result
- Device Reference
- Operator Reference

### Relationships

Many Events

↓

One Attendance Session

---

# Aggregate: Access Device

## Entity

Access Device

### Purpose

Represents a physical or digital access control device.

### Lifecycle

Registered

↓

Active

↓

Maintenance

↓

Retired

### Owns

- Device Identifier
- Device Name
- Device Type
- Branch Reference
- Firmware Version
- Status

### Relationships

One Device

↓

Many Attendance Events

---

# Aggregate: Gate Event

## Entity

Gate Event

### Purpose

Stores raw access events received from scanners, turnstiles, biometric devices, and mobile readers.

### Lifecycle

Captured

↓

Processed

↓

Archived

### Owns

- Gate Event Identifier
- Device Reference
- Session Reference
- Raw Payload
- Authentication Result
- Device Timestamp
- Synchronization Status

### Relationships

Many Gate Events

↓

One Attendance Session

---

# Cross-Domain References

References to:

Platform

- Organization
- Branch
- User

Membership

- Member
- Membership

Attendance never owns these entities.

---

# Entity Ownership Summary

Attendance owns:

- Attendance Session
- Attendance Event
- Access Device
- Gate Event

Attendance references:

- Organization
- Branch
- User
- Member
- Membership

---

# Future Entities

The model allows future entities including:

- Visitor Session
- Occupancy Snapshot
- Parking Session
- Smart Lock Event
- Wearable Access Event
- Facility Zone Entry

These entities can be added without modifying existing ownership rules.

---

# End