# T3 Rainame – E-Commerce Web Application

> A modern full-stack e-commerce application built with the **T3 Stack**, focusing on scalable frontend architecture, type-safe APIs, and real-world product workflows.

---

## 🚀 Live Demo

🔗 **Production URL:**  
_(https://t3-rainame.vercel.app/)_

---

## 🧠 Engineering Decisions

This project includes a dedicated document explaining
key product and engineering trade-offs.

👉 See **[docs/decisions.md](docs/decisions.md)**

---

## 🧩 Overview

This project is a **production-oriented e-commerce web application** designed to demonstrate how a modern **React / Next.js frontend** integrates with a **type-safe backend**.

The primary focus is **frontend architecture, state management, and user experience**, while still covering essential backend workflows such as authentication, cart handling, and database interaction.

The application simulates a real online shop where users can:

- browse products
- manage a shopping cart
- perform checkout-related actions as a **guest user**

---

## ✨ Key Features

### 🛍 Product & Cart

- Product listing with responsive grid layout
- Dynamic cart management (add, remove, update quantity)
- Cart persistence using server-side state
- Price calculation and validation

### 👤 User Flow

- Guest-friendly shopping experience
- Session-based cart handling
- Clear separation between UI state and server state

### 🎨 UI / UX

- Fully responsive (mobile → desktop)
- Accessible components using **Radix UI**
- Smooth UI transitions with **Framer Motion**
- Consistent design system via **Tailwind CSS + shadcn/ui**

---

## 🧠 Frontend Engineering Decisions

### Why Next.js App Router

- Enables Server Components for better performance
- Reduces client bundle size
- Clear separation between server and client responsibilities

### State Management Strategy

- **TanStack Query** for server state (products, cart)
- **React local state** for UI-only interactions
- Avoided global state unless necessary to keep complexity low

### Type Safety

- End-to-end type safety using **TypeScript + tRPC**
- Eliminates runtime API contract errors
- Improves developer experience and maintainability

---

## 🛠 Tech Stack

### Frontend

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui + Radix UI
- Framer Motion

### Backend / Data

- tRPC (type-safe API)
- Prisma ORM
- PostgreSQL

### Tooling

- ESLint + Prettier
- Zod (schema validation)

---

## 🗂 Project Structure (Simplified)

```txt
app/            # Next.js app router
components/     # Reusable UI components
server/         # tRPC routers and server logic
lib/            # Shared utilities
prisma/         # Database schema and migrations
```
