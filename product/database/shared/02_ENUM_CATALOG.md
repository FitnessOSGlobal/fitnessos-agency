# FITNESSOS ENUM CATALOG

Version: 1.0.0

Status: Enterprise Standard

Owner: Platform Architecture

Classification:

Shared Database Standard

---

# Purpose

The Enum Catalog defines every PostgreSQL enumeration used throughout FitnessOS.

Rather than redefining enum values inside individual domain specifications, all enums are centrally managed within this catalog.

This document provides a single authoritative reference for:

- Database schemas
- ORM models
- APIs
- Validation
- Frontend applications
- Reporting
- AI agents

---

# Why Enums Exist

Enumerations represent finite sets of valid business values.

Using enums provides:

- Data integrity
- Consistent terminology
- Type safety
- Easier validation
- Predictable code generation
- Better query performance
- Improved documentation

---

# Design Principles

## Principle 1

Every enum has one canonical definition.

---

## Principle 2

Each enum belongs to one owning domain.

---

## Principle 3

Enums describe business concepts.

They should never describe implementation details.

---

## Principle 4

Enum values should remain stable.

Removing existing values is discouraged.

New values may be appended following architectural review.

---

## Principle 5

Enum names follow the Naming Conventions standard.

Format

<business_name>_type

Examples

organization_status_type

membership_status_type

payment_status_type

---

# Definition Template

Every enum follows the same structure.

Enum Name

Business Purpose

Owning Domain

Referenced By

Allowed Values

Default Value

Lifecycle Notes

Implementation Notes

---

# Naming Rules

Enum names

snake_case

Enum values

lowercase

Examples

active

inactive

archived

approved

pending

cancelled

expired

Avoid:

CamelCase

UPPER_CASE

MixedCase

Abbreviations

---

# Domain Ownership

Each enum has one owning domain.

Other domains may reference the enum.

They must not redefine it.

Example

membership_status_type

Owner

Membership

Referenced By

Attendance

Commerce

Reporting

AI

---

# Value Stability

Enum values are considered part of the platform contract.

Existing values should not be renamed.

Existing values should not be removed.

Deprecated values should remain available until formally retired.

---

# Cross-Layer Consistency

Every enum should have identical meaning across:

- PostgreSQL
- Backend
- APIs
- Frontend
- Documentation
- AI agents
- Reports

---

# Catalog Organization

The catalog is organized by domain.

Platform

↓

Membership

↓

HR

↓

Attendance

↓

Scheduling

↓

Commerce

↓

Inventory

↓

CRM

↓

Communication

↓

Reporting

↓

AI

↓

Integration

---

# End of Part 1

---

# Platform Domain Enums

The Platform domain defines the foundational enumerations used for tenant management, identity, authentication, authorization, and platform configuration.

---

# organization_status_type

Business Purpose

Represents the operational lifecycle of an organization.

Owning Domain

Platform

Referenced By

Platform

Reporting

AI

Allowed Values

active

inactive

suspended

archived

Meaning

active

Organization operates normally.

inactive

Organization exists but is temporarily inactive.

suspended

Organization access is disabled due to administrative action.

archived

Organization is retained for historical purposes only.

Default Value

active

Implementation Notes

Organizations should normally transition to archived rather than being deleted.

---

# branch_status_type

Business Purpose

Represents the operational state of a branch.

Owning Domain

Platform

Referenced By

Attendance

Membership

Scheduling

Reporting

Allowed Values

active

inactive

maintenance

archived

Meaning

active

Branch accepts normal operations.

inactive

Branch temporarily unavailable.

maintenance

Branch unavailable due to maintenance.

archived

Historical branch retained for reporting.

Default Value

active

---

# user_status_type

Business Purpose

Represents the lifecycle of a user account.

Owning Domain

Platform

Referenced By

Authentication

Authorization

Reporting

Allowed Values

active

pending

locked

suspended

archived

Meaning

active

User can authenticate normally.

pending

Awaiting activation.

locked

Temporarily locked due to security policy.

suspended

Administrative suspension.

archived

Historical account only.

Default Value

active

---

# role_status_type

Business Purpose

Represents the lifecycle of authorization roles.

Owning Domain

Platform

Referenced By

Authorization

Allowed Values

active

inactive

archived

Meaning

active

Role available for assignment.

inactive

Role retained but unavailable for new assignments.

archived

Historical role only.

Default Value

active

---

# authentication_status_type

Business Purpose

Represents the outcome of an authentication attempt.

Owning Domain

Platform

Referenced By

Authentication Record

Security

Allowed Values

success

failure

blocked

expired

Meaning

success

Authentication completed successfully.

failure

Authentication failed.

blocked

Authentication denied by policy.

expired

Authentication request expired.

Default Value

success

---

# authentication_type

Business Purpose

Identifies the authentication mechanism used.

Owning Domain

Platform

Referenced By

Authentication Record

Allowed Values

password

passkey

otp

magic_link

oauth

sso

api_key

Meaning

password

Username and password.

passkey

WebAuthn or FIDO2 authentication.

otp

One-time password.

magic_link

Email login link.

oauth

OAuth provider.

sso

Enterprise Single Sign-On.

api_key

API authentication.

Default Value

password

---

# authentication_provider_type

Business Purpose

Identifies the identity provider.

Owning Domain

Platform

Referenced By

Authentication Record

Allowed Values

local

google

microsoft

apple

github

custom

Meaning

local

Internal authentication.

google

Google identity.

microsoft

Microsoft Entra ID.

apple

Apple Sign-In.

github

GitHub identity.

custom

Custom enterprise provider.

Default Value

local

---

# session_status_type

Business Purpose

Represents the lifecycle of an authenticated session.

Owning Domain

Platform

Referenced By

User Session

Allowed Values

active

expired

revoked

terminated

Meaning

active

Session currently valid.

expired

Session expired naturally.

revoked

Session revoked by policy or user.

terminated

Session forcibly ended.

Default Value

active

---

# assignment_status_type

Business Purpose

Represents the lifecycle of role assignments.

Owning Domain

Platform

Referenced By

User Role

Allowed Values

active

expired

revoked

Meaning

active

Assignment grants permissions.

expired

Assignment validity ended.

revoked

Assignment removed before expiry.

Default Value

active

---

# theme_type

Business Purpose

Represents user interface theme preference.

Owning Domain

Platform

Referenced By

User Profile

Allowed Values

light

dark

system

Meaning

light

Always use light theme.

dark

Always use dark theme.

system

Follow operating system preference.

Default Value

system

---

# gender_type

Business Purpose

Represents gender information where collected.

Owning Domain

Platform

Referenced By

User Profile

Employee

Member

Allowed Values

male

female

non_binary

prefer_not_to_say

Meaning

male

Male.

female

Female.

non_binary

Non-binary.

prefer_not_to_say

User chooses not to disclose.

Default Value

None

Implementation Notes

Collection of gender information should comply with applicable privacy regulations and local business requirements.

---

# End of Platform Domain Enums

---

# Membership Domain Enums

The Membership domain defines enumerations governing the complete lifecycle of members, memberships, plans, renewals, freezes, and sales progression.

---

# member_status_type

Business Purpose

Represents the operational lifecycle of a member.

Owning Domain

Membership

Referenced By

Attendance

CRM

Commerce

Reporting

AI

Allowed Values

lead

prospect

active

inactive

suspended

archived

Meaning

lead

Initial inquiry.

prospect

Qualified lead progressing toward enrollment.

active

Current member with valid access.

inactive

Member exists but has no active entitlement.

suspended

Access temporarily disabled.

archived

Historical record retained.

Default Value

lead

Implementation Notes

Member status represents the customer lifecycle rather than membership entitlement.

---

# membership_status_type

Business Purpose

Represents the lifecycle of a membership agreement.

Owning Domain

Membership

Referenced By

Attendance

Commerce

Reporting

Allowed Values

draft

pending_payment

active

frozen

expired

cancelled

archived

Meaning

draft

Created but incomplete.

pending_payment

Awaiting payment.

active

Membership grants access.

frozen

Temporarily paused.

expired

Contract completed.

cancelled

Terminated before completion.

archived

Historical record.

Default Value

draft

---

# membership_plan_type

Business Purpose

Classifies membership plans.

Owning Domain

Membership

Referenced By

Commerce

Reporting

Allowed Values

monthly

quarterly

semi_annual

annual

student

corporate

vip

custom

Meaning

monthly

One month duration.

quarterly

Three months.

semi_annual

Six months.

annual

Twelve months.

student

Student offering.

corporate

Corporate agreement.

vip

Premium membership.

custom

Organization-defined plan.

Default Value

monthly

---

# membership_freeze_status_type

Business Purpose

Represents freeze request progression.

Owning Domain

Membership

Referenced By

Reporting

Attendance

Allowed Values

requested

approved

active

completed

rejected

cancelled

Meaning

requested

Awaiting review.

approved

Approved but not yet active.

active

Freeze currently in effect.

completed

Freeze period finished.

rejected

Request denied.

cancelled

Cancelled before activation.

Default Value

requested

---

# renewal_status_type

Business Purpose

Represents renewal progress.

Owning Domain

Membership

Referenced By

Commerce

Reporting

Allowed Values

pending

processing

completed

failed

cancelled

Meaning

pending

Awaiting action.

processing

Renewal underway.

completed

Renewal successful.

failed

Renewal unsuccessful.

cancelled

Renewal abandoned.

Default Value

pending

---

# lead_status_type

Business Purpose

Represents sales lead progression.

Owning Domain

Membership

Referenced By

CRM

AI

Reporting

Allowed Values

new

contacted

qualified

converted

lost

Meaning

new

Recently created.

contacted

Initial communication completed.

qualified

Suitable prospect.

converted

Successfully became a member.

lost

Opportunity no longer active.

Default Value

new

---

# prospect_status_type

Business Purpose

Represents qualified prospect progression.

Owning Domain

Membership

Referenced By

CRM

Reporting

Allowed Values

qualified

negotiating

ready_to_join

converted

lost

Meaning

qualified

Validated opportunity.

negotiating

Commercial discussion underway.

ready_to_join

Awaiting enrollment.

converted

Successfully enrolled.

lost

Opportunity closed unsuccessfully.

Default Value

qualified

---

# membership_access_type

Business Purpose

Defines how facility access is granted.

Owning Domain

Membership

Referenced By

Attendance

Scheduling

AI

Allowed Values

unlimited

limited_visits

scheduled_only

class_only

staff_assigned

Meaning

unlimited

No visit restrictions.

limited_visits

Maximum visit allocation.

scheduled_only

Access only through approved bookings.

class_only

Access limited to booked classes.

staff_assigned

Access controlled by staff authorization.

Default Value

unlimited

---

# membership_payment_frequency_type

Business Purpose

Defines billing frequency.

Owning Domain

Membership

Referenced By

Commerce

Reporting

Allowed Values

one_time

weekly

monthly

quarterly

semi_annual

annual

Meaning

one_time

Single payment.

weekly

Weekly billing.

monthly

Monthly billing.

quarterly

Quarterly billing.

semi_annual

Every six months.

annual

Yearly billing.

Default Value

one_time

---

# End of Membership Domain Enums

---

# Human Resources (HR) Domain Enums

The HR domain defines enumerations governing employees, departments, employment, scheduling, and workforce management.

---

# employee_status_type

Business Purpose

Represents the employment lifecycle of an employee.

Owning Domain

HR

Referenced By

Scheduling

Attendance

Payroll

Reporting

Allowed Values

applicant

hired

active

on_leave

suspended

terminated

archived

Meaning

applicant

Candidate under recruitment.

hired

Employment accepted but not yet active.

active

Currently employed.

on_leave

Temporarily absent.

suspended

Temporarily removed from duties.

terminated

Employment ended.

archived

Historical employee record.

Default Value

applicant

---

# employment_type

Business Purpose

Defines employment classification.

Owning Domain

HR

Referenced By

Payroll

Reporting

Allowed Values

full_time

part_time

contract

temporary

intern

consultant

Meaning

full_time

Permanent full-time employee.

part_time

Regular part-time employee.

contract

Contract-based worker.

temporary

Short-term employment.

intern

Training placement.

consultant

External specialist.

Default Value

full_time

---

# shift_status_type

Business Purpose

Represents the lifecycle of a scheduled shift.

Owning Domain

HR

Referenced By

Attendance

Scheduling

Reporting

Allowed Values

scheduled

active

completed

missed

cancelled

Meaning

scheduled

Shift planned.

active

Currently in progress.

completed

Successfully finished.

missed

Employee did not attend.

cancelled

Shift cancelled.

Default Value

scheduled

---

# leave_request_status_type

Business Purpose

Represents approval workflow for leave requests.

Owning Domain

HR

Referenced By

Scheduling

Payroll

Reporting

Allowed Values

submitted

approved

rejected

cancelled

completed

Meaning

submitted

Awaiting review.

approved

Leave approved.

rejected

Request denied.

cancelled

Withdrawn.

completed

Leave period finished.

Default Value

submitted

---

# Attendance Domain Enums

---

# attendance_status_type

Business Purpose

Represents attendance event progression.

Owning Domain

Attendance

Referenced By

Reporting

AI

Allowed Values

checked_in

checked_out

completed

invalid

Meaning

checked_in

Entry recorded.

checked_out

Exit recorded.

completed

Attendance cycle complete.

invalid

Rejected attendance event.

Default Value

checked_in

---

# attendance_type

Business Purpose

Identifies attendance subject.

Owning Domain

Attendance

Referenced By

Reporting

AI

Allowed Values

member

employee

visitor

Meaning

member

Member attendance.

employee

Employee attendance.

visitor

Visitor attendance.

Default Value

member

---

# access_validation_result_type

Business Purpose

Represents outcome of access validation.

Owning Domain

Attendance

Referenced By

Security

Reporting

Allowed Values

approved

denied

expired

manual_override

Meaning

approved

Access granted.

denied

Access denied.

expired

Entitlement expired.

manual_override

Access granted manually.

Default Value

approved

---

# Scheduling Domain Enums

---

# booking_status_type

Business Purpose

Represents booking lifecycle.

Owning Domain

Scheduling

Referenced By

Commerce

Attendance

Reporting

Allowed Values

requested

confirmed

checked_in

completed

cancelled

no_show

Meaning

requested

Awaiting confirmation.

confirmed

Booking confirmed.

checked_in

Customer has arrived.

completed

Service delivered.

cancelled

Cancelled before service.

no_show

Customer failed to attend.

Default Value

requested

---

# appointment_status_type

Business Purpose

Represents appointment lifecycle.

Owning Domain

Scheduling

Referenced By

CRM

Reporting

Allowed Values

scheduled

confirmed

completed

cancelled

no_show

Meaning

scheduled

Appointment created.

confirmed

Attendance confirmed.

completed

Appointment delivered.

cancelled

Cancelled before start.

no_show

Customer absent.

Default Value

scheduled

---

# class_status_type

Business Purpose

Represents group class lifecycle.

Owning Domain

Scheduling

Referenced By

Attendance

Reporting

Allowed Values

scheduled

open

full

completed

cancelled

Meaning

scheduled

Planned.

open

Accepting bookings.

full

Capacity reached.

completed

Successfully delivered.

cancelled

Class cancelled.

Default Value

scheduled

---

# resource_status_type

Business Purpose

Represents operational availability of reservable resources.

Owning Domain

Scheduling

Referenced By

Inventory

Reporting

Allowed Values

available

reserved

maintenance

unavailable

retired

Meaning

available

Ready for use.

reserved

Currently allocated.

maintenance

Unavailable due to maintenance.

unavailable

Temporarily unavailable.

retired

Permanently removed from service.

Default Value

available

---

# End of HR, Attendance & Scheduling Domain Enums

---

# Commerce Domain Enums

The Commerce domain defines enumerations governing products, pricing, invoicing, payments, taxation, discounts, refunds, and commercial transactions.

---

# product_type

Business Purpose

Classifies commercial offerings.

Owning Domain

Commerce

Referenced By

Inventory

Reporting

CRM

Allowed Values

membership

service

physical_product

digital_product

rental

bundle

Meaning

membership

Membership-related offering.

service

Professional service.

physical_product

Tangible inventory item.

digital_product

Digital offering.

rental

Temporarily assigned asset.

bundle

Collection of products.

Default Value

service

---

# invoice_status_type

Business Purpose

Represents invoice lifecycle.

Owning Domain

Commerce

Referenced By

Finance

Reporting

Allowed Values

draft

issued

partially_paid

paid

overdue

cancelled

void

Meaning

draft

Being prepared.

issued

Delivered to customer.

partially_paid

Partial payment received.

paid

Fully settled.

overdue

Past due date.

cancelled

Cancelled before settlement.

void

Declared invalid.

Default Value

draft

---

# payment_status_type

Business Purpose

Represents payment processing state.

Owning Domain

Commerce

Referenced By

Finance

Reporting

Allowed Values

pending

processing

completed

failed

refunded

cancelled

Meaning

pending

Awaiting processing.

processing

Being processed.

completed

Successfully received.

failed

Processing unsuccessful.

refunded

Returned to payer.

cancelled

Payment cancelled.

Default Value

pending

---

# payment_method_type

Business Purpose

Identifies payment method.

Owning Domain

Commerce

Referenced By

Finance

Reporting

Allowed Values

cash

credit_card

debit_card

bank_transfer

mobile_wallet

cheque

gift_card

store_credit

Meaning

cash

Cash payment.

credit_card

Credit card.

debit_card

Debit card.

bank_transfer

Bank transfer.

mobile_wallet

Digital wallet.

cheque

Cheque payment.

gift_card

Gift card redemption.

store_credit

Internal credit.

Default Value

cash

---

# discount_type

Business Purpose

Defines discount calculation.

Owning Domain

Commerce

Referenced By

Reporting

Allowed Values

percentage

fixed_amount

promotion

coupon

loyalty

Meaning

percentage

Percentage reduction.

fixed_amount

Fixed monetary reduction.

promotion

Campaign-based discount.

coupon

Coupon redemption.

loyalty

Loyalty benefit.

Default Value

percentage

---

# refund_status_type

Business Purpose

Represents refund lifecycle.

Owning Domain

Commerce

Referenced By

Finance

Reporting

Allowed Values

requested

approved

processed

rejected

cancelled

Meaning

requested

Awaiting review.

approved

Authorized.

processed

Refund completed.

rejected

Request denied.

cancelled

Withdrawn.

Default Value

requested

---

# Inventory Domain Enums

---

# inventory_item_status_type

Business Purpose

Represents inventory availability.

Owning Domain

Inventory

Referenced By

Commerce

Reporting

Allowed Values

active

inactive

out_of_stock

discontinued

archived

Meaning

active

Available.

inactive

Temporarily unavailable.

out_of_stock

No stock remaining.

discontinued

No longer sold.

archived

Historical item.

Default Value

active

---

# stock_movement_type

Business Purpose

Classifies inventory movement.

Owning Domain

Inventory

Referenced By

Reporting

Audit

Allowed Values

purchase

sale

transfer

adjustment

return

damage

loss

Meaning

purchase

Stock received.

sale

Stock issued.

transfer

Moved between locations.

adjustment

Inventory correction.

return

Returned stock.

damage

Damaged inventory.

loss

Inventory loss.

Default Value

purchase

---

# purchase_order_status_type

Business Purpose

Represents procurement lifecycle.

Owning Domain

Inventory

Referenced By

Finance

Reporting

Allowed Values

draft

approved

issued

partially_received

received

closed

cancelled

Meaning

draft

Being prepared.

approved

Approved internally.

issued

Sent to supplier.

partially_received

Partial delivery.

received

Fully delivered.

closed

Completed.

cancelled

Cancelled.

Default Value

draft

---

# CRM Domain Enums

---

# lead_source_type

Business Purpose

Identifies how a lead originated.

Owning Domain

CRM

Referenced By

Reporting

AI

Allowed Values

walk_in

website

social_media

referral

phone

email

advertisement

event

Meaning

walk_in

Visited branch.

website

Website inquiry.

social_media

Social platform.

referral

Referral.

phone

Phone inquiry.

email

Email inquiry.

advertisement

Paid advertising.

event

Campaign or event.

Default Value

walk_in

---

# campaign_status_type

Business Purpose

Represents marketing campaign lifecycle.

Owning Domain

CRM

Referenced By

Reporting

AI

Allowed Values

draft

scheduled

active

paused

completed

cancelled

Meaning

draft

Under preparation.

scheduled

Planned.

active

Running.

paused

Temporarily stopped.

completed

Finished.

cancelled

Cancelled.

Default Value

draft

---

# opportunity_status_type

Business Purpose

Represents sales opportunity progression.

Owning Domain

CRM

Referenced By

Reporting

Allowed Values

identified

qualified

proposal

negotiation

won

lost

Meaning

identified

Initial opportunity.

qualified

Validated.

proposal

Proposal delivered.

negotiation

Commercial discussion.

won

Successful sale.

lost

Opportunity closed unsuccessfully.

Default Value

identified

---

# Communication Domain Enums

---

# notification_status_type

Business Purpose

Represents notification delivery lifecycle.

Owning Domain

Communication

Referenced By

Reporting

Allowed Values

queued

sending

sent

delivered

failed

read

Meaning

queued

Waiting to send.

sending

Transmission in progress.

sent

Accepted by provider.

delivered

Delivered to recipient.

failed

Delivery unsuccessful.

read

Recipient viewed notification.

Default Value

queued

---

# notification_channel_type

Business Purpose

Defines communication channel.

Owning Domain

Communication

Referenced By

All domains.

Allowed Values

email

sms

push

whatsapp

in_app

voice

Meaning

email

Email message.

sms

SMS message.

push

Push notification.

whatsapp

WhatsApp.

in_app

Application notification.

voice

Voice call.

Default Value

in_app

---

# template_status_type

Business Purpose

Represents message template lifecycle.

Owning Domain

Communication

Referenced By

Campaign

Notification

Allowed Values

draft

approved

active

deprecated

archived

Meaning

draft

Being authored.

approved

Approved for use.

active

Available.

deprecated

Scheduled for retirement.

archived

Historical only.

Default Value

draft

---

# End of Commerce, Inventory, CRM & Communication Domain Enums

---

# AI Domain Enums

The AI domain defines enumerations supporting intelligent automation, recommendations, predictions, assistants, and AI workflow execution.

---

# ai_job_status_type

Business Purpose

Represents the lifecycle of an AI task.

Owning Domain

AI

Referenced By

Reporting

Automation

Allowed Values

queued

running

completed

failed

cancelled

Meaning

queued

Waiting for execution.

running

Currently executing.

completed

Finished successfully.

failed

Execution failed.

cancelled

Cancelled before completion.

Default Value

queued

---

# recommendation_status_type

Business Purpose

Represents the lifecycle of an AI recommendation.

Owning Domain

AI

Referenced By

CRM

Reporting

Allowed Values

generated

accepted

rejected

expired

Meaning

generated

Recommendation created.

accepted

Accepted by user.

rejected

Dismissed.

expired

No longer applicable.

Default Value

generated

---

# Reporting Domain Enums

---

# report_status_type

Business Purpose

Represents report generation lifecycle.

Owning Domain

Reporting

Referenced By

AI

Allowed Values

queued

generating

completed

failed

Meaning

queued

Awaiting generation.

generating

Currently generating.

completed

Successfully produced.

failed

Generation failed.

Default Value

queued

---

# report_format_type

Business Purpose

Defines report output format.

Owning Domain

Reporting

Referenced By

Communication

Allowed Values

pdf

xlsx

csv

json

html

Meaning

pdf

Portable Document Format.

xlsx

Microsoft Excel.

csv

Comma-separated values.

json

Structured JSON.

html

Web document.

Default Value

pdf

---

# Integration Domain Enums

---

# integration_status_type

Business Purpose

Represents the lifecycle of an integration.

Owning Domain

Integration

Referenced By

Reporting

Allowed Values

configured

active

paused

error

disabled

Meaning

configured

Ready but not active.

active

Operating normally.

paused

Temporarily suspended.

error

Integration failure.

disabled

Disabled administratively.

Default Value

configured

---

# webhook_status_type

Business Purpose

Represents webhook delivery state.

Owning Domain

Integration

Referenced By

Reporting

Allowed Values

queued

sent

delivered

failed

retrying

Meaning

queued

Waiting for dispatch.

sent

Dispatched.

delivered

Successfully received.

failed

Delivery unsuccessful.

retrying

Retry scheduled.

Default Value

queued

---

# Governance

## Ownership

Each enum has exactly one owning domain.

Only the owning domain may introduce new values.

---

## Versioning

Enum values are additive.

Existing values must not be renamed.

Existing values must not be removed without a documented migration strategy.

---

## Naming Rules

Enum Names

snake_case

Suffix

_type

Enum Values

lowercase

Words separated by underscores.

---

## Acceptance Criteria

The Enum Catalog is complete when:

- Every PostgreSQL enum is defined.
- Every enum has one owning domain.
- Every enum documents business meaning.
- Every enum specifies a default value where applicable.
- Cross-domain references are documented.
- Naming conventions are followed consistently.

---

# Summary

The Enum Catalog is the authoritative source for every PostgreSQL enumeration used throughout FitnessOS.

Database specifications must reference this catalog rather than redefining enum values.

This ensures consistent business semantics across:

- Database
- Backend
- APIs
- Frontend
- Reporting
- Documentation
- AI agents

---

Status

Enterprise Standard

Version

1.0.0

Document Classification

Shared Database Standard

---

# End of Enum Catalog