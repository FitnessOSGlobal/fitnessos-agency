# FITNESSOS DOMAIN IMPLEMENTATION CONTRACT

# Membership Domain

Version: 2.0.0

Status: Architecture Approved

Owner: Membership Engineering

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

---

# Executive Summary

The Membership Domain manages the complete lifecycle of members and their memberships.

It is the authoritative source for all membership-related information and business rules within FitnessOS.

The Membership Domain owns member identity within the business context, membership plans, contracts, lifecycle transitions, freezes, renewals, upgrades, downgrades, transfers, and archival.

The Membership Domain deliberately excludes attendance, payments, CRM activities, scheduling, and employee management.

It provides business capabilities consumed by Attendance, Commerce, Scheduling, Reporting, AI, and Communication while remaining the only domain authorized to change membership state.

---

# Purpose

Provide a complete and authoritative membership management capability for FitnessOS.

The Membership Domain governs every stage of a member's lifecycle while ensuring business rules remain consistent across all applications and integrations.

---

# Scope

The Membership Domain owns:

- Member Profiles
- Membership Accounts
- Membership Plans
- Membership Agreements
- Membership Status
- Membership Lifecycle
- Membership Renewals
- Membership Upgrades
- Membership Downgrades
- Membership Freezes
- Membership Transfers
- Membership Cancellations
- Family Memberships
- Corporate Memberships
- Medical Profiles
- Emergency Contacts
- Member Documents
- Waivers and Consents

---

# Responsibilities

The Membership Domain is responsible for:

## Member Management

Managing the business identity of every member.

This includes registration, profile maintenance, status changes, and archival.

---

## Membership Management

Managing memberships throughout their complete lifecycle.

This includes:

- Activation
- Renewal
- Upgrade
- Downgrade
- Freeze
- Transfer
- Cancellation
- Expiration

---

## Membership Plans

Managing the catalogue of membership plans offered by an organization.

Plans define commercial offerings but do not process payments.

---

## Membership Agreements

Managing agreements, waivers, terms, and member consent records.

---

## Medical Information

Managing medical declarations and health-related information relevant to safe participation in fitness activities.

This information is business data and must be handled according to the Security Architecture.

---

## Family & Corporate Memberships

Managing relationships between members who belong to family or corporate membership structures.

---

## Membership Status

Maintaining the authoritative membership state for every member.

Only the Membership Domain may change membership status.

---

## Member Documentation

Managing documents associated with a member, including signed agreements, waivers, and supporting documentation.

---

# Out of Scope

The Membership Domain does NOT own:

- Authentication
- Authorization
- Users
- Organizations
- Branches
- Departments
- Attendance
- Check-ins
- Payments
- Invoices
- Products
- POS
- CRM Leads
- Employees
- Scheduling
- Notifications
- Reporting
- AI Recommendations

These responsibilities belong to their respective domains.

---

# Client Applications

The Membership Domain is consumed by:

- Gym Owner Web Application
- Staff Web Application
- Staff Mobile Application
- Member Mobile Application
- Public Website

The Super Admin Portal accesses membership information only for platform administration and support purposes.

---

# Domain Relationships

## Provides Services To

- Attendance Domain
- Commerce Domain
- Scheduling Domain
- Communication Domain
- Reporting Domain
- AI Domain

---

## Depends On

- Platform Domain
- Communication Domain
- Commerce Domain (payment confirmation only)

The Membership Domain never owns responsibilities delegated to these domains.

---

# Architecture Principles

The Membership Domain follows these principles:

- Membership is the single source of truth for membership status.
- Membership lifecycle changes occur only within this domain.
- Business rules are centralized.
- Membership data is organization-owned.
- Tenant isolation is mandatory.
- API-first.
- Event-driven.
- Audit by default.
- Secure by default.

---

# End of Part 1

---

# Business Capabilities

The Membership Domain provides the complete set of business capabilities required to manage members and memberships throughout their lifecycle.

---

## Member Registration

Provides:

- New member registration
- Member profile creation
- Identity verification (business context)
- Duplicate detection
- Initial membership association

A registered member does not automatically have an active membership.

---

## Member Profile Management

Provides:

- Personal information
- Contact information
- Emergency contacts
- Profile photo
- Member preferences
- Member notes

Profile management remains independent of membership status.

---

## Membership Plan Management

Provides:

- Membership plan catalogue
- Plan configuration
- Duration
- Access rules
- Eligibility rules

Commercial pricing belongs to the Commerce Domain.

---

## Membership Lifecycle Management

Provides:

- Activation
- Renewal
- Upgrade
- Downgrade
- Freeze
- Resume
- Transfer
- Cancellation
- Expiration
- Archival

Only the Membership Domain may perform lifecycle transitions.

---

## Membership Agreement Management

Provides:

- Membership contracts
- Waivers
- Terms acceptance
- Consent records
- Agreement history

---

## Family Membership Management

Provides:

- Family accounts
- Primary member
- Dependents
- Relationship management

---

## Corporate Membership Management

Provides:

- Corporate organizations
- Employee memberships
- Corporate plans
- Corporate eligibility

---

## Medical Profile Management

Provides:

- Medical declarations
- Health conditions
- Fitness restrictions
- Medical notes
- Risk acknowledgements

Access must follow the Security Architecture.

---

## Member Document Management

Provides:

- Signed agreements
- Identity documents
- Medical certificates
- Consent forms
- Other membership-related documents

---

# Business Rules

The Membership Domain enforces the following rules.

## Rule 1

Every Member belongs to exactly one Organization.

---

## Rule 2

A Member may have multiple memberships over time.

Only one membership may be Active at any point unless explicitly supported by organization policy.

---

## Rule 3

Membership Plans define entitlement rules.

They do not process payments.

---

## Rule 4

Payment confirmation may trigger eligibility for activation.

Actual activation is performed only by the Membership Domain.

---

## Rule 5

Attendance eligibility is determined using membership status.

Attendance records never change membership status.

---

## Rule 6

Membership status changes are auditable.

Every lifecycle transition must be recorded.

---

## Rule 7

Membership freezes preserve historical membership records.

Frozen memberships are never replaced by new memberships.

---

## Rule 8

Membership renewals extend the lifecycle of an existing membership where applicable.

Historical renewals remain permanently auditable.

---

## Rule 9

Membership upgrades and downgrades create traceable lifecycle transitions.

---

## Rule 10

Archived memberships remain available for reporting and audit.

Logical deletion is preferred over physical deletion.

---

# Membership Lifecycle

The Membership Domain owns the canonical membership lifecycle.

```
Prospect
    │
    ▼
Registered
    │
    ▼
Pending Activation
    │
    ▼
Active
 ┌──┼──────┬─────────┐
 │  │      │         │
 ▼  ▼      ▼         ▼
Frozen Upgraded Downgraded Transferred
 │  │      │         │
 └──┼──────┴─────────┘
    ▼
Renewed
    │
    ▼
Expired
    │
    ▼
Cancelled
    │
    ▼
Archived
```

Only the Membership Domain may transition between these states.

Other domains consume the resulting status through APIs and events.

---

# Canonical Business Entities

The Membership Domain owns:

- Member
- Membership
- Membership Plan
- Membership Agreement
- Membership Status
- Membership Lifecycle
- Family Membership
- Corporate Membership
- Medical Profile
- Emergency Contact
- Member Document
- Waiver
- Consent Record

These entities are authoritative within the Membership Domain.

---

# Entity Ownership

The Membership Domain is the single source of truth for all membership-related entities.

Business domains may reference membership information but must never redefine or duplicate these entities.

---

# End of Part 2

---

# Public Membership Services

The Membership Domain exposes reusable business services consumed by client applications and other business domains.

Business services encapsulate membership rules and lifecycle transitions.

---

## Member Service

Provides:

- Register Member
- Retrieve Member
- Update Member
- Archive Member
- Restore Member
- Search Members

The Member Service is the authoritative source for member profiles.

---

## Membership Service

Provides:

- Create Membership
- Activate Membership
- Renew Membership
- Upgrade Membership
- Downgrade Membership
- Freeze Membership
- Resume Membership
- Transfer Membership
- Cancel Membership
- Expire Membership

Only this service may change membership state.

---

## Membership Plan Service

Provides:

- Create Membership Plan
- Update Membership Plan
- Archive Membership Plan
- Retrieve Membership Plans
- Validate Membership Eligibility

Pricing information is supplied by the Commerce Domain.

---

## Membership Agreement Service

Provides:

- Create Agreement
- Sign Agreement
- Retrieve Agreement
- Record Consent
- Retrieve Consent History

---

## Family Membership Service

Provides:

- Create Family Account
- Add Family Member
- Remove Family Member
- Transfer Family Ownership

---

## Corporate Membership Service

Provides:

- Register Corporate Account
- Assign Employee Membership
- Remove Employee Membership
- Corporate Membership Validation

---

## Medical Profile Service

Provides:

- Create Medical Profile
- Update Medical Profile
- Retrieve Medical Information
- Record Medical Restrictions

Medical information follows platform security policies.

---

## Member Document Service

Provides:

- Upload Documents
- Retrieve Documents
- Archive Documents
- Validate Required Documents

---

# API Responsibilities

The Membership Domain exposes APIs for:

- Members
- Memberships
- Membership Plans
- Membership Agreements
- Family Memberships
- Corporate Memberships
- Medical Profiles
- Emergency Contacts
- Member Documents
- Membership Lifecycle

No API exposes internal implementation details.

All APIs follow the standards defined in API_ARCHITECTURE.md.

---

# Published Events

The Membership Domain publishes business events including:

- MemberRegistered
- MemberUpdated
- MemberArchived
- MembershipCreated
- MembershipActivated
- MembershipRenewed
- MembershipUpgraded
- MembershipDowngraded
- MembershipFrozen
- MembershipResumed
- MembershipTransferred
- MembershipCancelled
- MembershipExpired
- MembershipArchived
- MembershipPlanCreated
- MembershipPlanUpdated
- FamilyMembershipCreated
- CorporateMembershipAssigned
- MedicalProfileUpdated

These events communicate completed business actions.

---

# Consumed Events

The Membership Domain consumes events from other domains where membership processing depends on external business activities.

Examples include:

Commerce Domain

- PaymentConfirmed
- PaymentFailed
- RefundProcessed

Platform Domain

- OrganizationCreated
- BranchCreated
- UserDeactivated

Communication Domain

- NotificationDelivered (optional tracking)

The Membership Domain never consumes events to bypass its own business rules.

---

# Event Responsibilities

The Membership Domain is responsible for:

- Publishing membership lifecycle events
- Maintaining event version compatibility
- Ensuring event auditability
- Protecting sensitive member information
- Publishing immutable business events

Business events represent completed facts and must never be modified after publication.

---

# Integration Responsibilities

The Membership Domain supports integrations with:

- Access Control Systems
- CRM Systems
- Payment Providers (through Commerce)
- Marketing Platforms
- Mobile Applications
- BI / Analytics Platforms
- AI Services

External systems consume membership information through approved APIs and published events.

Direct database integration is not permitted.

---

# Service Boundaries

The Membership Domain must never implement:

- Attendance validation
- Payment processing
- Invoice generation
- Employee management
- Class scheduling
- Notification delivery
- Authentication
- Authorization

Those responsibilities remain with their owning domains.

---

# End of Part 3

---

# Permission Model

The Membership Domain defines the business permissions required to manage members and memberships.

Authentication and permission enforcement are provided by the Platform Domain.

The Membership Domain defines *what* permissions are required.

The Platform Domain determines *who* has them.

---

## Membership Administration

Examples:

- Create Membership
- Update Membership
- Cancel Membership
- Freeze Membership
- Renew Membership
- Upgrade Membership
- Downgrade Membership
- Transfer Membership

---

## Member Administration

Examples:

- Register Member
- Edit Member
- Archive Member
- Restore Member
- View Member
- Export Member Data

---

## Membership Plan Administration

Examples:

- Create Membership Plan
- Update Membership Plan
- Archive Membership Plan
- Activate Membership Plan

---

## Medical Information Permissions

Medical information is considered sensitive.

Separate permissions should control:

- View Medical Profile
- Update Medical Profile
- Upload Medical Documents
- View Medical History

Access should be restricted according to organizational policy.

---

## Corporate Membership Permissions

Permissions include:

- Create Corporate Account
- Assign Employee Membership
- Remove Employee Membership
- View Corporate Memberships

---

## Family Membership Permissions

Permissions include:

- Create Family Membership
- Add Family Member
- Remove Family Member
- Transfer Primary Member

---

# Security Responsibilities

The Membership Domain follows the Security Architecture.

Responsibilities include:

- Protecting personal information
- Protecting medical information
- Auditing membership lifecycle changes
- Enforcing organization ownership
- Respecting tenant boundaries

Sensitive information must never be exposed through unauthorized APIs or events.

---

# Tenant Boundaries

Every member belongs to one Organization.

Membership information is isolated by tenant.

Cross-tenant access is prohibited except where explicitly authorized for platform administration.

Membership records must never be shared between organizations without an approved business process.

---

# UI Responsibilities

The Membership Domain provides user interfaces for:

- Member Management
- Membership Management
- Membership Plans
- Membership Agreements
- Family Memberships
- Corporate Memberships
- Medical Profiles
- Member Documents

UI implementations should remain independent of business rules.

Business logic resides within the Membership Domain.

---

# Mobile Responsibilities

Mobile applications consume Membership Domain services for:

- Member Profile
- Membership Status
- Membership Card
- Membership Renewal Requests
- Medical Profile
- Emergency Contacts
- Digital Agreements

Business rules remain centralized within the Membership Domain.

---

# Reporting Responsibilities

The Membership Domain supplies data for reports including:

- Active Members
- Expired Memberships
- Frozen Memberships
- Membership Growth
- Membership Churn
- Renewal Rates
- Membership Plan Distribution
- Family Membership Statistics
- Corporate Membership Statistics

Ownership of report generation belongs to the Reporting Domain.

---

# AI Responsibilities

The Membership Domain supplies information to AI services for:

- Membership renewal prediction
- Churn prediction
- Upgrade recommendations
- Member segmentation
- Retention analysis
- Membership utilization insights

AI services consume Membership Domain data but do not change membership state directly.

---

# Client Applications Using Membership Services

The following applications consume Membership Domain capabilities:

- Gym Owner Web Application
- Staff Web Application
- Staff Mobile Application
- Member Mobile Application
- Public Website

Platform administration uses Membership APIs only where operational support is required.

---

# End of Part 4

---

# Non-Functional Requirements

The Membership Domain must satisfy the following quality attributes.

## Availability

Membership services should remain available during normal platform operation.

Planned maintenance should minimize disruption to membership-related activities.

Membership state integrity must always be preserved.

---

## Scalability

The Membership Domain must support:

- Small independent gyms
- Multi-branch organizations
- Franchise networks
- Enterprise fitness organizations

The architecture must scale horizontally without changing business rules.

---

## Performance

Membership operations should remain responsive.

Performance-sensitive operations include:

- Member lookup
- Membership validation
- Membership status retrieval
- Membership renewal
- Membership activation
- Membership search

Performance optimizations must never compromise business rule enforcement.

---

## Reliability

Membership operations must provide:

- Transaction consistency
- Retry where appropriate
- Failure recovery
- Monitoring
- Auditability

Critical lifecycle transitions must never leave memberships in inconsistent states.

---

## Security

The Membership Domain must comply with the Security Architecture.

Special protection applies to:

- Personal information
- Medical profiles
- Emergency contacts
- Agreements
- Identity documents

Sensitive information must only be accessible to authorized users.

---

## Maintainability

Business rules should remain centralized within the Membership Domain.

Future changes to membership policies should not require changes in client applications.

---

## Extensibility

The Membership Domain must support future capabilities including:

- Loyalty programs
- Multi-club memberships
- Reciprocal memberships
- Membership wallets
- Digital identity cards
- Partner memberships
- Insurance-linked memberships

These enhancements must extend existing capabilities without redefining domain ownership.

---

# Future Database Implications

The Membership Domain is expected to own persistent storage for:

- Members
- Memberships
- Membership Plans
- Membership Agreements
- Membership Lifecycle History
- Family Memberships
- Corporate Memberships
- Medical Profiles
- Emergency Contacts
- Member Documents
- Consent Records
- Waivers

Logical ownership is defined here.

Physical database design will be completed during the Database Architecture milestone.

---

# Future Service Boundaries

As FitnessOS evolves, the Membership Domain may be implemented as multiple deployable services while remaining a single logical business domain.

Potential service boundaries include:

- Member Service
- Membership Service
- Membership Plan Service
- Agreement Service
- Family Membership Service
- Corporate Membership Service
- Medical Profile Service
- Document Service

Deployment decisions must not alter business ownership or domain boundaries.

---

# Cross-Domain Responsibilities

The Membership Domain provides authoritative membership information to other domains.

Examples:

Attendance Domain

- Membership validation
- Membership eligibility

Commerce Domain

- Membership activation requests
- Membership renewal requests

Scheduling Domain

- Class eligibility validation

Communication Domain

- Renewal reminders
- Membership notifications

Reporting Domain

- Membership analytics

AI Domain

- Churn prediction
- Renewal forecasting
- Upgrade recommendations

Other domains consume membership information but never own or modify membership state.

---

# Acceptance Criteria

The Membership Domain implementation contract is complete when:

- Domain responsibilities are clearly defined.
- Business boundaries are explicit.
- Membership lifecycle is fully documented.
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

The Membership Domain is the authoritative source for all membership-related business information within FitnessOS.

It governs the complete lifecycle of members and memberships while ensuring that every business rule is enforced consistently across all client applications and integrations.

The Membership Domain provides reusable business capabilities to other domains without relinquishing ownership of membership state.

This implementation contract serves as the reference specification for all membership functionality within the FitnessOS platform.

---

# End of Membership Domain

Status: Architecture Complete

Milestone:

Complete Architecture

Document Classification:

Domain Implementation Contract