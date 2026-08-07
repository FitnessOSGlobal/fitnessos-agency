# COMMUNICATION ENTITY CATALOG

Version: 1.0.0

Status: Draft

Owner: Database Architecture

---

# Purpose

This document defines every entity owned by the Communication Domain.

The Communication Domain is the authoritative owner of all communication, messaging, delivery tracking, and communication preference entities.

---

# Aggregate — Notification

## Entity

Notification

### Purpose

Represents an in-app or system notification.

### Lifecycle

Created

↓

Queued

↓

Delivered

↓

Read

↓

Archived

### Owns

- Notification Type
- Title
- Body
- Priority
- Status

---

## Entity

Notification Status

### Purpose

Tracks the lifecycle of notifications.

---

# Aggregate — Message

## Entity

Email Message

### Purpose

Represents outbound email communication.

---

## Entity

SMS Message

### Purpose

Represents outbound SMS communication.

---

## Entity

Push Notification

### Purpose

Represents mobile push communication.

---

## Entity

WhatsApp Message

### Purpose

Represents WhatsApp communication.

---

# Aggregate — Template

## Entity

Message Template

### Purpose

Stores reusable communication templates.

---

## Entity

Template Version

### Purpose

Tracks template revisions.

---

# Aggregate — Campaign

## Entity

Campaign

### Purpose

Represents communication campaigns.

---

## Entity

Campaign Audience

### Purpose

Defines campaign recipients.

---

# Aggregate — Preference

## Entity

Communication Preference

### Purpose

Stores communication consent and preferences.

---

# Aggregate — Delivery

## Entity

Delivery Record

### Purpose

Tracks message delivery lifecycle.

---

## Entity

Retry Record

### Purpose

Tracks retry attempts.

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

# Ownership Summary

Communication owns:

- Notifications
- Email Messages
- SMS Messages
- Push Notifications
- WhatsApp Messages
- Templates
- Template Versions
- Campaigns
- Campaign Audiences
- Communication Preferences
- Delivery Records
- Retry Records

Communication references:

- Organization
- User
- Member
- Employee

---

# Future Entities

Supports:

- Voice Calls
- Live Chat
- Video Messaging
- Marketing Journeys
- Omnichannel Conversations

---

# End of Document