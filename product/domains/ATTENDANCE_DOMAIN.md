# FITNESSOS DOMAIN IMPLEMENTATION CONTRACT

# Attendance Domain

Version: 2.0.0

Status: Architecture Approved

Owner: Attendance Engineering

Depends On:

- FITNESSOS_MASTER_SPECIFICATION.md
- PRODUCT_DECISIONS.md
- ORGANIZATION_MODEL.md
- DOMAIN_ARCHITECTURE.md
- INFORMATION_ARCHITECTURE.md
- API_ARCHITECTURE.md
- EVENT_ARCHITECTURE.md
- SECURITY_ARCHITECTURE.md
- PLATFORM_DOMAIN.md
- MEMBERSHIP_DOMAIN.md

---

# Executive Summary

The Attendance Domain manages member access, check-in, check-out, occupancy tracking, and attendance history.

It is the authoritative source for attendance records throughout FitnessOS.

The Attendance Domain determines whether a member may enter a facility based on information supplied by other domains but never changes business information owned by those domains.

Attendance records represent historical facts and remain permanently auditable.

---

# Purpose

Provide reliable attendance management for every organization while maintaining accurate historical records of facility access.

Attendance exists to record member presence.

It does not own memberships, payments, bookings, or authentication.

---

# Scope

The Attendance Domain owns:

- Attendance Records
- Check-In Events
- Check-Out Events
- Access Attempts
- Facility Occupancy
- Attendance History
- Attendance Sessions
- Attendance Validation Results
- Access Devices (logical ownership)
- Attendance Exceptions

---

# Responsibilities

The Attendance Domain is responsible for:

## Member Check-In

Recording successful member entry into a facility.

---

## Member Check-Out

Recording member departure.

---

## Attendance Validation

Determining whether attendance is permitted by evaluating information supplied by:

- Membership Domain
- Platform Domain
- Scheduling Domain (where applicable)

Attendance validates.

Attendance never changes those domains.

---

## Occupancy Management

Maintaining current facility occupancy.

Examples:

- Members currently inside
- Capacity monitoring
- Peak occupancy
- Historical occupancy

---

## Attendance History

Maintaining a permanent historical record of attendance.

Attendance history must remain immutable.

---

## Attendance Exceptions

Recording exceptional situations including:

- Duplicate check-in
- Invalid membership
- Blocked access
- Expired membership
- Manual override

---

# Out of Scope

The Attendance Domain does NOT own:

- Members
- Memberships
- Membership Plans
- Payments
- Invoices
- Products
- Employees
- Schedules
- Notifications
- Authentication
- Authorization

These belong to their respective domains.

---

# Client Applications

Attendance services are consumed by:

- Staff Web Application
- Staff Mobile Application
- Gym Owner Web Application
- Member Mobile Application
- Self Check-In Kiosks (future)

---

# Domain Relationships

## Provides Services To

- Reporting Domain
- AI Domain
- Commerce Domain
- Communication Domain

---

## Depends On

- Platform Domain
- Membership Domain
- Scheduling Domain

Attendance validates information owned by these domains but never modifies it.

---

# Architecture Principles

The Attendance Domain follows these principles:

- Attendance records are immutable.
- Check-ins are historical facts.
- Attendance never changes membership status.
- Attendance never processes payments.
- Attendance is event-driven.
- Attendance validation is deterministic.
- Tenant isolation is mandatory.
- Audit by default.

---

# End of Part 1

---

# Business Capabilities

The Attendance Domain provides the complete set of business capabilities required to manage member attendance and facility access.

Attendance records operational activity but does not own the business entities that determine eligibility.

---

## Check-In Management

Provides:

- Member Check-In
- Staff Assisted Check-In
- Self Check-In
- Manual Check-In
- Rejected Check-In Recording

Every successful check-in creates an immutable attendance record.

---

## Check-Out Management

Provides:

- Member Check-Out
- Manual Check-Out
- Automatic Check-Out (future)

Every check-out completes an attendance session.

---

## Attendance Validation

Validates attendance eligibility using information supplied by other domains.

Validation may include:

- Active Membership
- Branch Access
- Facility Access
- Time Restrictions
- Class Eligibility (future)
- Capacity Restrictions

Attendance validates but never modifies external information.

---

## Occupancy Management

Provides:

- Current Occupancy
- Peak Occupancy
- Capacity Monitoring
- Occupancy History

---

## Attendance History

Maintains a complete historical record of attendance.

History supports:

- Reporting
- Auditing
- Business Intelligence
- AI Analytics

Attendance history is immutable.

---

## Attendance Exception Management

Provides:

- Duplicate Check-In Detection
- Invalid Membership Detection
- Expired Membership Detection
- Manual Override Recording
- Access Denial Recording

All exceptions are permanently auditable.

---

# Business Rules

The Attendance Domain enforces the following rules.

## Rule 1

Every attendance record belongs to exactly one member.

---

## Rule 2

Every attendance record belongs to exactly one branch.

---

## Rule 3

A member cannot have multiple active attendance sessions within the same branch unless explicitly permitted by organizational policy.

---

## Rule 4

Attendance validation must occur before a successful check-in is recorded.

---

## Rule 5

Attendance never activates, renews, freezes, upgrades, or cancels memberships.

Those actions belong exclusively to the Membership Domain.

---

## Rule 6

Attendance records are immutable.

Corrections are recorded through adjustment records or administrative actions rather than modifying historical records.

---

## Rule 7

Every attendance event is auditable.

---

## Rule 8

Attendance must respect tenant isolation.

Members may only attend facilities belonging to their authorized organization unless reciprocal access is explicitly configured.

---

## Rule 9

Manual overrides require elevated permissions and must record the responsible user and reason.

---

## Rule 10

Rejected access attempts are recorded for audit and operational analysis.

---

# Attendance Lifecycle

Attendance follows the lifecycle below.

```
Attendance Requested
        │
        ▼
Validation
        │
 ┌──────┴─────────┐
 │                │
 ▼                ▼
Rejected      Check-In
                    │
                    ▼
             Attendance Active
                    │
                    ▼
               Check-Out
                    │
                    ▼
            Attendance Closed
```

The Attendance Domain owns this lifecycle.

Membership status is referenced during validation but remains owned by the Membership Domain.

---

# Canonical Business Entities

The Attendance Domain owns:

- Attendance Record
- Attendance Session
- Check-In Event
- Check-Out Event
- Attendance Validation
- Attendance Exception
- Occupancy Record
- Access Attempt

No other domain may own these entities.

---

# Entity Ownership

The Attendance Domain is the authoritative source for attendance information.

Other domains may consume attendance information through APIs and published events but must never redefine or modify attendance records.

---

# End of Part 2

---

# Public Attendance Services

The Attendance Domain exposes reusable business services responsible for recording and validating attendance.

Business services encapsulate attendance rules while remaining independent of client applications.

---

## Check-In Service

Provides:

- Member Check-In
- Staff Assisted Check-In
- Self Check-In
- Manual Override Check-In
- Duplicate Check-In Prevention

Successful check-ins create immutable attendance records.

---

## Check-Out Service

Provides:

- Member Check-Out
- Staff Assisted Check-Out
- Manual Check-Out
- Automatic Session Closure (future)

Every attendance session must eventually be completed.

---

## Attendance Validation Service

Provides:

- Membership Eligibility Validation
- Branch Validation
- Facility Validation
- Time Restriction Validation
- Capacity Validation
- Access Rule Validation

Validation consumes information from other domains without modifying it.

---

## Attendance Session Service

Provides:

- Attendance Session Creation
- Attendance Session Retrieval
- Attendance Session Closure
- Session Duration Calculation

---

## Occupancy Service

Provides:

- Current Occupancy
- Occupancy History
- Capacity Monitoring
- Peak Occupancy Tracking

---

## Attendance History Service

Provides:

- Attendance Search
- Attendance Timeline
- Historical Attendance
- Attendance Analytics Source Data

---

## Attendance Exception Service

Provides:

- Duplicate Detection
- Invalid Access Recording
- Manual Override Recording
- Access Denial Recording
- Exception Review

---

# API Responsibilities

The Attendance Domain exposes APIs for:

- Attendance Records
- Attendance Sessions
- Check-In
- Check-Out
- Attendance Validation
- Occupancy
- Attendance Exceptions
- Attendance History

All APIs comply with API_ARCHITECTURE.md.

Attendance APIs never expose internal implementation details.

---

# Published Events

The Attendance Domain publishes business events including:

- MemberCheckedIn
- MemberCheckedOut
- AttendanceRecorded
- AttendanceClosed
- AttendanceRejected
- AttendanceExceptionRecorded
- OccupancyUpdated
- CapacityReached
- CapacityAvailable

Published events represent completed business actions.

---

# Consumed Events

The Attendance Domain consumes events from other domains where attendance processing depends on external information.

Examples include:

Membership Domain

- MembershipActivated
- MembershipRenewed
- MembershipFrozen
- MembershipCancelled
- MembershipExpired

Platform Domain

- BranchCreated
- FacilityCreated
- UserDeactivated

Scheduling Domain

- BookingConfirmed
- BookingCancelled
- SessionStarted (future)

Attendance consumes these events but never assumes ownership of the underlying business entities.

---

# Event Responsibilities

The Attendance Domain is responsible for:

- Publishing attendance events
- Maintaining event version compatibility
- Recording immutable attendance history
- Protecting attendance information
- Supporting downstream consumers through consistent event contracts

---

# Integration Responsibilities

The Attendance Domain supports integrations with:

- Biometric Devices
- RFID Readers
- QR Code Scanners
- Mobile Check-In
- Turnstiles
- Smart Gates
- Visitor Management Systems
- Analytics Platforms

All integrations must use approved APIs or published events.

Direct database integration is prohibited.

---

# Service Boundaries

The Attendance Domain must never implement:

- Membership lifecycle changes
- Payment processing
- Invoice generation
- Authentication
- Authorization
- Notification delivery
- Employee scheduling

These responsibilities remain with their owning domains.

---

# End of Part 3

---

# Permission Model

The Attendance Domain defines the business permissions required to manage attendance operations.

Authentication and authorization are enforced by the Platform Domain.

The Attendance Domain defines the required permissions for attendance-related actions.

---

## Attendance Administration

Examples:

- Record Check-In
- Record Check-Out
- Manual Check-In
- Manual Check-Out
- Override Attendance Validation
- Close Attendance Session
- Reopen Attendance Session

---

## Attendance History Permissions

Examples:

- View Attendance History
- Search Attendance
- Export Attendance Records
- View Occupancy History

---

## Occupancy Permissions

Examples:

- View Live Occupancy
- View Capacity Status
- View Facility Occupancy Dashboard

---

## Exception Management Permissions

Examples:

- View Attendance Exceptions
- Resolve Attendance Exceptions
- Record Manual Override
- View Access Denials

Manual overrides should always require elevated privileges.

---

# Security Responsibilities

The Attendance Domain follows the Security Architecture.

Responsibilities include:

- Protecting attendance records
- Enforcing organization ownership
- Respecting tenant isolation
- Recording audit events
- Preventing unauthorized attendance modifications

Attendance history is considered business-critical information.

---

# Tenant Boundaries

Attendance records belong exclusively to one organization.

Attendance information must never cross tenant boundaries.

Branch-specific attendance visibility must respect organizational permissions.

Cross-tenant reporting is prohibited unless explicitly supported by platform administration.

---

# UI Responsibilities

The Attendance Domain provides user interfaces for:

- Live Check-In
- Live Check-Out
- Attendance Dashboard
- Attendance Search
- Attendance History
- Occupancy Monitoring
- Attendance Exceptions
- Manual Attendance Administration

Business rules remain centralized within the Attendance Domain.

---

# Mobile Responsibilities

Mobile applications consume Attendance Domain services for:

- Mobile Check-In
- QR Check-In
- Attendance History
- Current Attendance Status
- Occupancy Information
- Digital Access Validation

Mobile clients never implement attendance business logic independently.

---

# Reporting Responsibilities

The Attendance Domain supplies operational data for reports including:

- Daily Attendance
- Weekly Attendance
- Monthly Attendance
- Peak Hours
- Occupancy Trends
- Attendance by Branch
- Attendance by Membership Plan
- Attendance Exceptions
- Average Visit Duration

Report generation remains the responsibility of the Reporting Domain.

---

# AI Responsibilities

The Attendance Domain supplies data for AI services including:

- Attendance forecasting
- Peak occupancy prediction
- Visit frequency analysis
- Member engagement scoring
- Attendance anomaly detection
- Capacity optimization

AI services analyze attendance data but never modify attendance records.

---

# Client Applications Using Attendance Services

The following applications consume Attendance Domain capabilities:

- Gym Owner Web Application
- Staff Web Application
- Staff Mobile Application
- Member Mobile Application
- Self Check-In Kiosk (future)
- Smart Access Devices (future)

Platform administration accesses Attendance APIs only for operational support and diagnostics.

---

# End of Part 4

---

# Non-Functional Requirements

The Attendance Domain must satisfy the following quality attributes.

## Availability

Attendance services should remain highly available during operating hours.

Temporary failures must not result in lost attendance records.

Where practical, attendance devices should support short-term offline operation with reliable synchronization.

---

## Scalability

The Attendance Domain must support:

- Single-location gyms
- Multi-branch organizations
- Franchise networks
- Enterprise fitness organizations

The architecture should scale to thousands of attendance events per hour without changes to business rules.

---

## Performance

Performance-sensitive operations include:

- Attendance validation
- Member check-in
- Member check-out
- Occupancy calculation
- Attendance search

Attendance validation should remain responsive to avoid delaying facility access.

---

## Reliability

Attendance processing must ensure:

- Transaction consistency
- Reliable event publication
- Retry mechanisms where appropriate
- Monitoring
- Failure recovery

Attendance records must never be silently lost.

---

## Security

The Attendance Domain follows the Security Architecture.

Responsibilities include:

- Protecting attendance history
- Enforcing organization ownership
- Respecting tenant isolation
- Auditing attendance operations
- Preventing unauthorized modifications

Attendance records are business-critical operational data.

---

## Maintainability

Attendance business rules should remain centralized within the Attendance Domain.

Client applications must not duplicate validation logic.

Future attendance technologies should integrate without changing core business rules.

---

## Extensibility

The Attendance Domain must support future capabilities including:

- Facial Recognition
- NFC Access
- Smart Watches
- Bluetooth Access
- Visitor Passes
- Temporary Access Credentials
- Multi-Facility Check-In
- Geo-Fenced Attendance

These capabilities must extend the existing attendance model without changing domain ownership.

---

# Future Database Implications

The Attendance Domain is expected to own persistent storage for:

- Attendance Records
- Attendance Sessions
- Check-In Events
- Check-Out Events
- Attendance Validation Results
- Attendance Exceptions
- Occupancy Records
- Access Attempts

Logical ownership is defined here.

Physical database design will be completed during the Database Architecture milestone.

---

# Future Service Boundaries

As FitnessOS evolves, the Attendance Domain may be implemented as multiple deployable services while remaining one logical business domain.

Potential service boundaries include:

- Check-In Service
- Check-Out Service
- Attendance Validation Service
- Attendance History Service
- Occupancy Service
- Exception Service

Deployment decisions must not alter business ownership or domain boundaries.

---

# Cross-Domain Responsibilities

The Attendance Domain provides authoritative attendance information to other domains.

Examples:

Membership Domain

- Attendance history reference

Commerce Domain

- Visit-based billing support (future)

Scheduling Domain

- Session attendance validation

Communication Domain

- Missed attendance reminders
- Attendance confirmations

Reporting Domain

- Attendance analytics

AI Domain

- Occupancy forecasting
- Visit pattern analysis
- Engagement scoring

Attendance information may be consumed by other domains but attendance records remain owned exclusively by the Attendance Domain.

---

# Acceptance Criteria

The Attendance Domain implementation contract is complete when:

- Domain responsibilities are clearly defined.
- Business boundaries are explicit.
- Attendance lifecycle is documented.
- Business capabilities are complete.
- Business rules are defined.
- Canonical entities are assigned.
- Public services are identified.
- API responsibilities are documented.
- Event responsibilities are documented.
- Permission requirements are documented.
- Security responsibilities are defined.
- Tenant boundaries are enforced.
- UI responsibilities are defined.
- Mobile responsibilities are defined.
- Reporting responsibilities are documented.
- AI responsibilities are documented.
- Non-functional requirements are defined.
- Future database implications are identified.
- Future service boundaries are documented.

---

# Domain Summary

The Attendance Domain is the authoritative source for all attendance-related operational information within FitnessOS.

It records and validates member presence while maintaining complete historical attendance information for operational reporting, analytics, AI, and auditing.

The Attendance Domain consumes membership information but never owns or modifies membership state.

This implementation contract serves as the reference specification for attendance management throughout the FitnessOS platform.

---

# End of Attendance Domain

Status: Architecture Complete

Milestone:

Complete Architecture

Document Classification:

Domain Implementation Contract