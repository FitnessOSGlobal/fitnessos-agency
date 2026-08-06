# FITNESSOS DATABASE NAMING CONVENTIONS

Version: 1.0.0

Status: Architecture Approved

Owner: Platform Architecture

Depends On:

- DATABASE_ARCHITECTURE.md
- AGGREGATE_MODEL.md
- ENTITY_CATALOG.md
- SCHEMA_ARCHITECTURE.md
- LOGICAL_DATABASE_MODEL.md

---

# Executive Summary

This document supersedes the previous Naming Reference and serves as the single authoritative naming standard for FitnessOS.

Consistent naming improves:

- Readability
- Maintainability
- Code Generation
- AI Development
- Query Development
- Migration Management
- Documentation
- Debugging

Every future database object must comply with these standards.

---

# Philosophy

Naming should prioritize:

- Consistency
- Clarity
- Predictability
- Simplicity

Names should describe business meaning rather than implementation details.

---

# General Rules

## Rule 1

Use English only.

---

## Rule 2

Use singular nouns for entities.

Correct

Member

Invoice

Payment

Incorrect

Members

Invoices

Payments

---

## Rule 3

Avoid abbreviations.

Correct

organization

Incorrect

org

---

Correct

membership

Incorrect

mship

---

## Rule 4

Avoid implementation prefixes.

Incorrect

tbl_member

t_invoice

obj_payment

---

## Rule 5

Use lowercase snake_case for all physical database objects.

Examples

organization

membership_plan

attendance_record

invoice_line

purchase_order

notification_delivery

---

# Schema Naming

Schemas represent domains.

Examples

platform

crm

membership

attendance

commerce

inventory

hr

scheduling

communication

reporting

ai

integration

Schema names should always be singular.

---

# Table Naming

Tables represent entities.

Naming format

snake_case

Examples

organization

branch

user

role

member

membership

membership_plan

attendance_record

invoice

invoice_line

payment

payment_allocation

purchase_order

purchase_order_line

notification

conversation_message

---

# Aggregate Root Tables

Aggregate Root tables use the business entity name.

Examples

member

invoice

payment

employee

booking

organization

No prefixes or suffixes.

---

# Internal Entity Tables

Use descriptive business names.

Examples

membership_status

membership_freeze

payment_allocation

attendance_event

conversation_message

---

# Historical Tables

Use explicit business terminology.

Examples

attendance_history

payment_history

membership_history

audit_log

Synchronization history

notification_history

Avoid generic history tables.

---

# Configuration Tables

Use descriptive configuration names.

Examples

membership_plan

notification_template

department

tax_rule

pricing_rule

Configuration belongs to the owning domain.

---

# End of Part 1

---

# Column Naming Philosophy

Column names should describe business meaning.

Names should remain:

- Predictable
- Consistent
- Readable
- Technology-neutral

Column naming follows lowercase snake_case.

---

# Primary Key Naming

Every Aggregate Root uses:

id

Example

organization.id

member.id

invoice.id

payment.id

booking.id

employee.id

Avoid entity-specific primary key names.

Incorrect:

member_id

invoice_id

payment_id

when used as the table's primary key.

---

# Foreign Key Naming

Foreign keys use:

referenced_entity_id

Examples

organization_id

branch_id

member_id

employee_id

invoice_id

payment_id

booking_id

membership_plan_id

Never abbreviate entity names.

---

# Identifier Columns

Business identifiers remain separate from technical identifiers.

Examples

membership_number

invoice_number

receipt_number

employee_number

purchase_order_number

These are business references, not primary keys.

---

# Name Columns

Recommended naming:

name

display_name

legal_name

short_name

Avoid generic values such as:

title

text

value

unless the business meaning specifically requires them.

---

# Description Columns

Recommended:

description

short_description

internal_note

public_note

Use business-specific terminology where appropriate.

---

# Status Columns

Status columns represent business lifecycle.

Examples

status

payment_status

membership_status

booking_status

notification_status

Avoid generic flags that duplicate status information.

---

# Boolean Naming

Booleans should read naturally.

Preferred prefixes:

is_

has_

can_

requires_

supports_

Examples

is_active

is_deleted

is_verified

has_access

has_expired

can_book

requires_approval

supports_refunds

Avoid ambiguous names.

Incorrect

active

verified

deleted

---

# Timestamp Standards

Standard timestamp names:

created_at

updated_at

deleted_at

approved_at

completed_at

cancelled_at

activated_at

expired_at

processed_at

Use *_at consistently for timestamps.

---

# Audit Columns

Standard audit columns:

created_by

updated_by

deleted_by

approved_by

processed_by

Audit columns reference the responsible user where applicable.

---

# Tenant Columns

Standard tenant ownership columns:

organization_id

branch_id

Every business entity requiring tenant ownership follows these names.

---

# Version Columns

Recommended version fields:

version

schema_version

model_version

template_version

Version naming reflects the object being versioned.

---

# Ordering Columns

Preferred names:

display_order

sort_order

sequence_number

Avoid generic names such as:

order

position

index

---

# Quantity Columns

Examples:

quantity

available_quantity

reserved_quantity

allocated_quantity

minimum_quantity

maximum_quantity

Use descriptive quantity names.

---

# Monetary Columns

Use explicit business meaning.

Examples

subtotal_amount

discount_amount

tax_amount

total_amount

paid_amount

refund_amount

balance_amount

Never use generic names such as:

amount

value

price

without business context.

---

# Percentage Columns

Examples

discount_percentage

tax_percentage

completion_percentage

attendance_percentage

Always include the unit in the name.

---

# Date Columns

Date-only values:

birth_date

joining_date

invoice_date

payment_date

expiry_date

Timestamp values continue using *_at.

---

# End of Part 2

---

# Constraint Naming Philosophy

Constraint names should clearly identify:

- Object type
- Owning table
- Business purpose

Constraint names use lowercase snake_case.

---

# Primary Key Constraints

Format:

pk_<table_name>

Examples

pk_member

pk_invoice

pk_payment

pk_organization

pk_booking

---

# Foreign Key Constraints

Format:

fk_<source_table>_<referenced_table>

Examples

fk_member_organization

fk_member_branch

fk_membership_member

fk_invoice_member

fk_payment_invoice

fk_booking_member

fk_booking_employee

---

# Unique Constraints

Format:

uq_<table_name>_<column_name>

Examples

uq_member_membership_number

uq_employee_employee_number

uq_invoice_invoice_number

uq_user_email

uq_role_name

---

# Check Constraints

Format:

ck_<table_name>_<business_rule>

Examples

ck_payment_positive_amount

ck_member_valid_birth_date

ck_invoice_total_non_negative

ck_booking_valid_time

Constraint names should describe the business rule being enforced.

---

# Default Constraints

When supported by the database engine.

Format:

df_<table_name>_<column_name>

Examples

df_member_status

df_payment_created_at

df_invoice_currency

---

# Index Naming Philosophy

Indexes describe the table and indexed columns.

Index names should not reference implementation details.

---

# Primary Index

Automatically created from the primary key.

No additional naming required beyond the primary key constraint.

---

# Standard Indexes

Format:

idx_<table_name>_<column>

Examples

idx_member_email

idx_member_phone

idx_invoice_status

idx_payment_date

idx_attendance_created_at

---

# Composite Indexes

Format:

idx_<table_name>_<column1>_<column2>

Examples

idx_member_organization_status

idx_invoice_member_date

idx_payment_invoice_status

idx_booking_branch_date

---

# Unique Indexes

Format:

uidx_<table_name>_<column>

Examples

uidx_user_username

uidx_member_membership_number

---

# Full Text Search Indexes

Format:

ftx_<table_name>

Examples

ftx_member

ftx_product

ftx_conversation_message

---

# Enum Naming

Enumerations represent finite business values.

Format:

<business_name>_type

Examples

membership_status_type

payment_status_type

booking_status_type

notification_type

attendance_event_type

Enums should describe business concepts.

---

# JSON Columns

JSON columns should be used only where structured relational modeling is not appropriate.

Recommended names:

metadata

settings

preferences

configuration

attributes

payload

context

Examples

member.preferences

connector.configuration

conversation.context

Avoid generic names such as:

json_data

blob

object

---

# File Reference Columns

Files should be referenced rather than stored directly in operational tables.

Recommended names:

file_id

document_id

image_id

attachment_id

media_id

Ownership of file storage remains outside the operational entity.

---

# Relationship Naming

Relationship tables should describe the business relationship.

Examples

member_campaign

employee_class

product_promotion

Avoid generic names such as:

mapping

relation

xref

---

# Lookup Tables

Lookup tables use descriptive names.

Examples

country

currency

language

tax_rule

membership_type

Avoid suffixes such as:

_lookup

_master

_table

---

# Event Tables

Business event tables should follow:

<business_event>

Examples

membership_event

payment_event

attendance_event

notification_event

Events should describe business occurrences.

---

# History Tables

Historical tables use:

<entity>_history

Examples

membership_history

payment_history

attendance_history

notification_history

History naming remains consistent across every domain.

---

# End of Part 3

---

# API Naming Alignment

Database naming and API naming follow different conventions while preserving identical business meaning.

Database:

snake_case

API:

camelCase

Examples

Database

member_id

membership_number

created_at

total_amount

API

memberId

membershipNumber

createdAt

totalAmount

Business meaning must remain identical.

---

# ORM Naming

ORM models use PascalCase.

Examples

Organization

Branch

User

Member

Membership

MembershipPlan

AttendanceRecord

Invoice

InvoiceLine

Payment

Booking

Employee

ConversationMessage

Plural model names are prohibited.

---

# Repository Naming

Repositories use:

<Entity>Repository

Examples

MemberRepository

InvoiceRepository

PaymentRepository

EmployeeRepository

OrganizationRepository

Repositories remain aggregate-oriented.

---

# Service Naming

Business services use:

<Entity>Service

Examples

MembershipService

PaymentService

AttendanceService

BookingService

NotificationService

Service names should represent business capabilities.

---

# Controller Naming

Controllers use:

<Entity>Controller

Examples

MemberController

InvoiceController

PaymentController

BookingController

Controllers expose business operations rather than database operations.

---

# DTO Naming

Request DTOs

CreateMemberRequest

UpdateMemberRequest

CreateInvoiceRequest

PaymentRequest

Response DTOs

MemberResponse

MembershipResponse

InvoiceResponse

BookingResponse

DTO names should clearly communicate intent.

---

# Event Naming

Business events use the past tense.

Examples

MemberRegistered

MembershipActivated

MembershipRenewed

InvoiceCreated

PaymentReceived

BookingConfirmed

AttendanceRecorded

NotificationDelivered

Events describe completed business facts.

---

# Migration Naming

Migration files use:

YYYYMMDDHHMMSS_<description>

Examples

20260805103000_create_member_table

20260805104500_create_invoice_table

20260805110000_add_payment_indexes

Migration descriptions should describe business intent.

---

# Seed Data Naming

Seed files use:

seed_<business_area>

Examples

seed_roles

seed_permissions

seed_departments

seed_membership_plans

seed_tax_rules

Seeds represent initial business data.

---

# Test Data Naming

Test fixtures use descriptive business names.

Examples

sample_member

sample_invoice

sample_payment

sample_employee

sample_booking

Avoid generic names such as:

test1

data

object

temp

---

# Environment Variables

Environment variables use uppercase snake_case.

Examples

DATABASE_URL

REDIS_URL

JWT_SECRET

SMTP_HOST

SMTP_PORT

AI_API_KEY

PAYMENT_PROVIDER_KEY

Environment variables should clearly describe their purpose.

---

# Configuration Files

Configuration files use lowercase snake_case.

Examples

database_config

auth_config

notification_config

payment_config

storage_config

---

# Package Naming

Packages use lowercase.

Examples

membership

attendance

commerce

inventory

communication

reporting

ai

integration

Package names align with domain names.

---

# Logging Terminology

Log messages should use business terminology.

Examples

Member registered

Payment received

Booking confirmed

Attendance recorded

Notification delivered

Avoid implementation-focused wording where business wording is appropriate.

---

# Error Code Naming

Error codes use:

DOMAIN_REASON

Examples

MEMBERSHIP_NOT_ACTIVE

PAYMENT_DECLINED

BOOKING_FULL

EMPLOYEE_NOT_FOUND

INVOICE_ALREADY_PAID

Error codes should remain stable over time.

---

# End of Part 4

---

# Naming Governance

The Database Naming Conventions document is the authoritative standard for naming across the FitnessOS platform.

All future database objects, application code, APIs, repositories, migrations, events, and documentation must comply with these standards.

---

# Governance Principles

## Principle 1

Naming standards are architecture decisions.

---

## Principle 2

Consistency has priority over personal preference.

---

## Principle 3

Business terminology takes precedence over technical terminology.

---

## Principle 4

Existing approved names should not be changed without architectural review.

---

## Principle 5

Every newly introduced object must follow these conventions.

---

# Exception Policy

Exceptions should remain extremely rare.

Valid reasons include:

- Third-party integration compatibility
- Legal or regulatory terminology
- Industry-standard terminology
- Vendor-imposed naming

All exceptions must be documented.

---

# Reserved Prefixes

The following prefixes are reserved.

Tables

No prefixes permitted.

Schemas

No prefixes permitted.

Primary Keys

pk_

Foreign Keys

fk_

Unique Constraints

uq_

Check Constraints

ck_

Default Constraints

df_

Indexes

idx_

Unique Indexes

uidx_

Full Text Indexes

ftx_

---

# Reserved Suffixes

Approved suffixes include:

_id

_number

_code

_name

_description

_status

_type

_amount

_percentage

_quantity

_date

_at

_by

_version

_history

_template

_configuration

---

# Naming Decision Matrix

| Object | Convention |
|----------|------------|
| Schema | snake_case |
| Table | snake_case singular |
| Column | snake_case |
| Primary Key | id |
| Foreign Key | referenced_entity_id |
| Business Identifier | entity_number |
| Boolean | is_, has_, can_, requires_, supports_ |
| Timestamp | *_at |
| Date | *_date |
| Monetary | *_amount |
| Percentage | *_percentage |
| Quantity | *_quantity |
| Enum | *_type |
| History | *_history |
| Configuration | descriptive business name |
| JSON | metadata, settings, configuration, preferences, attributes, payload, context |
| ORM Model | PascalCase |
| Repository | EntityRepository |
| Service | EntityService |
| Controller | EntityController |
| DTO | EntityRequest / EntityResponse |
| Event | Past tense (e.g. PaymentReceived) |
| Migration | YYYYMMDDHHMMSS_description |
| Seed | seed_business_area |
| Package | lowercase |
| Environment Variable | UPPER_SNAKE_CASE |

---

# Review Checklist

Before approving any database object verify:

- Uses approved business terminology.
- Uses correct casing.
- Uses approved prefixes or suffixes.
- Matches the Entity Catalog.
- Matches the Aggregate Model.
- Matches the Schema Architecture.
- Matches the Logical Database Model.
- Is technology-independent where applicable.

---

# Acceptance Criteria

The Naming Conventions document is complete when:

- General naming philosophy is documented.
- Table naming standards are defined.
- Schema naming standards are defined.
- Column naming standards are defined.
- Primary key naming is defined.
- Foreign key naming is defined.
- Constraint naming is defined.
- Index naming is defined.
- Enum naming is defined.
- JSON naming is defined.
- Relationship naming is defined.
- API naming alignment is documented.
- ORM naming is documented.
- Migration naming is documented.
- Event naming is documented.
- Repository naming is documented.
- Governance is documented.
- Exception policy is documented.
- Naming matrix is complete.

---

# Naming Conventions Summary

The FitnessOS Naming Conventions establish a single, consistent language across the entire platform.

These conventions apply equally to:

- Database objects
- Application code
- APIs
- Events
- Migrations
- Repositories
- Services
- Tests
- Documentation
- AI-generated artifacts

Adherence to these conventions ensures maintainability, consistency, readability, and predictable code generation throughout the lifecycle of the platform.

---

# End of Naming Conventions

Status: Architecture Complete

Milestone:

Database Naming Standards Complete

Document Classification:

Enterprise Database Naming Standard