# <DOMAIN NAME> AGGREGATE MODEL

Version: <VERSION>

Status: <STATUS>

Owner: <OWNER>

---

# Purpose

This document defines the aggregate boundaries for the <DOMAIN NAME> Domain.

Each aggregate establishes:

- Transaction boundary
- Ownership boundary
- Consistency boundary
- Lifecycle
- Business rules

Aggregates own only their own business data.

---

# Aggregate Overview

This domain contains:

1. <Aggregate>
2. <Aggregate>
3. <Aggregate>

Each aggregate has one Aggregate Root.

---

# Aggregate Template

## Aggregate Root

<Aggregate Name>

### Purpose

Describe why this aggregate exists.

### Owns

- <Entity>
- <Entity>
- <Value Object>

### Business Rules

- Rule
- Rule
- Rule

### Relationships

Describe relationships with other aggregates.

### Lifecycle

Created

↓

Active

↓

Completed

↓

Archived

Repeat this section for every aggregate.

---

# Aggregate Relationships

Describe relationships between aggregates.

Example:

Aggregate A

↓

Aggregate B

↓

Aggregate C

Cross-domain relationships must use identifiers only.

---

# Ownership Rules

This domain owns:

- <Aggregate>

References:

- <External Aggregate>

No duplicate ownership is permitted.

---

# Transaction Boundaries

Document:

- Transaction scope
- Consistency rules
- Cross-domain behavior
- Event publication

Distributed transactions should be avoided.

---

# Future Aggregates

Document anticipated future aggregates.

Examples:

- <Future Aggregate>
- <Future Aggregate>

---

# Relationship to Other Documents

Preceded By:

- BUSINESS_ANALYSIS.md

Followed By:

- ENTITY_CATALOG.md

---

# Review Notes

Reviewer:

Review Date:

Comments:

---

# End of Document