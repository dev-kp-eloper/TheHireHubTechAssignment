# TheHireHub - Visual Project Map

## Made with the Help of API, for Better understanding and Explanation of the project
```
┌─────────────────────────────────────────────────────────────────┐
│                    THEHIREHUB DASHBOARD                         │
│                                                                 │
│  ┌──────────────┐    ┌─────────────────────────────────────┐  │
│  │   SIDEBAR    │    │         MAIN CONTENT                │  │
│  │              │    │                                     │  │
│  │ • Jobs List  │    │  ┌─────────────────────────────┐   │  │
│  │ • Quick      │    │  │ NAVBAR (Logo, Profile)      │   │  │
│  │   Links      │    │  └─────────────────────────────┘   │  │
│  │ • Settings   │    │                                     │  │
│  │              │    │  ┌─────────────────────────────┐   │  │
│  │              │    │  │ JOB OVERVIEW (Stats)        │   │  │
│  │              │    │  │ • Positions • Applicants    │   │  │
│  │              │    │  │ • Department • Location     │   │  │
│  │              │    │  └─────────────────────────────┘   │  │
│  │              │    │                                     │  │
│  │              │    │  ┌─────────────────────────────┐   │  │
│  │              │    │  │ FILTERS & SEARCH            │   │  │
│  │              │    │  │ • Search, Stage, Score      │   │  │
│  │              │    │  └─────────────────────────────┘   │  │
│  │              │    │                                     │  │
│  │              │    │  ┌─────────────────────────────┐   │  │
│  │              │    │  │ KANBAN PIPELINE             │   │  │
│  │              │    │  │                             │   │  │
│  │              │    │  │[Applied]→[Shortlist]→...   │   │  │
│  │              │    │  │  │Cards  │  │Cards    │     │   │  │
│  │              │    │  │  │       │  │        │     │   │  │
│  │              │    │  │  └───────┘  └────────┘     │   │  │
│  │              │    │  │                             │   │  │
│  │              │    │  └─────────────────────────────┘   │  │
│  │              │    │                                     │  │
│  │              │    │ ┌─────────────────────────────┐    │  │
│  │              │    │ │ CANDIDATE DRAWER (Overlay) │    │  │
│  │              │    │ │ • Profile Info  • Notes     │    │  │
│  │              │    │ │ • Skills • Interview Date   │    │  │
│  │              │    │ │ • Actions (Save, Delete)    │    │  │
│  │              │    │ └─────────────────────────────┘    │  │
│  └──────────────┘    └─────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📡 Data Flow Architecture

```
┌─────────────┐
│   BROWSER   │ (React App on localhost:3000)
│   FRONTEND  │
└──────┬──────┘
       │ HTTP API Calls
       ▼
┌─────────────────────┐
│   EXPRESS SERVER    │ (localhost:5000)
│   API Endpoints     │
└──────┬──────────────┘
       │ Database Queries
       ▼
┌─────────────────────┐
│    MONGODB          │ (Local or Cloud)
│    DATABASE         │
│                     │
│  Jobs Collection   │
│  Candidates Coll.  │
└─────────────────────┘
```

---

## 🗂️ Project Folder Structure

```
TheHireHubTechAssignment/
│
├── 📘 DOCS (Start here!)
│   ├── GETTING_STARTED.md        ← Read this FIRST
│   ├── SETUP_GUIDE.md            ← Setup instructions
│   ├── PROJECT_EXPLANATION.md    ← Interview prep
│   ├── API_REFERENCE.md          ← API docs
│   ├── DEPLOYMENT_GUIDE.md       ← Deploy to cloud
│   ├── SUBMISSION_README.md      ← What you built
│   ├── PROJECT_COMPLETE.md       ← This summary
│   └── README.md                 ← Full overview
│
├── 🔧 BACKEND (REST API Server)
│   ├── server.js                 ← Main file
│   ├── package.json              ← Dependencies
│   ├── .env.example              ← Config template
│   ├── README.md                 ← Backend docs
│   │
│   ├── models/
│   │   ├── Job.js                ← Job data schema
│   │   └── Candidate.js          ← Candidate schema
│   │
│   ├── controllers/
│   │   ├── jobController.js      ← Job logic
│   │   └── candidateController.js ← Candidate logic
│   │
│   └── routes/
│       ├── jobRoutes.js          ← Job endpoints
│       └── candidateRoutes.js    ← Candidate endpoints
│
└── ⚛️ FRONTEND (React App)
    ├── index.html                ← HTML template
    ├── package.json              ← Dependencies
    ├── .env.example              ← Config template
    ├── vite.config.ts            ← Build config
    ├── tailwind.config.js        ← Styling config
    ├── tsconfig.json             ← TypeScript config
    ├── README.md                 ← Frontend docs
    │
    └── src/
        ├── main.tsx              ← React entry
        ├── App.tsx               ← Root component
        │
        ├── components/
        │   ├── Layout.tsx        ← Page layout
        │   ├── Navbar.tsx        ← Top bar
        │   ├── Sidebar.tsx       ← Left nav
        │   ├── JobOverview.tsx   ← Stats cards
        │   ├── CandidatePipeline.tsx ← Kanban board
        │   ├── CandidateCard.tsx ← Card item
        │   └── CandidateDrawer.tsx ← Detail panel
        │
        ├── pages/
        │   └── Dashboard.tsx     ← Main page
        │
        ├── utils/
        │   ├── api.ts           ← API calls
        │   └── types.ts         ← TypeScript types
        │
        └── styles/
            └── index.css        ← Global styles
```

---

## 🔄 Component Hierarchy

```
App (Root)
│
└── Layout
    │
    ├── Navbar
    │   └── Logo + Profile
    │
    ├── Sidebar
    │   └── Job List
    │
    └── Dashboard (Main Content)
        │
        ├── Job Title & Breadcrumbs
        │
        ├── JobOverview
        │   └── 5 Stat Cards
        │
        ├── Filters Section
        │   └── Search, Stage, Experience, Score
        │
        ├── CandidatePipeline
        │   │
        │   ├── Column: Applied
        │   │   └── CandidateCard cards
        │   │
        │   ├── Column: Shortlisted
        │   │   └── CandidateCard cards
        │   │
        │   ├── Column: Interview
        │   │   └── CandidateCard cards
        │   │
        │   ├── Column: Offered
        │   │   └── CandidateCard cards
        │   │
        │   └── Column: Hired
        │       └── CandidateCard cards
        │
        └── CandidateDrawer (Overlay)
            └── Profile + Notes + Actions
```

---

## 🚀 Deployment Architecture

```
Developer Machine (You)
│
├── Backend Code ──git push──→ GitHub Repo
│                               │
└── Frontend Code               ├──→ Render (Backend Deploy)
                                │   │
                                │   ├── API on: https://api.example.com
                                │
                                └──→ Vercel (Frontend Deploy)
                                    │
                                    └── App on: https://app.example.com
                                    
Both connect to: MongoDB Atlas (Cloud Database)
```

---

## 📊 Database Schema

```
JOBS Collection
├── _id (ObjectId)
├── title (String)
├── department (String)
├── location (String)
├── openPositions (Number)
├── hiringManager (String)
├── description (String)
├── requirements (Array)
└── timestamps

CANDIDATES Collection
├── _id (ObjectId)
├── name (String)
├── email (String) [unique]
├── phone (String)
├── currentRole (String)
├── company (String)
├── experience (Number)
├── skills (Array)
├── jobId → (Reference to Jobs)  ←─── Relationship
├── stage (String: Applied|Shortlisted|Interview|Offered|Hired)
├── matchScore (Number: 0-100)
├── notes (Array)
├── interviewStatus (String)
├── interviewDate (Date)
└── timestamps
```

---

## 🔌 API Endpoints Summary

```
Jobs
├── GET    /api/jobs           → All jobs
├── GET    /api/jobs/:id       → One job
├── POST   /api/jobs           → Create job
├── PUT    /api/jobs/:id       → Update job
└── DELETE /api/jobs/:id       → Delete job

Candidates
├── GET    /api/candidates/job/:jobId?filters → Filtered list
├── GET    /api/candidates/:id                → One candidate
├── POST   /api/candidates                    → Create
├── PUT    /api/candidates/:id                → Update
├── PATCH  /api/candidates/:id/stage          → Change stage
├── POST   /api/candidates/:id/notes          → Add note
├── DELETE /api/candidates/:id                → Delete
├── GET    /api/candidates/job/:jobId/stages  → By stage
└── GET    /api/candidates/job/:jobId/stats   → Statistics
```

---

## 📚 Documentation Roadmap

```
START HERE → GETTING_STARTED.md
     │
     ├─→ Want to RUN it?
     │   └─→ SETUP_GUIDE.md
     │
     ├─→ Want to UNDERSTAND it?
     │   └─→ PROJECT_EXPLANATION.md
     │
     ├─→ Want to CODE with it?
     │   ├─→ backend/README.md
     │   └─→ frontend/README.md
     │
     ├─→ Want API DETAILS?
     │   └─→ API_REFERENCE.md
     │
     └─→ Want to DEPLOY it?
         └─→ DEPLOYMENT_GUIDE.md
```

---

## ⚡ Quick Commands Reference

```bash
# Backend
cd backend
npm install          # Install dependencies
npm run dev          # Start server (auto-reload)
npm start            # Start production

# Frontend
cd frontend
npm install          # Install dependencies
npm run dev          # Start app (auto-reload)
npm run build        # Create production build
npm run preview      # Test production build

# URLs
Backend:  http://localhost:5000
Frontend: http://localhost:3000
```

---

## 🎯 Technology Stack Diagram

```
Frontend Layer:
┌──────────────────────────────────┐
│ React 18 + TypeScript            │ (UI Components)
├──────────────────────────────────┤
│ Tailwind CSS                     │ (Styling)
├──────────────────────────────────┤
│ Vite                             │ (Build Tool)
└──────────────────────────────────┘
         ↓ (API Calls via Axios)

Application Layer:
┌──────────────────────────────────┐
│ Express.js Server                │ (REST API)
├──────────────────────────────────┤
│ Node.js                          │ (Runtime)
├──────────────────────────────────┤
│ CORS + Middleware                │ (Security)
└──────────────────────────────────┘
         ↓ (Database Queries)

Data Layer:
┌──────────────────────────────────┐
│ MongoDB                          │ (NoSQL Database)
├──────────────────────────────────┤
│ Mongoose                         │ (Schema/Validation)
└──────────────────────────────────┘
```

---

## 📈 Features per Category

**Navigation:**
- ✅ Sidebar with job selection
- ✅ Navbar with logo/profile
- ✅ Breadcrumbs

**Information Display:**
- ✅ Job overview stats (5 cards)
- ✅ Candidate pipeline (5 columns)
- ✅ Candidate cards with key info

**Interaction:**
- ✅ Click candidate to view details
- ✅ Search candidates
- ✅ Filter by multiple criteria
- ✅ Edit candidate info
- ✅ Add notes
- ✅ Schedule interviews
- ✅ Delete candidates

**UI/UX:**
- ✅ Loading states
- ✅ Empty states
- ✅ Error handling
- ✅ Responsive design
- ✅ Professional styling

---

## ✅ Completeness Checklist

```
ASSIGNMENT REQUIREMENTS:
✅ Main dashboard layout (sidebar, navbar, breadcrumbs)
✅ Job overview section (title, dept, location, positions, manager, applicants)
✅ Candidate pipeline (Kanban view with 5 stages)
✅ Candidate cards (name, role, experience, score, status, activity, actions)
✅ Search by name
✅ Filters (stage, experience, score)
✅ Candidate details drawer/modal
✅ UI states (loading, empty, no results)
✅ Responsive design
✅ B2B SaaS UX patterns
✅ Clean component structure
✅ Code quality and maintainability

DOCUMENTATION:
✅ Step-by-step setup guide
✅ Project explanation for interviews
✅ API reference documentation
✅ Deployment guide
✅ Code documentation
✅ README files

BONUS:
✅ Full backend implementation
✅ Database setup guides
✅ Multiple deployment options
✅ Interview Q&A preparation
✅ Improvements roadmap
✅ Visual diagrams
✅ Code comments
✅ TypeScript for type safety
```

---

## 🎓 Learning Path

```
Day 1: Setup & Explore
├── Read GETTING_STARTED.md (5 min)
├── Follow SETUP_GUIDE.md (30 min)
├── Run the app (5 min)
└── Click around and explore (10 min)

Day 2: Understand Code
├── Read PROJECT_EXPLANATION.md (20 min)
├── Look at App.tsx and main components (20 min)
├── Check API calls in utils/api.ts (10 min)
└── Review MongoDB models (10 min)

Day 3: Interview Prep
├── Read PROJECT_EXPLANATION.md again
├── Practice elevator pitch (30 sec & 2 min)
├── Answer sample questions
└── Prepare code examples

Day 4: Deploy
├── Follow DEPLOYMENT_GUIDE.md
├── Deploy backend
├── Deploy frontend
└── Test production version
```

---

## 🏁 Status Summary

| Component | Status | Details |
|-----------|--------|---------|
| **Backend** | ✅ Complete | All routes, models, controllers |
| **Frontend** | ✅ Complete | All components, pages, utilities |
| **Database** | ✅ Designed | Schemas ready for implementation |
| **API** | ✅ Mapped | All 12 endpoints documented |
| **Documentation** | ✅ Complete | 8 comprehensive guides |
| **Styling** | ✅ Complete | Tailwind, responsive design |
| **Features** | ✅ Complete | All assignment requirements |
| **Performance** | ✅ Optimized | Efficient components, proper patterns |
| **Security** | ✅ Started | Error handling, basic checks |
| **Testing** | ✅ Supported | Manual test scenarios provided |
| **Deployment** | ✅ Documented | Multiple options with steps |

---

## 🎉 You Have Everything You Need!

```
┌─────────────────────────────────────────────┐
│  COMPLETE PROJECT READY FOR:                │
│                                             │
│  ✅ Local Development                      │
│  ✅ Code Review                            │
│  ✅ Interview Discussion                   │
│  ✅ Team Collaboration                     │
│  ✅ Production Deployment                  │
│  ✅ Portfolio Showcase                     │
│  ✅ Learning & Reference                   │
│                                             │
│         Start with: GETTING_STARTED.md     │
│                                             │
└─────────────────────────────────────────────┘
```
