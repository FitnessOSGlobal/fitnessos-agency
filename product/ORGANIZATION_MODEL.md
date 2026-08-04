# FITNESSOS ORGANIZATION MODEL

Version: 1.0.0

Status: Draft

Owner: Architecture Department

Depends On:

- FITNESSOS_MASTER_SPECIFICATION.md

---

# Purpose

Define the canonical organizational hierarchy used throughout FitnessOS.

Every domain must reference this model instead of defining organizational concepts independently.

This document is the single source of truth for:

- Organization
- Brand
- Region
- Branch
- Facility
- Department
- Staff
- Members

---

# Organizational Hierarchy

The FitnessOS organizational hierarchy is:

FitnessOS Platform
│
└── Organization
    │
    ├── Brand (Optional)
    │
    ├── Region (Optional)
    │
    ├── Branch
    │
    ├── Facility
    │
    ├── Department
    │
    ├── Staff
    │
    └── Members

Each level has clearly defined ownership and responsibilities.

---

# Entity Definitions

## FitnessOS Platform

The global SaaS platform operated by FitnessOS.

Responsibilities:

- Platform administration
- Licensing
- Global configuration
- Super administration
- Global integrations

---

## Organization

Represents a customer of FitnessOS.

Examples:

- Fit Factory
- Gold's Gym Pakistan
- XYZ Fitness Group

Responsibilities:

- Subscription
- Billing
- Global organization settings
- Organization-wide reporting
- User management

---

## Brand (Optional)

Represents a commercial brand owned by an organization.

Examples:

- Fit Factory
- Fit Factory Women
- SHUA Performance
- Swim Academy

An organization may own multiple brands.

---

## Region (Optional)

Represents a geographical grouping of branches.

Examples:

- Lahore
- Karachi
- Punjab
- UAE

Used for:

- Regional management
- Regional reporting
- Franchise operations

---

## Branch

A physical business location.

Examples:

- DHA Branch
- Gulberg Branch
- Bahria Branch

Every branch belongs to exactly one organization.

A branch may belong to a brand and a region.

---

## Facility

A functional area within a branch.

Examples:

- Main Gym Floor
- CrossFit Box
- Yoga Studio
- Swimming Pool
- Sauna
- Café
- Recovery Zone

Facilities support scheduling, maintenance, bookings, and resource allocation.

---

## Department

Represents an operational unit within a branch.

Examples:

- Reception
- Sales
- Personal Training
- Group Fitness
- HR
- Finance
- Maintenance

Departments are used for operational reporting and staff organization.

---

## Staff

Employees and contractors working within an organization.

Examples:

- Receptionist
- Trainer
- Manager
- Nutritionist
- Physiotherapist
- Accountant

Staff may be assigned to one or more branches depending on permissions.

---

## Members

Customers receiving services from the organization.

Members belong to one organization and may access one or more branches depending on membership rules.

---

# Ownership Rules

Each organizational entity has exactly one parent.

Examples:

Branch → Organization

Facility → Branch

Department → Branch

Staff → Organization

Member → Organization

No circular ownership is permitted.

---

# Cross-Domain Usage

The Organization Model is referenced by:

- Platform Domain
- Membership Domain
- Attendance Domain
- Commerce Domain
- CRM Domain
- Inventory Domain
- HR Domain
- Scheduling Domain
- Reporting Domain
- AI Domain
- Integration Domain

No domain may redefine these entities.

---

# Design Principles

The organizational model must:

- Support single-location businesses.
- Support multi-branch organizations.
- Support multiple brands.
- Support regional operations.
- Support franchise structures.
- Support enterprise-scale deployments.
- Remain configuration-driven.

---

# End of Document