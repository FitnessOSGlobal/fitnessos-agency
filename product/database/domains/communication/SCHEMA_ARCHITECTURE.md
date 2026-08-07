# COMMUNICATION DATABASE SCHEMA ARCHITECTURE

Version: 1.0.0

Status: Draft

Owner: Database Architecture

---

# Purpose

Defines the PostgreSQL schema architecture for the Communication Domain.

The Communication schema owns all messaging persistence objects.

---

# Schema Name

communication

---

# Schema Ownership

Owns:

- notifications
- notification_statuses
- email_messages
- sms_messages
- push_notifications
- whatsapp_messages
- message_templates
- template_versions
- campaigns
- campaign_audiences
- communication_preferences
- delivery_records
- retry_records

---

# External References

Platform

- organization_id
- branch_id
- user_id

Membership

- member_id

HR

- employee_id

CRM

- lead_id

Commerce

- order_id

Scheduling

- booking_id

---

# Table Relationships

message_templates

↓

template_versions

↓

notifications

↓

delivery_records

↓

retry_records

campaigns

↓

campaign_audiences

↓

notifications

communication_preferences

↓

notifications

---

# Primary Keys

Every table uses UUID primary keys.

---

# Foreign Keys

Platform

- organization_id
- branch_id
- user_id

Membership

- member_id

HR

- employee_id

CRM

- lead_id

Commerce

- order_id

Scheduling

- booking_id

---

# Audit Strategy

Every business table includes:

- created_at
- updated_at
- created_by
- updated_by

Optional:

- deleted_at
- deleted_by

Delivered communications remain immutable.

---

# Index Strategy

Primary indexes:

- organization_id
- recipient_id
- communication_channel
- delivery_status
- scheduled_at
- created_at

Composite indexes:

- organization_id + delivery_status
- recipient_id + communication_channel
- scheduled_at + delivery_status

---

# Multi-Tenant Strategy

Every business table contains:

organization_id

Tenant isolation is mandatory.

---

# Retention Strategy

Communication history is retained permanently.

Delivery records are never deleted.

Templates are versioned.

---

# Performance Considerations

Optimized for:

- High-volume messaging
- Queue processing
- Delivery tracking
- Campaign execution
- Notification retrieval

---

# Future Expansion

Supports:

- Event streaming
- Multi-provider routing
- AI-generated messaging
- Omnichannel orchestration

---

# End of Document