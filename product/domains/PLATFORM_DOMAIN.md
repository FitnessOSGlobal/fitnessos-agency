# FITNESSOS DOMAIN IMPLEMENTATION CONTRACT

# Platform Domain

Version: 2.0.0

Status: Architecture Approved

Owner: Platform Engineering

Depends On:

- FITNESSOS_MASTER_SPECIFICATION.md
- PRODUCT_DECISIONS.md
- ORGANIZATION_MODEL.md
- DOMAIN_ARCHITECTURE.md
- INFORMATION_ARCHITECTURE.md
- API_ARCHITECTURE.md
- EVENT_ARCHITECTURE.md
- SECURITY_ARCHITECTURE.md

---

# Executive Summary

The Platform Domain is the foundational domain of FitnessOS.

It provides the shared platform capabilities required by every client application and every business domain.

Unlike business domains such as Membership, Commerce, or Attendance, the Platform Domain does not implement fitness business operations.

Instead, it provides the platform infrastructure that enables every other domain to function securely, consistently, and reliably.

The Platform Domain is the only domain responsible for platform-wide identity, tenancy, authorization, configuration, licensing, branding, auditing, and shared services.

Every other domain depends on the Platform Domain.

The Platform Domain depends on no other business domain.

---

# Purpose

Provide the shared platform capabilities required by the FitnessOS ecosystem while remaining independent from business-specific functionality.

The Platform Domain ensures that every application and every business domain follows the same standards for identity, security, tenancy, configuration, and governance.

---

# Scope

The Platform Domain owns platform-wide capabilities including:

- Identity
- Authentication
- Authorization
- User Management
- Role Management
- Permission Management
- Organization Management
- Brand Management
- Region Management
- Branch Management
- Facility Management
- Department Management
- Tenant Management
- Licensing
- Feature Flags
- Platform Configuration
- Notification Infrastructure
- File Management
- Audit Logging
- System Settings
- Platform Metadata

---

# Responsibilities

The Platform Domain is responsible for:

## Identity

Managing platform users and their identities.

---

## Authentication

Verifying user identity before platform access.

---

## Authorization

Determining what authenticated users are permitted to do.

---

## Organization Management

Managing organizations that subscribe to FitnessOS.

---

## Organizational Hierarchy

Managing:

- Brands
- Regions
- Branches
- Facilities
- Departments

according to the Organization Model.

---

## Platform Configuration

Providing centralized configuration services.

---

## Licensing

Managing subscriptions, platform licensing, feature enablement, and commercial platform capabilities.

---

## Audit

Recording platform-wide security and administrative activities.

---

## Notifications

Providing shared notification infrastructure for all domains.

The Platform Domain delivers notifications.

Business domains decide when notifications should be generated.

---

## File Infrastructure

Providing secure storage and management of uploaded files.

---

## Shared Platform Services

Providing reusable platform capabilities consumed by all business domains.

---

# Out of Scope

The Platform Domain does NOT own business operations.

Examples include:

- Members
- Memberships
- Attendance
- CRM
- Billing
- Products
- Inventory
- Scheduling
- HR
- Reporting
- AI Business Logic

Those responsibilities belong to their respective domains.

The Platform Domain provides infrastructure only.

---

# Architecture Principles

The Platform Domain follows these principles:

- Infrastructure before business logic.
- Configuration over customization.
- Platform-wide consistency.
- Tenant isolation by default.
- Secure by default.
- API-first.
- Event-driven.
- Audit by default.
- Backward compatibility where practical.

---

# Domain Dependencies

The Platform Domain provides services to every business domain.

It must never depend on business-specific domains.

This ensures that the Platform Domain remains stable, reusable, and independent throughout the lifetime of FitnessOS.

---

# End of Part 1

---

# Business Capabilities

The Platform Domain provides the foundational capabilities required by every client application and every business domain.

These capabilities are reusable platform services and must not contain business-specific workflows.

## Identity Management

Provides:

- User registration
- User lifecycle management
- User activation
- User suspension
- User deactivation
- User profile management

Identity is platform-wide and independent of business roles.

---

## Authentication

Provides secure authentication services.

Supported capabilities include:

- Username/password authentication
- Email authentication
- Phone authentication
- Multi-factor authentication
- Session management
- Password reset
- Account recovery

Authentication verifies identity only.

Authorization is handled separately.

---

## Authorization

Provides Role-Based Access Control (RBAC).

Responsibilities include:

- Role management
- Permission management
- Permission evaluation
- Access enforcement
- Resource authorization

Authorization decisions are evaluated for every protected request.

---

## Organization Management

Manages customer organizations.

Capabilities include:

- Organization creation
- Organization updates
- Organization lifecycle
- Organization settings
- Organization status

Organizations represent FitnessOS customers.

---

## Organizational Structure Management

Manages the canonical hierarchy defined in the Organization Model.

Supports:

- Brands
- Regions
- Branches
- Facilities
- Departments

The hierarchy is configuration-driven and supports organizations of varying sizes.

---

## Tenant Management

Provides tenant isolation.

Responsibilities include:

- Tenant provisioning
- Tenant configuration
- Tenant lifecycle
- Tenant isolation
- Tenant metadata

Every business resource belongs to exactly one tenant.

---

## Licensing & Feature Management

Controls commercial access to platform capabilities.

Responsibilities include:

- Subscription plans
- Feature enablement
- Feature restrictions
- License validation
- Trial management
- Platform editions

Business domains query licensing but do not manage it.

---

## Configuration Management

Provides centralized configuration.

Examples:

- Regional settings
- Localization
- Time zones
- Currency
- Measurement units
- Platform preferences

Configuration should be data-driven wherever possible.

---

## Notification Infrastructure

Provides shared notification delivery.

Supported channels include:

- Email
- SMS
- Push Notifications
- WhatsApp (future)
- In-App Notifications

Business domains decide *when* notifications are generated.

The Platform Domain manages *how* they are delivered.

---

## File Management

Provides secure storage for platform files.

Examples include:

- User profile images
- Organization logos
- Documents
- Certificates
- Attachments

Ownership and access permissions are enforced consistently.

---

## Audit Logging

Provides immutable audit records.

Examples:

- Login
- Logout
- Permission changes
- User creation
- Configuration changes
- License changes

Business domains may publish audit events.

The Platform Domain owns audit storage and retrieval.

---

## Platform Metadata

Maintains metadata used throughout the platform.

Examples:

- Supported countries
- Languages
- Time zones
- Currencies
- Measurement systems
- Platform versions

Metadata is centrally managed and reused by all domains.

---

# Business Rules

The Platform Domain enforces the following rules.

## Rule 1

Every user belongs to exactly one organization.

Platform administrators are the only exception.

---

## Rule 2

Every organization belongs to exactly one tenant.

---

## Rule 3

Every branch belongs to exactly one organization.

---

## Rule 4

Every facility belongs to exactly one branch.

---

## Rule 5

Every department belongs to exactly one branch.

---

## Rule 6

Authentication does not grant authorization.

Every protected operation requires explicit permission evaluation.

---

## Rule 7

Every request must respect tenant boundaries.

Cross-tenant access is prohibited unless explicitly authorized for platform administration.

---

## Rule 8

Every platform change affecting security or administration must be auditable.

---

## Rule 9

Feature availability is determined by licensing and configuration, not by application code.

---

## Rule 10

Business domains must never bypass platform services for identity, authorization, tenant management, or licensing.

---

# Canonical Business Entities

The Platform Domain owns the following entities:

- Tenant
- Organization
- Brand
- Region
- Branch
- Facility
- Department
- User
- Role
- Permission
- License
- Feature Flag
- Platform Configuration
- Theme
- Notification
- File
- Audit Log
- Platform Metadata

No other domain may own these entities.

---

# Entity Ownership

The Platform Domain is the authoritative source for all entities listed above.

Business domains may reference these entities through published APIs and events but must not redefine or duplicate them.

---

# End of Part 2

---

# Public Platform Services

The Platform Domain exposes reusable platform services consumed by every client application and business domain.

These services provide platform infrastructure rather than business functionality.

## Identity Service

Provides:

- User registration
- User profile retrieval
- User updates
- User activation
- User suspension
- Password management
- Account recovery

---

## Authentication Service

Provides:

- Login
- Logout
- Token issuance
- Token refresh
- Session validation
- Multi-factor authentication
- Device management

---

## Authorization Service

Provides:

- Permission evaluation
- Role resolution
- Access validation
- Resource authorization

All authorization decisions are centralized.

---

## Organization Service

Provides:

- Organization management
- Organization settings
- Organization lifecycle
- Organization metadata

---

## Organization Structure Service

Provides management for:

- Brands
- Regions
- Branches
- Facilities
- Departments

The organizational hierarchy follows the Organization Model.

---

## Tenant Service

Provides:

- Tenant provisioning
- Tenant configuration
- Tenant lifecycle
- Tenant isolation

---

## Licensing Service

Provides:

- License validation
- Subscription validation
- Feature enablement
- Feature restriction

Business domains query licensing but never manage it directly.

---

## Configuration Service

Provides centralized configuration.

Examples:

- Localization
- Currency
- Time zones
- Regional settings
- Platform preferences

---

## Notification Service

Provides notification delivery.

Supported channels:

- Email
- SMS
- Push Notifications
- In-App Notifications

Future channels:

- WhatsApp
- Microsoft Teams
- Slack

---

## File Service

Provides:

- Secure uploads
- File retrieval
- File permissions
- File lifecycle
- File metadata

---

## Audit Service

Provides:

- Audit recording
- Audit retrieval
- Audit search
- Audit retention

Audit records are immutable.

---

# API Responsibilities

The Platform Domain exposes APIs for platform infrastructure only.

Examples include:

- Authentication
- Authorization
- Users
- Organizations
- Branches
- Departments
- Roles
- Permissions
- Licensing
- Configuration
- Notifications
- Files
- Audit Logs

Business APIs belong to their respective domains.

---

# Published Events

The Platform Domain publishes platform events.

Examples include:

- UserCreated
- UserUpdated
- UserActivated
- UserSuspended
- OrganizationCreated
- OrganizationUpdated
- BranchCreated
- BranchUpdated
- DepartmentCreated
- RoleCreated
- RoleUpdated
- PermissionAssigned
- LicenseActivated
- LicenseExpired
- FeatureEnabled
- FeatureDisabled
- ConfigurationChanged
- NotificationDelivered
- FileUploaded

These events notify other domains that platform state has changed.

---

# Consumed Events

The Platform Domain consumes events only when platform infrastructure must react.

Examples include:

- SubscriptionPurchased
- SubscriptionCancelled
- OrganizationArchived
- AccountClosed

Business logic remains owned by the publishing domain.

---

# Event Responsibilities

The Platform Domain is responsible for:

- Publishing platform events
- Event versioning
- Event metadata
- Event security
- Event auditability

Business domains remain responsible for their own business events.

---

# Integration Responsibilities

The Platform Domain provides shared integration infrastructure.

Supported integration categories include:

- Identity providers
- Email providers
- SMS providers
- Push notification providers
- File storage providers
- Authentication providers
- Enterprise SSO

Business integrations belong to their respective domains.

---

# Service Boundaries

The Platform Domain must never implement business workflows.

Examples:

Membership renewal

→ Membership Domain

Payment processing

→ Commerce Domain

Attendance validation

→ Attendance Domain

Class scheduling

→ Scheduling Domain

The Platform Domain supplies infrastructure only.

---

# End of Part 3

