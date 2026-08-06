# CRM AGGREGATE MODEL

Version: 1.0.0

Status: Draft

Owner: Database Architecture

---

# Aggregates

1. Lead
2. Opportunity
3. Activity
4. Campaign
5. Communication Timeline

---

# Lead Aggregate

Owns:

- Lead Profile
- Contact Information
- Qualification
- Assignment
- Status

---

# Opportunity Aggregate

Owns:

- Sales Opportunity
- Estimated Value
- Stage
- Closing Probability

---

# Activity Aggregate

Owns:

- Calls
- Meetings
- Emails
- Follow-ups
- Notes
- Tasks

---

# Campaign Aggregate

Owns:

- Marketing Source
- Campaign Attribution
- Referral Tracking

---

# Communication Timeline Aggregate

Owns chronological business interactions associated with a lead or opportunity.

---

# Cross Domain References

Platform

- Organization
- Branch
- User

Membership

- Member

Commerce

- Sale

Communication

- Message

---

# Transaction Rules

Each aggregate owns its own transactional consistency.

Cross-domain consistency occurs through events.

---

# End