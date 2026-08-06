# FITNESSOS DATABASE STYLE GUIDE

Version: 1.0.0

Status: Approved

Owner: Architecture Department

Applies To:

- All database documentation
- All database templates
- All future database domains

---

# Purpose

This document defines the official writing, formatting, terminology, and naming conventions for all FitnessOS database documentation.

Its purpose is to ensure that every document is:

- Consistent
- Readable
- Reviewable
- AI-friendly
- Developer-friendly
- Implementation-ready

This guide complements the Database Documentation Standard.

---

# Writing Principles

All documentation should be:

- Clear
- Precise
- Objective
- Technology-neutral unless implementation-specific
- Business-focused
- Free from ambiguity

Avoid marketing language.

Avoid conversational language.

Avoid implementation assumptions unless documented.

---

# Document Structure

Every document follows the same hierarchy.

# Title

Metadata

Purpose

Body

End of Document

No document skips metadata.

---

# Metadata Standard

Every document begins with:

Version

Status

Owner

Applies To (optional)

Depends On (optional)

---

# Heading Hierarchy

Use Markdown headings consistently.

# Level 1

Document Title

## Level 2

Major Sections

### Level 3

Subsections

Avoid deeper nesting unless necessary.

---

# Naming Conventions

Database Schemas

snake_case

Examples:

platform

membership

attendance

crm

commerce

---

Tables

Plural snake_case

Examples:

members

attendance_sessions

payments

crm_activities

---

Columns

snake_case

Examples:

member_id

organization_id

created_at

subscription_status

---

Primary Keys

Always:

id

UUID

---

Foreign Keys

Singular entity name plus "_id"

Examples:

organization_id

branch_id

member_id

payment_id

---

Audit Columns

Standard columns:

created_at

updated_at

created_by

updated_by

Optional:

deleted_at

deleted_by

---

Boolean Columns

Begin with:

is_

has_

Examples:

is_active

has_checked_in

---

Timestamp Columns

End with:

_at

Examples:

issued_at

renewed_at

completed_at

---

Relationship Language

Use consistent wording.

One Organization

↓

Many Branches

One Member

↓

Many Memberships

Avoid inconsistent terminology.

---

Business Terminology

Use:

Organization

Branch

Member

Membership

Order

Invoice

Payment

Attendance Session

Lead

Opportunity

Never invent synonyms.

---

Ownership Language

Always use:

Owns

References

Consumes

Publishes

Avoid vague phrases.

---

Lists

Use unordered lists for collections.

Use numbered lists only when sequence matters.

---

Tables

Use Markdown tables.

Every table requires:

Header

Separator

Consistent alignment

Example:

| Table | Purpose |
|--------|---------|
| members | Stores member records |

---

Diagrams

Simple text diagrams only.

Example:

Organization

↓

Branch

↓

Member

↓

Membership

Avoid ASCII art that reduces readability.

---

Business Rules

Express rules as short declarative statements.

Good:

Payments are append-only.

Bad:

Payments should probably not be edited after creation.

---

Future Sections

Always use:

Future Expansion

Not:

Possible Future Ideas

Potential Enhancements

---

Examples

Examples should illustrate structure rather than business logic.

Do not use fictional business data.

---

Implementation References

Implementation sections always follow this sequence:

Drizzle Schema

↓

Migration

↓

Repository

↓

Service

↓

Controller

↓

Tests

Never change this order.

---

Terminology

Use the same terms throughout the repository.

Examples:

Aggregate

Entity

Schema

Table

Relationship

Cardinality

Ownership

Lifecycle

Specification

Avoid mixing terminology.

---

Language

English only.

Use professional engineering language.

Avoid abbreviations unless industry standard.

---

Review Expectations

Before approval every document should be checked for:

- Consistent terminology
- Correct headings
- Naming compliance
- Formatting compliance
- Ownership clarity
- Cross-domain consistency

---

AI Guidance

AI-generated documentation must comply with this guide.

Generated content must never:

Invent ownership

Duplicate ownership

Skip required sections

Change terminology

Break naming conventions

---

Relationship to Implementation

Consistency in documentation enables consistent:

Database schemas

API contracts

Repositories

Services

Tests

Automation

Documentation quality directly affects implementation quality.

---

# End of Document