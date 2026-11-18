# Health Awareness and Community Wellness Management System (HACWMS)
## Community Service Project (CSP) Mini-Project • Web Application
**Location:** 10th Ward, Tadepalligudem, West Godavari District, Andhra Pradesh

---

## 🌟 Overview
The **Health Awareness and Community Wellness Management System (HACWMS)** is a full-stack web application developed as the digital extension of an 8-week Community Service Project conducted in the 10th Ward of Tadepalligudem. It transforms offline paper surveys and health education sessions conducted at the Municipal Office, Primary School, Residential Society, and Government High School into a modern, continuous digital awareness platform.

### Key Highlights
- **Frontend:** React.js 18 + Vite + Tailwind CSS + Lucide Icons + React Router DOM
- **Backend:** Node.js + Express.js + REST API + JWT Authentication + bcrypt
- **Database:** MySQL (11 relational tables, JSON data fields, seed datasets)
- **Bilingual Interface:** Instant toggle between English and Telugu (తెలుగు)
- **10 Core Features:** Health Education, 4-Category Health Quiz, Digitized 17-Question 7-Section Survey, Healthy Lifestyle Tips, 8-Week CSP Timeline, User Dashboard, Admin Dashboard, Feedback & Ratings, Daily Reminders, Contact & Helplines (104, 108).

---

## 📁 Project Structure

```
CSP/
├── backend/
│   ├── config/
│   │   └── db.js                 # MySQL pool connection
│   ├── database/
│   │   ├── schema.sql            # Complete 11 tables schema + seed data
│   │   └── initDb.js             # Automated database & seed runner
│   ├── middleware/
│   │   └── auth.js               # JWT verification & admin authorization
│   ├── routes/
│   │   ├── authRoutes.js         # Register, Login, Profile
│   │   ├── contentRoutes.js      # Health education CRUD
│   │   ├── surveyRoutes.js       # 17 questions & submission
│   │   ├── quizRoutes.js         # 4 Quizzes, 5 questions, scoring & badges
│   │   ├── feedbackRoutes.js     # 5-Star ratings & testimonials
│   │   ├── reminderRoutes.js     # Water, handwashing, walk timers
│   │   ├── activityRoutes.js     # 8-week CSP timeline
│   │   └── adminRoutes.js        # Admin metrics & management
│   ├── .env                      # Port, DB credentials, JWT secret
│   ├── package.json
│   └── server.js                 # Main Express server entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/           # Navbar, Footer, ProtectedRoute
│   │   ├── context/              # AuthContext, LanguageContext
│   │   ├── pages/                # Home, About, Health, Quiz, Survey,
│   │   │                         # Activities, Reminders, Feedback, Contact,
│   │   │                         # Login, Register, UserDashboard, AdminDashboard
│   │   ├── services/api.js       # Axios client with JWT interceptor
│   │   ├── translations/         # Full bilingual English & Telugu dictionary
│   │   ├── App.jsx               # Routes setup
│   │   ├── main.jsx
│   │   └── index.css             # Tailwind base & styles
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── run-project.bat               # Windows 1-click startup script
└── README.md
```

---

## 🚀 Setup & Execution Guide

### Prerequisites
1. **Node.js** (v18+ recommended)
2. **MySQL Server** (via XAMPP, WAMP, or standalone MySQL on port 3306)

---

### Step 1: Database Setup
1. Start your **MySQL service** (e.g. open XAMPP Control Panel and click **Start** next to MySQL).
2. Configure your MySQL credentials in `backend/.env` (default is user `root`, no password).
3. Initialize the database and tables with sample data:
```bash
cd backend
npm install
npm run init-db
```
*(Alternatively, you can open phpMyAdmin or MySQL Workbench and import `backend/database/schema.sql` directly).*

---

### Step 2: Start Backend Server
```bash
cd backend
npm install
npm start
```
The backend will run at **http://localhost:5000** with endpoints at `/api`.

---

### Step 3: Start Frontend Web App
In a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
The application will launch at **http://localhost:5173**.

---

## 🔑 Demo Accounts

For quick presentation and testing, the login screen includes **1-Click Autofill** buttons:

| Role | Email | Password | Access |
|---|---|---|---|
| **Ward Health Admin** | `admin@hacwms.org` | `admin123` | Full Admin Dashboard, Manage Users, View Survey Responses, View Quiz Results, Add Content |
| **Citizen (Kavitha Devi)** | `kavitha@example.com` | `admin123` | User Dashboard, Quiz History & Badges, Completed Surveys, Reminders |

*New users can also register freely on the `/register` page.*

---

## 🏆 Mini-Project Feature Highlights

1. **Bilingual Toggle (EN / తెలుగు):** Instant toggle across all views so community members and students can learn comfortably.
2. **Interactive Health Quizzes:**
   - Personal Hygiene
   - Healthy Food and Nutrition
   - Common Diseases & Vector Prevention
   - Preventive Healthcare & Daily Habits
   - Automatic grading with achievements: **Health Champion (5/5)**, **Health Expert (4/5)**, **Health Learner (3/5)**, **Health Beginner (2/5)**.
3. **Digitized 17-Question CSP Survey:**
   - 7 sections matching the fieldwork questionnaire: Demographics, General Health, Food & Lifestyle, Hygiene, Disease Awareness, Mental Health, Community Support.
4. **8-Week Fieldwork Activities Timeline:**
   - Records the exact community interventions at Tadepalligudem 10th Ward Municipal Office, Primary School, Residential Society, and High School.
5. **Daily Health Reminders:**
   - Customizable timers for drinking clean water, washing hands before meals, and 30-min walking.
6. **Community Feedback & Star Ratings:**
   - 1 to 5-star rating system with real-time community score calculation.

