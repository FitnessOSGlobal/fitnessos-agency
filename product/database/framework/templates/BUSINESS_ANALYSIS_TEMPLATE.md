# <DOMAIN NAME> DATABASE BUSINESS ANALYSIS

Version: <VERSION>

Status: <STATUS>

Owner: <OWNER>

Depends On:

- <UPSTREAM DOMAIN>

Referenced By:

- <DOWNSTREAM DOMAIN>

---

# Purpose

Describe the business purpose of this database domain.

Explain:

- Why the domain exists.
- What business capability it owns.
- Why the capability belongs to this domain.

This document defines business responsibilities only.

Implementation details belong elsewhere.

---

# Business Objectives

List measurable objectives.

Example structure:

- Objective 1
- Objective 2
- Objective 3

Objectives should describe outcomes rather than implementation.

---

# Business Capabilities

Group capabilities into logical sections.

## Capability Group

Describe responsibilities.

Examples:

- Capability
- Capability
- Capability

Repeat as required.

---

# Domain Responsibilities

Owns:

- <ENTITY>
- <ENTITY>
- <ENTITY>

Does Not Own:

- <EXTERNAL ENTITY>
- <EXTERNAL ENTITY>

Ownership must be exclusive.

---

# External Dependencies

Depends On

- <DOMAIN>

Consumes

- <DOMAIN>

Referenced By

- <DOMAIN>

Only document direct business dependencies.

---

# Business Rules

Document the rules that govern this domain.

Examples:

- Rule
- Rule
- Rule

Rules should be declarative and testable.

---

# Security Considerations

Document business security requirements.

Examples:

- Tenant isolation
- Auditability
- Role-based access
- Data retention
- Compliance requirements

---

# Performance Expectations

Describe expected workload.

Consider:

- Read frequency
- Write frequency
- Concurrency
- Reporting
- Analytics

Avoid implementation-specific optimization details.

---

# Future Expansion

Document expected future capabilities.

Examples:

- Capability
- Capability
- Capability

Future expansion should not require redesign of current ownership.

---

# Success Criteria

The domain is considered complete when:

- Business responsibilities are defined.
- Ownership is clear.
- Dependencies are documented.
- Business rules are complete.
- Future growth has been considered.

---

# Relationship to Other Documents

This document is followed by:

1. AGGREGATE_MODEL.md
2. ENTITY_CATALOG.md
3. SCHEMA_ARCHITECTURE.md
4. LOGICAL_DATABASE_MODEL.md
5. DATABASE_SPECIFICATION.md

---

# Review Notes

Reviewer:

Review Date:

Comments:

---

# End of Document