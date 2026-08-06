# CRM ENTITY CATALOG

Version: 1.0.0

Status: Draft

Owner: Database Architecture

---

# Entities

## Lead

Represents a potential customer.

Lifecycle:

New

↓

Qualified

↓

Opportunity

↓

Converted

↓

Archived

---

## Opportunity

Represents a potential sale.

---

## Activity

Represents interactions.

Includes:

- Call
- Meeting
- Email
- Follow-up
- Task

---

## Note

Stores business notes.

---

## Campaign

Represents marketing attribution.

---

## Communication Timeline

Maintains chronological customer interaction history.

---

# Ownership

CRM owns:

- Leads
- Opportunities
- Activities
- Notes
- Campaign Attribution

References:

- Organization
- Branch
- User
- Member

---

# End