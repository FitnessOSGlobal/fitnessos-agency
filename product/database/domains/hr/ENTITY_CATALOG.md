# HR ENTITY CATALOG

Version: 1.0.0

Status: Draft

Owner: Database Architecture

---

# Purpose

This document defines every entity owned by the HR Domain.

The HR Domain is the authoritative owner of employee lifecycle and workforce management data.

---

# Aggregate — Employee

## Entity

Employee

### Purpose

Represents an individual employed by the organization.

### Lifecycle

Candidate

↓

Hired

↓

Active

↓

On Leave

↓

Inactive

↓

Terminated

↓

Archived

### Owns

- Employee Number
- Employment Status
- Hire Date
- Employment Type
- Manager Assignment

---

## Entity

Employment Record

### Purpose

Stores employment history and contractual information.

---

## Entity

Employee Document

### Purpose

Stores employment-related documents.

Examples:

- Employment Contract
- Identification
- Certifications
- Performance Documents

---

# Aggregate — Organization

## Entity

Department

### Purpose

Represents an organizational department.

---

## Entity

Position

### Purpose

Defines a job position within the organization.

---

# Aggregate — Leave

## Entity

Leave Request

### Purpose

Represents employee leave applications.

---

## Entity

Leave Balance

### Purpose

Maintains available leave allocations.

---

# Aggregate — Performance

## Entity

Performance Review

### Purpose

Stores employee evaluation results.

---

## Entity

Performance Objective

### Purpose

Tracks measurable employee goals.

---

# Aggregate — Learning

## Entity

Certification

### Purpose

Tracks employee certifications.

---

## Entity

Skill

### Purpose

Represents employee competencies.

---

## Entity

Training Record

### Purpose

Maintains employee training history.

---

# Cross-Domain References

Platform

- Organization
- Branch
- User

Scheduling

- Trainer Assignment

Communication

- Notification

Reporting

- Workforce Analytics

AI

- Workforce Insights

---

# Ownership Summary

HR owns:

- Employees
- Employment Records
- Departments
- Positions
- Leave
- Performance
- Certifications
- Skills
- Training
- Employee Documents

HR references:

- Organization
- Branch
- User

---

# Future Entities

Potential future entities include:

- Payroll Profile
- Benefits Enrollment
- Recruitment Candidate
- Interview
- Job Posting
- Succession Plan

---

# End of Document