# LearnHub LMS - Full-Stack Learning Management System

LearnHub is a production-grade, state-of-the-art Learning Management System (LMS) built with React, TypeScript, Tailwind CSS, Shadcn UI, and a Node.js/Express backend API.

---

## 📁 Repository Structure

```
learnmanagementsystem/
├── backend/                  # Express Backend API Server
│   ├── index.js              # REST API endpoints (Port 5000)
│   ├── coursesData.js        # 52+ courses database (INR ₹)
│   ├── generateData.js       # Database generation script
│   └── package.json          # Backend dependencies
│
├── src/                      # React Frontend Application
│   ├── components/           # UI Components (PaymentModal, CertificatePanel, ProfileModal, AuthModal, QuizModal)
│   ├── data/                 # Course data models & 52+ courses dataset
│   ├── pages/                # Pages (Index, CoursesPage, CourseDetail, LearnPage, Dashboard)
│   ├── index.css             # Tailwind CSS & Design System
│   └── App.tsx               # Main Router
│
├── public/                   # Public static assets
├── index.html                # HTML entry point
├── package.json              # Frontend dependencies
├── vite.config.ts            # Vite configuration
└── README.md                 # Documentation
```

---

## ⚡ Quick Start Guide

### 1️⃣ Start the Backend API Server
```powershell
cd backend
npm install
node index.js
```
> API runs on `http://localhost:5000`

### 2️⃣ Start the Frontend Web App
```powershell
npm install
npm run dev
```
> Web App runs on `http://localhost:8080`

---

## 🌟 Key Features

- **52+ Curated Courses**: Across 10 technical categories (*Web Dev, AI & Data Science, Mobile Dev, Cybersecurity, Cloud & DevOps, UI/UX, Game Dev, Database Engineering, System Design, Languages*) with prices in Indian Rupees (₹).
- **Interactive Checkout Modal**: Credit/Debit Cards, PayPal, Google Pay, and UPI (*Google Pay, PhonePe, Paytm, BHIM*).
- **Official Certificate Generator**: Printable & downloadable PDF certificates with custom student name & shareable Credential ID upon 100% course completion.
- **Student Dashboard & Profile**: Dedicated student portal for course progress, active streak (🔥 5 Days), earned certificates, wishlist bookmarks, and saved lesson notes.
- **Light & Dark Theme Switcher**: Dynamic theme toggle with local persistence.
