## Product & Engineering Decisions

This project is intentionally built with a **minimal, conversion-first checkout flow**.
Every feature included (or excluded) is a deliberate decision aligned with an early-stage
commerce mindset.

---

### 1. No User Registration

**Decision:**  
Users can complete purchases without creating an account.

**Reasoning:**

- Reduce checkout friction
- Avoid premature account management
- Suitable for early-stage or small merchants
- Email acts as a temporary user identifier

**Trade-off:**

- No persistent user profile
- No long-term order history for users

**Why this is acceptable:**
At early stages, conversion speed is more valuable than user retention features.

---

### 2. Cart-Based Purchase Flow

**Flow:**  
Product → Add to Cart → Cart Sheet → Checkout → Done

**Reasoning:**

- Cart acts as a temporary intent holder
- Avoids complex multi-step flows
- Familiar UX pattern for most users

**Why no “Buy Now” shortcut?**
To keep the flow predictable and easier to reason about during checkout validation.

---

### 3. Minimal Checkout Form

**Decision:**  
Checkout form only collects essential information.

**Reasoning:**

- Prevents fake or unnecessary data
- Focuses on transaction completion, not data harvesting
- Aligns with email-only checkout strategy

**Note:**
Form validation exists, but business-critical data is validated on the server.

---

### 4. Email Confirmation (Mocked)

**Decision:**  
Email delivery is mocked instead of using a real email provider.

**Reasoning:**

- Portfolio focus is on **transactional flow**, not SMTP setup
- Avoids external service dependency
- Demonstrates email payload structure and rendering

**In production, this can be replaced with:**

- Nodemailer
- Resend
- AWS SES

---

### 5. Wishlist Feature (Optional & Minimal)

**Decision:**  
Wishlist exists as a lightweight feature without user accounts.

**Reasoning:**

- Acts as a short-term interest marker
- Does not block or alter checkout flow
- Avoids login or profile requirements

**Why no wishlist page or profile integration?**
Wishlist is intentionally kept outside the core purchase flow to prevent added friction.

---

### 6. Checkout Robustness

**Checkout logic is designed to be resilient against real-world issues.**

Implemented safeguards include:

- Server-side stock validation
- Backend-authoritative pricing
- Atomic database transactions
- Idempotent checkout protection
- Graceful error handling

These ensure that:

- Orders are never duplicated
- Stock levels remain consistent
- Failed checkouts do not corrupt data

---

### 7. Immutable Order Snapshot

**Decision:**  
Order items store a snapshot of product data at purchase time.

**Reasoning:**

- Orders are financial records and must not change
- Product name or price may change after purchase
- Ensures historical accuracy for receipts and emails

**Stored snapshot includes:**

- Product name
- Price at purchase
- Quantity

---

### 8. No Admin Dashboard

**Decision:**  
An admin dashboard is intentionally omitted.

**Reasoning:**

- Not required for demonstrating checkout robustness
- Avoids premature operational tooling
- Orders can be managed via internal tooling or database access

**Future scope:**
A minimal order management page can be added if operational needs arise.

---

### 9. Scope Control

This project intentionally avoids:

- Payment gateway integration
- User authentication system
- Analytics dashboards
- Background job processing

**Why?**
To keep the project focused, reviewable, and aligned with real MVP constraints.

---

### Summary

This project prioritizes:

- Clear user flow
- Robust backend logic
- Thoughtful trade-offs
- Realistic early-stage product decisions

Feature restraint is treated as a design choice, not a limitation.
