# AI ENTITY CATALOG

Version: 1.0.0

Status: Draft

Owner: Database Architecture

---

# Purpose

This document defines every entity owned by the AI Domain.

The AI Domain is the authoritative owner of artificial intelligence assets, execution history, conversational context, recommendations, and knowledge retrieval metadata.

---

# Aggregate — Model

## Entity

AI Model

### Purpose

Represents an AI model available to FitnessOS.

### Lifecycle

Registered

↓

Approved

↓

Active

↓

Deprecated

↓

Archived

### Owns

- Model Name
- Provider
- Version
- Capabilities
- Status

---

## Entity

Model Version

### Purpose

Tracks individual versions of AI models.

---

# Aggregate — Prompt

## Entity

Prompt Template

### Purpose

Stores reusable prompts.

---

## Entity

Prompt Execution

### Purpose

Stores prompt execution history.

---

# Aggregate — Conversation

## Entity

Conversation

### Purpose

Represents AI conversations.

---

## Entity

Conversation Message

### Purpose

Represents messages exchanged during conversations.

---

# Aggregate — Recommendation

## Entity

Recommendation

### Purpose

Stores AI-generated recommendations.

---

## Entity

Recommendation Feedback

### Purpose

Stores user feedback on recommendations.

---

# Aggregate — Knowledge

## Entity

Embedding

### Purpose

Stores vector embeddings.

---

## Entity

Knowledge Source

### Purpose

Stores indexed knowledge assets.

---

# Aggregate — Agent

## Entity

Agent Task

### Purpose

Represents AI work requests.

---

## Entity

Agent Execution

### Purpose

Stores execution history.

---

# Cross-Domain References

Platform

- Organization
- User

Membership

- Member

CRM

- Lead

Commerce

- Order

Inventory

- Product

HR

- Employee

Scheduling

- Booking

Reporting

- Report

Communication

- Notification

---

# Ownership Summary

AI owns:

- Models
- Model Versions
- Prompt Templates
- Prompt Executions
- Conversations
- Conversation Messages
- Recommendations
- Recommendation Feedback
- Embeddings
- Knowledge Sources
- Agent Tasks
- Agent Executions

AI references all operational domains using identifiers only.

---

# Future Entities

Supports:

- Autonomous Agents
- Memory Graphs
- Workflow Chains
- Tool Registry
- Reasoning Sessions
- AI Evaluations

---

# End of Document