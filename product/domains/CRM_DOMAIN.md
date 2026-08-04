# FITNESSOS DOMAIN IMPLEMENTATION CONTRACT

# CRM Domain

Version: 2.1.0

Status: Architecture Approved

Owner: CRM Engineering

Depends On:

- FITNESSOS_MASTER_SPECIFICATION.md
- PRODUCT_DECISIONS.md
- ORGANIZATION_MODEL.md
- DOMAIN_ARCHITECTURE.md
- INFORMATION_ARCHITECTURE.md
- API_ARCHITECTURE.md
- EVENT_ARCHITECTURE.md
- SECURITY_ARCHITECTURE.md
- PLATFORM_DOMAIN.md

---

# Executive Summary

The CRM Domain manages the complete customer acquisition and relationship lifecycle before membership.

It provides the capabilities required to attract, capture, qualify, nurture, convert, retain, and re-engage prospective customers.

The CRM Domain owns every relationship before a person becomes a member.

Once membership is created, ownership transfers to the Membership Domain.

The CRM Domain remains responsible for sales, marketing, follow-up activities, referrals, campaigns, and customer engagement.

---

# Purpose

Provide a complete Customer Relationship Management capability for fitness businesses.

The CRM Domain enables organizations to manage prospective customers, maximize conversions, improve retention, and increase customer lifetime value.

---

# Scope

The CRM Domain owns:

- Leads
- Prospects
- Opportunities
- Sales Pipeline
- Follow-Ups
- Consultations
- Trial Passes
- Referrals
- Campaigns
- Customer Communications (business context)
- Sales Activities
- Sales Notes
- Conversion Tracking
- Customer Journey

---

# Responsibilities

The CRM Domain is responsible for:

## Lead Management

Capturing and managing leads from all supported channels.

Examples:

- Website
- Walk-In
- Phone
- WhatsApp
- Facebook
- Instagram
- Referral
- Partner Campaigns

---

## Prospect Management

Managing qualified prospects until conversion.

---

## Opportunity Management

Managing sales opportunities throughout the pipeline.

---

## Trial Management

Managing:

- Trial Memberships
- Trial Visits
- Trial Expiration
- Trial Conversion

---

## Follow-Up Management

Managing scheduled sales follow-ups.

Examples:

- Calls
- WhatsApp
- SMS
- Email
- In-Person Meetings

---

## Campaign Management

Managing marketing campaigns and measuring campaign effectiveness.

---

## Referral Management

Managing customer referrals and referral attribution.

---

## Customer Journey Management

Tracking every interaction before membership.

---

## Conversion Management

Converting qualified prospects into members.

Membership creation is delegated to the Membership Domain.

---

# Out of Scope

The CRM Domain does NOT own:

- Members
- Memberships
- Attendance
- Payments
- Invoices
- Products
- Employees
- Authentication
- Authorization

---

# Client Applications

The CRM Domain is consumed by:

- Gym Owner Web Application
- Staff Web Application
- Staff Mobile Application
- Public Website

---

# Domain Relationships

## Provides Services To

- Membership Domain
- Communication Domain
- Reporting Domain
- AI Domain

---

## Depends On

- Platform Domain
- Communication Domain

---

# Architecture Principles

The CRM Domain follows these principles:

- Every prospect has one owner.
- Every lead is traceable.
- Every interaction is auditable.
- Sales activities are chronological.
- Conversion is measurable.
- API-first.
- Event-driven.
- Tenant isolation by default.

---

# End of Part 1

---

# Business Capabilities

The CRM Domain provides the complete set of business capabilities required to acquire, nurture, convert, retain, and re-engage customers.

---

## Lead Management

Provides:

- Lead Capture
- Lead Registration
- Lead Assignment
- Lead Qualification
- Lead Prioritization
- Lead Source Tracking
- Lead Status Management

Every lead receives a unique CRM identity.

---

## Prospect Management

Provides:

- Prospect Creation
- Prospect Qualification
- Prospect Profiling
- Prospect Segmentation
- Prospect Status Tracking

Prospects represent qualified opportunities.

---

## Opportunity Management

Provides:

- Opportunity Creation
- Sales Stage Management
- Estimated Revenue
- Closing Probability
- Opportunity Ownership

Every opportunity belongs to one salesperson.

---

## Trial Management

Provides:

- Trial Registration
- Trial Scheduling
- Trial Attendance Tracking
- Trial Expiration
- Trial Conversion

Trial participants remain CRM entities until converted.

---

## Follow-Up Management

Provides:

- Follow-Up Scheduling
- Calls
- Meetings
- WhatsApp Follow-Ups
- SMS Follow-Ups
- Email Follow-Ups
- Follow-Up History

Every customer interaction becomes part of the CRM timeline.

---

## Campaign Management

Provides:

- Campaign Creation
- Campaign Targeting
- Campaign Tracking
- Campaign Performance
- ROI Measurement

---

## Referral Management

Provides:

- Referral Registration
- Referral Attribution
- Referral Status
- Referral Conversion

---

## Customer Journey Management

Provides chronological tracking of:

- First Contact
- Lead Qualification
- Consultation
- Trial
- Sales Activities
- Conversion
- Re-engagement

---

## Conversion Management

Provides controlled conversion into Membership.

Conversion delegates member creation to the Membership Domain.

CRM ownership ends after successful conversion.

---

# Business Rules

## Rule 1

Every Lead belongs to exactly one Organization.

---

## Rule 2

Every Prospect originates from a Lead.

---

## Rule 3

Every Opportunity has one owner.

---

## Rule 4

Every Follow-Up must be associated with a Lead, Prospect, or Opportunity.

---

## Rule 5

Every customer interaction becomes part of the permanent CRM timeline.

---

## Rule 6

Only qualified prospects may be converted into members.

---

## Rule 7

Membership creation is delegated to the Membership Domain.

CRM never creates members directly.

---

## Rule 8

Closed opportunities remain historically available.

---

## Rule 9

Referral attribution remains immutable after conversion unless corrected by an authorized administrator.

---

## Rule 10

Every CRM activity is auditable.

---

# Business Policies

Business policies are organization-configurable.

Examples include:

- Lead qualification criteria
- Follow-up frequency
- Maximum trial duration
- Referral reward policy
- Opportunity stages
- Sales ownership rules
- Lead reassignment policy
- Customer inactivity period

Policies may vary by organization without changing software behavior.

---

# Business Configuration

Organizations may configure:

- Lead Sources
- Opportunity Stages
- Follow-Up Templates
- Trial Duration
- Campaign Types
- Referral Types
- Customer Tags
- Sales Pipelines
- Qualification Scores
- Customer Categories

Configuration is organization-specific.

---

# CRM Lifecycle

The CRM Domain owns the following lifecycle.

```
Lead
   │
   ▼
Qualified
   │
   ▼
Prospect
   │
   ▼
Consultation
   │
   ▼
Trial
   │
   ▼
Opportunity
   │
   ▼
Won
   │
   ▼
Membership Created
   │
   ▼
Ownership transferred to Membership Domain
```

Alternative outcomes:

```
Lead
   │
   ▼
Lost

or

Prospect
   │
   ▼
Dormant

or

Opportunity
   │
   ▼
Closed Lost
```

CRM owns every state until Membership Creation.

---

# Canonical Business Entities

The CRM Domain owns:

- Lead
- Prospect
- Opportunity
- Follow-Up
- Campaign
- Referral
- Trial
- Customer Journey
- Sales Activity
- Sales Note
- Lead Source
- Customer Tag

---

# Entity Ownership

The CRM Domain is the authoritative source for all customer acquisition information.

No other domain may redefine CRM entities.

After successful conversion, the Membership Domain becomes the authoritative owner of the Member entity.

---

# End of Part 2

---

# Public CRM Services

The CRM Domain exposes reusable business services responsible for customer acquisition, relationship management, and sales pipeline operations.

Business services encapsulate CRM rules while remaining independent of client applications.

---

## Lead Service

Provides:

- Create Lead
- Update Lead
- Assign Lead
- Qualify Lead
- Archive Lead
- Search Leads
- Merge Duplicate Leads

The Lead Service is the authoritative source for lead management.

---

## Prospect Service

Provides:

- Create Prospect
- Update Prospect
- Qualify Prospect
- Segment Prospect
- Archive Prospect
- Retrieve Prospect Timeline

---

## Opportunity Service

Provides:

- Create Opportunity
- Update Opportunity
- Assign Opportunity
- Advance Sales Stage
- Close Won
- Close Lost
- Reopen Opportunity

Every opportunity remains fully auditable.

---

## Trial Service

Provides:

- Register Trial
- Schedule Trial
- Reschedule Trial
- Cancel Trial
- Record Trial Completion
- Convert Trial

---

## Follow-Up Service

Provides:

- Schedule Follow-Up
- Complete Follow-Up
- Reschedule Follow-Up
- Cancel Follow-Up
- Record Interaction

---

## Campaign Service

Provides:

- Create Campaign
- Update Campaign
- Launch Campaign
- Pause Campaign
- Close Campaign
- Measure Campaign Performance

---

## Referral Service

Provides:

- Register Referral
- Assign Referral
- Track Referral Status
- Convert Referral
- Reward Referral (future)

---

## Customer Journey Service

Provides:

- Timeline Management
- Activity Recording
- Customer Interaction History
- Journey Visualization

---

## Conversion Service

Provides:

- Validate Conversion Eligibility
- Request Membership Creation
- Complete CRM Conversion
- Transfer Ownership to Membership Domain

The Conversion Service never creates members directly.

---

# API Responsibilities

The CRM Domain exposes APIs for:

- Leads
- Prospects
- Opportunities
- Trials
- Follow-Ups
- Campaigns
- Referrals
- Customer Journeys
- Sales Activities
- Customer Tags
- Lead Sources
- CRM Conversion

All APIs comply with API_ARCHITECTURE.md.

Internal implementation details remain private.

---

# Published Events

The CRM Domain publishes business events including:

- LeadCreated
- LeadQualified
- ProspectCreated
- ProspectQualified
- OpportunityCreated
- OpportunityWon
- OpportunityLost
- TrialRegistered
- TrialCompleted
- TrialExpired
- FollowUpScheduled
- FollowUpCompleted
- CampaignLaunched
- CampaignCompleted
- ReferralRegistered
- ReferralConverted
- CustomerConvertedToMember

Published events represent completed business activities.

---

# Consumed Events

The CRM Domain consumes events where customer acquisition depends on external business activities.

Examples include:

Platform Domain

- OrganizationCreated
- BranchCreated
- UserCreated

Communication Domain

- NotificationDelivered
- EmailOpened
- SMSDelivered
- WhatsAppDelivered

Membership Domain

- MembershipCreated
- MembershipCancelled (re-engagement opportunity)

Commerce Domain

- PaymentConfirmed (trial or deposit where applicable)

CRM consumes these events but never assumes ownership of external business entities.

---

# Event Responsibilities

The CRM Domain is responsible for:

- Publishing customer lifecycle events
- Maintaining event compatibility
- Preserving complete customer interaction history
- Supporting downstream automation
- Ensuring event auditability

Business events are immutable once published.

---

# Integration Responsibilities

The CRM Domain supports integrations with:

- Website Lead Forms
- Facebook Lead Ads
- Instagram Lead Ads
- Google Ads Lead Forms
- WhatsApp Business
- Email Marketing Platforms
- External CRM Systems
- Marketing Automation Platforms
- Analytics Platforms

All integrations use approved APIs and published events.

Direct database integration is prohibited.

---

# Service Boundaries

The CRM Domain must never implement:

- Membership lifecycle management
- Attendance processing
- Payment processing
- Invoice generation
- Authentication
- Authorization
- Notification delivery
- Employee management

These responsibilities remain with their owning domains.

---

# End of Part 3

---

# Permission Model

The CRM Domain defines the business permissions required to manage customer relationships and sales operations.

Authentication and authorization are enforced by the Platform Domain.

The CRM Domain defines the permissions required for CRM activities.

---

## Lead Management Permissions

Examples:

- Create Lead
- Edit Lead
- Delete Lead
- Assign Lead
- Qualify Lead
- Merge Leads
- Archive Lead

---

## Prospect Management Permissions

Examples:

- Create Prospect
- Edit Prospect
- View Prospect
- Qualify Prospect
- Archive Prospect

---

## Opportunity Management Permissions

Examples:

- Create Opportunity
- Edit Opportunity
- Advance Sales Stage
- Close Opportunity
- Reopen Opportunity

---

## Trial Management Permissions

Examples:

- Register Trial
- Schedule Trial
- Cancel Trial
- Convert Trial

---

## Campaign Management Permissions

Examples:

- Create Campaign
- Launch Campaign
- Pause Campaign
- Close Campaign
- View Campaign Analytics

---

## Referral Management Permissions

Examples:

- Register Referral
- Edit Referral
- View Referral
- Convert Referral

---

# Security Responsibilities

The CRM Domain follows the Security Architecture.

Responsibilities include:

- Protecting customer information
- Protecting sales information
- Enforcing organization ownership
- Respecting tenant isolation
- Auditing customer interactions
- Securing CRM communications

Customer information is considered sensitive business data.

---

# Tenant Boundaries

Every CRM record belongs to exactly one organization.

CRM data must remain isolated between tenants.

Cross-tenant customer visibility is prohibited unless explicitly authorized for platform administration.

---

# UI Responsibilities

The CRM Domain provides user interfaces for:

- Lead Management
- Prospect Management
- Opportunity Pipeline
- Sales Dashboard
- Trial Management
- Campaign Management
- Referral Management
- Customer Timeline
- Follow-Up Calendar

Business logic remains within the CRM Domain.

---

# Mobile Responsibilities

Mobile applications consume CRM services for:

- Lead Capture
- Lead Assignment
- Opportunity Updates
- Follow-Up Recording
- Trial Registration
- Customer Timeline
- Sales Dashboard

Mobile clients never implement CRM business rules independently.

---

# Reporting Responsibilities

The CRM Domain supplies data for reports including:

- Lead Sources
- Lead Conversion Rate
- Opportunity Pipeline
- Sales Performance
- Trial Conversion Rate
- Referral Performance
- Campaign ROI
- Sales Activity
- Customer Acquisition Funnel

Report generation belongs to the Reporting Domain.

---

# AI Responsibilities

The CRM Domain supplies information to AI services including:

- Lead Scoring
- Conversion Prediction
- Customer Segmentation
- Next Best Action
- Sales Forecasting
- Churn Risk (pre-membership)
- Campaign Optimization

AI recommendations never modify CRM records directly.

---

# Key Performance Indicators (KPIs)

Examples include:

- Lead Conversion Rate
- Prospect Qualification Rate
- Opportunity Win Rate
- Trial Conversion Rate
- Average Sales Cycle
- Follow-Up Completion Rate
- Referral Conversion Rate
- Campaign ROI
- Customer Acquisition Cost
- Customer Lifetime Value (shared metric)

KPIs support operational monitoring and executive reporting.

---

# End of Part 4

---

# Domain Risks

The CRM Domain must proactively address business and operational risks.

Examples include:

- Duplicate lead creation
- Lost follow-up opportunities
- Inaccurate lead qualification
- Opportunity stagnation
- Sales pipeline bottlenecks
- Referral fraud
- Campaign attribution errors
- Customer data duplication
- Unauthorized access to customer information
- Incomplete customer journey history

Risk monitoring should support operational reporting and continuous improvement.

---

# Non-Functional Requirements

The CRM Domain must satisfy the following quality attributes.

## Availability

CRM services should remain available during business operating hours.

Sales activities should continue without interruption during planned platform maintenance where practical.

---

## Scalability

The CRM Domain must support:

- Thousands of leads
- Large sales pipelines
- Multi-branch organizations
- Franchise networks
- Enterprise organizations

Scalability should be achieved without changing business rules.

---

## Performance

Performance-sensitive operations include:

- Lead search
- Opportunity retrieval
- Customer timeline
- Follow-up scheduling
- Pipeline dashboards

Large datasets should remain responsive.

---

## Reliability

CRM operations must support:

- Transaction consistency
- Reliable event publication
- Retry mechanisms
- Monitoring
- Failure recovery

Customer interaction history must never be silently lost.

---

## Security

The CRM Domain follows the Security Architecture.

Responsibilities include:

- Protecting customer information
- Protecting sales information
- Auditing customer interactions
- Tenant isolation
- Organization ownership enforcement

---

## Maintainability

CRM business rules should remain centralized.

Client applications must never duplicate CRM decision logic.

---

## Extensibility

The CRM Domain should support future capabilities including:

- AI Sales Assistant
- Automated Lead Routing
- Predictive Follow-Ups
- Marketing Automation
- Customer Loyalty Programs
- Multi-Channel Campaign Orchestration
- External CRM Synchronization

Future enhancements must extend existing capabilities without changing domain ownership.

---

# Future Database Implications

The CRM Domain is expected to own persistent storage for:

- Leads
- Prospects
- Opportunities
- Sales Activities
- Sales Notes
- Follow-Ups
- Campaigns
- Campaign Results
- Referrals
- Trials
- Customer Journeys
- Customer Tags
- Lead Sources

Logical ownership is defined here.

Physical database design will be completed during the Database Architecture milestone.

---

# Future Service Boundaries

As FitnessOS evolves, the CRM Domain may be implemented as multiple deployable services while remaining a single logical business domain.

Potential service boundaries include:

- Lead Service
- Prospect Service
- Opportunity Service
- Trial Service
- Campaign Service
- Referral Service
- Customer Journey Service
- Conversion Service

Deployment decisions must not alter business ownership or domain boundaries.

---

# Future Enhancements

Potential future capabilities include:

- AI Lead Qualification
- Automated Sales Workflows
- Voice Call Integration
- Omnichannel Customer Inbox
- Marketing Journey Automation
- Customer Satisfaction Surveys
- Loyalty & Rewards Programs
- Partner Relationship Management
- Affiliate Management

---

# Cross-Domain Responsibilities

The CRM Domain provides customer acquisition information to other domains.

Examples:

Membership Domain

- Membership creation requests
- Customer conversion information

Communication Domain

- Follow-up requests
- Campaign messaging requests

Reporting Domain

- Sales analytics
- Funnel analytics
- Campaign analytics

AI Domain

- Lead scoring
- Sales forecasting
- Customer segmentation

Commerce Domain

- Trial payment requests
- Deposit validation (where applicable)

The CRM Domain owns customer acquisition.

Other domains consume CRM information but never modify CRM ownership.

---

# Acceptance Criteria

The CRM Domain implementation contract is complete when:

- Domain responsibilities are clearly defined.
- Business boundaries are explicit.
- CRM lifecycle is documented.
- Business capabilities are complete.
- Business rules are defined.
- Business policies are configurable.
- Business configuration is documented.
- Canonical entities are assigned.
- Public services are identified.
- API responsibilities are documented.
- Event responsibilities are documented.
- Permission requirements are documented.
- Security responsibilities are defined.
- Tenant boundaries are enforced.
- UI responsibilities are defined.
- Mobile responsibilities are defined.
- Reporting responsibilities are documented.
- AI responsibilities are documented.
- KPIs are defined.
- Domain risks are identified.
- Non-functional requirements are documented.
- Future database implications are identified.
- Future service boundaries are documented.
- Future enhancements are identified.

---

# Domain Summary

The CRM Domain is the authoritative source for all customer acquisition and relationship management activities before membership.

It governs leads, prospects, opportunities, trials, campaigns, referrals, and customer engagement while ensuring every customer interaction is recorded, measurable, and auditable.

Ownership transfers to the Membership Domain only after successful member creation.

This implementation contract serves as the reference specification for CRM functionality throughout the FitnessOS platform.

---

# End of CRM Domain

Status: Architecture Complete

Milestone:

Complete Architecture

Document Classification:

Domain Implementation Contract