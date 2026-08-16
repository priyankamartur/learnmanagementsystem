# LearnHub LMS - Full-Stack Learning Management System

![Engineered with Antigravity](https://img.shields.io/badge/Engineered%20With-Google%20DeepMind%20Antigravity%20AI-4285F4?style=for-the-badge&logo=google)
![Stack](https://img.shields.io/badge/Tech%20Stack-React%20%7C%20TypeScript%20%7C%20Express-000000?style=for-the-badge)

LearnHub is a state-of-the-art, production-grade Learning Management System (LMS) engineered by **Priyanka Martur** using **Google DeepMind Antigravity Agentic AI**.

---

## ⚡ Powered by Google DeepMind Antigravity AI

This application was designed, architected, and built with **Google DeepMind Antigravity AI**, featuring:
- **Full-Stack Modular Architecture**: React 18, TypeScript, Tailwind CSS, Shadcn UI frontend with a Node.js/Express REST backend API.
- **52+ Interactive Technical Courses**: Complete dataset across 10 engineering domains formatted in Indian Rupees (₹).
- **Payment & Certificate Engines**: Multi-method checkout modal (*Card, PayPal, GPay, UPI*) and gold-embellished verified certificate generation.

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

---

### 🚀 Credits
- **Developer**: Priyanka Martur
- **AI Pair Programmer**: Google DeepMind Antigravity Agentic AI
