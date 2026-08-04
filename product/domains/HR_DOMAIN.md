# FITNESSOS DOMAIN IMPLEMENTATION CONTRACT

# HR Domain

Version: 2.1.0

Status: Architecture Approved

Owner: HR Engineering

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

The HR Domain manages the complete workforce lifecycle within FitnessOS.

It is the authoritative source for employees, trainers, departments, employment information, certifications, qualifications, leave management, shift assignments, workforce performance, and employment history.

The HR Domain enables organizations to manage human resources while supporting operational scheduling and workforce planning.

The HR Domain owns workforce information.

The Platform Domain owns authentication, authorization, users, and system access.

---

# Purpose

Provide complete workforce management capabilities for FitnessOS.

The HR Domain enables organizations to recruit, onboard, manage, develop, schedule, and offboard employees while maintaining complete employment history.

---

# Scope

The HR Domain owns:

- Employees
- Trainers
- Employment Records
- Departments (Business)
- Job Titles
- Certifications
- Qualifications
- Skills
- Shift Assignments
- Leave Requests
- Leave Balances
- Attendance (Employee Attendance)
- Performance Reviews
- Employment History
- Payroll References
- Contractor Records

---

# Responsibilities

The HR Domain is responsible for:

## Employee Management

Managing:

- Employee Profiles
- Employment Status
- Employment History
- Employee Classification

---

## Trainer Management

Managing:

- Trainer Profiles
- Trainer Certifications
- Trainer Qualifications
- Trainer Specializations

---

## Department Management

Managing business departments such as:

- Reception
- Sales
- Personal Training
- Operations
- Housekeeping
- Maintenance
- Management

Platform organizational structure remains owned by the Platform Domain.

---

## Certification Management

Managing:

- Professional Certifications
- Expiration Tracking
- Qualification Records
- Compliance Requirements

---

## Leave Management

Managing:

- Annual Leave
- Sick Leave
- Emergency Leave
- Unpaid Leave
- Leave Approval

---

## Workforce Performance

Managing:

- Performance Reviews
- Goals
- KPIs
- Development Plans

---

## Shift Assignment

Managing employee shift assignments.

Detailed scheduling remains owned by the Scheduling Domain.

---

## Employment Lifecycle

Managing:

- Hiring
- Onboarding
- Active Employment
- Suspension
- Termination
- Resignation
- Retirement

---

# Out of Scope

The HR Domain does NOT own:

- Authentication
- Authorization
- System Users
- Memberships
- Attendance (Member Attendance)
- Payments
- Invoices
- Inventory
- Notifications

These responsibilities belong to their respective domains.

---

# Client Applications

The HR Domain is consumed by:

- Gym Owner Web Application
- Staff Web Application
- Staff Mobile Application

---

# Domain Relationships

## Provides Services To

- Scheduling Domain
- Reporting Domain
- AI Domain

---

## Depends On

- Platform Domain

---

# Architecture Principles

The HR Domain follows these principles:

- Employment history is immutable.
- Every employee belongs to one organization.
- Certifications are historically auditable.
- Workforce information is confidential.
- Business departments are owned by HR.
- API-first.
- Event-driven.
- Tenant isolation by default.

---

# End of Part 1

---

# Business Capabilities

The HR Domain provides the complete set of capabilities required to manage the workforce throughout the employment lifecycle.

---

## Employee Management

Provides:

- Employee Registration
- Employee Profile Management
- Employment Classification
- Employee Status Management
- Employment History
- Employee Search

Every employee receives a unique HR identity.

---

## Trainer Management

Provides:

- Trainer Registration
- Trainer Profile Management
- Trainer Certifications
- Trainer Specializations
- Trainer Availability Reference
- Trainer Performance Tracking

Detailed scheduling remains owned by the Scheduling Domain.

---

## Department Management

Provides:

- Department Creation
- Department Assignment
- Department Structure
- Department Administration

Departments represent business organizational units.

---

## Job Management

Provides:

- Job Titles
- Job Grades
- Position Assignment
- Employment Categories

---

## Certification Management

Provides:

- Certification Registration
- Certification Renewal
- Expiration Monitoring
- Compliance Tracking
- Qualification History

---

## Leave Management

Provides:

- Leave Requests
- Leave Approval
- Leave Balances
- Leave History
- Leave Policies

---

## Workforce Performance Management

Provides:

- Performance Reviews
- Goals
- KPIs
- Development Plans
- Performance History

---

## Shift Assignment

Provides:

- Shift Assignment
- Shift Eligibility
- Workforce Allocation

Detailed schedules remain owned by the Scheduling Domain.

---

## Employment Lifecycle Management

Provides:

- Recruitment Reference
- Hiring
- Onboarding
- Employment Status
- Suspension
- Termination
- Retirement
- Rehire

---

# Business Rules

## Rule 1

Every employee belongs to exactly one organization.

---

## Rule 2

Every employee has one active employment record.

Historical employment remains permanently available.

---

## Rule 3

Employment history is immutable.

Corrections create adjustment records.

---

## Rule 4

Certifications retain complete historical records.

Expired certifications remain historically available.

---

## Rule 5

Employees may belong to one or more departments according to organization policy.

One department may be designated as the primary department.

---

## Rule 6

Leave balances are managed exclusively by the HR Domain.

---

## Rule 7

Shift assignments reference Scheduling but do not own schedules.

---

## Rule 8

Termination never deletes employment history.

---

## Rule 9

An employee may exist without a Platform User account.

---

## Rule 10

A Platform User may exist without being an employee.

---

# Business Policies

Organizations may configure policies including:

- Leave Policies
- Probation Policies
- Overtime Policies
- Employment Categories
- Certification Requirements
- Performance Review Frequency
- Department Structure
- Rehire Policy

Policies are organization-specific.

---

# Business Configuration

Organizations may configure:

- Departments
- Job Titles
- Employment Types
- Leave Types
- Leave Accrual Rules
- Certification Types
- Performance Rating Scales
- Employee Categories
- Contractor Categories

Configuration is tenant-specific.

---

# Employment Lifecycle

The HR Domain owns the workforce lifecycle.

```
Candidate
      │
      ▼
Hired
      │
      ▼
Onboarding
      │
      ▼
Active Employee
      │
 ┌────┼─────────────┐
 │    │             │
 ▼    ▼             ▼
Leave Promotion Suspension
 │    │             │
 └────┼─────────────┘
      ▼
Active Employee
      │
 ┌────┼──────────────┐
 │    │              │
 ▼    ▼              ▼
Resigned Retired Terminated
```

The HR Domain owns this lifecycle.

Scheduling references employment status but never owns it.

---

# Canonical Business Entities

The HR Domain owns:

- Employee
- Trainer
- Employment Record
- Department
- Job Title
- Certification
- Qualification
- Skill
- Leave Request
- Leave Balance
- Performance Review
- Employment History
- Contractor
- Shift Assignment

---

# Entity Ownership

The HR Domain is the authoritative source for workforce information.

Other domains may consume workforce information through APIs and published events but must never redefine HR entities.

---

# End of Part 2

---

# Public HR Services

The HR Domain exposes reusable business services responsible for workforce management throughout the employment lifecycle.

Business services encapsulate HR rules while remaining independent of client applications.

---

## Employee Service

Provides:

- Create Employee
- Update Employee
- Archive Employee
- Retrieve Employee
- Search Employees
- Manage Employment Status

The Employee Service is the authoritative source for workforce records.

---

## Trainer Service

Provides:

- Register Trainer
- Update Trainer Profile
- Manage Trainer Certifications
- Manage Trainer Skills
- Retrieve Trainer Information

Trainer scheduling remains the responsibility of the Scheduling Domain.

---

## Department Service

Provides:

- Create Department
- Update Department
- Archive Department
- Assign Employees
- Manage Department Structure

Departments represent business organizational units.

---

## Job & Position Service

Provides:

- Create Job Title
- Update Job Title
- Assign Position
- Manage Employment Categories

---

## Certification Service

Provides:

- Register Certification
- Renew Certification
- Record Qualification
- Monitor Expiration
- Retrieve Certification History

Certification history remains permanently auditable.

---

## Leave Management Service

Provides:

- Submit Leave Request
- Approve Leave
- Reject Leave
- Cancel Leave
- Manage Leave Balances
- Retrieve Leave History

---

## Performance Management Service

Provides:

- Create Performance Review
- Update Performance Goals
- Record KPIs
- Record Development Plans
- Retrieve Performance History

---

## Shift Assignment Service

Provides:

- Assign Employee to Shift
- Validate Shift Eligibility
- Retrieve Workforce Allocation

Detailed schedules remain owned by the Scheduling Domain.

---

## Employment Lifecycle Service

Provides:

- Hire Employee
- Onboard Employee
- Suspend Employment
- Reinstate Employment
- Terminate Employment
- Record Retirement
- Rehire Employee

Employment history is preserved throughout the lifecycle.

---

# API Responsibilities

The HR Domain exposes APIs for:

- Employees
- Trainers
- Departments
- Job Titles
- Certifications
- Qualifications
- Skills
- Leave Requests
- Leave Balances
- Performance Reviews
- Employment Records
- Contractors
- Shift Assignments

All APIs comply with API_ARCHITECTURE.md.

Internal implementation details remain private.

---

# Published Events

The HR Domain publishes business events including:

- EmployeeCreated
- EmployeeUpdated
- EmployeeHired
- EmployeeOnboarded
- EmployeeSuspended
- EmployeeReinstated
- EmployeeTerminated
- EmployeeRetired
- EmployeeRehired
- CertificationAdded
- CertificationExpired
- LeaveRequested
- LeaveApproved
- LeaveRejected
- PerformanceReviewCompleted
- DepartmentCreated

Published events represent completed workforce activities.

---

# Consumed Events

The HR Domain consumes events where workforce management depends on external business activities.

Examples include:

Platform Domain

- OrganizationCreated
- BranchCreated
- UserCreated
- UserDeactivated

Scheduling Domain

- ShiftAssigned
- ShiftCompleted

The HR Domain consumes these events without assuming ownership of external business entities.

---

# Event Responsibilities

The HR Domain is responsible for:

- Publishing workforce events
- Maintaining event version compatibility
- Preserving complete employment history
- Supporting downstream workforce automation
- Ensuring event auditability

Employment events are immutable once published.

---

# Integration Responsibilities

The HR Domain supports integrations with:

- Payroll Systems
- HR Information Systems (HRIS)
- Biometric Attendance Systems
- Learning Management Systems
- Certification Providers
- Government Compliance Systems
- Recruitment Platforms

All integrations use approved APIs and published events.

Direct database integration is prohibited.

---

# Service Boundaries

The HR Domain must never implement:

- Authentication
- Authorization
- Member management
- Member attendance
- Payment processing
- Invoice generation
- Detailed scheduling
- Notification delivery

These responsibilities remain with their owning domains.

---

# End of Part 3

---

# Permission Model

The HR Domain defines the business permissions required to manage workforce operations.

Authentication and authorization are enforced by the Platform Domain.

The HR Domain defines which permissions are required for HR activities.

---

## Employee Permissions

Examples:

- Create Employee
- Edit Employee
- Archive Employee
- View Employee
- Manage Employment Status
- View Employment History

Employment status changes should require elevated permissions.

---

## Trainer Permissions

Examples:

- Register Trainer
- Edit Trainer Profile
- Manage Trainer Certifications
- Manage Trainer Skills
- View Trainer Performance

---

## Department Permissions

Examples:

- Create Department
- Edit Department
- Archive Department
- Assign Employees
- Change Department Structure

Department administration should require elevated authorization.

---

## Certification Permissions

Examples:

- Register Certification
- Renew Certification
- Archive Certification
- Record Qualification
- View Certification History

---

## Leave Management Permissions

Examples:

- Submit Leave Request
- Approve Leave
- Reject Leave
- Cancel Leave
- Adjust Leave Balance

Leave balance adjustments require elevated authorization.

---

## Performance Management Permissions

Examples:

- Create Performance Review
- Update Performance Review
- Approve Performance Review
- Record Development Plan
- View Performance History

---

## Employment Lifecycle Permissions

Examples:

- Hire Employee
- Onboard Employee
- Suspend Employee
- Reinstate Employee
- Terminate Employee
- Rehire Employee

Employment termination should require elevated authorization.

---

# Security Responsibilities

The HR Domain follows the Security Architecture.

Responsibilities include:

- Protecting employee information
- Protecting confidential HR records
- Protecting certification records
- Enforcing organization ownership
- Respecting tenant isolation
- Auditing workforce operations

HR information is highly sensitive business data.

---

# Tenant Boundaries

Every HR record belongs to exactly one organization.

Employees, departments, certifications, leave records, and performance reviews must remain isolated between tenants.

Cross-tenant HR visibility is prohibited except where explicitly authorized for platform administration.

---

# UI Responsibilities

The HR Domain provides user interfaces for:

- Employee Directory
- Employee Profile
- Trainer Management
- Department Management
- Certification Management
- Leave Management
- Performance Reviews
- Employment History
- Workforce Dashboard

Business rules remain centralized within the HR Domain.

---

# Mobile Responsibilities

Mobile applications consume HR services for:

- Employee Directory
- Leave Requests
- Leave Approval
- Certification Lookup
- Performance Review Access
- Workforce Information

Mobile clients never implement HR business rules independently.

---

# Reporting Responsibilities

The HR Domain supplies data for reports including:

- Workforce Summary
- Department Headcount
- Employee Turnover
- Leave Utilization
- Certification Compliance
- Performance Trends
- Employment History
- Workforce Distribution
- Trainer Qualifications

Report generation belongs to the Reporting Domain.

---

# AI Responsibilities

The HR Domain supplies information to AI services including:

- Workforce Planning
- Employee Retention Prediction
- Certification Compliance Monitoring
- Leave Trend Analysis
- Performance Trend Analysis
- Skill Gap Identification
- Staffing Forecasting

AI services analyze HR data but never modify workforce records directly.

---

# Key Performance Indicators (KPIs)

Examples include:

- Employee Retention Rate
- Employee Turnover Rate
- Leave Utilization Rate
- Certification Compliance Rate
- Performance Review Completion Rate
- Average Time to Hire
- Workforce Productivity Index
- Department Utilization
- Trainer Certification Coverage
- Employee Development Completion Rate

KPIs support workforce planning, executive reporting, and operational management.

---

# End of Part 4

---

# Domain Risks

The HR Domain must proactively identify and mitigate workforce and operational risks.

Examples include:

- Duplicate employee records
- Unauthorized access to HR information
- Certification expiration
- Missing compliance records
- Leave balance inconsistencies
- Workforce shortages
- Incorrect department assignments
- Employment history corruption
- Performance review omissions
- Improper termination processing

Risk monitoring supports compliance, operational continuity, and workforce governance.

---

# Non-Functional Requirements

The HR Domain must satisfy the following quality attributes.

## Availability

HR services should remain available during business operating hours.

Critical workforce information should remain accessible with minimal disruption during planned maintenance.

---

## Scalability

The HR Domain must support:

- Multiple branches
- Franchise organizations
- Enterprise organizations
- Thousands of employees
- Large certification catalogs
- High workforce activity

Scalability must be achieved without changing business rules.

---

## Performance

Performance-sensitive operations include:

- Employee search
- Workforce directory
- Leave approval
- Certification lookup
- Performance review retrieval
- Department reporting

HR operations should remain responsive under enterprise workloads.

---

## Reliability

HR operations must support:

- Transaction consistency
- Reliable event publication
- Retry mechanisms
- Failure recovery
- Monitoring

Employment history must never be silently lost.

---

## Security

The HR Domain follows the Security Architecture.

Responsibilities include:

- Protecting confidential workforce information
- Protecting employment history
- Protecting performance records
- Auditing HR activities
- Tenant isolation
- Organization ownership enforcement

HR information is highly sensitive business data.

---

## Maintainability

HR business rules should remain centralized.

Client applications must never duplicate employment, certification, or leave management logic.

---

## Extensibility

The HR Domain should support future capabilities including:

- Competency Frameworks
- Career Path Management
- Succession Planning
- Employee Self-Service
- Digital Personnel Files
- Training Management
- Payroll Integration
- Workforce Analytics

Future enhancements must extend existing capabilities without changing domain ownership.

---

# Future Database Implications

The HR Domain is expected to own persistent storage for:

- Employees
- Trainers
- Employment Records
- Departments
- Job Titles
- Certifications
- Qualifications
- Skills
- Leave Requests
- Leave Balances
- Performance Reviews
- Employment History
- Contractors
- Shift Assignments

Logical ownership is defined here.

Physical database design will be completed during the Database Architecture milestone.

---

# Future Service Boundaries

As FitnessOS evolves, the HR Domain may be implemented as multiple deployable services while remaining a single logical business domain.

Potential service boundaries include:

- Employee Service
- Trainer Service
- Department Service
- Certification Service
- Leave Management Service
- Performance Management Service
- Employment Lifecycle Service

Deployment decisions must not alter business ownership or domain boundaries.

---

# Future Enhancements

Potential future capabilities include:

- Employee Self-Service Portal
- Career Development Plans
- Learning & Development
- Digital Document Management
- Competency Matrix
- Payroll Synchronization
- Workforce Succession Planning
- AI Career Coaching
- Organization Chart Visualization

---

# Cross-Domain Responsibilities

The HR Domain provides workforce information to other domains.

Examples:

Scheduling Domain

- Employee availability reference
- Trainer eligibility
- Workforce assignments

Reporting Domain

- Workforce analytics
- HR dashboards
- Compliance reporting

AI Domain

- Workforce forecasting
- Retention prediction
- Skill gap analysis
- Capacity planning

Communication Domain

- HR announcements
- Leave notifications
- Certification reminders

Platform Domain

- Employee to Platform User association
- Account provisioning workflows

The HR Domain owns workforce information.

Other domains consume HR information but never modify HR ownership.

---

# Acceptance Criteria

The HR Domain implementation contract is complete when:

- Domain responsibilities are clearly defined.
- Business boundaries are explicit.
- Employment lifecycle is documented.
- Business capabilities are complete.
- Business rules are defined.
- Business policies are configurable.
- Business configuration is documented.
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
- KPIs are defined.
- Domain risks are identified.
- Non-functional requirements are documented.
- Future database implications are identified.
- Future service boundaries are documented.
- Future enhancements are identified.

---

# Domain Summary

The HR Domain is the authoritative source for all workforce information within FitnessOS.

It governs employees, trainers, departments, certifications, qualifications, leave, performance, and employment history while ensuring workforce information is secure, auditable, and historically traceable.

The HR Domain provides workforce capabilities to other domains without owning authentication, scheduling, memberships, or financial operations.

This implementation contract serves as the reference specification for workforce management throughout the FitnessOS platform.

---

# End of HR Domain

Status: Architecture Complete

Milestone:

Complete Architecture

Document Classification:

Domain Implementation Contract