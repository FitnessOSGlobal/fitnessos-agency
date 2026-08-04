# FITNESSOS ENTITY CATALOG

Version: 1.0.0

Status: Architecture Approved

Owner: Platform Architecture

Depends On:

- FITNESSOS_MASTER_SPECIFICATION.md
- PRODUCT_DECISIONS.md
- ORGANIZATION_MODEL.md
- DOMAIN_ARCHITECTURE.md
- DATABASE_ARCHITECTURE.md
- AGGREGATE_MODEL.md
- All Domain Implementation Contracts

---

# Executive Summary

This document defines every persistent business entity within FitnessOS.

Entities represent the business concepts that make up the aggregate model.

Every entity belongs to exactly one aggregate.

Every aggregate belongs to exactly one domain.

The Entity Catalog provides the authoritative inventory of persistent business entities before logical schemas and physical database structures are designed.

---

# Purpose

The purpose of this document is to define:

- Entity philosophy
- Entity ownership
- Entity classification
- Aggregate assignment
- Entity lifecycle
- Entity responsibilities
- Reference rules
- Audit requirements
- Persistence readiness

The Entity Catalog serves as the authoritative reference for future database entities, repositories, APIs, events, reporting, AI, and integration.

---

# Entity Philosophy

Entities represent business concepts rather than database structures.

Entities exist because the business requires them.

Tables, ORM models, and APIs are later implementations of these entities.

Business architecture always precedes persistence architecture.

---

# Entity Objectives

The Entity Catalog provides:

- Complete business inventory
- Clear ownership
- Aggregate alignment
- Consistent naming
- Predictable persistence
- Future implementation guidance

Every persistent business concept should appear exactly once within this catalog.

---

# Entity Ownership Principles

## Principle 1

Every entity belongs to exactly one aggregate.

---

## Principle 2

Every aggregate belongs to exactly one domain.

---

## Principle 3

Entity ownership never changes during the entity lifecycle.

---

## Principle 4

Business ownership determines entity ownership.

---

## Principle 5

Reference relationships never transfer ownership.

---

# Entity Classification

FitnessOS classifies entities into the following categories.

## Aggregate Root

Owns the aggregate lifecycle.

---

## Internal Entity

Exists only within one aggregate.

---

## Reference Entity

Referenced by other aggregates using identifiers.

Ownership remains unchanged.

---

## Configuration Entity

Stores configurable business behavior.

---

## Historical Entity

Preserves business history.

---

## Analytical Entity

Supports reporting and analytics.

---

## AI Entity

Supports artificial intelligence capabilities.

---

## Integration Entity

Supports external connectivity.

---

# Entity Lifecycle

Every entity follows a business lifecycle appropriate to its owning aggregate.

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

Lifecycle rules remain governed by the Aggregate Root.

---

# Entity Responsibilities

Entities are responsible for:

- Representing business state
- Supporting business invariants
- Participating in aggregate consistency
- Preserving business history where required

Entities are not responsible for:

- User interfaces
- APIs
- Reporting logic
- AI decisions
- Integration logic
- Infrastructure concerns

---

# Entity Relationships

Entities participate in:

- Composition
- Reference
- Containment

Entities never determine business ownership.

Ownership is established by the aggregate model.

---

# End of Part 1

---

# Entity Ownership Rules

Entity ownership follows the approved Aggregate Model.

Every entity belongs to exactly one aggregate.

Every aggregate belongs to exactly one domain.

Ownership never changes during the entity lifecycle.

---

# Ownership Principles

## Rule 1

One entity belongs to one aggregate.

---

## Rule 2

One aggregate belongs to one domain.

---

## Rule 3

Business ownership determines persistence ownership.

---

## Rule 4

Reference relationships never transfer ownership.

---

## Rule 5

Internal entities are managed only through their Aggregate Root.

---

# Entity Identity

Every persistent entity possesses a stable identity.

Identity distinguishes one business concept from another independently of its attributes.

Identity remains constant throughout the entity lifecycle.

---

# Identity Principles

## Principle 1

Entity identity is immutable.

---

## Principle 2

Identity has no embedded business meaning.

---

## Principle 3

Business reference numbers remain separate from technical identity.

Examples include:

- Membership Number
- Invoice Number
- Receipt Number
- Employee Number

These are business identifiers, not entity identities.

---

## Principle 4

External systems reference entities only by approved identifiers.

---

# Entity Mutability

Entities evolve through controlled state transitions.

Entity mutation occurs only through approved business operations.

Internal consistency remains protected by the Aggregate Root.

---

# Mutability Principles

## Rule 1

Business state changes are explicit.

---

## Rule 2

Business invariants remain preserved.

---

## Rule 3

Unauthorized mutation is prohibited.

---

## Rule 4

Historical information remains preserved according to auditing policy.

---

# Reference Rules

Entities may reference other entities.

References never imply ownership.

Cross-domain references occur only through identifiers.

Examples:

Booking references:

- Member Identifier
- Trainer Identifier

Booking does not own either entity.

---

# Composition Rules

Internal entities exist only within their owning aggregate.

Examples:

Membership Aggregate

- Membership
- Membership Status
- Membership Freeze

Internal entities cannot exist independently of the Aggregate Root.

---

# Entity Visibility

Entities are classified according to visibility.

## Public Business Entity

Referenced across domains.

---

## Internal Business Entity

Visible only inside the owning aggregate.

---

## Configuration Entity

Visible according to business configuration responsibilities.

---

## Historical Entity

Visible for reporting, auditing, and compliance.

---

# Entity Quality Standards

Every entity should exhibit:

- Clear business meaning
- Stable identity
- Explicit ownership
- Predictable lifecycle
- High cohesion
- Low coupling
- Auditability
- Tenant awareness

Entities should never exist solely because a database table is required.

---

# Entity Anti-Patterns

The following are prohibited:

- Shared ownership entities
- Cross-domain entities
- Duplicate business entities
- Entities with unclear ownership
- Database-driven entities without business purpose
- Mutable identity
- Circular ownership
- Hidden business state

---

# Entity Readiness

An entity is ready for implementation when:

- Business purpose is defined.
- Owning domain is identified.
- Owning aggregate is identified.
- Identity strategy is defined.
- Lifecycle is understood.
- Reference rules are defined.
- Audit requirements are understood.

Implementation details remain outside the scope of the Entity Catalog.

---

# End of Part 2

---

# Domain Entity Catalog

The following catalog identifies the persistent business entities within FitnessOS.

Every entity belongs to exactly one aggregate.

Every aggregate belongs to exactly one domain.

---

# Platform Domain

| Entity | Aggregate | Classification |
|----------|------------|----------------|
| Organization | Organization | Aggregate Root |
| Organization Configuration | Organization | Internal Entity |
| Branch | Branch | Aggregate Root |
| Branch Configuration | Branch | Internal Entity |
| User | User | Aggregate Root |
| User Profile | User | Internal Entity |
| User Session | User | Historical Entity |
| Role | Role | Aggregate Root |
| Permission | Role | Internal Entity |
| Authentication Record | User | Historical Entity |
| Audit Log | Platform | Historical Entity |

---

# CRM Domain

| Entity | Aggregate | Classification |
|----------|------------|----------------|
| Lead | Lead | Aggregate Root |
| Lead Activity | Lead | Internal Entity |
| Lead Note | Lead | Internal Entity |
| Lead Source | Lead | Configuration Entity |
| Opportunity | Opportunity | Aggregate Root |
| Opportunity Stage | Opportunity | Internal Entity |
| Sales Activity | Opportunity | Historical Entity |

---

# Membership Domain

| Entity | Aggregate | Classification |
|----------|------------|----------------|
| Membership | Membership | Aggregate Root |
| Member | Membership | Internal Entity |
| Membership Status | Membership | Internal Entity |
| Membership Freeze | Membership | Historical Entity |
| Membership Renewal | Membership | Historical Entity |
| Membership Note | Membership | Internal Entity |
| Membership Plan | Membership Plan | Aggregate Root |
| Plan Benefit | Membership Plan | Internal Entity |
| Plan Pricing | Membership Plan | Internal Entity |

---

# Attendance Domain

| Entity | Aggregate | Classification |
|----------|------------|----------------|
| Attendance Session | Attendance | Aggregate Root |
| Attendance Record | Attendance | Internal Entity |
| Attendance Event | Attendance | Historical Entity |
| Attendance Device Log | Attendance | Historical Entity |

---

# Commerce Domain

| Entity | Aggregate | Classification |
|----------|------------|----------------|
| Product | Product | Aggregate Root |
| Product Category | Product | Configuration Entity |
| Product Price | Product | Internal Entity |
| Invoice | Invoice | Aggregate Root |
| Invoice Line | Invoice | Internal Entity |
| Payment | Payment | Aggregate Root |
| Payment Allocation | Payment | Internal Entity |
| Refund | Refund | Aggregate Root |
| Discount | Invoice | Internal Entity |
| Tax | Invoice | Internal Entity |

---

# Inventory Domain

| Entity | Aggregate | Classification |
|----------|------------|----------------|
| Inventory Item | Inventory | Aggregate Root |
| Stock Movement | Inventory | Historical Entity |
| Inventory Adjustment | Inventory | Historical Entity |
| Purchase Order | Purchase Order | Aggregate Root |
| Purchase Order Line | Purchase Order | Internal Entity |
| Supplier | Purchase Order | Reference Entity |

---

# HR Domain

| Entity | Aggregate | Classification |
|----------|------------|----------------|
| Employee | Employee | Aggregate Root |
| Employee Profile | Employee | Internal Entity |
| Employee Assignment | Employee | Historical Entity |
| Leave Request | Leave | Aggregate Root |
| Leave Approval | Leave | Historical Entity |
| Department | Employee | Configuration Entity |

---

# Scheduling Domain

| Entity | Aggregate | Classification |
|----------|------------|----------------|
| Class | Class | Aggregate Root |
| Class Schedule | Class | Internal Entity |
| Booking | Booking | Aggregate Root |
| Booking Status | Booking | Internal Entity |
| Trainer Assignment | Booking | Internal Entity |
| Resource Allocation | Booking | Internal Entity |

---

# Communication Domain

| Entity | Aggregate | Classification |
|----------|------------|----------------|
| Notification | Notification | Aggregate Root |
| Notification Template | Notification | Configuration Entity |
| Notification Delivery | Notification | Historical Entity |
| Campaign | Campaign | Aggregate Root |
| Campaign Audience | Campaign | Internal Entity |
| Campaign Delivery | Campaign | Historical Entity |

---

# Reporting Domain

| Entity | Aggregate | Classification |
|----------|------------|----------------|
| Dashboard | Dashboard | Aggregate Root |
| Dashboard Widget | Dashboard | Internal Entity |
| Report Definition | Report | Aggregate Root |
| KPI Definition | Report | Internal Entity |
| Report Snapshot | Report | Historical Entity |
| Export History | Report | Historical Entity |

---

# AI Domain

| Entity | Aggregate | Classification |
|----------|------------|----------------|
| Recommendation | Recommendation | Aggregate Root |
| Recommendation Feedback | Recommendation | Historical Entity |
| Prediction | Prediction | Aggregate Root |
| Prediction Result | Prediction | Internal Entity |
| Conversation | Conversation | Aggregate Root |
| Conversation Message | Conversation | Internal Entity |
| Knowledge Context | Conversation | Internal Entity |
| AI Model Metadata | Prediction | Configuration Entity |

---

# Integration Domain

| Entity | Aggregate | Classification |
|----------|------------|----------------|
| Connector | Connector | Aggregate Root |
| Connector Configuration | Connector | Configuration Entity |
| Synchronization Job | Synchronization | Aggregate Root |
| Synchronization History | Synchronization | Historical Entity |
| Import Job | Import | Aggregate Root |
| Import Result | Import | Historical Entity |
| Export Job | Export | Aggregate Root |
| Export Result | Export | Historical Entity |
| Webhook | Connector | Internal Entity |
| API Credential | Connector | Internal Entity |

---

# End of Part 3

---

# Entity Relationship Principles

Entities collaborate while preserving aggregate ownership.

Relationships represent business associations.

Relationships never redefine ownership.

---

# Relationship Rules

## Rule 1

Entities inside an aggregate may reference each other directly.

---

## Rule 2

Cross-aggregate references use immutable identifiers.

---

## Rule 3

Cross-domain references never imply ownership.

---

## Rule 4

Relationship direction follows business ownership.

---

## Rule 5

Circular ownership between entities is prohibited.

---

# Relationship Types

FitnessOS recognizes the following relationship types.

## Composition

Internal entities exist only with the Aggregate Root.

Example:

Membership

↓

Membership Status

---

## Reference

One entity references another using an identifier.

Example:

Booking

↓

Member Identifier

---

## Configuration

Business behavior is controlled by configuration entities.

Example:

Membership Plan

↓

Plan Pricing

---

## Historical

Historical entities preserve business events and state transitions.

Example:

Invoice

↓

Invoice History

---

# Entity Lifecycle Categories

Entities generally belong to one of the following lifecycle categories.

## Active Business Entity

Represents current operational business state.

Examples:

- Member
- Employee
- Product
- Booking

---

## Configuration Entity

Defines configurable behavior.

Examples:

- Membership Plan
- Notification Template
- Department

---

## Historical Entity

Preserves completed business history.

Examples:

- Payment History
- Attendance Event
- Synchronization History

---

## Analytical Entity

Supports reporting and dashboards.

Examples:

- Report Snapshot
- Dashboard Widget

---

## AI Entity

Supports intelligence generation.

Examples:

- Recommendation
- Prediction
- Conversation

---

## Integration Entity

Supports external connectivity.

Examples:

- Connector
- Import Job
- Export Job

---

# Audit Requirements

Audit expectations are defined according to business importance.

Entities generally fall into one of three categories.

## Full Audit

Examples:

- Member
- Employee
- Payment
- Invoice
- Booking

Every important business transition should remain traceable.

---

## Standard Audit

Examples:

- Product
- Membership Plan
- Notification

Business modifications remain traceable.

---

## Minimal Audit

Examples:

- Temporary configuration
- Cached analytical entities

Audit requirements depend on operational value.

---

# Soft Delete Requirements

Entities should normally follow the approved Soft Delete Strategy.

Business entities generally support archival.

Historical entities are normally retained permanently.

Configuration entities may follow organization policy.

Permanent deletion should remain exceptional.

---

# Versioning Requirements

Versioning should be applied where business evolution requires historical reproducibility.

Typical examples include:

- Configuration
- Templates
- Report Definitions
- AI Models
- Business Policies

Transactional entities normally rely on auditing rather than version history.

---

# Persistence Readiness

Before implementation, every entity should have:

- Defined owner
- Defined aggregate
- Defined lifecycle
- Defined identity
- Defined reference rules
- Defined audit expectations
- Defined archival policy
- Defined implementation priority

No entity should proceed to schema design without these characteristics.

---

# Cross-Entity Consistency

All entities must preserve:

- Domain ownership
- Aggregate boundaries
- Business invariants
- Tenant isolation
- Auditability
- Predictable lifecycle

Consistency takes precedence over implementation convenience.

---

# Entity Governance

Changes requiring architectural review include:

- New business entities
- Ownership changes
- Aggregate reassignment
- Lifecycle redesign
- Cross-domain movement
- Identity strategy changes

Entity governance preserves long-term architectural integrity.

---

# End of Part 4

---

# Entity Quality Attributes

Well-designed entities should exhibit the following characteristics.

## Clear Business Purpose

Every entity exists because it represents a real business concept.

Entities never exist solely because they simplify persistence.

---

## Stable Identity

Every entity maintains one immutable identity throughout its lifecycle.

Identity remains independent of mutable business attributes.

---

## Explicit Ownership

Every entity has:

- One Domain
- One Aggregate
- One Aggregate Root
- One Lifecycle

Ownership remains unambiguous.

---

## High Cohesion

Entity responsibilities remain closely related to the owning aggregate.

Unrelated responsibilities should never accumulate inside a single entity.

---

## Low Coupling

Entities reference external business concepts only through approved architectural mechanisms.

Ownership boundaries remain preserved.

---

## Predictable Lifecycle

Entity lifecycle transitions remain:

- Explicit
- Auditable
- Consistent
- Business-driven

---

## Auditability

Business entities preserve historical traceability according to approved audit policies.

Audit behavior remains proportional to business importance.

---

## Tenant Awareness

Every business entity respects:

- Organization ownership
- Branch ownership where applicable
- Tenant isolation

Tenant boundaries are never violated.

---

# Entity Evolution Strategy

Entities should evolve incrementally.

Future enhancements may include:

- Additional attributes
- Additional internal relationships
- Additional business rules
- Additional lifecycle states

Evolution must preserve aggregate ownership.

---

# Entity Refactoring Principles

Entity changes require architectural review when they involve:

- Ownership changes
- Aggregate reassignment
- Identity redesign
- Lifecycle redesign
- Cross-domain movement
- Business responsibility changes

Implementation convenience alone is not sufficient justification.

---

# Entity Governance

The Entity Catalog is the authoritative inventory of persistent business entities.

Every future persistence decision should trace back to this catalog.

Examples include:

- New entities
- Entity removal
- Entity merging
- Entity splitting
- Relationship changes

Governance protects long-term architectural consistency.

---

# Implementation Readiness

An entity is implementation-ready when:

- Business purpose is defined.
- Domain ownership is defined.
- Aggregate ownership is defined.
- Identity strategy is defined.
- Lifecycle is documented.
- Reference rules are documented.
- Audit policy is defined.
- Versioning requirements are defined where applicable.
- Archival policy is defined.

Physical implementation remains outside the scope of this document.

---

# Acceptance Criteria

The Entity Catalog is complete when:

- Entity philosophy is documented.
- Entity ownership is defined.
- Entity classification is documented.
- Aggregate assignments are complete.
- Entity catalog is complete.
- Entity relationships are documented.
- Lifecycle categories are defined.
- Audit requirements are documented.
- Soft delete requirements are defined.
- Versioning requirements are documented.
- Persistence readiness is documented.
- Governance principles are defined.
- Quality attributes are documented.
- Implementation readiness is defined.

---

# Entity Catalog Summary

The FitnessOS Entity Catalog defines every persistent business entity within the platform.

It bridges the Aggregate Model and the future Schema Architecture by assigning each entity to its owning aggregate, defining ownership, lifecycle, identity, classification, audit expectations, and persistence readiness.

Every future schema, table, repository, API contract, event payload, report, AI context, and integration model derives from the Entity Catalog.

This document serves as the authoritative reference for all persistent business entities throughout FitnessOS.

---

# End of Entity Catalog

Status: Architecture Complete

Milestone:

Entity Catalog Complete

Document Classification:

Entity Architecture Specification