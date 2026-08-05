# FITNESSOS LOGICAL DATABASE MODEL

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
- ENTITY_CATALOG.md
- SCHEMA_ARCHITECTURE.md
- All Domain Implementation Contracts

---

# Executive Summary

This document defines the logical database model for FitnessOS.

The logical database model transforms approved business entities into implementation-ready logical data structures while preserving domain ownership, aggregate boundaries, transactional consistency, and tenant isolation.

The logical model remains independent of any specific database engine or persistence framework.

Physical database implementation derives directly from this document.

---

# Purpose

The purpose of this document is to define:

- Logical data modeling principles
- Entity relationships
- Cardinality
- Ownership
- Lifecycle dependencies
- Relationship classifications
- Reference strategy
- Logical normalization
- Future physical mapping

This document serves as the authoritative reference for the logical organization of persistent business data.

---

# Logical Database Philosophy

The logical database model represents business information independently of technology.

Logical relationships exist because business relationships exist.

The logical model precedes physical implementation.

Business architecture always remains the source of truth.

---

# Objectives

The logical model provides:

- Clear ownership
- Explicit relationships
- Predictable persistence
- High maintainability
- Technology independence
- Future scalability
- Implementation readiness

---

# Modeling Principles

## Principle 1

Business ownership determines logical ownership.

---

## Principle 2

Aggregate boundaries remain intact.

---

## Principle 3

Logical relationships preserve business meaning.

---

## Principle 4

References never redefine ownership.

---

## Principle 5

Normalization supports business correctness.

---

## Principle 6

Denormalization is an implementation concern.

---

## Principle 7

Logical design remains technology neutral.

---

## Principle 8

The logical model supports future physical optimization.

---

# Modeling Layers

The logical persistence model follows:

Business Domain

↓

Aggregate

↓

Entity

↓

Logical Relationship

↓

Logical Data Model

↓

Physical Database

Each layer derives from the previous layer.

---

# Relationship Categories

The logical model recognizes the following relationship categories.

## Composition

Lifecycle dependency.

Internal ownership.

---

## Reference

Identifier-based relationship.

Ownership remains unchanged.

---

## Association

Business collaboration.

No ownership transfer.

---

## Historical

Business history.

Read-oriented.

---

## Configuration

Business configuration.

Behavior definition.

---

# Logical Responsibilities

The logical model is responsible for:

- Relationship definition
- Cardinality
- Ownership
- Lifecycle dependency
- Reference integrity
- Business consistency

The logical model is not responsible for:

- SQL
- Tables
- Indexes
- Constraints
- ORM mapping
- Storage optimization

---

# End of Part 1

---

# Relationship Philosophy

Relationships exist to model business associations.

Relationships do not define ownership.

Ownership has already been established by the Domain Architecture, Aggregate Model, and Entity Catalog.

The logical model preserves those ownership decisions.

---

# Relationship Principles

## Principle 1

Every relationship has a clearly identified owner.

---

## Principle 2

Relationship direction follows business ownership.

---

## Principle 3

Relationships preserve aggregate boundaries.

---

## Principle 4

Cross-domain relationships use references rather than ownership.

---

## Principle 5

Relationship design supports future scalability.

---

# Cardinality Types

FitnessOS recognizes the following logical cardinalities.

## One-to-One (1:1)

Used where two entities share the same lifecycle.

Example:

User

↓

User Profile

---

## One-to-Many (1:N)

Most common business relationship.

Example:

Member

↓

Memberships

---

Invoice

↓

Invoice Lines

---

Organization

↓

Branches

---

## Many-to-Many (M:N)

Represents business collaboration.

Logical relationships are identified here.

Physical implementation is defined later.

Examples:

Employees

↔

Classes

Members

↔

Campaigns

Products

↔

Promotions

---

# Relationship Ownership Matrix

Ownership follows these rules.

| Relationship | Owner |
|---------------|-------|
| Organization → Branch | Platform |
| Member → Membership | Membership |
| Membership → Membership Status | Membership |
| Attendance Session → Attendance Record | Attendance |
| Invoice → Invoice Line | Commerce |
| Payment → Payment Allocation | Commerce |
| Purchase Order → Purchase Order Line | Inventory |
| Employee → Employee Profile | HR |
| Class → Class Schedule | Scheduling |
| Notification → Delivery | Communication |
| Dashboard → Widget | Reporting |
| Conversation → Message | AI |
| Connector → Webhook | Integration |

Ownership remains with the Aggregate Root.

---

# Aggregate Relationship Rules

Relationships inside an aggregate:

- Strong consistency
- Shared lifecycle
- Single transaction

Relationships across aggregates:

- Identifier reference
- API communication
- Business events
- Eventual consistency

---

# Lifecycle Dependency

Logical relationships define lifecycle dependency.

Examples:

Membership

↓

Membership Freeze

↓

Membership Renewal

↓

Membership Status

These entities cannot exist independently of the aggregate lifecycle.

---

Attendance Session

↓

Attendance Record

Attendance records depend upon the session.

---

Invoice

↓

Invoice Line

Invoice lines cannot exist independently.

---

# Independent Relationships

Some entities remain independent.

Example:

Invoice

↓

Payment

The Payment aggregate references the Invoice aggregate but owns its own lifecycle.

The Invoice aggregate and Payment aggregate communicate through business rules rather than shared ownership.

---

# Reference Relationships

Reference relationships exist where ownership remains external.

Examples:

Booking

↓

Member Identifier

Booking

↓

Trainer Identifier

Invoice

↓

Member Identifier

Payment

↓

Invoice Identifier

These references preserve ownership boundaries.

---

# Relationship Validation

Every logical relationship should answer:

- Who owns the relationship?
- Is the lifecycle shared?
- Does one entity exist independently?
- Is this composition or reference?
- Which aggregate enforces consistency?

---

# Relationship Anti-Patterns

The following are prohibited:

- Circular ownership
- Shared Aggregate Roots
- Bidirectional ownership
- Cross-domain composition
- Hidden dependencies
- Relationships created solely for implementation convenience

---

# End of Part 2

---

# Domain Relationship Maps

This section defines the logical relationships between business domains.

Relationships preserve ownership while enabling business collaboration.

Cross-domain relationships always follow the approved Enterprise Architecture.

---

# Platform Relationships

Platform provides foundational capabilities to every domain.

Primary relationships include:

Organization
    ↓
Branch
    ↓
User
    ↓
Role

Every operational domain references Platform entities through approved identifiers.

Platform remains the owner of identity and organizational hierarchy.

---

# CRM Relationships

Lead
    ↓
Opportunity
    ↓
Member (after conversion)

CRM references Membership through the Member Identifier after successful conversion.

Ownership transfers only through approved business workflows.

---

# Membership Relationships

Member
    ↓
Membership
    ↓
Membership Status

Member references include:

- Organization
- Branch
- Membership Plan

Membership collaborates with:

- Commerce
- Attendance
- Scheduling
- Communication
- Reporting
- AI

Membership ownership always remains within the Membership domain.

---

# Attendance Relationships

Attendance Session
    ↓
Attendance Record

Attendance references:

- Member Identifier
- Branch Identifier

Attendance publishes business events consumed by:

- Reporting
- AI
- Communication

Attendance remains operationally independent.

---

# Commerce Relationships

Invoice
    ↓
Invoice Line

Payment
    ↓
Payment Allocation

Refund
    ↓
Invoice Identifier

Commerce references:

- Member Identifier
- Product Identifier

Commerce collaborates with:

- Reporting
- AI
- Communication
- Integration

Financial ownership always remains within Commerce.

---

# Inventory Relationships

Inventory Item
    ↓
Stock Movement

Purchase Order
    ↓
Purchase Order Line

Inventory references:

- Supplier Identifier
- Product Identifier

Inventory collaborates with Commerce through approved business workflows.

---

# HR Relationships

Employee
    ↓
Employee Profile

Employee
    ↓
Leave Request

Employee references:

- Department
- Branch

Scheduling references Employee using Employee Identifier.

Ownership remains within HR.

---

# Scheduling Relationships

Class
    ↓
Class Schedule

Booking
    ↓
Member Identifier

Booking
    ↓
Employee Identifier

Scheduling collaborates with:

- Membership
- HR
- Attendance

Scheduling owns class operations.

---

# Communication Relationships

Notification
    ↓
Delivery

Campaign
    ↓
Audience

Communication references:

- Member Identifier
- Employee Identifier

Communication consumes business events.

Communication never owns operational business entities.

---

# Reporting Relationships

Dashboard
    ↓
Widgets

Report
    ↓
Snapshots

Reporting consumes information from all operational domains.

Reporting owns analytical persistence only.

---

# AI Relationships

Recommendation
    ↓
Feedback

Prediction
    ↓
Prediction Result

Conversation
    ↓
Messages

AI references business entities using identifiers.

AI never owns operational business data.

---

# Integration Relationships

Connector
    ↓
Webhook

Synchronization
    ↓
Synchronization History

Import
    ↓
Import Result

Export
    ↓
Export Result

Integration references external systems.

Business ownership remains with operational domains.

---

# Cross-Domain Reference Matrix

| Source Domain | References |
|---------------|------------|
| CRM | Membership |
| Membership | Platform |
| Attendance | Membership, Platform |
| Commerce | Membership, Inventory |
| Inventory | Commerce |
| HR | Platform |
| Scheduling | Membership, HR |
| Communication | All Operational Domains |
| Reporting | All Operational Domains |
| AI | All Operational Domains |
| Integration | All Operational Domains |

Reference relationships preserve ownership.

---

# High-Volume Logical Relationships

The following logical relationships are expected to produce high data volumes.

Attendance

Attendance Session
    ↓
Attendance Record

Commerce

Invoice
    ↓
Invoice Line

Payment
    ↓
Payment Allocation

Communication

Notification
    ↓
Delivery History

AI

Conversation
    ↓
Messages

Integration

Synchronization
    ↓
Synchronization History

These relationships may require future optimization during physical design.

---

# Lifecycle Dependencies

Examples of dependent lifecycles.

Organization

↓

Branch

↓

User

↓

Membership

↓

Attendance

---

Member

↓

Membership

↓

Invoice

↓

Payment

↓

Reporting

↓

AI

The logical model captures these dependencies independently of implementation.

---

# End of Part 3

---

# Logical Normalization Strategy

The logical database model follows normalization principles to preserve business correctness and reduce data duplication.

Normalization exists to improve consistency.

Performance optimization is addressed during physical database design.

---

# Normalization Principles

## Principle 1

Each business fact is represented once.

---

## Principle 2

Ownership determines where information resides.

---

## Principle 3

Duplicate operational data is prohibited.

---

## Principle 4

Derived information belongs in analytical models rather than operational models.

---

## Principle 5

Future denormalization must not change business ownership.

---

# Read and Write Models

FitnessOS distinguishes between operational write models and analytical read models.

---

## Write Models

Write models represent operational business state.

Examples:

- Membership
- Attendance
- Commerce
- Inventory
- HR
- Scheduling

Write models enforce business rules and transactional consistency.

---

## Read Models

Read models exist to improve reporting, dashboards, analytics, AI, and search.

Examples:

- Dashboards
- KPI Snapshots
- Report Views
- AI Context
- Search Projections

Read models never become the source of truth.

---

# Read/Write Separation Principles

## Rule 1

Operational models own business state.

---

## Rule 2

Read models consume operational information.

---

## Rule 3

Read models may be regenerated.

---

## Rule 4

Read models never modify operational entities.

---

## Rule 5

AI models never become operational write models.

---

# Data Volume Classification

Business entities are classified according to expected operational volume.

---

## High Write Volume

Examples:

- Attendance Records
- Payments
- Notification Deliveries
- Synchronization Logs
- AI Conversation Messages

These entities require efficient write strategies during physical implementation.

---

## High Read Volume

Examples:

- Members
- Membership Plans
- Products
- Employees
- Classes

These entities require efficient read optimization.

---

## High Growth Volume

Examples:

- Audit History
- Attendance History
- Payment History
- AI Conversations
- Synchronization History

These entities require long-term storage planning.

---

## Stable Volume

Examples:

- Departments
- Roles
- Permissions
- Membership Plans
- Configuration

These entities change infrequently.

---

# Retention Categories

Logical entities are grouped by retention expectations.

---

## Permanent

Core business records.

Examples:

- Members
- Employees
- Products
- Invoices

---

## Historical

Historical operational records.

Examples:

- Attendance History
- Payment History
- Synchronization History

---

## Configurable

Retention determined by business policy.

Examples:

- Notifications
- Campaign Deliveries
- AI Conversations

---

## Temporary

Operational processing entities.

Examples:

- Import Jobs
- Export Jobs
- Processing Queues

Retention depends on operational requirements.

---

# Partitioning Readiness

Certain logical entities may require future partitioning.

Typical candidates include:

- Attendance Records
- Payments
- Notifications
- Audit Logs
- AI Conversations
- Synchronization History

Partitioning decisions belong to physical database design.

---

# Performance Characteristics

Logical entities should be categorized by expected workload.

Categories include:

- Read-intensive
- Write-intensive
- Mixed workload
- Historical
- Analytical

These characteristics guide future indexing and storage optimization.

---

# Logical Data Quality

The logical model prioritizes:

- Consistency
- Accuracy
- Completeness
- Traceability
- Predictability

Performance optimizations must preserve these qualities.

---

# End of Part 4

---

# Logical Database Governance

The Logical Database Model is governed by the approved Enterprise Architecture and Database Architecture.

All future logical data model changes must preserve:

- Domain ownership
- Aggregate boundaries
- Entity ownership
- Tenant isolation
- Business consistency
- Architectural integrity

Implementation convenience alone must never justify changes to the logical model.

---

# Evolution Strategy

The logical database model is expected to evolve with business capabilities.

Future evolution may include:

- Additional entities
- Additional relationships
- New aggregates
- New logical schemas
- New analytical models
- New AI capabilities
- New integrations

Evolution must preserve previously approved architectural decisions.

---

# Refactoring Principles

Logical model refactoring requires architectural review when it affects:

- Aggregate boundaries
- Entity ownership
- Domain ownership
- Relationship ownership
- Lifecycle dependencies
- Cross-domain references

Minor implementation optimizations remain engineering concerns.

---

# Traceability

Every logical entity should trace back to:

Business Requirement
        ↓
Business Domain
        ↓
Aggregate
        ↓
Entity
        ↓
Logical Relationship
        ↓
Logical Database Model
        ↓
Physical Database
        ↓
Repository
        ↓
Application Service
        ↓
API
        ↓
Frontend

Traceability ensures implementation remains aligned with business intent.

---

# Physical Design Readiness

The logical model is ready for physical implementation when:

- All entities are cataloged.
- Aggregate ownership is complete.
- Relationship ownership is defined.
- Cardinality is documented.
- Lifecycle dependencies are identified.
- Cross-domain references are documented.
- Read/write separation is defined.
- Data volume characteristics are classified.
- Retention categories are defined.
- Partitioning candidates are identified.

No physical database object should be designed before these criteria are satisfied.

---

# Future Physical Deliverables

The logical model provides the foundation for:

- Physical tables
- Columns
- Primary keys
- Foreign keys
- Constraints
- Indexes
- Views
- Materialized views
- Database migrations
- Repository implementation

Physical artifacts must preserve logical ownership.

---

# Quality Attributes

A complete logical database model should exhibit:

- Correctness
- Consistency
- Predictability
- Maintainability
- Scalability
- Technology independence
- Auditability
- Traceability

These qualities guide all future implementation work.

---

# Acceptance Criteria

The Logical Database Model is complete when:

- Modeling philosophy is documented.
- Relationship types are defined.
- Cardinality rules are documented.
- Ownership matrix is complete.
- Domain relationship maps are documented.
- Cross-domain references are defined.
- Lifecycle dependencies are documented.
- Read/write separation is defined.
- Data volume classifications are complete.
- Retention categories are documented.
- Partitioning readiness is identified.
- Governance principles are defined.
- Evolution strategy is documented.
- Physical implementation readiness is defined.

---

# Logical Database Model Summary

The FitnessOS Logical Database Model defines the logical organization and relationships of all persistent business entities.

It bridges the conceptual persistence architecture and the future physical database design by defining relationships, ownership, lifecycle dependencies, cardinality, and data characteristics independently of implementation technology.

Every future table, key, index, constraint, migration, repository, and persistence implementation derives from this logical model.

This document serves as the authoritative reference for logical data modeling throughout FitnessOS.

---

# End of Logical Database Model

Status: Architecture Complete

Milestone:

Logical Database Model Complete

Document Classification:

Logical Data Modeling Specification