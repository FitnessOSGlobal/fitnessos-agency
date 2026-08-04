# FITNESSOS EVENT ARCHITECTURE

Version: 1.0.0

Status: Draft

Owner: Architecture Department

Depends On:

- FITNESSOS_MASTER_SPECIFICATION.md
- DOMAIN_ARCHITECTURE.md
- INFORMATION_ARCHITECTURE.md
- API_ARCHITECTURE.md

---

# Purpose

The Event Architecture defines how business events are published, consumed, versioned, secured, and audited throughout FitnessOS.

Business events enable loose coupling between domains while supporting automation, integrations, reporting, AI, notifications, and future scalability.

Events communicate that **something has already happened**.

Events do not request another domain to perform work.

---

# Objectives

The Event Architecture must:

- Standardize event publishing.
- Preserve domain ownership.
- Prevent tight coupling.
- Support asynchronous processing.
- Enable future scalability.
- Provide reliable event delivery.

---

# Event Principles

## Domain Ownership

Only the owning domain may publish events about its business entities.

Examples:

Membership Domain

Publishes:

- MemberCreated
- MembershipActivated
- MembershipRenewed

Attendance Domain

Publishes:

- MemberCheckedIn
- MemberCheckedOut

Commerce Domain

Publishes:

- InvoiceIssued
- PaymentReceived
- RefundProcessed

---

## Event Immutability

Published events are immutable.

Events represent historical facts.

An event is never modified after publication.

Corrections are represented by new events.

---

## Past Tense Naming

Event names use past-tense verbs.

Examples:

- MemberCreated
- BranchOpened
- InvoiceIssued
- PaymentReceived
- TrainerAssigned

Avoid command-style names.

Incorrect:

CreateMember

GenerateInvoice

---

## Event Versioning

Every event includes:

- Event Name
- Event Version
- Event Identifier
- Event Timestamp
- Correlation Identifier
- Tenant Identifier

Breaking changes require a new event version.

---

## Event Metadata

Every event must contain metadata including:

- Event ID
- Event Type
- Domain
- Timestamp
- Organization ID
- Branch ID (where applicable)
- User ID (where applicable)
- Correlation ID

Business payloads remain separate from metadata.

---

# Event Categories

FitnessOS supports several event categories.

## Business Events

Represent business activities.

Examples:

- MemberCreated
- PaymentReceived
- BookingConfirmed

---

## Platform Events

Represent platform lifecycle events.

Examples:

- TenantCreated
- UserInvited
- LicenseActivated

---

## Integration Events

Published for external systems.

Examples:

- WebhookDelivered
- PluginInstalled
- SyncCompleted

---

## Audit Events

Represent security-sensitive activities.

Examples:

- UserLoggedIn
- PermissionChanged
- PasswordReset

---

# Event Consumption

Domains subscribe only to events relevant to their responsibilities.

Subscribers must never assume event delivery order unless explicitly guaranteed.

Event consumers must tolerate duplicate delivery where applicable.

---

# Event Reliability

Event processing should support:

- Retry
- Dead-letter handling
- Idempotent processing
- Monitoring
- Failure logging

No event should be silently discarded.

---

# Event Security

Events must:

- Respect tenant isolation.
- Exclude sensitive information unless required.
- Be authenticated where transported externally.
- Preserve auditability.

---

# Event Lifecycle

Every event progresses through:

- Published
- Delivered
- Processed
- Archived

Failures must be observable and recoverable.

---

# Event Documentation

Every published event must define:

- Purpose
- Publisher
- Consumers
- Payload
- Metadata
- Version
- Security considerations

---

# AI & Automation

Business events may trigger:

- AI insights
- Workflow automation
- Notifications
- Scheduled jobs
- Reports
- External integrations

Event consumers remain loosely coupled from publishers.

---

# Acceptance Criteria

The Event Architecture is complete when:

- Every domain publishes events consistently.
- Event ownership is unambiguous.
- Metadata is standardized.
- Versioning is defined.
- Reliability requirements are documented.
- Security principles are enforced.

---

# End of Document