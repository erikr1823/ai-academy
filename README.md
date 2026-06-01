# AI Academy

**An interactive AI learning platform with two learning tracks, workplace simulations, AI mentor support, assignments, projects, certificates, and admin dashboards.**

[![Live Demo](https://img.shields.io/badge/demo-live-emerald?style=for-the-badge)](https://ai-academy-ochre.vercel.app)

---

## Overview

AI Academy is a full-stack learning experience prototype built for professionals, builders, and businesses who want practical AI training without the overwhelm. The platform combines structured curricula, weekly assignments, role-based workplace simulations, and a mock AI mentor into one cohesive demo environment.

The MVP runs entirely on mock data—no backend, authentication, or third-party AI services required—making it easy to explore the product vision before Phase 2 infrastructure is added.

---

## Live Demo

**https://ai-academy-ochre.vercel.app**

Recommended walkthrough:

1. Start at the [landing page](https://ai-academy-ochre.vercel.app/)
2. Follow the [Demo Mode guide](https://ai-academy-ochre.vercel.app/demo) for a step-by-step tour
3. Review the [Product Roadmap](https://ai-academy-ochre.vercel.app/roadmap) for what's next

---

## Features

| Feature | Description |
| --- | --- |
| **Two Learning Tracks** | AI Essentials for workplace fluency; AI Builder Academy for shipping real projects |
| **Student Dashboard** | Progress, XP, continue-learning cards, projects, and mentor shortcuts |
| **Structured Courses** | Week-by-week curriculum with lesson detail pages and proof-of-work submission |
| **Weekly Assignments** | Mission briefs, checklists, reflection prompts, and submit-proof flows |
| **Workplace Simulator** | Role-based AI exercises for real job scenarios |
| **AI Mentor** | ChatGPT-style mock chat for lesson, assignment, and project help |
| **Projects** | Portfolio builds including SiteScope, HelpDesk AI, and Email Assistant |
| **Certificates & Achievements** | XP, badges, rank ladder, and certificate progress |
| **Admin Dashboard** | Student tracking, track overview, assignments, and alerts |
| **Demo Mode** | Guided 10-step platform walkthrough for stakeholders and users |
| **Product Roadmap** | Public-facing phase plan and business model overview |

---

## Learning Tracks

### AI Essentials

Designed for **professionals 45+** and anyone who wants practical AI skills for everyday work.

- Workplace AI fluency for emails, meetings, and reports
- Prompt writing and executive-ready outputs
- No coding required
- Assignments focused on real office workflows

### AI Builder Academy

Designed for **builders, entrepreneurs, and tech learners** ready to create deployable AI products.

- AI tools, automations, and agent workflows
- Hands-on projects with mission checklists and deliverables
- Builder-focused curriculum and capstone projects
- Mentor support for architecture, prompts, and deployment

---

## Pages Included

| Route | Description |
| --- | --- |
| `/` | Landing page with audience cards, path selection, and business training CTA |
| `/choose-track` | Track selection — AI Essentials vs. AI Builder Academy |
| `/onboarding` | Multi-step onboarding with path recommendation |
| `/dashboard` | Student home — progress, learning, mentor, and projects |
| `/courses` | Full curriculum for both tracks |
| `/courses/[lessonId]` | Lesson detail with steps, practice tasks, and proof submission |
| `/assignments` | Weekly mission list with status and XP |
| `/assignments/[id]` | Assignment detail with checklist and submit proof |
| `/workplace-simulator` | Role-based workplace AI exercises |
| `/mentor` | Mock AI mentor chat interface |
| `/projects` | Project portfolio overview |
| `/projects/[id]` | Project detail with checklist and resources |
| `/certificates` | XP, badges, certificates, and rank ladder |
| `/demo` | Guided demo walkthrough |
| `/roadmap` | Product roadmap and business model |
| `/admin` | Admin dashboard for students, tracks, and alerts |

---

## Tech Stack

- **Next.js** — App Router, static generation, and server components
- **TypeScript** — End-to-end type safety
- **Tailwind CSS** — Dark theme with emerald accent design system
- **Vercel** — Production deployment
- **Mock Data for MVP** — All content served from local TypeScript modules (`lib/`)

---

## Current Status

**MVP prototype deployed.** The platform demonstrates the full student and admin experience using mock data. Backend, authentication, database, and OpenAI integration are planned for Phase 2.

What works today:

- Complete UI across all core pages
- Responsive layout with shared navigation shell
- Demo flow and public roadmap
- Static build and Vercel deployment

What is not yet connected:

- User accounts and authentication
- Persistent database (Neon planned)
- Real assignment file uploads
- Live OpenAI mentor responses
- Payment and subscription billing

---

## Roadmap

| Phase | Status | Focus |
| --- | --- | --- |
| **Phase 1 — MVP Prototype** | Complete | Landing, tracks, dashboard, courses, mentor mockup, simulator, projects, assignments, admin |
| **Phase 2 — Real Learning Platform** | Next | Neon database, student accounts, course progress, assignment submissions, certificates, admin course builder |
| **Phase 3 — AI-Powered Mentor** | Planned | OpenAI integration, personalized tutor, assignment feedback, prompt improvement |
| **Phase 4 — Business Training Platform** | Future | Company accounts, team dashboards, custom courses, workshops, subscription billing |

See the full interactive roadmap at [/roadmap](https://ai-academy-ochre.vercel.app/roadmap).

---

## Future Features

- Neon PostgreSQL database for students, progress, and submissions
- Clerk (or equivalent) authentication and role-based access
- OpenAI-powered AI Mentor with personalized tutoring
- Real assignment uploads and certificate generation
- Admin course builder and content management
- Company accounts with employee training dashboards
- Team progress reports and custom business curricula
- One-day workshop packages and subscription billing

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/your-username/ai-academy.git
cd ai-academy

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app locally.

```bash
# Production build
npm run build
npm start
```

---

## Author

**Erik Rivera**

Built as a portfolio-ready MVP demonstrating product design, frontend architecture, and a clear path from prototype to production AI training platform.

---

## License

Private project. All rights reserved.
