# INTEGRATION ENTITY CATALOG

Version: 1.0.0

Status: Draft

Owner: Database Architecture

---

# Purpose

This document defines every entity owned by the Integration Domain.

The Integration Domain is the authoritative owner of all external integration assets, connector metadata, synchronization processes, and integration execution history.

---

# Aggregate — Connector

## Entity

External System

### Purpose

Represents a third-party platform integrated with FitnessOS.

### Lifecycle

Registered

↓

Configured

↓

Active

↓

Disabled

↓

Archived

### Owns

- System Name
- Provider
- Integration Type
- Status

---

## Entity

Connector

### Purpose

Represents an integration connector.

---

## Entity

Connector Configuration

### Purpose

Stores connector configuration metadata.

---

## Entity

Credential Reference

### Purpose

Stores secure references to external secrets.

---

# Aggregate — Webhook

## Entity

Incoming Webhook

### Purpose

Represents externally received webhook requests.

---

## Entity

Outgoing Webhook

### Purpose

Represents webhook deliveries.

---

# Aggregate — Synchronization

## Entity

Synchronization Job

### Purpose

Defines recurring synchronization tasks.

---

## Entity

Synchronization Execution

### Purpose

Stores execution history.

---

# Aggregate — Import / Export

## Entity

Import Job

### Purpose

Represents inbound data imports.

---

## Entity

Export Job

### Purpose

Represents outbound data exports.

---

# Aggregate — Event Delivery

## Entity

Integration Event

### Purpose

Represents published integration events.

---

## Entity

Delivery Attempt

### Purpose

Tracks event delivery attempts.

---

# Cross-Domain References

Platform

- Organization
- User

All operational domains publish events through Integration.

---

# Ownership Summary

Integration owns:

- External Systems
- Connectors
- Connector Configuration
- Credential References
- Incoming Webhooks
- Outgoing Webhooks
- Synchronization Jobs
- Synchronization Executions
- Import Jobs
- Export Jobs
- Integration Events
- Delivery Attempts

Integration references:

- Organization
- User

---

# Future Entities

Supports:

- Queue Topics
- Event Streams
- API Gateway Routes
- Message Brokers
- Integration Policies

---

# End of Document