import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { courses } from "./coursesData.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory / Persistent user profile database store
const DB_FILE = path.join(__dirname, "userDb.json");

const getDb = () => {
  if (fs.existsSync(DB_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
    } catch (e) {
      console.error("Error reading DB file:", e);
    }
  }
  return {
    users: [
      {
        id: "usr-1",
        email: "alex.morgan@example.com",
        password: "password123",
        name: "Alex Morgan",
        role: "Software Developer & Lifelong Learner",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
        bio: "Passionate about full-stack web development, AI engineering, and building user-centric products.",
        targetSkills: "React, Next.js, Python, AWS",
        enrolledCourses: ["react-complete", "python-ml"],
        createdDate: "2026-01-15"
      }
    ]
  };
};

const saveDb = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// --- API ENDPOINTS ---

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "LearnHub LMS Express Backend API is running!", totalCourses: courses.length });
});

// GET /api/courses - List courses with search, category, level, and pagination
app.get("/api/courses", (req, res) => {
  const { category, level, q, sort, page = 1, limit = 12 } = req.query;

  let filtered = [...courses];

  if (category && category !== "All") {
    filtered = filtered.filter((c) => c.category === category);
  }

  if (level && level !== "All") {
    filtered = filtered.filter((c) => c.level === level);
  }

  if (q && q.trim() !== "") {
    const query = q.toLowerCase();
    filtered = filtered.filter(
      (c) =>
        c.title.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query) ||
        c.category.toLowerCase().includes(query) ||
        c.instructor.toLowerCase().includes(query)
    );
  }

  if (sort === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sort === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else {
    filtered.sort((a, b) => b.reviewCount - a.reviewCount);
  }

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const totalCourses = filtered.length;
  const totalPages = Math.ceil(totalCourses / limitNum);
  const startIndex = (pageNum - 1) * limitNum;
  const paginatedCourses = filtered.slice(startIndex, startIndex + limitNum);

  res.json({
    courses: paginatedCourses,
    pagination: {
      totalCourses,
      totalPages,
      currentPage: pageNum,
      limit: limitNum
    }
  });
});

// GET /api/courses/:id - Single course details
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === req.params.id);
  if (!course) {
    return res.status(404).json({ error: "Course not found" });
  }
  res.json(course);
});

// POST /api/auth/register - Register new student profile
app.post("/api/auth/register", (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email, and password are required" });
  }

  const db = getDb();
  const existingUser = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existingUser) {
    return res.status(400).json({ error: "An account with this email already exists" });
  }

  const newUser = {
    id: `usr-${Date.now()}`,
    email,
    password,
    name,
    role: role || "Student Learner",
    avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop`,
    bio: "Passionate learner on LearnHub LMS.",
    targetSkills: "Full Stack Development, AI",
    enrolledCourses: [],
    createdDate: new Date().toISOString().split("T")[0]
  };

  db.users.push(newUser);
  saveDb(db);

  const { password: _, ...userWithoutPassword } = newUser;
  res.status(201).json({ message: "Registration successful!", user: userWithoutPassword });
});

// POST /api/auth/login - Authenticate student
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  const db = getDb();
  const user = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const { password: _, ...userWithoutPassword } = user;
  res.json({ message: "Login successful!", user: userWithoutPassword });
});

// GET /api/profile - Fetch student profile
app.get("/api/profile/:id", (req, res) => {
  const db = getDb();
  const user = db.users.find((u) => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User profile not found" });
  }
  const { password, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

// PUT /api/profile - Update student profile
app.put("/api/profile/:id", (req, res) => {
  const { name, role, bio, targetSkills, avatar } = req.body;
  const db = getDb();
  const userIndex = db.users.findIndex((u) => u.id === req.params.id);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User profile not found" });
  }

  if (name) db.users[userIndex].name = name;
  if (role) db.users[userIndex].role = role;
  if (bio) db.users[userIndex].bio = bio;
  if (targetSkills) db.users[userIndex].targetSkills = targetSkills;
  if (avatar) db.users[userIndex].avatar = avatar;

  saveDb(db);

  const { password, ...updatedUser } = db.users[userIndex];
  res.json({ message: "Profile updated successfully!", user: updatedUser });
});

app.listen(PORT, () => {
  console.log(`🚀 LearnHub LMS Express Backend Server running on http://localhost:${PORT}`);
});
