# FITNESSOS BUSINESS GLOSSARY

Version: 1.0.0

Status: Enterprise Standard

Owner: Enterprise Architecture

Classification:

Shared Database Standard

---

# Purpose

The Business Glossary defines the official business vocabulary used throughout FitnessOS.

Every domain must use these definitions consistently.

The glossary establishes a single ubiquitous language shared by:

- Product Owners
- Business Analysts
- Architects
- Developers
- QA Engineers
- DevOps Engineers
- AI Agents
- Support Teams

Every business concept should have one official meaning.

---

# Why This Exists

Large software systems often become inconsistent because different teams use different terminology.

Examples:

Customer

Client

User

Member

Subscriber

If these words are used interchangeably, confusion spreads into:

- Database design
- APIs
- Documentation
- Reports
- AI-generated code

FitnessOS avoids this by defining one canonical vocabulary.

---

# Principles

## Principle 1

One business concept has one official definition.

---

## Principle 2

Business terminology takes precedence over technical terminology.

---

## Principle 3

Every domain must reference this glossary.

---

## Principle 4

Definitions should remain technology independent.

---

## Principle 5

Definitions describe business meaning rather than implementation.

---

# Definition Template

Every glossary entry follows the same structure.

Business Term

Definition

Business Purpose

Owned By Domain

Referenced By

Lifecycle

Related Terms

Notes

---

# Domain Ownership

Every business term has one owning domain.

Other domains may reference the term.

They must not redefine it.

Example

Member

Owner

Membership Domain

Referenced by

Attendance

CRM

Commerce

Scheduling

Reporting

Ownership always remains with Membership.

---

# Naming Rules

Business terms use:

Singular nouns

Examples

Member

Organization

Branch

Invoice

Payment

Booking

Avoid plural terminology.

---

# Cross-Domain Consistency

Every occurrence of a business term should have identical meaning across:

- Database
- API
- Frontend
- Documentation
- Reports
- AI prompts
- Test cases

---

# End of Part 1

---

# Platform Domain Terms

The Platform domain provides the foundational capabilities upon which every other FitnessOS domain depends.

Platform owns tenant management, identity, authentication, authorization, and global configuration.

---

# Organization

Definition

A legal or operational business entity that owns and operates one or more branches within FitnessOS.

Business Purpose

Represents the highest tenant boundary in the platform.

Owned By Domain

Platform

Referenced By

All domains.

Lifecycle

Created

↓

Active

↓

Suspended

↓

Archived

Related Terms

Branch

Tenant

User

Configuration

Notes

Every operational record ultimately belongs to exactly one organization.

---

# Branch

Definition

A physical or virtual operational location belonging to an organization.

Business Purpose

Represents where business operations are performed.

Owned By Domain

Platform

Referenced By

Membership

Attendance

HR

Commerce

Inventory

Scheduling

Reporting

Lifecycle

Created

↓

Active

↓

Inactive

↓

Archived

Related Terms

Organization

Employee

Member

Inventory

Notes

Every branch belongs to exactly one organization.

---

# Tenant

Definition

The logical isolation boundary that separates one organization's data from another.

Business Purpose

Provides secure multi-tenant data isolation.

Owned By Domain

Platform

Referenced By

All domains.

Lifecycle

Implicit.

Exists as long as the owning organization exists.

Related Terms

Organization

Branch

Security

Notes

Tenant is a platform concept rather than a business entity.

---

# User

Definition

An authenticated identity that accesses FitnessOS.

Business Purpose

Represents people or system accounts capable of using platform functionality.

Owned By Domain

Platform

Referenced By

All domains.

Lifecycle

Invited

↓

Active

↓

Suspended

↓

Archived

Related Terms

Role

Permission

Authentication

Session

Employee

Notes

A user is not necessarily an employee.

System accounts and API accounts are also users.

---

# User Profile

Definition

The collection of personal and preference information associated with a user.

Business Purpose

Separates personal information from authentication data.

Owned By Domain

Platform

Referenced By

Profile management

Notifications

Reporting

Notes

Contains no authentication credentials.

---

# Role

Definition

A reusable collection of permissions representing a business responsibility.

Business Purpose

Simplifies authorization management.

Owned By Domain

Platform

Referenced By

User

Permission

Security

Lifecycle

Created

↓

Assigned

↓

Retired

Related Terms

Permission

User Role

Notes

Roles represent responsibilities rather than individual users.

---

# Permission

Definition

The smallest assignable authorization capability within FitnessOS.

Business Purpose

Defines what actions are permitted against specific resources.

Owned By Domain

Platform

Referenced By

Role

Authorization

Security

Structure

Resource

Action

Scope

Notes

Permissions describe business capabilities rather than technical implementation.

---

# Authentication

Definition

The process of verifying the identity of a user.

Business Purpose

Protects access to platform resources.

Owned By Domain

Platform

Referenced By

User

Session

Security

Notes

Authentication verifies identity.

Authorization determines permitted actions.

---

# User Session

Definition

An active authenticated interaction between a user and the platform.

Business Purpose

Tracks authenticated access during a login session.

Owned By Domain

Platform

Referenced By

Security

Authentication

Audit

Lifecycle

Created

↓

Active

↓

Expired

↓

Revoked

Notes

Sessions represent operational state.

Authentication history is stored separately.

---

# Audit Log

Definition

An immutable historical record of business and system events.

Business Purpose

Provides accountability, compliance, and traceability.

Owned By Domain

Platform

Referenced By

All domains.

Notes

Audit records are append-only.

Historical accuracy must be preserved.

---

# Configuration

Definition

A collection of settings controlling platform, organization, or branch behavior.

Business Purpose

Allows operational behavior to be customized without altering business identity.

Owned By Domain

Platform

Referenced By

All domains.

Types

System Configuration

Organization Configuration

Branch Configuration

Notes

Configuration is versioned and managed separately from core business entities.

---

# End of Platform Domain Terms

---

# Membership Domain Terms

The Membership domain manages the complete lifecycle of members, memberships, plans, enrollment, renewals, freezes, upgrades, downgrades, and cancellations.

Membership is the core business domain of FitnessOS.

---

# Member

Definition

A person enrolled with an organization who may purchase memberships, attend facilities, book services, and interact with the business.

Business Purpose

Represents the primary customer of a fitness business.

Owned By Domain

Membership

Referenced By

Attendance

Commerce

CRM

Scheduling

Communication

Reporting

AI

Lifecycle

Lead

↓

Prospect

↓

Member

↓

Inactive Member

↓

Archived Member

Related Terms

Membership

Membership Plan

Attendance

Invoice

Booking

Notes

A Member is a business entity.

A User is a system identity.

These concepts remain separate.

---

# Membership

Definition

A contractual agreement granting a member access to one or more business services for a defined period under specific conditions.

Business Purpose

Defines the commercial relationship between a member and the organization.

Owned By Domain

Membership

Referenced By

Attendance

Commerce

CRM

Reporting

Lifecycle

Draft

↓

Pending Payment

↓

Active

↓

Frozen

↓

Expired

↓

Cancelled

↓

Archived

Related Terms

Member

Membership Plan

Renewal

Freeze

Notes

A Member may own multiple memberships over time.

Only one active primary membership may exist unless explicitly supported by business policy.

---

# Membership Plan

Definition

A reusable commercial product defining pricing, duration, benefits, and access rules for memberships.

Business Purpose

Standardizes membership offerings.

Owned By Domain

Membership

Referenced By

Commerce

CRM

Reporting

Notes

Plans define products.

Memberships define customer agreements.

---

# Membership Type

Definition

A classification describing the nature of a membership plan.

Examples

Monthly

Quarterly

Annual

Student

Corporate

VIP

Business Purpose

Supports reporting, pricing, and business rules.

Owned By Domain

Membership

Referenced By

Reporting

Commerce

Notes

Types classify plans rather than individual members.

---

# Membership Freeze

Definition

A temporary suspension of an active membership while preserving remaining entitlement.

Business Purpose

Allows members to pause access without terminating the membership.

Owned By Domain

Membership

Referenced By

Attendance

Reporting

Commerce

Lifecycle

Requested

↓

Approved

↓

Active

↓

Completed

Related Terms

Membership

Renewal

Notes

Frozen periods normally extend the membership expiry date according to business policy.

---

# Membership Renewal

Definition

The process of extending an existing membership beyond its current expiry.

Business Purpose

Maintains uninterrupted member access.

Owned By Domain

Membership

Referenced By

Commerce

Reporting

Notes

Renewals preserve membership continuity.

---

# Membership Upgrade

Definition

The replacement of an existing membership with another providing additional benefits.

Business Purpose

Supports changing business requirements.

Owned By Domain

Membership

Referenced By

Commerce

Notes

Financial adjustments may apply.

---

# Membership Downgrade

Definition

The replacement of an existing membership with another providing fewer benefits.

Business Purpose

Allows members to reduce service level while remaining active.

Owned By Domain

Membership

Referenced By

Commerce

Notes

Business rules determine when downgrades are permitted.

---

# Lead

Definition

A person who has expressed interest in the organization's services but has not yet become a member.

Business Purpose

Represents potential future business.

Owned By Domain

Membership

Referenced By

CRM

Communication

AI

Lifecycle

Created

↓

Qualified

↓

Prospect

↓

Member

↓

Lost

Notes

Not every lead becomes a member.

---

# Prospect

Definition

A qualified lead actively progressing toward membership.

Business Purpose

Represents high-intent potential customers.

Owned By Domain

Membership

Referenced By

CRM

Sales

Reporting

Notes

Prospects are more likely than leads to complete enrollment.

---

# End of Membership Domain Terms

---

# Human Resources (HR) Domain Terms

The HR domain manages employees, employment, departments, job positions, skills, certifications, payroll references, and workforce lifecycle.

Employees operate the business.

Members consume the business.

---

# Employee

Definition

A person employed or contracted by an organization to perform operational, administrative, technical, or management responsibilities.

Business Purpose

Represents the workforce responsible for delivering business services.

Owned By Domain

HR

Referenced By

Platform

Attendance

Scheduling

Payroll

CRM

Reporting

AI

Lifecycle

Applicant

↓

Hired

↓

Active

↓

On Leave

↓

Suspended

↓

Terminated

↓

Archived

Related Terms

Department

Position

Shift

Payroll

Performance Review

User

Notes

An Employee may have an associated User account.

Not every User is an Employee.

---

# Department

Definition

A logical organizational unit responsible for specific business functions.

Business Purpose

Groups employees according to business responsibilities.

Owned By Domain

HR

Referenced By

Reporting

Scheduling

Payroll

Examples

Operations

Reception

Sales

Training

Finance

Management

Maintenance

---

# Position

Definition

A defined job role performed by employees.

Business Purpose

Standardizes employment responsibilities.

Owned By Domain

HR

Referenced By

Scheduling

Payroll

Performance

Examples

Trainer

Receptionist

Manager

Cleaner

Nutritionist

Physiotherapist

Sales Executive

---

# Shift

Definition

A scheduled working period assigned to one or more employees.

Business Purpose

Supports workforce scheduling.

Owned By Domain

HR

Referenced By

Attendance

Scheduling

Payroll

---

# Certification

Definition

A professional qualification held by an employee.

Business Purpose

Tracks professional competency.

Owned By Domain

HR

Referenced By

Scheduling

Compliance

Reporting

Examples

Personal Trainer Certification

CPR

Nutrition

First Aid

---

# Skill

Definition

A measurable capability possessed by an employee.

Business Purpose

Supports staffing decisions and workforce planning.

Owned By Domain

HR

Referenced By

Scheduling

AI

Reporting

Examples

Sales

Strength Training

CrossFit

Nutrition

Customer Service

---

# Performance Review

Definition

A structured evaluation of employee performance over a defined period.

Business Purpose

Supports employee development and organizational improvement.

Owned By Domain

HR

Referenced By

Reporting

AI

Management

---

# Leave Request

Definition

A formal request by an employee for approved absence from scheduled work.

Business Purpose

Supports workforce planning and attendance management.

Owned By Domain

HR

Referenced By

Scheduling

Payroll

Reporting

---

# Payroll Reference

Definition

A financial record linking employee compensation to payroll processing.

Business Purpose

Provides integration between HR and payroll systems.

Owned By Domain

HR

Referenced By

Finance

Reporting

Integration

Notes

Payroll calculation may be managed internally or by an external payroll provider.

---

# End of HR Domain Terms

---

# Attendance Domain Terms

The Attendance domain manages member check-ins, employee attendance, access validation, visit history, occupancy, and attendance analytics.

Attendance represents the actual consumption of business services.

---

# Attendance

Definition

A recorded event indicating that a member or employee has entered, exited, or otherwise interacted with a business location.

Business Purpose

Provides an accurate operational history of facility usage.

Owned By Domain

Attendance

Referenced By

Membership

Reporting

AI

Commerce

Security

Lifecycle

Created

↓

Validated

↓

Completed

↓

Archived

Related Terms

Member

Employee

Branch

Visit

Access Point

Examples

✓ Member gym check-in

✓ Employee clock-in

✓ Visitor check-in

Notes

Attendance records are immutable business events.

---

# Check-In

Definition

The recorded event marking the beginning of an attendance session.

Business Purpose

Confirms facility access.

Owned By Domain

Attendance

Referenced By

Membership

Reporting

Security

---

# Check-Out

Definition

The recorded event marking the end of an attendance session.

Business Purpose

Measures facility utilization and visit duration.

Owned By Domain

Attendance

Referenced By

Reporting

AI

---

# Visit

Definition

A complete attendance cycle beginning with check-in and ending with check-out.

Business Purpose

Represents one instance of facility usage.

Owned By Domain

Attendance

Referenced By

Reporting

AI

Commerce

---

# Access Point

Definition

A controlled entry or exit location used for attendance validation.

Business Purpose

Tracks where attendance events occur.

Owned By Domain

Attendance

Referenced By

Security

Reporting

Examples

✓ Main Entrance

✓ Staff Entrance

✓ Swimming Pool

✓ VIP Area

✓ Parking Gate

---

# Occupancy

Definition

The number of people currently present within a facility or area.

Business Purpose

Supports operational monitoring and safety.

Owned By Domain

Attendance

Referenced By

Reporting

AI

Security

---

# Scheduling Domain Terms

The Scheduling domain manages time-based allocation of organizational resources.

Resources include:

- Employees
- Trainers
- Classes
- Rooms
- Equipment

---

# Booking

Definition

A reservation for a future service, resource, class, appointment, or facility.

Business Purpose

Allocates business resources efficiently.

Owned By Domain

Scheduling

Referenced By

Commerce

CRM

Communication

Reporting

Lifecycle

Requested

↓

Confirmed

↓

Checked In

↓

Completed

↓

Cancelled

Related Terms

Appointment

Class

Resource

Member

Examples

✓ Personal training session

✓ Swimming slot

✓ Group fitness class

---

# Appointment

Definition

A scheduled one-to-one interaction between a member and a service provider.

Business Purpose

Provides individualized services.

Owned By Domain

Scheduling

Referenced By

CRM

Commerce

Reporting

---

# Class

Definition

A scheduled group activity delivered to multiple members.

Business Purpose

Provides structured group fitness experiences.

Owned By Domain

Scheduling

Referenced By

Attendance

Commerce

Reporting

Examples

✓ Yoga

✓ HIIT

✓ CrossFit

✓ Pilates

✓ Spinning

---

# Resource

Definition

Any business asset that may be reserved or allocated.

Business Purpose

Supports efficient operational planning.

Owned By Domain

Scheduling

Referenced By

Inventory

Reporting

AI

Examples

✓ Trainer

✓ Studio

✓ Meeting Room

✓ Court

✓ Equipment

---

# Schedule

Definition

An organized timetable defining the availability of resources and services.

Business Purpose

Coordinates operational activities.

Owned By Domain

Scheduling

Referenced By

HR

Attendance

Communication

Reporting

---

# End of Attendance & Scheduling Domain Terms

---

# Commerce Domain Terms

The Commerce domain manages products, pricing, invoices, payments, taxation, discounts, refunds, and financial transactions related to business operations.

Commerce represents the financial engine of FitnessOS.

---

# Product

Definition

A commercial offering that may be sold by an organization.

Business Purpose

Represents goods or services available for purchase.

Owned By Domain

Commerce

Referenced By

Inventory

CRM

Reporting

AI

Examples

✓ Membership Plan

✓ Personal Training Package

✓ Protein Supplement

✓ Gym Apparel

✓ Locker Rental

Notes

Products may represent physical goods, digital offerings, or services.

---

# Invoice

Definition

A financial document requesting payment for one or more products or services.

Business Purpose

Records financial obligations between the organization and a customer.

Owned By Domain

Commerce

Referenced By

Reporting

Finance

Integration

Lifecycle

Draft

↓

Issued

↓

Partially Paid

↓

Paid

↓

Cancelled

---

# Payment

Definition

A financial transaction settling all or part of an invoice.

Business Purpose

Records monetary exchange.

Owned By Domain

Commerce

Referenced By

Finance

Reporting

AI

Examples

✓ Cash

✓ Credit Card

✓ Bank Transfer

✓ Mobile Wallet

---

# Discount

Definition

A reduction applied to the standard selling price.

Business Purpose

Supports promotional pricing and commercial flexibility.

Owned By Domain

Commerce

Referenced By

CRM

Reporting

Examples

✓ Fixed amount

✓ Percentage

✓ Promotional campaign

---

# Refund

Definition

A financial reversal returning money to a customer.

Business Purpose

Corrects financial transactions.

Owned By Domain

Commerce

Referenced By

Reporting

Finance

---

# Tax

Definition

A mandatory financial charge applied according to legal or regulatory requirements.

Business Purpose

Ensures compliant financial transactions.

Owned By Domain

Commerce

Referenced By

Reporting

Finance

Integration

---

# Inventory Domain Terms

The Inventory domain manages physical assets, stock levels, procurement, suppliers, and warehouse operations.

---

# Inventory Item

Definition

A physical asset managed through stock control.

Business Purpose

Tracks available inventory.

Owned By Domain

Inventory

Referenced By

Commerce

Reporting

AI

Examples

✓ Protein Powder

✓ T-Shirt

✓ Resistance Band

✓ Dumbbell

✓ Yoga Mat

---

# Stock Movement

Definition

A recorded increase or decrease in inventory quantity.

Business Purpose

Maintains accurate inventory balances.

Owned By Domain

Inventory

Referenced By

Reporting

Audit

Examples

✓ Purchase

✓ Sale

✓ Adjustment

✓ Transfer

✓ Damage

---

# Supplier

Definition

An external organization providing goods or services.

Business Purpose

Supports procurement.

Owned By Domain

Inventory

Referenced By

Commerce

Reporting

---

# Purchase Order

Definition

A formal request issued to a supplier for goods or services.

Business Purpose

Initiates procurement.

Owned By Domain

Inventory

Referenced By

Finance

Reporting

Lifecycle

Draft

↓

Approved

↓

Issued

↓

Received

↓

Closed

---

# CRM Domain Terms

The CRM domain manages customer relationships, sales activities, marketing campaigns, and customer engagement.

---

# Campaign

Definition

An organized marketing initiative targeting specific audiences.

Business Purpose

Promotes products and services.

Owned By Domain

CRM

Referenced By

Communication

Reporting

AI

Examples

✓ Summer Membership Offer

✓ Student Discount Campaign

✓ Corporate Wellness Campaign

---

# Opportunity

Definition

A qualified sales opportunity with a realistic probability of becoming business.

Business Purpose

Supports sales forecasting.

Owned By Domain

CRM

Referenced By

Reporting

AI

---

# Follow-Up

Definition

A scheduled customer interaction performed after a previous engagement.

Business Purpose

Maintains customer relationships.

Owned By Domain

CRM

Referenced By

Communication

AI

Examples

✓ Phone Call

✓ WhatsApp Message

✓ Email

✓ In-person Meeting

---

# Communication Domain Terms

The Communication domain manages outbound and inbound business communications.

---

# Notification

Definition

A message delivered to inform a user or member about a business event.

Business Purpose

Provides timely communication.

Owned By Domain

Communication

Referenced By

All domains.

Examples

✓ Membership Expiring

✓ Payment Received

✓ Booking Confirmed

✓ Class Cancelled

---

# Template

Definition

A reusable message structure used to generate communications.

Business Purpose

Ensures consistent messaging.

Owned By Domain

Communication

Referenced By

Notification

Campaign

Examples

✓ Email Template

✓ SMS Template

✓ Push Notification Template

✓ WhatsApp Template

---

# Delivery Channel

Definition

The medium through which a communication is delivered.

Business Purpose

Supports multi-channel messaging.

Owned By Domain

Communication

Referenced By

Notification

Campaign

Examples

✓ Email

✓ SMS

✓ Push Notification

✓ WhatsApp

✓ In-App Notification

---

# End of Commerce, Inventory, CRM & Communication Domain Terms

---

# Artificial Intelligence (AI) Domain Terms

The AI domain provides intelligent automation, prediction, recommendation, anomaly detection, natural language interaction, and decision support across FitnessOS.

AI augments business processes but does not replace business ownership of data.

---

# AI Assistant

Definition

An intelligent software agent that assists users by answering questions, performing tasks, generating recommendations, or automating workflows.

Business Purpose

Improves productivity and operational efficiency.

Owned By Domain

AI

Referenced By

All domains.

Examples

✓ Reception Assistant

✓ Sales Assistant

✓ Trainer Assistant

✓ Management Assistant

✓ Reporting Assistant

---

# Recommendation

Definition

A system-generated suggestion intended to improve business outcomes.

Business Purpose

Supports informed decision-making.

Owned By Domain

AI

Referenced By

Membership

CRM

Commerce

Reporting

Examples

✓ Recommend membership upgrade

✓ Recommend trainer

✓ Recommend retention campaign

✓ Recommend inventory reorder

---

# Prediction

Definition

A forecast generated using historical and current business data.

Business Purpose

Supports proactive business planning.

Owned By Domain

AI

Referenced By

Reporting

CRM

Inventory

Examples

✓ Membership renewal probability

✓ Churn prediction

✓ Revenue forecast

✓ Attendance forecast

---

# Automation

Definition

A predefined workflow executed with minimal or no manual intervention.

Business Purpose

Reduces repetitive operational work.

Owned By Domain

AI

Referenced By

All domains.

Examples

✓ Automatic reminder

✓ Automatic membership renewal

✓ Automatic stock reorder

✓ Automatic follow-up

---

# Reporting Domain Terms

The Reporting domain provides operational, financial, analytical, and executive insights.

Reports summarize business activity but do not own operational data.

---

# Report

Definition

A structured presentation of business information generated from one or more domains.

Business Purpose

Supports operational and strategic decision-making.

Owned By Domain

Reporting

Referenced By

All domains.

Examples

✓ Daily Attendance Report

✓ Revenue Report

✓ Membership Growth Report

✓ Employee Performance Report

---

# Dashboard

Definition

A visual summary of key business indicators.

Business Purpose

Provides at-a-glance operational awareness.

Owned By Domain

Reporting

Referenced By

Management

AI

Examples

✓ CEO Dashboard

✓ Branch Dashboard

✓ Sales Dashboard

✓ Trainer Dashboard

---

# Key Performance Indicator (KPI)

Definition

A measurable value used to evaluate business performance.

Business Purpose

Tracks progress toward organizational objectives.

Owned By Domain

Reporting

Referenced By

AI

Management

Examples

✓ Active Members

✓ Monthly Revenue

✓ Member Retention Rate

✓ Attendance Rate

✓ Trainer Utilization

---

# Integration Domain Terms

The Integration domain manages communication with external systems.

---

# Integration

Definition

A managed connection between FitnessOS and an external system.

Business Purpose

Supports interoperability.

Owned By Domain

Integration

Referenced By

All domains.

Examples

✓ Payment Gateway

✓ SMS Provider

✓ Email Provider

✓ Accounting System

✓ Biometric Device

✓ ERP

---

# Connector

Definition

A software component implementing communication with a specific external service.

Business Purpose

Encapsulates integration logic.

Owned By Domain

Integration

Referenced By

All domains.

Examples

✓ Stripe Connector

✓ WhatsApp Connector

✓ SMTP Connector

✓ ZKTeco Connector

---

# Webhook

Definition

An event-driven notification delivered from one system to another.

Business Purpose

Enables near real-time synchronization.

Owned By Domain

Integration

Referenced By

Commerce

CRM

Communication

---

# End of AI, Reporting & Integration Domain Terms

---

# Governance

## Synonyms

The following synonyms should not replace official terminology.

Customer → Member

Client → Member

Subscriber → Member

Staff → Employee

Office → Branch

Gym → Branch

Account → User

Permission Group → Role

Every implementation must use the canonical business term.

---

## Deprecated Terminology

The following terms should not be introduced into new specifications.

Client

Subscriber

Office Location

Staff Member

Permission Group

Organization Unit

Deprecated terms remain documented only for migration or historical reference.

---

## Review Process

Changes to glossary definitions require architectural review.

Every new business term must include:

- Definition
- Business Purpose
- Owning Domain
- Referenced Domains
- Lifecycle (where applicable)
- Related Terms
- Examples (where applicable)

---

## Acceptance Criteria

The Business Glossary is complete when:

- Every domain has defined its canonical terminology.
- Every business term has a single owning domain.
- Cross-domain references are identified.
- Synonyms are documented.
- Deprecated terminology is documented.
- Governance rules are established.
- New terminology follows the approved template.

---

# Summary

The FitnessOS Business Glossary is the authoritative business vocabulary for the platform.

It provides a single source of truth for terminology used in:

- Database specifications
- APIs
- User interfaces
- Reports
- Documentation
- AI agents
- Test cases
- Business analysis

Consistent terminology reduces ambiguity, improves collaboration, and enables scalable platform development.

---

Status

Enterprise Standard

Version

1.0.0

Document Classification

Shared Business Standard

---

# End of Business Glossary