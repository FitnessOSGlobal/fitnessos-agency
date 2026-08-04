# FITNESSOS DATABASE ARCHITECTURE

Version: 1.0.0

Status: Architecture Approved

Owner: Platform Architecture

Depends On:

- FITNESSOS_MASTER_SPECIFICATION.md
- PRODUCT_DECISIONS.md
- ORGANIZATION_MODEL.md
- DOMAIN_ARCHITECTURE.md
- INFORMATION_ARCHITECTURE.md
- API_ARCHITECTURE.md
- EVENT_ARCHITECTURE.md
- SECURITY_ARCHITECTURE.md
- All Domain Implementation Contracts

---

# Executive Summary

This document defines the database architecture governing all persistent storage within FitnessOS.

The database architecture translates the approved business architecture into a consistent persistence model while preserving domain ownership, aggregate boundaries, transactional integrity, tenant isolation, scalability, and long-term maintainability.

The database architecture is derived from the domain model.

The domain model must never be modified to accommodate database implementation.

---

# Purpose

The purpose of this document is to define:

- Database philosophy
- Persistence ownership
- Aggregate ownership
- Transaction boundaries
- Schema organization
- Naming standards
- Multi-tenant persistence
- Auditing standards
- Soft deletion strategy
- Identifier strategy
- Constraint philosophy
- Index philosophy
- Scalability principles

This document serves as the authoritative reference for every future database decision.

---

# Database Philosophy

FitnessOS follows a domain-driven persistence model.

Business domains own their own persistent data.

Databases exist to persist business state.

Databases do not define business architecture.

Business architecture defines database architecture.

---

# Guiding Principles

## Principle 1

Domain ownership determines database ownership.

---

## Principle 2

Every persistent entity has exactly one owning domain.

---

## Principle 3

Every aggregate has exactly one transaction boundary.

---

## Principle 4

Cross-domain persistence is prohibited.

---

## Principle 5

Read models never become write models.

---

## Principle 6

Reporting databases never own operational data.

---

## Principle 7

AI persistence never owns business records.

---

## Principle 8

Integration persistence never owns operational business entities.

---

## Principle 9

Tenant isolation applies to every persistent entity.

---

## Principle 10

Database implementation must preserve the approved enterprise architecture.

---

# Database Objectives

The database architecture aims to provide:

- Consistency
- Scalability
- Reliability
- Maintainability
- Auditability
- Security
- Performance
- Extensibility

while preserving business ownership.

---

# Scope

This document governs:

- Database organization
- Schemas
- Aggregates
- Entities
- Relationships
- Keys
- Constraints
- Transactions
- Auditing
- Soft deletion
- Indexing
- Naming conventions
- Migration strategy

Technology-specific implementation details are intentionally excluded.

---

# Out of Scope

This document does not define:

- SQL syntax
- ORM configuration
- Database engine configuration
- Infrastructure deployment
- Backup procedures
- Replication topology
- Cloud provider implementation

These belong to later engineering milestones.

---

# Database Layers

The persistence architecture follows layered ownership.

```
Enterprise Architecture
        │
        ▼
Domain Architecture
        │
        ▼
Aggregate Model
        │
        ▼
Database Schema
        │
        ▼
Entities
        │
        ▼
Tables
```

Each layer derives from the layer above.

No lower layer may redefine ownership established by a higher layer.

---

# Architecture Principles

The database architecture follows these principles:

- Domain-first
- Aggregate-first
- API-independent
- Event-compatible
- Tenant-aware
- Auditable
- Scalable
- Replaceable
- Technology-neutral

---

# End of Part 1

---

# Database Ownership

Database ownership follows the approved Domain Architecture.

Every persistent record belongs to exactly one domain.

No table, document, or persistent object may have multiple owning domains.

Database ownership mirrors business ownership.

---

# Domain Database Ownership

The following domains own persistent storage.

## Platform

Owns persistence for:

- Organizations
- Branches
- Users
- Roles
- Permissions
- Authentication Metadata
- System Configuration

---

## CRM

Owns persistence for:

- Leads
- Opportunities
- Sales Activities
- CRM Pipelines

---

## Membership

Owns persistence for:

- Members
- Membership Plans
- Membership Agreements
- Membership Status

---

## Attendance

Owns persistence for:

- Check-Ins
- Check-Outs
- Attendance Sessions
- Attendance History

---

## Commerce

Owns persistence for:

- Products
- Invoices
- Payments
- Refunds
- Taxes
- Discounts

---

## Inventory

Owns persistence for:

- Inventory Items
- Stock Levels
- Purchase Orders
- Suppliers
- Stock Movements

---

## HR

Owns persistence for:

- Employees
- Departments
- Leave Requests
- Payroll References
- Performance Records

---

## Scheduling

Owns persistence for:

- Classes
- Sessions
- Bookings
- Trainer Assignments
- Resource Allocation

---

## Communication

Owns persistence for:

- Notifications
- Templates
- Delivery History
- Broadcast Campaigns

---

## Reporting

Owns persistence for:

- Dashboards
- Report Definitions
- KPI Definitions
- Analytical Views
- Export Jobs

---

## AI

Owns persistence for:

- Recommendations
- Predictions
- AI Conversations
- Knowledge Context
- Model Metadata
- Evaluation Results

---

## Integration

Owns persistence for:

- Connectors
- Synchronization Jobs
- Webhooks
- Import Jobs
- Export Jobs
- Integration Audit Logs

---

# Aggregate Philosophy

FitnessOS follows Domain-Driven Design aggregate principles.

Every aggregate:

- Has one root.
- Owns its consistency boundary.
- Executes one business transaction.
- Belongs to one domain.
- Has one lifecycle.

Aggregates never span multiple domains.

---

# Aggregate Ownership Rules

## Rule 1

One aggregate belongs to one domain.

---

## Rule 2

One aggregate has one Aggregate Root.

---

## Rule 3

External domains reference aggregates by identifier rather than direct ownership.

---

## Rule 4

Aggregates enforce business invariants.

---

## Rule 5

Transactions never cross aggregate boundaries without explicit coordination.

---

# Transaction Boundaries

A database transaction should normally remain inside a single aggregate.

Examples:

Membership Activation

```
Member
Membership
Membership Status
```

One aggregate.

One transaction.

---

Invoice Payment

```
Invoice
Payment
Receipt
```

One Commerce transaction.

---

Attendance Check-In

```
Attendance Session
Attendance Record
```

One Attendance transaction.

---

Cross-domain workflows coordinate through APIs and events rather than shared transactions.

---

# Persistence Lifecycle

The persistence lifecycle follows:

```
Business Command
        │
        ▼
Aggregate Validation
        │
        ▼
Transaction
        │
        ▼
Persistence
        │
        ▼
Business Event
```

The database persists business state after successful validation.

---

# Database Responsibilities

The persistence layer is responsible for:

- Durable storage
- Referential integrity
- Transaction support
- Constraint enforcement
- Audit support
- Historical preservation
- Tenant isolation

The persistence layer is not responsible for business decision-making.

---

# Database Anti-Patterns

The following are prohibited:

- Shared ownership tables
- Cross-domain writes
- Cross-domain foreign key ownership
- Business logic in persistence
- Reporting tables modifying operational records
- AI tables modifying business entities
- Integration tables bypassing domain validation

---

# End of Part 2

---

# Schema Organization

Database schemas organize persistence according to business ownership.

Schema organization must reinforce domain boundaries.

Schemas must never become an alternative ownership model.

---

# Logical Schema Organization

The logical database is organized by domain ownership.

Examples:

- Platform Schema
- CRM Schema
- Membership Schema
- Attendance Schema
- Commerce Schema
- Inventory Schema
- HR Schema
- Scheduling Schema
- Communication Schema
- Reporting Schema
- AI Schema
- Integration Schema

Logical ownership is defined independently of the physical database implementation.

---

# Schema Ownership Rules

## Rule 1

Each schema belongs to exactly one domain.

---

## Rule 2

A schema owns only entities belonging to its domain.

---

## Rule 3

Cross-domain table ownership is prohibited.

---

## Rule 4

Shared tables are prohibited.

---

## Rule 5

Reference data shared across domains must remain owned by one domain.

Other domains reference it through identifiers.

---

# Multi-Tenancy Strategy

FitnessOS is a multi-tenant platform.

Every persistent business record belongs to exactly one organization.

Tenant isolation is mandatory across all domains.

---

# Tenant Isolation Principles

Every tenant must be isolated with respect to:

- Business data
- Audit history
- Configuration
- Reporting
- AI context
- Integration configuration
- Communication history

Cross-tenant visibility is prohibited except where explicitly authorized for platform administration.

---

# Organization Ownership

Every business entity should support organization ownership.

Where applicable, branch ownership may also be recorded.

Example ownership hierarchy:

```
Organization
      │
      ▼
Branch
      │
      ▼
Business Entity
```

Organization remains the primary ownership boundary.

---

# Identifier Strategy

Persistent entities use globally unique identifiers.

Identifiers should remain stable throughout the entity lifecycle.

Identifiers must never expose business meaning.

---

# Identifier Rules

## Rule 1

Identifiers are immutable.

---

## Rule 2

Identifiers are globally unique.

---

## Rule 3

Identifiers are never reused.

---

## Rule 4

Business information must never be encoded into identifiers.

---

## Rule 5

External systems reference entities by identifier only.

---

# Naming Standards

Database naming should remain consistent across every domain.

Examples include:

Schemas

- Singular domain names where appropriate

Entities

- Singular business nouns

Relationships

- Clear business terminology

Indexes

- Consistent prefixes

Constraints

- Consistent prefixes

Views

- Clearly distinguish analytical views from operational entities.

Specific naming conventions will be defined during implementation.

---

# Persistence Conventions

Persistent entities should consistently support:

- Identifier
- Organization Ownership
- Audit Information
- Lifecycle Status
- Version Information where applicable

Conventions should remain uniform across all domains.

---

# Cross-Domain References

Cross-domain persistence references must follow these rules:

- Reference by identifier.
- Never assume ownership.
- Never update another domain's persistence directly.
- Respect aggregate boundaries.

Cross-domain references do not transfer ownership.

---

# Database Responsibilities by Layer

Persistence responsibilities are separated into layers.

```
Business Domain
        │
        ▼
Aggregate
        │
        ▼
Entity
        │
        ▼
Persistence
        │
        ▼
Storage
```

Lower layers implement higher-layer decisions.

They do not redefine them.

---

# End of Part 3

---

# Auditing Strategy

FitnessOS treats auditing as a core architectural capability rather than an optional feature.

Persistent entities should support historical traceability where business value requires it.

Audit information improves accountability, compliance, troubleshooting, and operational transparency.

---

# Audit Principles

## Principle 1

Business actions should be traceable.

---

## Principle 2

Historical records should remain reproducible.

---

## Principle 3

Audit information belongs to the owning domain.

---

## Principle 4

Audit information should never change business ownership.

---

## Principle 5

Audit history should remain tenant-aware.

---

# Audit Responsibilities

The persistence architecture should support recording information such as:

- Entity creation
- Entity modification
- Entity archival
- Status transitions
- Business approvals
- Business cancellations
- Business completion

Specific implementation details are defined during engineering.

---

# Soft Delete Strategy

Business records should normally be archived rather than permanently removed.

Soft deletion preserves:

- Historical reporting
- Business auditability
- AI analysis
- Event consistency
- Legal compliance where applicable

Permanent deletion should be exceptional.

---

# Soft Delete Principles

## Rule 1

Business entities should prefer archival over deletion.

---

## Rule 2

Archived entities remain historically referenceable where appropriate.

---

## Rule 3

Soft deletion must never violate tenant isolation.

---

## Rule 4

Soft deletion should not invalidate historical reports.

---

## Rule 5

Permanent deletion requires explicit authorization and policy support.

---

# Versioning Strategy

Certain persistent entities require version history.

Examples include:

- Report Definitions
- AI Models
- Configuration
- Notification Templates
- Business Policies
- Integration Configurations

Version history supports reproducibility and controlled evolution.

---

# Versioning Principles

- Versions are immutable once published.
- Version history remains traceable.
- Active versions are clearly identifiable.
- Historical versions remain accessible where required.

---

# Concurrency Strategy

Multiple users may update business data simultaneously.

Persistence must support safe concurrent modification.

Concurrency protection should prevent accidental data loss.

Implementation techniques are selected during engineering.

---

# Concurrency Principles

## Rule 1

Concurrent updates should preserve consistency.

---

## Rule 2

Business invariants remain protected during concurrent operations.

---

## Rule 3

Conflict detection should occur before persistence.

---

## Rule 4

Failed concurrency operations should be recoverable.

---

# Referential Integrity

Relationships between persistent entities must preserve business correctness.

Referential integrity follows domain ownership.

---

# Referential Integrity Rules

## Rule 1

Relationships should represent real business relationships.

---

## Rule 2

References must never imply ownership transfer.

---

## Rule 3

Cross-domain references use identifiers.

---

## Rule 4

Aggregate boundaries remain respected.

---

## Rule 5

Persistence relationships must never bypass business validation.

---

# Constraint Philosophy

Constraints exist to protect business correctness.

Constraints should reinforce domain rules rather than replace them.

Examples include:

- Required ownership
- Valid relationships
- Uniqueness where appropriate
- Lifecycle consistency
- Tenant consistency

Business logic remains implemented in the application layer.

---

# Persistence Quality Attributes

The database architecture prioritizes:

- Consistency
- Integrity
- Durability
- Auditability
- Predictability
- Recoverability

These qualities take precedence over implementation convenience.

---

# End of Part 4

---

# Indexing Philosophy

Indexes exist to improve query performance while preserving data integrity.

Indexing decisions should be driven by business access patterns rather than implementation convenience.

Indexes are implementation details and should evolve as application usage changes.

---

# Indexing Principles

## Principle 1

Indexes support business use cases.

---

## Principle 2

Avoid unnecessary indexes.

---

## Principle 3

Indexes should not redefine business ownership.

---

## Principle 4

Analytical indexes remain independent from operational ownership.

---

## Principle 5

Indexing strategy should remain measurable and reviewable.

---

# Performance Philosophy

Performance optimization must preserve correctness.

The database architecture prioritizes:

- Correctness
- Consistency
- Predictability

before optimization.

Optimization should never compromise business invariants.

---

# Performance Objectives

The persistence layer should support:

- High read performance
- Reliable write performance
- Efficient transaction processing
- Predictable query behavior
- Scalable tenant growth
- Historical data retention

Performance engineering will be addressed during implementation.

---

# Migration Strategy

Database evolution must remain controlled and repeatable.

Schema changes should always be:

- Versioned
- Reviewable
- Reversible where practical
- Tested before production deployment

Migration history forms part of the system's operational history.

---

# Migration Principles

## Rule 1

Database changes are incremental.

---

## Rule 2

Schema evolution preserves existing business data.

---

## Rule 3

Breaking schema changes require explicit review.

---

## Rule 4

Migration history remains permanently traceable.

---

# Backup & Recovery Philosophy

Backup and recovery are operational responsibilities.

The database architecture requires that persistent business data remains recoverable.

Recovery procedures should preserve:

- Business integrity
- Tenant isolation
- Audit history
- Historical reporting

Implementation details are defined during infrastructure planning.

---

# Future Database Evolution

The persistence architecture should support future evolution including:

- Database partitioning
- Read replicas
- Archival storage
- Event replay support
- Data warehouse integration
- Multi-region deployment
- Service decomposition
- Independent domain databases

Future evolution must preserve domain ownership.

---

# Cross-Domain Persistence Principles

Cross-domain persistence should occur only through approved architectural mechanisms.

Examples include:

- Identifiers
- APIs
- Business Events

Direct persistence coupling between domains is prohibited.

Business ownership always remains with the owning domain.

---

# Database Governance

All future persistence decisions should comply with this document.

Examples include:

- New schemas
- New entities
- New relationships
- New indexes
- New constraints
- New migrations

Architectural consistency takes precedence over implementation convenience.

---

# Acceptance Criteria

The Database Architecture is complete when:

- Database philosophy is defined.
- Persistence ownership is documented.
- Aggregate ownership is documented.
- Transaction boundaries are defined.
- Schema organization is documented.
- Multi-tenancy strategy is defined.
- Identifier strategy is documented.
- Naming standards are documented.
- Persistence conventions are defined.
- Auditing strategy is documented.
- Soft delete strategy is defined.
- Versioning strategy is documented.
- Concurrency principles are defined.
- Referential integrity principles are documented.
- Constraint philosophy is defined.
- Indexing philosophy is documented.
- Performance philosophy is defined.
- Migration strategy is documented.
- Future evolution is documented.
- Governance principles are documented.

---

# Database Architecture Summary

The FitnessOS Database Architecture defines the persistence model for the entire platform.

It derives directly from the approved enterprise architecture and preserves domain ownership, aggregate boundaries, tenant isolation, transactional integrity, auditability, and long-term maintainability.

The database architecture exists to faithfully persist business state while remaining independent of implementation technology.

This document serves as the authoritative reference for every future schema, entity, relationship, migration, and persistence decision within FitnessOS.

---

# End of Database Architecture

Status: Architecture Complete

Milestone:

Database Architecture Foundation

Document Classification:

Database Architecture Specification