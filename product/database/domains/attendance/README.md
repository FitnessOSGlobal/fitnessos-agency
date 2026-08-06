# ATTENDANCE DATABASE DOMAIN

Version: 1.0.0

Status: Draft

Owner: Database Architecture

---

# Purpose

This directory contains the complete database design for the Attendance Domain.

The Attendance Domain is responsible for recording, validating, and auditing all member access and attendance activities across FitnessOS.

It serves as the authoritative specification for implementing attendance-related persistence using PostgreSQL and Drizzle ORM.

---

# Scope

The Attendance Domain includes:

- Member Check-In
- Member Check-Out
- Attendance Sessions
- Access Validation
- Access Methods (QR, RFID, Biometric, Mobile)
- Gate Events
- Attendance Auditing
- Visit History

---

# Documents

- BUSINESS_ANALYSIS.md
- AGGREGATE_MODEL.md
- ENTITY_CATALOG.md
- SCHEMA_ARCHITECTURE.md
- LOGICAL_DATABASE_MODEL.md
- DATABASE_SPECIFICATION.md

---

# Dependencies

Depends On:

- Platform Domain
- Membership Domain

Referenced By:

- Reporting
- CRM
- AI
- Commerce

---

# Database Schema

attendance

---

# Status

This specification is implementation-ready once approved.

---

# End