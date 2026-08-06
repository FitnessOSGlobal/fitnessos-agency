# AGGREGATE MODEL

| Property | Value |
|----------|-------|
| Project | FitnessOS |
| Domain | Membership |
| Document | Aggregate Model |
| Version | 1.0.0 |
| Status | Draft |
| Owner | Membership Domain |
| Classification | Domain Architecture |
| Last Updated | 2026-08-06 |
| Depends On | BUSINESS_ANALYSIS.md |
| Referenced By | ENTITY_CATALOG.md |

---

# Purpose

This document defines the Aggregate Model for the Membership domain using the FitnessOS enterprise aggregate standards.

It identifies the transactional consistency boundaries, aggregate ownership, business invariants, repositories, and aggregate interactions required to implement the Membership domain.

This document SHALL NOT define:

- Database tables
- PostgreSQL implementation
- REST APIs
- User interfaces
- Infrastructure

Those concerns are defined in later architectural documents.

---

# Aggregate Overview

The Membership domain contains three Aggregate Roots.

| Aggregate | Responsibility |
|-----------|----------------|
| Member Aggregate | Maintain member identity consistency |
| Membership Aggregate | Maintain membership agreement consistency |
| Membership Plan Aggregate | Maintain reusable membership product consistency |

Each aggregate owns one transactional consistency boundary.

No aggregate shares ownership with another aggregate.

---

# Member Aggregate

## Responsibility

Maintain the operational identity of a member throughout their relationship with the organization.

---

## Aggregate Root

Member

---

## Owns

- Personal Information
- Contact Information
- Address
- Emergency Contacts
- Medical Information
- Identity Documents
- Preferences
- Notes
- Tags

---

## References

- Organization Identifier
- Branch Identifier

---

## Consistency Boundary

All business operations affecting member identity SHALL remain consistent within the Member Aggregate.

---

## Business Invariants

- A Member SHALL belong to exactly one Organization.
- A Member SHALL remain identifiable regardless of Membership status.
- Member identity SHALL remain unique within the Organization.
- Historical identity changes SHALL remain auditable.

---

## Business Commands

- Register Member
- Update Member Profile
- Update Contact Information
- Update Preferences
- Archive Member
- Restore Member

---

## Domain Events

- Member Registered
- Member Profile Updated
- Member Archived
- Member Restored

---

## Repository

MemberRepository

---

# Membership Aggregate

## Responsibility

Maintain the complete lifecycle and contractual consistency of a membership agreement.

---

## Aggregate Root

Membership

---

## Owns

- Membership Agreement
- Membership Benefits
- Membership Status
- Freeze History
- Renewal History
- Upgrade History
- Downgrade History
- Suspension History
- Cancellation History

---

## References

- Member Identifier
- Membership Plan Identifier

---

## Consistency Boundary

All operations affecting a membership agreement SHALL remain consistent within the Membership Aggregate.

---

## Business Invariants

- Every Membership SHALL belong to exactly one Member.
- Every Membership SHALL reference exactly one Membership Plan.
- Only Active Memberships SHALL provide operational entitlement.
- Historical Membership information SHALL remain immutable.

---

## Business Commands

- Create Membership
- Activate Membership
- Renew Membership
- Freeze Membership
- Suspend Membership
- Upgrade Membership
- Downgrade Membership
- Cancel Membership
- Expire Membership

---

## Domain Events

- Membership Created
- Membership Activated
- Membership Renewed
- Membership Frozen
- Membership Suspended
- Membership Upgraded
- Membership Downgraded
- Membership Cancelled
- Membership Expired

---

## Repository

MembershipRepository

---

# Membership Plan Aggregate

## Responsibility

Maintain reusable membership products offered by the organization.

---

## Aggregate Root

Membership Plan

---

## Owns

- Plan Definition
- Duration
- Pricing Rules
- Benefits
- Eligibility Rules
- Access Policies
- Availability Rules

---

## References

None

---

## Consistency Boundary

All configuration changes affecting a Membership Plan SHALL remain consistent within the Membership Plan Aggregate.

---

## Business Invariants

- A Membership Plan SHALL be reusable.
- Retiring a Membership Plan SHALL NOT invalidate historical Memberships.
- Membership Plans SHALL NOT contain operational member data.

---

## Business Commands

- Create Membership Plan
- Update Membership Plan
- Activate Membership Plan
- Retire Membership Plan

---

## Domain Events

- Membership Plan Created
- Membership Plan Updated
- Membership Plan Activated
- Membership Plan Retired

---

## Repository

MembershipPlanRepository

---

# Aggregate Relationships

The Membership domain aggregates collaborate while maintaining independent ownership.

```
Membership Plan
        │
        │ defines
        ▼
Membership
        │
        │ belongs to
        ▼
Member
```

Ownership SHALL remain independent.

Aggregates SHALL reference one another using immutable identifiers.

Cross-aggregate consistency SHALL be coordinated through application services and domain events.

---

# Cross-Aggregate Communication

The Membership domain follows the FitnessOS enterprise aggregate communication standards.

Aggregates SHALL communicate using one of the following mechanisms:

- Aggregate Identifiers
- Domain Events
- Application Services

Aggregates SHALL NOT directly modify the internal state of another aggregate.

---

# Repository Responsibilities

Each Aggregate Root SHALL have exactly one repository.

| Aggregate | Repository |
|-----------|------------|
| Member | MemberRepository |
| Membership | MembershipRepository |
| Membership Plan | MembershipPlanRepository |

Repositories SHALL persist complete aggregate state while preserving aggregate boundaries.

---

# Aggregate Design Validation

The Membership Aggregate Model is considered complete when:

- Aggregate Roots are clearly identified.
- Aggregate ownership is unambiguous.
- Transaction boundaries are defined.
- Business invariants are documented.
- Aggregate relationships preserve ownership.
- Repository responsibilities are defined.
- The model complies with the enterprise Aggregate Model standard.

---

# Shared Standards

This document adopts the enterprise standards defined in:

- `product/database/AGGREGATE_MODEL.md`
- Business Glossary
- Enum Catalog
- PostgreSQL Standards
- Naming Reference

No enterprise standards are duplicated within this document.

---

# Next Document

ENTITY_CATALOG.md

---

# End of Aggregate Model