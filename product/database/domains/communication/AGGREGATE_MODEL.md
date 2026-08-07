# COMMUNICATION AGGREGATE MODEL

Version: 1.0.0

Status: Draft

Owner: Database Architecture

---

# Purpose

Defines aggregate boundaries for the Communication Domain.

Each aggregate establishes ownership, transactional consistency, and communication responsibilities.

---

# Aggregate Overview

The Communication Domain contains the following primary aggregates:

1. Notification
2. Message
3. Template
4. Campaign
5. Preference
6. Delivery

---

# Aggregate — Notification

Owns

- Notification
- Notification Status

Business Rules

- Notifications belong to one organization.
- Notifications are immutable after delivery.

---

# Aggregate — Message

Owns

- Email Message
- SMS Message
- Push Message
- WhatsApp Message

Business Rules

- Every message targets one recipient.
- Every message has one communication channel.

---

# Aggregate — Template

Owns

- Template
- Template Version

Business Rules

- Templates are versioned.
- Published templates are immutable.

---

# Aggregate — Campaign

Owns

- Campaign
- Campaign Audience

Business Rules

- Campaigns may be scheduled.
- Campaigns target defined audiences.

---

# Aggregate — Preference

Owns

- Communication Preference

Business Rules

- Preferences determine delivery eligibility.
- Preferences are user configurable where permitted.

---

# Aggregate — Delivery

Owns

- Delivery Record
- Retry Record

Business Rules

- Delivery attempts are permanently recorded.
- Retry policy is configurable.

---

# Cross-Domain References

Platform

- Organization
- Branch
- User

Membership

- Member

HR

- Employee

CRM

- Lead

Commerce

- Order

Scheduling

- Booking

---

# Transaction Boundaries

Each aggregate maintains its own transactional consistency.

Communication requests from other domains occur through published contracts and events.

---

# End of Document