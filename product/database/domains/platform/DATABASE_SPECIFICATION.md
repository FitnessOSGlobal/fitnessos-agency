# FITNESSOS PLATFORM DATABASE SPECIFICATION

Version: 1.0.0

Status: Implementation Design

Owner: Platform Architecture

Schema:

platform

Depends On:

- DATABASE_ARCHITECTURE.md
- AGGREGATE_MODEL.md
- ENTITY_CATALOG.md
- SCHEMA_ARCHITECTURE.md
- LOGICAL_DATABASE_MODEL.md
- NAMING_CONVENTIONS.md

---

# Executive Summary

This document defines the complete physical database specification for the Platform domain.

The Platform domain provides the foundational capabilities required by every other domain within FitnessOS, including:

- Multi-tenancy
- Organizations
- Branches
- Identity
- Authentication
- Authorization
- Roles
- Permissions
- Audit
- System configuration

Every operational domain depends on Platform, but Platform owns only platform-level business concepts.

---

# Scope

This specification covers:

- Table catalog
- Column definitions
- Logical data types
- PostgreSQL data types
- Primary keys
- Foreign keys
- Constraints
- Indexes
- Relationships
- Audit strategy
- Soft delete strategy
- Migration order
- Seed data
- Performance guidance

---

# Platform Aggregate Review

The Platform schema owns the following aggregates.

## Organization Aggregate

Aggregate Root

Organization

Internal Entities

- Organization Configuration

---

## Branch Aggregate

Aggregate Root

Branch

Internal Entities

- Branch Configuration

---

## User Aggregate

Aggregate Root

User

Internal Entities

- User Profile
- User Session
- Authentication Record

---

## Role Aggregate

Aggregate Root

Role

Internal Entities

- Permission

---

# Platform Entity Inventory

Aggregate Roots

- Organization
- Branch
- User
- Role

Internal Entities

- Organization Configuration
- Branch Configuration
- User Profile
- User Session
- Authentication Record
- Permission

Historical Entities

- Audit Log

Configuration Entities

- Organization Configuration
- Branch Configuration

Reference Entities

None

---

# Platform Table Catalog

The Platform schema contains the following logical tables.

Core

- organization
- organization_configuration
- branch
- branch_configuration

Identity

- user
- user_profile
- user_session
- authentication_record

Authorization

- role
- permission
- role_permission
- user_role

Audit

- audit_log

System

- system_configuration

---

# Platform Ownership Rules

Platform owns:

- Organizations
- Branches
- Users
- Roles
- Permissions
- Authentication
- Platform Configuration

Platform does not own:

- Members
- Employees
- Products
- Memberships
- Attendance
- Commerce
- Inventory

These remain owned by their respective domains.

---

# Tenant Model

Every business entity references:

organization_id

Branch-aware entities additionally reference:

branch_id

Platform enforces tenant isolation.

Cross-tenant access is prohibited.

---

# Platform Relationships

Organization

↓

Branch

↓

User

↓

User Profile

↓

User Session

Role

↓

Permission

↓

User Role

Every relationship preserves aggregate ownership.

---

# Platform Performance Objectives

The Platform schema must provide:

- High read performance
- Low authentication latency
- Strong consistency
- Secure authorization
- Efficient tenant filtering

Operational correctness takes precedence over optimization.

---

# Implementation Goals

The Platform schema should support:

- Millions of users
- Thousands of organizations
- Multiple branches per organization
- High authentication throughput
- Future horizontal scaling
- Future service decomposition

The logical design must remain stable while physical optimization evolves.

---

# End of Part 1

---

# Platform Table Classification

The Platform schema tables are grouped according to business responsibility.

## Core Tables

- organization
- organization_configuration
- branch
- branch_configuration

These tables establish tenant boundaries and organizational hierarchy.

---

## Identity Tables

- user
- user_profile
- user_session
- authentication_record

These tables manage authentication, identity, and user lifecycle.

---

## Authorization Tables

- role
- permission
- role_permission
- user_role

These tables manage authorization policies and access control.

---

## Audit Tables

- audit_log

These tables preserve historical platform activity.

---

## Configuration Tables

- system_configuration

Stores platform-wide operational configuration.

---

# Table Dependency Graph

The Platform schema follows the dependency hierarchy below.

```
organization
      │
      ▼
organization_configuration
      │
      ▼
branch
      │
      ▼
branch_configuration
      │
      ▼
role
      │
      ▼
permission
      │
      ▼
role_permission
      │
      ▼
user
      │
      ▼
user_profile
      │
      ▼
user_role
      │
      ▼
authentication_record
      │
      ▼
user_session
      │
      ▼
audit_log
```

Dependencies always flow downward.

No circular dependencies are permitted.

---

# Parent-Child Relationships

Organization

- organization_configuration
- branch

Branch

- branch_configuration
- user

User

- user_profile
- authentication_record
- user_session
- user_role

Role

- role_permission

Permission

- role_permission

Every child depends upon its parent.

---

# Junction Tables

The following many-to-many relationships are implemented through junction tables.

## role_permission

Relationship:

Role

↔

Permission

---

## user_role

Relationship:

User

↔

Role

No additional junction tables currently exist within the Platform schema.

---

# Lookup Tables

The initial Platform schema does not require dedicated lookup tables.

Future lookup tables, if introduced, must remain owned by the Platform domain.

---

# Historical Tables

Historical persistence is provided through:

- audit_log
- authentication_record
- user_session

Historical entities remain append-oriented.

---

# Configuration Tables

Platform configuration remains centralized within:

- organization_configuration
- branch_configuration
- system_configuration

Business-specific configuration belongs to operational domains.

---

# Migration Order

The recommended migration sequence is:

1. organization
2. organization_configuration
3. branch
4. branch_configuration
5. role
6. permission
7. role_permission
8. user
9. user_profile
10. user_role
11. authentication_record
12. user_session
13. audit_log
14. system_configuration

This order satisfies all dependency requirements.

---

# Future Expansion Points

The Platform schema has been designed to accommodate future additions without restructuring.

Potential future entities include:

- api_key
- oauth_client
- refresh_token
- device_registration
- login_attempt
- security_policy
- password_history
- feature_flag
- organization_invitation
- branch_invitation

Future additions must preserve existing ownership and aggregate boundaries.

---

# Partitioning Candidates

The following tables may require partitioning as the platform scales:

- audit_log
- authentication_record
- user_session

Partitioning decisions are implementation concerns and will be finalized during physical database optimization.

---

# Archival Strategy

Operational tables remain active.

Historical tables support archival according to retention policies.

Archival must preserve auditability and tenant isolation.

---

# End of Part 2

---

# Table Specification

## organization

---

### Business Purpose

The organization table represents the highest tenant boundary within FitnessOS.

Every operational business entity belongs to exactly one organization.

Organizations own:

- Branches
- Users
- Members
- Employees
- Products
- Memberships
- Attendance
- Commerce
- Inventory
- Scheduling

No business data may exist outside an organization.

---

### Aggregate

Organization Aggregate

Aggregate Root

Organization

---

### Logical Entity

Organization

Classification

Aggregate Root

---

### PostgreSQL Table

organization

Schema

platform

---

### Columns

| Column | Logical Type | PostgreSQL Type | Nullable | Default |
|----------|--------------|----------------|----------|----------|
| id | UUID | UUID | No | gen_random_uuid() |
| organization_number | Business Identifier | VARCHAR(30) | No | — |
| legal_name | Text | VARCHAR(255) | No | — |
| display_name | Text | VARCHAR(255) | No | — |
| email | Email | VARCHAR(255) | Yes | NULL |
| phone | Phone | VARCHAR(50) | Yes | NULL |
| website | URL | VARCHAR(255) | Yes | NULL |
| tax_number | Text | VARCHAR(100) | Yes | NULL |
| registration_number | Text | VARCHAR(100) | Yes | NULL |
| timezone | Text | VARCHAR(100) | No | UTC |
| currency_code | ISO Currency | CHAR(3) | No | USD |
| country_code | ISO Country | CHAR(2) | No | — |
| status | Enum | organization_status_type | No | active |
| metadata | JSON | JSONB | Yes | '{}' |
| created_at | Timestamp | TIMESTAMPTZ | No | now() |
| updated_at | Timestamp | TIMESTAMPTZ | No | now() |
| deleted_at | Timestamp | TIMESTAMPTZ | Yes | NULL |
| created_by | UUID | UUID | Yes | NULL |
| updated_by | UUID | UUID | Yes | NULL |
| deleted_by | UUID | UUID | Yes | NULL |

---

### Primary Key

id

---

### Business Identifier

organization_number

Example

ORG-000001

Business identifiers remain immutable after creation.

---

### Foreign Keys

None

Organization is the root tenant entity.

---

### Unique Constraints

organization_number

legal_name

---

### Check Constraints

currency_code must contain a valid ISO 4217 code.

country_code must contain a valid ISO 3166-1 alpha-2 code.

website must be a valid URL when supplied.

email must be a valid email address when supplied.

---

### Indexes

Primary

id

Unique

organization_number

legal_name

Secondary

status

country_code

created_at

Composite

(status, country_code)

---

### Audit Strategy

Full audit.

Every change to organization data must be recorded.

---

### Soft Delete

Supported.

Organizations should normally be archived rather than permanently removed.

Deletion requires verification that no active dependent business data remains.

---

### Relationships

Organization

1

↓

*

Branch

Organization

1

↓

*

User

Organization

1

↓

*

Member (Membership Domain)

Organization

1

↓

*

Employee (HR Domain)

Organization

1

↓

*

Invoice (Commerce Domain)

Ownership remains with the Platform domain.

---

### Sample Record

organization_number

ORG-000001

display_name

Fit Factory Gym Pakistan

timezone

Asia/Karachi

currency_code

PKR

country_code

PK

status

active

---

### Performance Notes

Expected volume:

Low

Read frequency:

High

Write frequency:

Low

Partitioning:

Not required.

Caching:

Recommended.

---

# End of Organization Table

---

# Table Specification

## organization_configuration

---

### Business Purpose

The organization_configuration table stores configurable operational behavior for an organization.

This table contains business settings that may change over time without affecting the core organization identity.

Examples include:

- Branding
- Localization
- Business preferences
- Feature flags
- Notification defaults
- Security policies
- Regional settings

Configuration belongs exclusively to the Organization Aggregate.

---

### Aggregate

Organization Aggregate

Internal Entity

Organization Configuration

---

### Logical Entity

Organization Configuration

Classification

Configuration Entity

---

### PostgreSQL Table

organization_configuration

Schema

platform

---

### Columns

| Column | Logical Type | PostgreSQL Type | Nullable | Default |
|----------|--------------|----------------|----------|----------|
| id | UUID | UUID | No | gen_random_uuid() |
| organization_id | UUID | UUID | No | — |
| default_language | ISO Language | VARCHAR(10) | No | en |
| default_timezone | Time Zone | VARCHAR(100) | No | UTC |
| default_currency | ISO Currency | CHAR(3) | No | USD |
| date_format | Text | VARCHAR(30) | No | YYYY-MM-DD |
| time_format | Text | VARCHAR(20) | No | 24h |
| logo_file_id | UUID | UUID | Yes | NULL |
| favicon_file_id | UUID | UUID | Yes | NULL |
| primary_color | Text | VARCHAR(20) | Yes | NULL |
| secondary_color | Text | VARCHAR(20) | Yes | NULL |
| feature_flags | JSON | JSONB | No | '{}' |
| security_settings | JSON | JSONB | No | '{}' |
| notification_settings | JSON | JSONB | No | '{}' |
| integration_settings | JSON | JSONB | No | '{}' |
| metadata | JSON | JSONB | No | '{}' |
| version | Integer | INTEGER | No | 1 |
| created_at | Timestamp | TIMESTAMPTZ | No | now() |
| updated_at | Timestamp | TIMESTAMPTZ | No | now() |
| created_by | UUID | UUID | Yes | NULL |
| updated_by | UUID | UUID | Yes | NULL |

---

### Primary Key

id

---

### Foreign Keys

organization_id

References

organization(id)

ON DELETE CASCADE

---

### Cardinality

Organization

1

↓

1

Organization Configuration

Every organization owns exactly one active configuration record.

---

### Unique Constraints

organization_id

Only one configuration record may exist per organization.

---

### Check Constraints

default_currency must contain a valid ISO 4217 code.

primary_color and secondary_color should contain valid hexadecimal color values when supplied.

version must be greater than zero.

---

### Indexes

Primary

id

Unique

organization_id

Secondary

updated_at

version

Composite

(organization_id, version)

---

### Audit Strategy

Standard audit.

Configuration changes should be traceable, but operational history belongs in audit_log.

---

### Soft Delete

Not supported.

Configuration is updated in place and versioned.

Historical changes are captured through auditing rather than archival.

---

### Versioning Strategy

Configuration supports optimistic versioning.

Each update increments the version field.

Future configuration snapshots may be introduced without changing aggregate ownership.

---

### Relationships

Organization

1

↓

1

Organization Configuration

Configuration remains internal to the Organization Aggregate.

No external aggregate may modify configuration directly.

---

### Sample Record

organization_id

<organization UUID>

default_language

en

default_timezone

Asia/Karachi

default_currency

PKR

date_format

YYYY-MM-DD

time_format

24h

version

1

---

### Performance Notes

Expected volume:

Very Low

Read frequency:

Very High

Write frequency:

Very Low

Caching:

Strongly recommended.

Partitioning:

Not required.

---

# End of Organization Configuration Table

---

# Table Specification

## branch

---

### Business Purpose

The branch table represents a physical or virtual operational location within an organization.

Every operational activity in FitnessOS is performed within the context of a branch.

Branches provide:

- Operational isolation
- Resource allocation
- Employee assignment
- Member assignment
- Inventory ownership
- Attendance tracking
- Scheduling
- Financial reporting

Every branch belongs to exactly one organization.

---

### Aggregate

Branch Aggregate

Aggregate Root

Branch

---

### Logical Entity

Branch

Classification

Aggregate Root

---

### PostgreSQL Table

branch

Schema

platform

---

### Columns

| Column | Logical Type | PostgreSQL Type | Nullable | Default |
|----------|--------------|----------------|----------|----------|
| id | UUID | UUID | No | gen_random_uuid() |
| organization_id | UUID | UUID | No | — |
| branch_number | Business Identifier | VARCHAR(30) | No | — |
| code | Business Code | VARCHAR(20) | No | — |
| legal_name | Text | VARCHAR(255) | No | — |
| display_name | Text | VARCHAR(255) | No | — |
| email | Email | VARCHAR(255) | Yes | NULL |
| phone | Phone | VARCHAR(50) | Yes | NULL |
| address_line_1 | Text | VARCHAR(255) | No | — |
| address_line_2 | Text | VARCHAR(255) | Yes | NULL |
| city | Text | VARCHAR(100) | No | — |
| state | Text | VARCHAR(100) | Yes | NULL |
| postal_code | Text | VARCHAR(30) | Yes | NULL |
| country_code | ISO Country | CHAR(2) | No | — |
| latitude | Decimal | NUMERIC(10,7) | Yes | NULL |
| longitude | Decimal | NUMERIC(10,7) | Yes | NULL |
| timezone | Text | VARCHAR(100) | No | UTC |
| status | Enum | branch_status_type | No | active |
| metadata | JSON | JSONB | No | '{}' |
| created_at | Timestamp | TIMESTAMPTZ | No | now() |
| updated_at | Timestamp | TIMESTAMPTZ | No | now() |
| deleted_at | Timestamp | TIMESTAMPTZ | Yes | NULL |
| created_by | UUID | UUID | Yes | NULL |
| updated_by | UUID | UUID | Yes | NULL |
| deleted_by | UUID | UUID | Yes | NULL |

---

### Primary Key

id

---

### Business Identifiers

branch_number

Example

BR-000001

code

Example

LHR-KA

Business identifiers remain immutable after creation.

---

### Foreign Keys

organization_id

References

organization(id)

ON DELETE RESTRICT

Organizations cannot be deleted while active branches exist.

---

### Cardinality

Organization

1

↓

*

Branch

Every branch belongs to exactly one organization.

Every organization may own multiple branches.

---

### Unique Constraints

(organization_id, branch_number)

(organization_id, code)

These identifiers are unique within an organization.

---

### Check Constraints

country_code must contain a valid ISO 3166-1 alpha-2 code.

latitude must be between -90 and 90 when supplied.

longitude must be between -180 and 180 when supplied.

email must be valid when supplied.

---

### Indexes

Primary

id

Secondary

organization_id

status

city

country_code

created_at

Composite

(organization_id, status)

(organization_id, city)

(organization_id, code)

Unique

(organization_id, branch_number)

(organization_id, code)

---

### Audit Strategy

Full audit.

Branch creation, updates, activation, deactivation, and archival must be traceable.

---

### Soft Delete

Supported.

Branches should normally be archived rather than permanently deleted.

Deletion requires verification that no active operational data references the branch.

---

### Relationships

Organization

1

↓

*

Branch

Branch

1

↓

1

Branch Configuration

Branch

1

↓

*

User

Branch

1

↓

*

Member (Membership Domain)

Branch

1

↓

*

Employee (HR Domain)

Branch

1

↓

*

Attendance Session

Branch

1

↓

*

Booking

Branch

1

↓

*

Invoice

Branch

1

↓

*

Inventory Item

Ownership remains with the Platform domain.

---

### Sample Record

organization_id

<organization UUID>

branch_number

BR-000001

code

LHR-KA

display_name

Khayaban-e-Amin Branch

city

Lahore

country_code

PK

timezone

Asia/Karachi

status

active

---

### Performance Notes

Expected volume:

Low

Read frequency:

Very High

Write frequency:

Low

Partitioning:

Not required.

Caching:

Strongly recommended.

---

# End of Branch Table

---

# Table Specification

## branch_configuration

---

### Business Purpose

The branch_configuration table stores operational configuration for an individual branch.

Branch-specific settings allow each branch to customize operational behavior while inheriting organizational standards where appropriate.

Examples include:

- Business hours
- Working days
- Check-in policies
- Local branding
- Notification preferences
- Receipt settings
- Branch-specific feature flags

Configuration belongs exclusively to the Branch Aggregate.

---

### Aggregate

Branch Aggregate

Internal Entity

Branch Configuration

---

### Logical Entity

Branch Configuration

Classification

Configuration Entity

---

### PostgreSQL Table

branch_configuration

Schema

platform

---

### Columns

| Column | Logical Type | PostgreSQL Type | Nullable | Default |
|----------|--------------|----------------|----------|----------|
| id | UUID | UUID | No | gen_random_uuid() |
| branch_id | UUID | UUID | No | — |
| opening_time | Time | TIME | No | '06:00:00' |
| closing_time | Time | TIME | No | '23:00:00' |
| weekly_schedule | JSON | JSONB | No | '{}' |
| check_in_settings | JSON | JSONB | No | '{}' |
| notification_settings | JSON | JSONB | No | '{}' |
| receipt_settings | JSON | JSONB | No | '{}' |
| feature_flags | JSON | JSONB | No | '{}' |
| metadata | JSON | JSONB | No | '{}' |
| version | Integer | INTEGER | No | 1 |
| created_at | Timestamp | TIMESTAMPTZ | No | now() |
| updated_at | Timestamp | TIMESTAMPTZ | No | now() |
| created_by | UUID | UUID | Yes | NULL |
| updated_by | UUID | UUID | Yes | NULL |

---

### Primary Key

id

---

### Foreign Keys

branch_id

References

branch(id)

ON DELETE CASCADE

---

### Cardinality

Branch

1

↓

1

Branch Configuration

Every branch owns exactly one active configuration record.

---

### Unique Constraints

branch_id

Only one active configuration record may exist for each branch.

---

### Check Constraints

opening_time must be earlier than closing_time unless 24-hour operation is explicitly enabled.

version must be greater than zero.

---

### Indexes

Primary

id

Unique

branch_id

Secondary

updated_at

version

Composite

(branch_id, version)

---

### Audit Strategy

Standard audit.

Configuration changes should remain traceable through audit_log.

---

### Soft Delete

Not supported.

Configuration is updated in place with optimistic versioning.

Historical changes are retained through auditing.

---

### Versioning Strategy

Configuration updates increment the version column.

Future snapshot support may be introduced without changing aggregate ownership.

---

### Relationships

Branch

1

↓

1

Branch Configuration

Configuration remains internal to the Branch Aggregate.

---

### Business Rules

- Every branch must have exactly one active configuration.
- Branch configuration cannot exist without a parent branch.
- Branch settings override organization defaults where explicitly configured.
- Operational hours must be valid for the configured schedule.
- Feature flags apply only to the owning branch.

---

### Security & Access Rules

Platform Administrators

- Full access.

Organization Administrators

- Manage configurations for branches within their organization.

Branch Managers

- Manage only their assigned branch configuration.

Staff

- Read-only access where operationally required.

---

### Sample Record

branch_id

<branch UUID>

opening_time

06:00

closing_time

23:00

version

1

---

### Performance Notes

Expected volume:

Very Low

Read frequency:

Very High

Write frequency:

Very Low

Caching:

Strongly recommended.

Partitioning:

Not required.

---

# End of Branch Configuration Table

---

# Table Specification

## user

---

### Business Purpose

The user table represents an authenticated identity within FitnessOS.

Users access the platform through authenticated accounts and are granted permissions through assigned roles.

A user may belong to one organization and may optionally be assigned to one or more branches depending on authorization policy.

The user entity is the foundation for:

- Authentication
- Authorization
- Audit attribution
- API access
- Session management
- Security policies

---

### Aggregate

User Aggregate

Aggregate Root

User

---

### Logical Entity

User

Classification

Aggregate Root

---

### PostgreSQL Table

user

Schema

platform

---

### Columns

| Column | Logical Type | PostgreSQL Type | Nullable | Default |
|----------|--------------|----------------|----------|----------|
| id | UUID | UUID | No | gen_random_uuid() |
| organization_id | UUID | UUID | No | — |
| default_branch_id | UUID | UUID | Yes | NULL |
| employee_id | UUID | UUID | Yes | NULL |
| username | Username | VARCHAR(100) | No | — |
| email | Email | VARCHAR(255) | No | — |
| password_hash | Hash | TEXT | No | — |
| password_algorithm | Text | VARCHAR(50) | No | argon2id |
| password_changed_at | Timestamp | TIMESTAMPTZ | No | now() |
| email_verified_at | Timestamp | TIMESTAMPTZ | Yes | NULL |
| phone_verified_at | Timestamp | TIMESTAMPTZ | Yes | NULL |
| last_login_at | Timestamp | TIMESTAMPTZ | Yes | NULL |
| status | Enum | user_status_type | No | active |
| is_system_user | Boolean | BOOLEAN | No | false |
| requires_password_change | Boolean | BOOLEAN | No | false |
| metadata | JSON | JSONB | No | '{}' |
| created_at | Timestamp | TIMESTAMPTZ | No | now() |
| updated_at | Timestamp | TIMESTAMPTZ | No | now() |
| deleted_at | Timestamp | TIMESTAMPTZ | Yes | NULL |
| created_by | UUID | UUID | Yes | NULL |
| updated_by | UUID | UUID | Yes | NULL |
| deleted_by | UUID | UUID | Yes | NULL |

---

### Primary Key

id

---

### Foreign Keys

organization_id

References

organization(id)

ON DELETE RESTRICT

---

default_branch_id

References

branch(id)

ON DELETE SET NULL

---

employee_id

References

HR employee(id)

ON DELETE SET NULL

This relationship is optional because not every user is an employee (for example, API accounts or system accounts).

---

### Cardinality

Organization

1

↓

*

User

Branch

1

↓

*

User

Employee

0..1

↓

0..1

User

---

### Unique Constraints

(organization_id, username)

(organization_id, email)

---

### Check Constraints

username must contain only approved characters.

email must be a valid email address.

password_hash must never be empty.

---

### Indexes

Primary

id

Secondary

organization_id

default_branch_id

status

last_login_at

created_at

Composite

(organization_id, status)

(organization_id, email)

(organization_id, username)

---

### Audit Strategy

Full audit.

Every authentication-related modification must be traceable.

---

### Soft Delete

Supported.

User accounts should normally be deactivated or archived rather than permanently deleted.

---

### Relationships

Organization

1

↓

*

User

Branch

1

↓

*

User

User

1

↓

1

User Profile

User

1

↓

*

User Session

User

1

↓

*

Authentication Record

User

*

↓

*

Role

---

### Business Rules

- Every user belongs to exactly one organization.
- Usernames are unique within an organization.
- Email addresses are unique within an organization.
- Passwords must be stored using approved password hashing algorithms.
- A suspended user cannot authenticate.
- Soft-deleted users cannot authenticate.
- System users cannot be assigned to members.

---

### Security & Access Rules

Platform Administrators

- Full access.

Organization Administrators

- Manage users within their organization.

Branch Managers

- View and manage users assigned to their branch where permitted.

Users

- Manage only their own profile and credentials unless granted elevated permissions.

---

### Sample Record

organization_id

<organization UUID>

username

admin

email

admin@fitfactory.pk

status

active

is_system_user

false

---

### Performance Notes

Expected volume:

Medium

Read frequency:

Very High

Write frequency:

Medium

Caching:

Recommended for profile lookups.

Partitioning:

Not required.

---

### Future Considerations

- Single Sign-On (SSO)
- OAuth2 / OpenID Connect
- Passkeys (WebAuthn)
- Enterprise identity providers
- External directory synchronization
- Fine-grained access policies

---

### Implementation Notes

- Passwords must never be stored in plaintext.
- Password hashing should use Argon2id with configurable parameters.
- Authentication logic must be separated from authorization logic.
- Business logic must never directly expose password hashes.
- JWT or session token generation belongs to the authentication service, not the database layer.

---

# End of User Table

---

# Table Specification

## user_profile

---

### Business Purpose

The user_profile table stores personal and professional profile information for a user.

Profile information is separated from authentication and authorization data to improve security, maintainability, and privacy.

This table contains information used for:

- Personal identity
- Contact information
- Avatar
- Preferences
- Localization
- User experience

Authentication credentials are never stored in this table.

---

### Aggregate

User Aggregate

Internal Entity

User Profile

---

### Logical Entity

User Profile

Classification

Internal Entity

---

### PostgreSQL Table

user_profile

Schema

platform

---

### Columns

| Column | Logical Type | PostgreSQL Type | Nullable | Default |
|----------|--------------|----------------|----------|----------|
| id | UUID | UUID | No | gen_random_uuid() |
| user_id | UUID | UUID | No | — |
| first_name | Text | VARCHAR(100) | No | — |
| middle_name | Text | VARCHAR(100) | Yes | NULL |
| last_name | Text | VARCHAR(100) | No | — |
| preferred_name | Text | VARCHAR(100) | Yes | NULL |
| gender | Enum | gender_type | Yes | NULL |
| birth_date | Date | DATE | Yes | NULL |
| phone | Phone | VARCHAR(50) | Yes | NULL |
| alternate_phone | Phone | VARCHAR(50) | Yes | NULL |
| avatar_file_id | UUID | UUID | Yes | NULL |
| preferred_language | ISO Language | VARCHAR(10) | No | en |
| preferred_timezone | Time Zone | VARCHAR(100) | No | UTC |
| preferred_theme | Enum | theme_type | No | system |
| preferences | JSON | JSONB | No | '{}' |
| metadata | JSON | JSONB | No | '{}' |
| created_at | Timestamp | TIMESTAMPTZ | No | now() |
| updated_at | Timestamp | TIMESTAMPTZ | No | now() |
| created_by | UUID | UUID | Yes | NULL |
| updated_by | UUID | UUID | Yes | NULL |

---

### Primary Key

id

---

### Foreign Keys

user_id

References

user(id)

ON DELETE CASCADE

---

### Cardinality

User

1

↓

1

User Profile

Every user owns exactly one profile.

---

### Unique Constraints

user_id

Only one profile record may exist for each user.

---

### Check Constraints

birth_date must not be in the future.

preferred_language must contain a valid ISO language code.

preferred_theme must contain a supported theme value.

---

### Indexes

Primary

id

Unique

user_id

Secondary

last_name

preferred_language

updated_at

Composite

(last_name, first_name)

(preferred_language, preferred_timezone)

---

### Audit Strategy

Standard audit.

Profile changes should remain traceable through audit_log.

---

### Soft Delete

Not supported.

Profile lifecycle follows the owning user.

---

### Relationships

User

1

↓

1

User Profile

Profile information remains internal to the User Aggregate.

---

### Business Rules

- Every user must have exactly one profile.
- Profile records cannot exist without a parent user.
- Profile information must not contain authentication credentials.
- Preferred language and timezone should default from organization settings on creation.
- Avatar references external file storage.

---

### Security & Access Rules

Platform Administrators

- Full access.

Organization Administrators

- View and update profiles within their organization where authorized.

Branch Managers

- View profiles of users assigned to their branch where permitted.

Users

- View and update their own profile only.

Personally identifiable information (PII) must be protected according to organizational privacy policies.

---

### Sample Record

user_id

<user UUID>

first_name

Ali

last_name

Hassan

preferred_language

en

preferred_timezone

Asia/Karachi

preferred_theme

system

---

### Performance Notes

Expected volume:

Medium

Read frequency:

Very High

Write frequency:

Low

Caching:

Recommended for authenticated sessions.

Partitioning:

Not required.

---

### Future Considerations

- Multiple profile photos
- Pronouns
- Emergency contacts
- Digital signatures
- Accessibility preferences
- Locale-specific formatting

---

### Implementation Notes

- Profile data should be retrieved separately from authentication data where practical.
- Avatar files should be stored in external object storage and referenced by `avatar_file_id`.
- Personally identifiable information should follow applicable privacy and data protection requirements.
- Changes to profile information should not invalidate active authentication sessions unless required by security policy.

---

# End of User Profile Table

---

# Table Specification

## authentication_record

---

### Business Purpose

The authentication_record table stores immutable records of authentication events.

Each record represents a completed authentication attempt regardless of outcome.

Authentication history supports:

- Security auditing
- Compliance
- Fraud detection
- Login analytics
- Device tracking
- Account investigation
- Risk analysis

Authentication records are append-only.

Existing records must never be modified except through approved retention procedures.

---

### Aggregate

User Aggregate

Internal Entity

Authentication Record

---

### Logical Entity

Authentication Record

Classification

Historical Entity

---

### PostgreSQL Table

authentication_record

Schema

platform

---

### Columns

| Column | Logical Type | PostgreSQL Type | Nullable | Default |
|----------|--------------|----------------|----------|----------|
| id | UUID | UUID | No | gen_random_uuid() |
| user_id | UUID | UUID | Yes | NULL |
| organization_id | UUID | UUID | Yes | NULL |
| authentication_type | Enum | authentication_type | No | password |
| authentication_provider | Enum | authentication_provider_type | No | local |
| status | Enum | authentication_status_type | No | success |
| ip_address | IP Address | INET | Yes | NULL |
| user_agent | Text | TEXT | Yes | NULL |
| device_identifier | Text | VARCHAR(255) | Yes | NULL |
| operating_system | Text | VARCHAR(100) | Yes | NULL |
| browser | Text | VARCHAR(100) | Yes | NULL |
| country_code | ISO Country | CHAR(2) | Yes | NULL |
| city | Text | VARCHAR(100) | Yes | NULL |
| failure_reason | Text | VARCHAR(255) | Yes | NULL |
| session_identifier | UUID | UUID | Yes | NULL |
| metadata | JSON | JSONB | No | '{}' |
| authenticated_at | Timestamp | TIMESTAMPTZ | No | now() |
| created_at | Timestamp | TIMESTAMPTZ | No | now() |

---

### Primary Key

id

---

### Foreign Keys

user_id

References

user(id)

ON DELETE SET NULL

---

organization_id

References

organization(id)

ON DELETE SET NULL

Authentication history must survive account archival.

---

### Cardinality

User

1

↓

*

Authentication Record

Every user may generate many authentication records.

Authentication records remain immutable.

---

### Unique Constraints

None

Historical events are intentionally non-unique.

---

### Check Constraints

authentication_type must contain a valid supported authentication method.

authentication_provider must contain a valid provider.

status must contain a supported authentication outcome.

country_code must contain a valid ISO country code when supplied.

---

### Indexes

Primary

id

Secondary

user_id

organization_id

authenticated_at

status

authentication_provider

ip_address

Composite

(user_id, authenticated_at)

(organization_id, authenticated_at)

(status, authenticated_at)

(authentication_provider, authenticated_at)

---

### Audit Strategy

Immutable historical record.

Audit logging of changes is unnecessary because records are append-only.

Deletion is governed solely by approved retention policies.

---

### Soft Delete

Not supported.

Authentication history must remain historically accurate.

Retention policies govern archival and eventual removal where legally permitted.

---

### Relationships

User

1

↓

*

Authentication Record

Organization

1

↓

*

Authentication Record

Authentication records remain internal to the User Aggregate.

---

### Business Rules

- Every authentication attempt creates exactly one authentication record.
- Successful and failed authentication attempts are both recorded.
- Authentication records are immutable after creation.
- Failure reasons are recorded only for unsuccessful authentication attempts.
- Authentication history must not be modified to conceal activity.

---

### Security & Access Rules

Platform Administrators

- Full read access.

Security Administrators

- Read access.

Organization Administrators

- Read access for their organization only where authorized.

End Users

- Access only to their own authentication history where exposed by policy.

Direct updates are prohibited.

---

### Sample Record

user_id

<user UUID>

authentication_type

password

authentication_provider

local

status

success

ip_address

203.99.42.15

authenticated_at

2026-08-05T05:42:18Z

---

### Performance Notes

Expected volume:

Very High

Read frequency:

Medium

Write frequency:

Very High

Partitioning:

Recommended by authenticated_at (monthly or quarterly).

Compression:

Recommended for archived partitions.

---

### Future Considerations

- Passkey (WebAuthn) support
- Biometric authentication
- Risk scoring
- Geo-anomaly detection
- Impossible travel detection
- Adaptive authentication
- Device trust scoring

---

### Implementation Notes

- Records should be inserted asynchronously where practical to minimize authentication latency.
- IP addresses should use PostgreSQL INET type.
- Personally identifiable information should be minimized where possible.
- Retention policies should be configurable per organization if regulations permit.
- This table should be considered one of the primary security audit sources.

---

# End of Authentication Record Table

---

# Table Specification

## user_session

---

### Business Purpose

The user_session table represents authenticated user sessions within FitnessOS.

Unlike authentication records, user sessions represent operational state.

Sessions support:

- Active login tracking
- Concurrent session management
- Session revocation
- Refresh token lifecycle
- Device recognition
- Security monitoring
- User logout
- Forced sign-out

Sessions remain mutable throughout their lifecycle.

---

### Aggregate

User Aggregate

Internal Entity

User Session

---

### Logical Entity

User Session

Classification

Operational Entity

---

### PostgreSQL Table

user_session

Schema

platform

---

### Columns

| Column | Logical Type | PostgreSQL Type | Nullable | Default |
|----------|--------------|----------------|----------|----------|
| id | UUID | UUID | No | gen_random_uuid() |
| user_id | UUID | UUID | No | — |
| organization_id | UUID | UUID | No | — |
| authentication_record_id | UUID | UUID | Yes | NULL |
| session_token_hash | Hash | TEXT | No | — |
| refresh_token_hash | Hash | TEXT | Yes | NULL |
| device_identifier | Text | VARCHAR(255) | Yes | NULL |
| device_name | Text | VARCHAR(150) | Yes | NULL |
| ip_address | IP Address | INET | Yes | NULL |
| user_agent | Text | TEXT | Yes | NULL |
| last_activity_at | Timestamp | TIMESTAMPTZ | No | now() |
| expires_at | Timestamp | TIMESTAMPTZ | No | — |
| revoked_at | Timestamp | TIMESTAMPTZ | Yes | NULL |
| revoke_reason | Text | VARCHAR(255) | Yes | NULL |
| status | Enum | session_status_type | No | active |
| metadata | JSON | JSONB | No | '{}' |
| created_at | Timestamp | TIMESTAMPTZ | No | now() |
| updated_at | Timestamp | TIMESTAMPTZ | No | now() |

---

### Primary Key

id

---

### Foreign Keys

user_id

References

user(id)

ON DELETE CASCADE

---

organization_id

References

organization(id)

ON DELETE RESTRICT

---

authentication_record_id

References

authentication_record(id)

ON DELETE SET NULL

---

### Cardinality

User

1

↓

*

User Session

Authentication Record

1

↓

0..1

User Session

A successful authentication may create one session.

---

### Unique Constraints

None

Multiple concurrent sessions are permitted.

---

### Check Constraints

expires_at must be greater than created_at.

revoked_at must be greater than or equal to created_at when supplied.

Active sessions must not have a revoked_at value.

---

### Indexes

Primary

id

Secondary

user_id

organization_id

status

expires_at

last_activity_at

created_at

Composite

(user_id, status)

(organization_id, status)

(status, expires_at)

(last_activity_at, status)

---

### Audit Strategy

Session lifecycle events should be written to audit_log.

The session record represents current operational state.

---

### Soft Delete

Not supported.

Expired and revoked sessions are retained according to retention policy before archival.

---

### Relationships

User

1

↓

*

User Session

Authentication Record

1

↓

0..1

User Session

Session ownership remains within the User Aggregate.

---

### Business Rules

- A user may have multiple concurrent sessions.
- Revoked sessions cannot be reactivated.
- Expired sessions require re-authentication.
- Session tokens must never be stored in plaintext.
- Refresh tokens must be securely hashed.
- Session activity updates last_activity_at.
- Organization isolation applies to every session.

---

### Security & Access Rules

Platform Administrators

- View and revoke any session.

Organization Administrators

- View and revoke sessions within their organization where authorized.

Users

- View and revoke their own active sessions.

Direct modification of session tokens is prohibited.

---

### Sample Record

user_id

<user UUID>

status

active

device_name

MacBook Pro

last_activity_at

2026-08-05T06:00:00Z

expires_at

2026-08-06T06:00:00Z

---

### Performance Notes

Expected volume:

Very High

Read frequency:

Very High

Write frequency:

Very High

Caching:

Recommended for active session validation.

Partitioning:

Recommended for archived sessions.

---

### Future Considerations

- Device trust scoring
- Session risk assessment
- Idle timeout policies
- Concurrent session limits
- Location-aware sessions
- Continuous authentication
- Adaptive session expiry

---

### Implementation Notes

- Store only cryptographic hashes of session and refresh tokens.
- Session validation should avoid unnecessary database writes.
- Session cleanup should run through scheduled background jobs.
- Revocation should invalidate access immediately.
- Active session queries should be optimized using composite indexes.

---

# End of User Session Table

---

# Table Specification

## role

---

### Business Purpose

The role table defines reusable authorization roles within an organization.

Roles group permissions into manageable business responsibilities.

Examples include:

- Platform Administrator
- Organization Administrator
- Branch Manager
- Trainer
- Receptionist
- Accountant
- Inventory Manager
- Member Support

Roles simplify permission management by assigning collections of permissions rather than individual permissions directly to users.

---

### Aggregate

Role Aggregate

Aggregate Root

Role

---

### Logical Entity

Role

Classification

Aggregate Root

---

### PostgreSQL Table

role

Schema

platform

---

### Columns

| Column | Logical Type | PostgreSQL Type | Nullable | Default |
|----------|--------------|----------------|----------|----------|
| id | UUID | UUID | No | gen_random_uuid() |
| organization_id | UUID | UUID | No | — |
| code | Business Code | VARCHAR(50) | No | — |
| name | Text | VARCHAR(150) | No | — |
| description | Text | TEXT | Yes | NULL |
| is_system_role | Boolean | BOOLEAN | No | false |
| is_default | Boolean | BOOLEAN | No | false |
| priority | Integer | INTEGER | No | 100 |
| status | Enum | role_status_type | No | active |
| metadata | JSON | JSONB | No | '{}' |
| created_at | Timestamp | TIMESTAMPTZ | No | now() |
| updated_at | Timestamp | TIMESTAMPTZ | No | now() |
| deleted_at | Timestamp | TIMESTAMPTZ | Yes | NULL |
| created_by | UUID | UUID | Yes | NULL |
| updated_by | UUID | UUID | Yes | NULL |
| deleted_by | UUID | UUID | Yes | NULL |

---

### Primary Key

id

---

### Foreign Keys

organization_id

References

organization(id)

ON DELETE CASCADE

---

### Cardinality

Organization

1

↓

*

Role

Role

1

↓

*

Role Permission

Role

*

↓

*

User

---

### Unique Constraints

(organization_id, code)

(organization_id, name)

---

### Check Constraints

priority must be greater than or equal to zero.

---

### Indexes

Primary

id

Secondary

organization_id

status

priority

Composite

(organization_id, status)

(organization_id, priority)

Unique

(organization_id, code)

(organization_id, name)

---

### Audit Strategy

Full audit.

All permission changes performed through roles must be traceable.

---

### Soft Delete

Supported.

Roles should normally be archived rather than deleted.

System roles cannot be deleted.

---

### Relationships

Organization

1

↓

*

Role

Role

1

↓

*

Role Permission

Role

*

↓

*

User

---

### Business Rules

- Every role belongs to exactly one organization.
- Role codes are immutable after creation.
- System roles cannot be deleted.
- Default roles cannot be disabled while in use.
- Roles may exist without assigned users.

---

### Security & Access Rules

Platform Administrators

- Full access.

Organization Administrators

- Manage roles within their organization.

Branch Managers

- Read-only unless explicitly authorized.

Users

- No direct role management.

---

### Sample Record

organization_id

<organization UUID>

code

ORG_ADMIN

name

Organization Administrator

priority

10

status

active

---

### Performance Notes

Expected volume:

Low

Read frequency:

High

Write frequency:

Very Low

Caching:

Highly recommended.

Partitioning:

Not required.

---

### Future Considerations

- Hierarchical roles
- Delegated administration
- Temporary roles
- Role expiration
- Role templates
- Inherited permissions

---

### Implementation Notes

- Roles should remain stable business concepts.
- Business logic should resolve permissions through role assignments.
- Role evaluation should be optimized using caching.
- Authorization services should avoid repeated database lookups.

---

# End of Role Table

---

# Table Specification

## permission

---

### Business Purpose

The permission table defines the smallest assignable authorization capability within FitnessOS.

Permissions are reusable business capabilities that may be assigned to one or more roles.

Each permission represents:

- Resource
- Action
- Scope

Examples include:

Resource

Member

Action

Read

Scope

Own Branch

---

Resource

Invoice

Action

Update

Scope

Organization

This model supports fine-grained enterprise authorization.

---

### Aggregate

Role Aggregate

Internal Entity

Permission

---

### Logical Entity

Permission

Classification

Reference Entity

---

### PostgreSQL Table

permission

Schema

platform

---

### Columns

| Column | Logical Type | PostgreSQL Type | Nullable | Default |
|----------|--------------|----------------|----------|----------|
| id | UUID | UUID | No | gen_random_uuid() |
| code | Business Code | VARCHAR(150) | No | — |
| resource | Text | VARCHAR(100) | No | — |
| action | Text | VARCHAR(50) | No | — |
| scope | Text | VARCHAR(100) | No | organization |
| description | Text | TEXT | Yes | NULL |
| is_system_permission | Boolean | BOOLEAN | No | true |
| metadata | JSON | JSONB | No | '{}' |
| created_at | Timestamp | TIMESTAMPTZ | No | now() |
| updated_at | Timestamp | TIMESTAMPTZ | No | now() |

---

### Primary Key

id

---

### Foreign Keys

None

Permissions are global Platform reference entities.

---

### Cardinality

Permission

*

↓

*

Role

Permissions may be assigned to many roles.

Roles may contain many permissions.

---

### Business Identifier

code

Example

member.read.own_branch

invoice.update.organization

attendance.create.organization

---

### Unique Constraints

code

(resource, action, scope)

---

### Check Constraints

resource must not be empty.

action must not be empty.

scope must not be empty.

---

### Indexes

Primary

id

Unique

code

(resource, action, scope)

Secondary

resource

action

scope

Composite

(resource, action)

(resource, scope)

---

### Audit Strategy

Full audit.

Permission definitions are security-sensitive and all changes must be recorded.

---

### Soft Delete

Not supported.

Permissions should be deprecated rather than deleted.

Historical role assignments must remain valid.

---

### Relationships

Permission

*

↓

*

Role

Permission

↓

Referenced by

Role Permission

---

### Business Rules

- Permission codes are immutable.
- System permissions cannot be modified without platform migration.
- Resource, action, and scope together uniquely identify a permission.
- Permissions should describe business capabilities rather than technical operations.

---

### Security & Access Rules

Platform Administrators

- Full management.

Organization Administrators

- Read-only.

Branch Managers

- Read-only.

Users

- No direct access.

---

### Sample Record

code

member.read.own_branch

resource

member

action

read

scope

own_branch

---

### Performance Notes

Expected volume:

Low

Read frequency:

Very High

Write frequency:

Extremely Low

Caching:

Required.

Partitioning:

Not required.

---

### Future Considerations

- Attribute-Based Access Control (ABAC)
- Conditional permissions
- Time-limited permissions
- Policy engine integration
- Dynamic scopes
- AI-assisted permission recommendations

---

### Implementation Notes

- Permission definitions should be loaded into application cache during startup.
- Authorization services should evaluate permissions using cached data where possible.
- Permission codes should remain stable across releases.
- Business logic should never hardcode permission IDs.

---

# End of Permission Table

---

# Table Specification

## role_permission

---

### Business Purpose

The role_permission table assigns permissions to roles.

This table implements the many-to-many relationship between Role and Permission.

It allows permissions to be reused across multiple roles while keeping authorization centralized and maintainable.

---

### Aggregate

Role Aggregate

Internal Entity

Role Permission

---

### Logical Entity

Role Permission

Classification

Junction Entity

---

### PostgreSQL Table

role_permission

Schema

platform

---

### Columns

| Column | Logical Type | PostgreSQL Type | Nullable | Default |
|----------|--------------|----------------|----------|----------|
| id | UUID | UUID | No | gen_random_uuid() |
| role_id | UUID | UUID | No | — |
| permission_id | UUID | UUID | No | — |
| granted_at | Timestamp | TIMESTAMPTZ | No | now() |
| granted_by | UUID | UUID | Yes | NULL |

---

### Primary Key

id

---

### Foreign Keys

role_id

References

role(id)

ON DELETE CASCADE

---

permission_id

References

permission(id)

ON DELETE RESTRICT

---

granted_by

References

user(id)

ON DELETE SET NULL

---

### Cardinality

Role

1

↓

*

Role Permission

Permission

1

↓

*

Role Permission

---

### Unique Constraints

(role_id, permission_id)

Duplicate permission assignments are prohibited.

---

### Check Constraints

None required.

---

### Indexes

Primary

id

Secondary

role_id

permission_id

granted_at

Composite

(role_id, permission_id)

(permission_id, role_id)

---

### Audit Strategy

Full audit.

Permission grants and revocations must remain traceable.

---

### Soft Delete

Not supported.

Assignments are physically removed when revoked.

Historical changes remain in audit_log.

---

### Relationships

Role

↓

Role Permission

↓

Permission

---

### Business Rules

- A permission may be assigned only once to a role.
- Removing a role removes its permission assignments.
- System permissions remain assignable only through authorized roles.

---

### Security & Access Rules

Platform Administrators

- Full management.

Organization Administrators

- Manage assignments within their organization.

Users

- No direct access.

---

### Sample Record

role_id

<role UUID>

permission_id

<permission UUID>

---

### Performance Notes

Expected volume:

Medium

Read frequency:

Very High

Write frequency:

Low

Caching:

Recommended.

Partitioning:

Not required.

---

### Future Considerations

- Permission validity periods
- Conditional permission assignment
- Approval workflows

---

### Implementation Notes

Authorization caches should be refreshed whenever assignments change.

---

# End of Role Permission Table

---

# Table Specification

## user_role

---

### Business Purpose

The user_role table assigns roles to users.

Users receive permissions indirectly through assigned roles.

Multiple role assignments are supported.

---

### Aggregate

Role Aggregate

Internal Entity

User Role

---

### Logical Entity

User Role

Classification

Junction Entity

---

### PostgreSQL Table

user_role

Schema

platform

---

### Columns

| Column | Logical Type | PostgreSQL Type | Nullable | Default |
|----------|--------------|----------------|----------|----------|
| id | UUID | UUID | No | gen_random_uuid() |
| user_id | UUID | UUID | No | — |
| role_id | UUID | UUID | No | — |
| assigned_at | Timestamp | TIMESTAMPTZ | No | now() |
| assigned_by | UUID | UUID | Yes | NULL |
| expires_at | Timestamp | TIMESTAMPTZ | Yes | NULL |
| status | Enum | assignment_status_type | No | active |

---

### Primary Key

id

---

### Foreign Keys

user_id

References

user(id)

ON DELETE CASCADE

---

role_id

References

role(id)

ON DELETE RESTRICT

---

assigned_by

References

user(id)

ON DELETE SET NULL

---

### Cardinality

User

1

↓

*

User Role

Role

1

↓

*

User Role

---

### Unique Constraints

(user_id, role_id)

---

### Check Constraints

expires_at must be greater than assigned_at when supplied.

---

### Indexes

Primary

id

Secondary

user_id

role_id

status

expires_at

Composite

(user_id, status)

(role_id, status)

---

### Audit Strategy

Full audit.

Role assignment history must remain traceable.

---

### Soft Delete

Not supported.

Role assignments are revoked by changing status or removing the assignment.

---

### Relationships

User

↓

User Role

↓

Role

---

### Business Rules

- Users may hold multiple roles.
- Duplicate role assignments are prohibited.
- Expired assignments grant no permissions.
- Inactive assignments are ignored during authorization.

---

### Security & Access Rules

Platform Administrators

- Full management.

Organization Administrators

- Manage role assignments.

Users

- Read-only access to their own assigned roles where permitted.

---

### Sample Record

user_id

<user UUID>

role_id

<role UUID>

status

active

---

### Performance Notes

Expected volume:

Medium

Read frequency:

Very High

Write frequency:

Low

Caching:

Strongly recommended.

Partitioning:

Not required.

---

### Future Considerations

- Temporary emergency access
- Just-In-Time (JIT) role assignment
- Approval-based assignments
- Delegated administration

---

### Implementation Notes

Authorization caches should be invalidated whenever user role assignments change.

Permission resolution should occur through roles rather than direct user permissions.

---

# End of User Role Table

---

# Table Specification

## audit_log

---

### Business Purpose

The audit_log table stores immutable records of business and system activities occurring throughout FitnessOS.

Audit logging provides:

- Regulatory compliance
- Security investigations
- Change tracking
- Business accountability
- Operational diagnostics
- Forensic analysis

Audit records are append-only.

---

### Aggregate

Platform Aggregate

Historical Entity

Audit Log

---

### Logical Entity

Audit Log

Classification

Historical Entity

---

### PostgreSQL Table

audit_log

Schema

platform

---

### Columns

| Column | Logical Type | PostgreSQL Type | Nullable | Default |
|----------|--------------|----------------|----------|----------|
| id | UUID | UUID | No | gen_random_uuid() |
| organization_id | UUID | UUID | Yes | NULL |
| branch_id | UUID | UUID | Yes | NULL |
| user_id | UUID | UUID | Yes | NULL |
| entity_name | Text | VARCHAR(100) | No | — |
| entity_id | UUID | UUID | Yes | NULL |
| action | Text | VARCHAR(50) | No | — |
| old_values | JSON | JSONB | Yes | NULL |
| new_values | JSON | JSONB | Yes | NULL |
| ip_address | INET | INET | Yes | NULL |
| user_agent | TEXT | TEXT | Yes | NULL |
| correlation_id | UUID | UUID | Yes | NULL |
| metadata | JSON | JSONB | No | '{}' |
| occurred_at | Timestamp | TIMESTAMPTZ | No | now() |

---

### Primary Key

id

---

### Foreign Keys

organization_id → organization(id)

branch_id → branch(id)

user_id → user(id)

Historical records survive archival of related entities.

---

### Cardinality

Organization

1

↓

*

Audit Log

User

1

↓

*

Audit Log

---

### Unique Constraints

None.

---

### Check Constraints

action must not be empty.

entity_name must not be empty.

---

### Indexes

Primary

id

Secondary

organization_id

branch_id

user_id

entity_name

action

occurred_at

Composite

(organization_id, occurred_at)

(user_id, occurred_at)

(entity_name, entity_id)

(correlation_id)

---

### Audit Strategy

Self-auditing is unnecessary.

Audit records are immutable.

---

### Soft Delete

Not supported.

Retention policies govern archival.

---

### Relationships

Audit Log references operational entities but owns none.

---

### Business Rules

- Audit records are append-only.
- Existing audit records cannot be modified.
- Deletion is prohibited except through approved retention procedures.
- Sensitive fields should be masked where required.

---

### Security & Access Rules

Platform Administrators

- Full read access.

Security Administrators

- Full read access.

Organization Administrators

- Read access within their organization.

End users

- No direct access.

---

### Sample Record

entity_name

member

action

created

occurred_at

2026-08-05T08:30:00Z

---

### Performance Notes

Expected volume:

Extremely High

Read frequency:

Medium

Write frequency:

Extremely High

Partitioning:

Required by occurred_at.

Compression:

Recommended.

---

### Future Considerations

- Event sourcing integration
- Compliance exports
- Long-term cold storage
- Immutable archive storage

---

### Implementation Notes

- Writes should be asynchronous where practical.
- Sensitive values should be masked before persistence.
- Correlation IDs should link related operations across services.

---

# End of Audit Log Table

---

# Table Specification

## system_configuration

---

### Business Purpose

The system_configuration table stores global platform configuration.

Unlike organization_configuration or branch_configuration, these settings apply to the FitnessOS platform itself.

Examples include:

- Maintenance mode
- Global feature toggles
- Platform defaults
- Security defaults
- Background job settings
- AI defaults

---

### Aggregate

Platform Aggregate

Configuration Entity

System Configuration

---

### Logical Entity

System Configuration

Classification

Configuration Entity

---

### PostgreSQL Table

system_configuration

Schema

platform

---

### Columns

| Column | Logical Type | PostgreSQL Type | Nullable | Default |
|----------|--------------|----------------|----------|----------|
| id | UUID | UUID | No | gen_random_uuid() |
| configuration_key | Text | VARCHAR(150) | No | — |
| configuration_value | JSON | JSONB | No | '{}' |
| category | Text | VARCHAR(100) | No | general |
| description | TEXT | TEXT | Yes | NULL |
| version | INTEGER | INTEGER | No | 1 |
| created_at | TIMESTAMPTZ | TIMESTAMPTZ | No | now() |
| updated_at | TIMESTAMPTZ | TIMESTAMPTZ | No | now() |
| updated_by | UUID | UUID | Yes | NULL |

---

### Primary Key

id

---

### Foreign Keys

updated_by

References

user(id)

ON DELETE SET NULL

---

### Unique Constraints

configuration_key

---

### Check Constraints

version must be greater than zero.

configuration_key must not be empty.

---

### Indexes

Primary

id

Unique

configuration_key

Secondary

category

updated_at

Composite

(category, configuration_key)

---

### Audit Strategy

All configuration changes must be audited.

---

### Soft Delete

Not supported.

Configuration is updated in place.

---

### Relationships

Independent Platform configuration.

---

### Business Rules

- Configuration keys are unique.
- Configuration changes increment version.
- Only Platform Administrators may modify platform configuration.

---

### Security & Access Rules

Platform Administrators

- Full management.

Organization Administrators

- Read-only where appropriate.

All other users

- No direct access.

---

### Sample Record

configuration_key

platform.default_timezone

configuration_value

UTC

category

general

version

1

---

### Performance Notes

Expected volume:

Very Low

Read frequency:

High

Write frequency:

Very Low

Caching:

Required.

Partitioning:

Not required.

---

### Future Considerations

- Configuration inheritance
- Dynamic reload
- Environment-specific overrides
- Feature rollout percentages

---

### Implementation Notes

- Configuration should be cached in memory.
- Changes should invalidate configuration caches immediately.
- Keys should remain stable across releases.

---

# End of System Configuration Table