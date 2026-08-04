# FITNESSOS AGGREGATE MODEL

Version: 1.0.0

Status: Architecture Approved

Owner: Platform Architecture

Depends On:

- FITNESSOS_MASTER_SPECIFICATION.md
- PRODUCT_DECISIONS.md
- ORGANIZATION_MODEL.md
- DOMAIN_ARCHITECTURE.md
- INFORMATION_ARCHITECTURE.md
- DATABASE_ARCHITECTURE.md
- All Domain Implementation Contracts

---

# Executive Summary

This document defines the aggregate model for FitnessOS.

Aggregates provide the consistency and transactional boundaries between the business architecture and the persistence model.

Every aggregate belongs to exactly one domain, owns one consistency boundary, and is responsible for maintaining its business invariants.

The aggregate model governs all future entities, schemas, repositories, application services, and database transactions.

---

# Purpose

The purpose of this document is to define:

- Aggregate philosophy
- Aggregate ownership
- Aggregate boundaries
- Aggregate roots
- Aggregate communication
- Aggregate lifecycle
- Aggregate consistency
- Aggregate catalog

This document serves as the authoritative reference for aggregate design throughout FitnessOS.

---

# Aggregate Philosophy

FitnessOS follows Domain-Driven Design aggregate principles.

Aggregates represent business consistency boundaries rather than database relationships.

Aggregates are derived from business transactions.

Database implementation follows aggregate design.

---

# What is an Aggregate?

An aggregate is a cluster of related business objects that are treated as a single unit for consistency.

Every aggregate has:

- One Aggregate Root
- One transaction boundary
- One owner
- One lifecycle
- One consistency boundary

External domains communicate only through the Aggregate Root.

---

# Aggregate Objectives

The aggregate model provides:

- Transactional consistency
- Business integrity
- Clear ownership
- Predictable persistence
- Encapsulation
- Scalability
- Maintainability

---

# Aggregate Principles

## Principle 1

One aggregate belongs to one domain.

---

## Principle 2

One aggregate has exactly one Aggregate Root.

---

## Principle 3

Business invariants are enforced inside the aggregate.

---

## Principle 4

Aggregates communicate using identifiers, APIs, and business events.

---

## Principle 5

Aggregates never share ownership.

---

## Principle 6

Aggregate size should remain small enough to support efficient transactions.

---

## Principle 7

Aggregate boundaries follow business consistency rather than database normalization.

---

## Principle 8

Database tables never determine aggregate boundaries.

---

## Principle 9

Aggregate Roots protect internal consistency.

---

## Principle 10

External systems never modify aggregate internals directly.

---

# Aggregate Responsibilities

An aggregate is responsible for:

- Business validation
- Consistency enforcement
- Transaction coordination
- Lifecycle management
- Event publication
- State transitions

Aggregates are not responsible for:

- UI
- APIs
- Reporting
- AI
- Integration
- Infrastructure

---

# Aggregate Ownership

Ownership follows the approved Domain Architecture.

Every aggregate belongs to exactly one domain.

No aggregate may belong to multiple domains.

---

# Aggregate Layers

The aggregate architecture follows this hierarchy.

```
Business Domain
        │
        ▼
Aggregate
        │
        ▼
Aggregate Root
        │
        ▼
Business Entities
        │
        ▼
Persistence
```

Each layer derives from the layer above.

---

# Aggregate Lifecycle

Every aggregate follows a business lifecycle.

```
Created
      │
      ▼
Validated
      │
      ▼
Active
      │
 ┌────┴─────┐
 ▼          ▼
Updated   Archived
```

The lifecycle is owned by the Aggregate Root.

---

# End of Part 1

---

# Aggregate Ownership Rules

Aggregate ownership follows the approved Domain Architecture.

Each aggregate has exactly one owning domain.

Ownership never changes during the aggregate lifecycle.

Business ownership determines aggregate ownership.

---

# Aggregate Ownership Principles

## Rule 1

One aggregate belongs to one domain.

---

## Rule 2

One Aggregate Root governs the aggregate.

---

## Rule 3

Aggregate ownership never spans multiple domains.

---

## Rule 4

Business rules are enforced inside the aggregate.

---

## Rule 5

Only the Aggregate Root may modify aggregate state.

---

# Aggregate Root Responsibilities

The Aggregate Root is responsible for:

- Maintaining business invariants
- Coordinating state transitions
- Protecting internal entities
- Validating business operations
- Publishing business events
- Preserving transactional consistency

External consumers never modify internal entities directly.

---

# Aggregate Communication

Aggregates communicate through approved architectural mechanisms.

Communication methods include:

- Public APIs
- Business Events
- Aggregate Identifiers

Aggregates never communicate through shared persistence.

---

# Communication Principles

## Principle 1

Aggregates reference other aggregates by identifier only.

---

## Principle 2

Aggregates never hold ownership of external aggregate entities.

---

## Principle 3

Cross-domain communication uses APIs or business events.

---

## Principle 4

Aggregate communication preserves domain ownership.

---

## Principle 5

Communication must not violate transaction boundaries.

---

# Transaction Boundaries

Each aggregate defines one consistency boundary.

Business transactions should normally remain inside one aggregate.

Examples:

Membership Activation

```
Membership Aggregate

Member
Membership
Membership Status
```

One transaction.

---

Attendance Check-In

```
Attendance Aggregate

Attendance Session
Attendance Record
```

One transaction.

---

Invoice Payment

```
Commerce Aggregate

Invoice
Payment
Receipt
```

One transaction.

---

Cross-domain workflows coordinate through events rather than shared database transactions.

---

# Aggregate References

Aggregates may reference other aggregates only by immutable identifier.

Examples:

A Booking references:

- Member Identifier
- Trainer Identifier

It does not own Member or Employee entities.

Ownership remains with the Membership and HR domains.

---

# Aggregate Consistency

The Aggregate Root guarantees:

- Valid business state
- Valid lifecycle transitions
- Internal consistency
- Business rule enforcement

External systems cannot bypass these guarantees.

---

# Aggregate Lifecycle Ownership

Each aggregate owns its own lifecycle.

Typical lifecycle:

```
Created
      │
      ▼
Validated
      │
      ▼
Active
      │
 ┌────┴────┐
 ▼         ▼
Updated Archived
```

Lifecycle rules are domain-specific but always governed by the Aggregate Root.

---

# Aggregate Anti-Patterns

The following are prohibited:

- Aggregates with multiple roots
- Cross-domain aggregates
- Shared aggregate ownership
- Cross-domain database transactions
- External modification of aggregate internals
- Aggregates based solely on table relationships
- Oversized aggregates containing unrelated business concepts

---

# Aggregate Quality Attributes

A well-designed aggregate should exhibit:

- High cohesion
- Clear ownership
- Small transaction scope
- Strong consistency
- Encapsulation
- Predictable lifecycle
- Explicit business invariants

These characteristics support maintainable and scalable systems.

---

# End of Part 2

---

# Aggregate Catalog

The following aggregates have been identified for FitnessOS.

Each aggregate belongs to exactly one domain.

Each aggregate owns one transactional consistency boundary.

Future entities will belong to one of these aggregates.

---

# Platform Domain

## Organization Aggregate

Aggregate Root:

Organization

Responsibilities:

- Organization lifecycle
- Organization configuration
- Organization ownership

---

## Branch Aggregate

Aggregate Root:

Branch

Responsibilities:

- Branch lifecycle
- Branch configuration

---

## User Aggregate

Aggregate Root:

User

Responsibilities:

- User lifecycle
- Identity metadata
- Role assignment

---

## Role Aggregate

Aggregate Root:

Role

Responsibilities:

- Permission assignment
- Access policies

---

# CRM Domain

## Lead Aggregate

Aggregate Root:

Lead

Responsibilities:

- Lead lifecycle
- Qualification
- Conversion

---

## Opportunity Aggregate

Aggregate Root:

Opportunity

Responsibilities:

- Opportunity lifecycle
- Sales progression

---

# Membership Domain

## Membership Aggregate

Aggregate Root:

Membership

Responsibilities:

- Member lifecycle
- Membership lifecycle
- Membership status

---

## Membership Plan Aggregate

Aggregate Root:

Membership Plan

Responsibilities:

- Plan definition
- Pricing
- Benefits
- Eligibility

---

# Attendance Domain

## Attendance Aggregate

Aggregate Root:

Attendance Session

Responsibilities:

- Check-in
- Check-out
- Attendance history

---

# Commerce Domain

## Product Aggregate

Aggregate Root:

Product

Responsibilities:

- Product lifecycle
- Pricing
- Availability

---

## Invoice Aggregate

Aggregate Root:

Invoice

Responsibilities:

- Invoice lifecycle
- Billing
- Financial totals

---

## Payment Aggregate

Aggregate Root:

Payment

Responsibilities:

- Payment lifecycle
- Settlement
- Payment status

---

## Refund Aggregate

Aggregate Root:

Refund

Responsibilities:

- Refund lifecycle
- Financial adjustments

---

# Inventory Domain

## Inventory Aggregate

Aggregate Root:

Inventory Item

Responsibilities:

- Stock lifecycle
- Inventory status

---

## Purchase Order Aggregate

Aggregate Root:

Purchase Order

Responsibilities:

- Procurement
- Supplier ordering

---

# HR Domain

## Employee Aggregate

Aggregate Root:

Employee

Responsibilities:

- Employee lifecycle
- Employment status

---

## Leave Aggregate

Aggregate Root:

Leave Request

Responsibilities:

- Leave lifecycle
- Approval workflow

---

# Scheduling Domain

## Class Aggregate

Aggregate Root:

Class

Responsibilities:

- Class lifecycle
- Capacity
- Availability

---

## Booking Aggregate

Aggregate Root:

Booking

Responsibilities:

- Booking lifecycle
- Reservation status

---

# Communication Domain

## Notification Aggregate

Aggregate Root:

Notification

Responsibilities:

- Notification lifecycle
- Delivery status

---

## Campaign Aggregate

Aggregate Root:

Campaign

Responsibilities:

- Broadcast lifecycle
- Delivery coordination

---

# Reporting Domain

## Dashboard Aggregate

Aggregate Root:

Dashboard

Responsibilities:

- Dashboard lifecycle
- KPI organization

---

## Report Aggregate

Aggregate Root:

Report Definition

Responsibilities:

- Report lifecycle
- Report generation

---

# AI Domain

## Recommendation Aggregate

Aggregate Root:

Recommendation

Responsibilities:

- Recommendation lifecycle
- Recommendation history

---

## Prediction Aggregate

Aggregate Root:

Prediction

Responsibilities:

- Prediction lifecycle
- Confidence tracking

---

## Conversation Aggregate

Aggregate Root:

Conversation

Responsibilities:

- AI conversations
- Context history

---

# Integration Domain

## Connector Aggregate

Aggregate Root:

Connector

Responsibilities:

- Connector lifecycle
- Connectivity

---

## Synchronization Aggregate

Aggregate Root:

Synchronization Job

Responsibilities:

- Synchronization lifecycle
- Synchronization history

---

## Import Aggregate

Aggregate Root:

Import Job

Responsibilities:

- Import lifecycle
- Import validation

---

## Export Aggregate

Aggregate Root:

Export Job

Responsibilities:

- Export lifecycle
- Export history

---

# Aggregate Ownership Matrix

| Domain | Aggregates |
|----------|------------|
| Platform | Organization, Branch, User, Role |
| CRM | Lead, Opportunity |
| Membership | Membership, Membership Plan |
| Attendance | Attendance |
| Commerce | Product, Invoice, Payment, Refund |
| Inventory | Inventory, Purchase Order |
| HR | Employee, Leave |
| Scheduling | Class, Booking |
| Communication | Notification, Campaign |
| Reporting | Dashboard, Report |
| AI | Recommendation, Prediction, Conversation |
| Integration | Connector, Synchronization, Import, Export |

---

# End of Part 3

---

# Aggregate Relationships

Aggregates collaborate while preserving independent ownership.

Relationships represent business collaboration rather than shared persistence.

Each aggregate remains independently consistent.

---

# Relationship Principles

## Principle 1

Aggregates reference each other by immutable identifier only.

---

## Principle 2

Relationships never imply ownership.

---

## Principle 3

Cross-aggregate communication occurs through:

- Public APIs
- Business Events
- Aggregate Identifiers

---

## Principle 4

Database relationships must never bypass aggregate boundaries.

---

## Principle 5

Business consistency remains the responsibility of the owning aggregate.

---

# Aggregate Communication Patterns

FitnessOS supports three communication patterns.

## Pattern 1 — Direct API

Used when:

- Immediate business validation is required.
- Synchronous response is required.

Example:

```
CRM

↓

Membership API

↓

Membership Aggregate
```

---

## Pattern 2 — Business Event

Used when:

- Multiple domains react.
- Immediate response is not required.
- Eventual consistency is acceptable.

Example:

```
Membership Activated

↓

Communication

↓

Reporting

↓

AI

↓

Integration
```

---

## Pattern 3 — Identifier Reference

Used when:

- One aggregate needs to reference another.
- Ownership remains unchanged.

Example:

```
Booking

references

Member ID
Trainer ID
```

---

# Aggregate Lifecycle Principles

Every aggregate controls its own lifecycle.

Typical lifecycle:

```
Created
      │
      ▼
Validated
      │
      ▼
Active
      │
 ┌────┴──────────┐
 ▼               ▼
Updated      Archived
```

Lifecycle transitions are governed by the Aggregate Root.

---

# Aggregate State Transitions

Aggregate state transitions must:

- Preserve business invariants.
- Maintain consistency.
- Publish business events where appropriate.
- Remain auditable.

State transitions never bypass Aggregate Root validation.

---

# Cross-Aggregate Consistency

FitnessOS favors eventual consistency across aggregates.

Each aggregate remains immediately consistent within its own transaction boundary.

Cross-aggregate workflows coordinate through APIs and events.

Distributed business processes must not require shared database transactions.

---

# Consistency Principles

## Rule 1

Strong consistency exists inside an aggregate.

---

## Rule 2

Eventual consistency exists across aggregates.

---

## Rule 3

Aggregate ownership is never compromised for transactional convenience.

---

## Rule 4

Failures in one aggregate must not corrupt another aggregate.

---

## Rule 5

Business recovery occurs through business workflows rather than database rollback across domains.

---

# Aggregate Independence

Aggregates should remain independently deployable in the future.

Current implementation may be a modular monolith.

Future implementation may separate aggregates into independent services.

Aggregate boundaries must support both architectures.

---

# Aggregate Scalability

Aggregates should support:

- High transaction volume
- Independent optimization
- Independent scaling
- Independent persistence evolution
- Independent lifecycle management

Scalability follows aggregate ownership.

---

# Aggregate Governance

Future aggregate changes require architectural review.

Examples include:

- New Aggregate Roots
- Aggregate boundary changes
- Aggregate merges
- Aggregate splits
- Cross-domain ownership changes

Aggregate governance protects long-term architectural consistency.

---

# End of Part 4

---

# Aggregate Quality Attributes

A well-designed aggregate should exhibit the following characteristics.

## High Cohesion

Business concepts within an aggregate belong together because they participate in the same business transaction.

---

## Low Coupling

Aggregates communicate through approved architectural mechanisms rather than shared persistence.

---

## Clear Ownership

Every aggregate has:

- One owner
- One Aggregate Root
- One lifecycle
- One consistency boundary

Ownership must remain unambiguous.

---

## Strong Business Integrity

Aggregates enforce:

- Business rules
- Business invariants
- State transitions
- Lifecycle consistency

Business correctness is the primary responsibility of the Aggregate Root.

---

## Transactional Consistency

Every aggregate defines one transactional consistency boundary.

Cross-aggregate transactions should be avoided.

Business workflows spanning multiple aggregates coordinate through APIs and business events.

---

## Encapsulation

Internal aggregate entities remain private to the Aggregate Root.

External consumers interact only through approved business operations.

---

## Predictable Evolution

Aggregates should evolve independently.

Future enhancements should preserve:

- Aggregate ownership
- Business boundaries
- Transaction boundaries
- Public contracts

---

# Aggregate Evolution Strategy

Aggregate evolution should remain incremental.

Examples include:

- Adding internal entities
- Adding business rules
- Introducing new lifecycle states
- Publishing additional business events

Evolution must not violate existing ownership boundaries.

---

# Aggregate Refactoring Principles

Aggregate boundaries may evolve only when:

- Business understanding changes.
- New business capabilities emerge.
- Existing boundaries are demonstrably incorrect.

Technical convenience alone is not sufficient justification.

---

# Aggregate Governance

Changes requiring architectural review include:

- New Aggregate Roots
- Aggregate merges
- Aggregate splits
- Cross-domain ownership changes
- Changes to transaction boundaries
- Changes to aggregate communication patterns

Governance preserves long-term architectural integrity.

---

# Aggregate Readiness for Implementation

An aggregate is considered implementation-ready when:

- Ownership is defined.
- Aggregate Root is identified.
- Transaction boundary is defined.
- Lifecycle is documented.
- Communication patterns are defined.
- Business invariants are understood.
- Cross-aggregate references are identified.

Implementation details remain separate from architectural decisions.

---

# Acceptance Criteria

The Aggregate Model is complete when:

- Aggregate philosophy is documented.
- Aggregate ownership is defined.
- Aggregate boundaries are documented.
- Aggregate Root responsibilities are defined.
- Aggregate communication is documented.
- Transaction boundaries are defined.
- Aggregate lifecycle is documented.
- Aggregate catalog is complete.
- Aggregate relationships are documented.
- Aggregate consistency principles are defined.
- Aggregate governance is documented.
- Aggregate evolution strategy is defined.
- Quality attributes are documented.
- Implementation readiness criteria are defined.

---

# Aggregate Model Summary

The FitnessOS Aggregate Model defines the transactional consistency boundaries for the entire platform.

It bridges the approved enterprise architecture and database architecture by identifying aggregate ownership, Aggregate Roots, communication patterns, lifecycle management, and business consistency boundaries.

Every future entity, repository, application service, database transaction, and business event derives from the aggregate model.

This document serves as the authoritative reference for aggregate design throughout FitnessOS.

---

# End of Aggregate Model

Status: Architecture Complete

Milestone:

Aggregate Modeling Complete

Document Classification:

Aggregate Architecture Specification