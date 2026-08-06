# CRM LOGICAL DATABASE MODEL

Version: 1.0.0

Status: Draft

Owner: Database Architecture

---

# Logical Model

Lead

↓

Opportunity

↓

Membership

Lead

↓

Activities

↓

Communication Timeline

Campaign

↓

Lead

---

# Cardinality

Organization → Leads (1:N)

Lead → Opportunities (1:N)

Lead → Activities (1:N)

Lead → Notes (1:N)

Campaign → Leads (1:N)

User → Leads (1:N)

---

# Normalization

Target:

Third Normal Form (3NF)

No duplicated customer information.

---

# End