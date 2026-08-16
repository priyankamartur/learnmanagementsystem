export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  youtubeId: string;
  order: number;
}

export interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
  quiz?: QuizQuestion[];
}

export interface Review {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  thumbnail: string;
  instructor: string;
  instructorTitle: string;
  instructorAvatar: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
  reviewCount: number;
  totalLessons: number;
  totalDuration: string;
  price: number;
  originalPrice?: number;
  sections: Section[];
  learningPoints: string[];
  requirements: string[];
  reviews: Review[];
  featured?: boolean;
}

export const categories = [
  "All",
  "Web Development",
  "Data Science & AI",
  "Mobile Development",
  "Cybersecurity",
  "Cloud & DevOps",
  "UI/UX Design",
  "Game Development",
  "Database Engineering",
  "System Design",
  "Programming Languages"
];

export const courses: Course[] = [
  // 1. Web Dev
  {
    id: "react-complete",
    title: "The Complete React & Next.js Masterclass 2026",
    description: "Master modern React, TypeScript, Redux Toolkit, Tailwind CSS, and Next.js 15 App Router.",
    longDescription: "Master React from fundamentals to advanced production patterns. Learn custom hooks, Context API, TanStack Query, Next.js server components, and Tailwind styling.",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop",
    instructor: "Sarah Chen",
    instructorTitle: "Senior Frontend Architect at Meta",
    instructorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    category: "Web Development",
    level: "Intermediate",
    rating: 4.9,
    reviewCount: 1420,
    totalLessons: 8,
    totalDuration: "4h 30m",
    price: 3999,
    originalPrice: 6999,
    featured: true,
    learningPoints: [
      "Build powerful reactive web applications with React 18+ and Next.js",
      "Master TypeScript for type-safe frontend components",
      "Manage global state with Redux Toolkit and Context API"
    ],
    requirements: ["Basic HTML, CSS, and modern JavaScript (ES6+)"],
    sections: [
      {
        id: "react-s1",
        title: "Section 1: React Fundamentals & Modern JSX",
        lessons: [
          { id: "r1", title: "1. Introduction to React Architecture", duration: "12:30", youtubeId: "Tn6-PIqc4UM", order: 1 },
          { id: "r2", title: "2. JSX Syntax & Component Composition", duration: "18:45", youtubeId: "9YkUCRhBz6k", order: 2 },
          { id: "r3", title: "3. Props, State & Unidirectional Data Flow", duration: "22:10", youtubeId: "IYvD9oBCuJI", order: 3 },
        ],
        quiz: [
          {
            id: "rq1",
            question: "Which hook is used to declare local component state in React?",
            options: ["useEffect", "useState", "useContext", "useReducer"],
            correctAnswer: 1,
            explanation: "useState is the primary React hook for state management in functional components."
          },
          {
            id: "rq2",
            question: "What does JSX stand for in React?",
            options: ["JavaScript XML", "Java Syntax Extension", "JSON XML System", "JavaScript Execution"],
            correctAnswer: 0,
            explanation: "JSX stands for JavaScript XML, allowing HTML-like syntax inside JS."
          }
        ]
      },
      {
        id: "react-s2",
        title: "Section 2: Deep Dive into Hooks & State",
        lessons: [
          { id: "r4", title: "4. useState & useEffect Best Practices", duration: "25:00", youtubeId: "O6P86uwfdR0", order: 4 },
          { id: "r5", title: "5. Context API & Global State", duration: "20:15", youtubeId: "5LrDIWkK_Bc", order: 5 },
        ],
        quiz: [
          {
            id: "rq3",
            question: "When does the cleanup function inside useEffect execute?",
            options: [
              "Before every render",
              "Before component unmounting or before re-running the effect",
              "Only on errors",
              "After initial mount only"
            ],
            correctAnswer: 1,
            explanation: "The cleanup function returned by useEffect runs before unmount and before re-running when dependencies change."
          }
        ]
      }
    ],
    reviews: [
      { id: "rev1", user: "Alex Johnson", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop", rating: 5, date: "2 weeks ago", comment: "Outstanding React course!" }
    ]
  },
  {
    id: "vue-js-mastery",
    title: "Vue 3 & Pinia Modern Full-Stack Guide",
    description: "Build ultra-fast reactive web apps using Vue 3 Composition API, Vite, Pinia, and Nuxt 3.",
    longDescription: "Learn Vue 3 from scratch using Composition API, Script Setup syntax, reactive state, custom directives, Pinia store management, and SSR with Nuxt 3.",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop",
    instructor: "Guillaume Mercier",
    instructorTitle: "Vue Core Contributor",
    instructorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    category: "Web Development",
    level: "Beginner",
    rating: 4.88,
    reviewCount: 930,
    totalLessons: 6,
    totalDuration: "3h 40m",
    price: 2999,
    originalPrice: 4999,
    learningPoints: ["Master Vue 3 Composition API & script setup", "State management with Pinia"],
    requirements: ["Basic JS knowledge"],
    sections: [
      {
        id: "v1",
        title: "Section 1: Vue 3 Reactive Core",
        lessons: [
          { id: "vl1", title: "1. Intro to Vue 3 & Vite", duration: "15:00", youtubeId: "FXpIoQ_rT_c", order: 1 },
          { id: "vl2", title: "2. Reactivity with ref() and reactive()", duration: "20:00", youtubeId: "bzkRVzciAZg", order: 2 }
        ],
        quiz: [
          {
            id: "vq1",
            question: "In Vue 3 Composition API, how do you declare a reactive primitive variable?",
            options: ["const count = ref(0)", "const count = useState(0)", "let count = 0", "const count = reactive(0)"],
            correctAnswer: 0,
            explanation: "ref() is used for primitive reactive state values in Vue 3."
          }
        ]
      }
    ],
    reviews: []
  },
  {
    id: "node-express-backend",
    title: "Node.js, Express & MongoDB REST API Bootcamp",
    description: "Build production-ready backend REST APIs with Node.js, Express, JWT authentication, and MongoDB.",
    longDescription: "Master backend web development with Node.js and Express. Build secure RESTful APIs, implement JWT authentication, hash passwords, manage database schemas with Mongoose, and handle file uploads.",
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=450&fit=crop",
    instructor: "Carlos Santana",
    instructorTitle: "Backend Lead at Stripe",
    instructorAvatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&h=150&fit=crop",
    category: "Web Development",
    level: "Intermediate",
    rating: 4.92,
    reviewCount: 1850,
    totalLessons: 8,
    totalDuration: "5h 15m",
    price: 3299,
    originalPrice: 5499,
    featured: true,
    learningPoints: ["Build secure REST APIs with Node & Express", "MongoDB database modeling with Mongoose"],
    requirements: ["JavaScript fundamentals"],
    sections: [
      {
        id: "node1",
        title: "Section 1: Express Server & Middleware",
        lessons: [
          { id: "nl1", title: "1. Intro to Node Event Loop & Express", duration: "18:00", youtubeId: "Oe421EPjeBE", order: 1 }
        ],
        quiz: [
          {
            id: "nq1",
            question: "What signature does Express middleware function use?",
            options: ["(req, res, next)", "(req, res)", "(event, callback)", "(err, req)"],
            correctAnswer: 0,
            explanation: "Express middleware takes (req, res, next) arguments to pass control down the chain."
          }
        ]
      }
    ],
    reviews: []
  },

  // 2. Data Science & AI
  {
    id: "python-ml",
    title: "Python for Data Science & Machine Learning",
    description: "Master Python programming, Pandas, Data Visualization, Scikit-learn, and Deep Learning models.",
    longDescription: "Dive headfirst into data science and artificial intelligence using Python. Learn how to clean and analyze data using NumPy and Pandas, create charts with Seaborn, and train Machine Learning models with Scikit-learn.",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=450&fit=crop",
    instructor: "Alex Rivera",
    instructorTitle: "Lead Data Scientist & AI Researcher",
    instructorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    category: "Data Science & AI",
    level: "Beginner",
    rating: 4.8,
    reviewCount: 980,
    totalLessons: 6,
    totalDuration: "3h 15m",
    price: 2999,
    originalPrice: 4999,
    featured: true,
    learningPoints: [
      "Understand core Machine Learning algorithms",
      "Perform exploratory data analysis with Pandas",
      "Build predictive classification models"
    ],
    requirements: ["No prior programming experience required"],
    sections: [
      {
        id: "py-basics",
        title: "Section 1: Python Data Analysis Fundamentals",
        lessons: [
          { id: "p1", title: "1. Python Crash Course & Jupyter Notebooks", duration: "20:00", youtubeId: "JJmcL1N2KQs", order: 1 },
          { id: "p2", title: "2. Vectorized Data Processing with NumPy & Pandas", duration: "25:00", youtubeId: "QUT1VHiLmmI", order: 2 }
        ],
        quiz: [
          {
            id: "pq1",
            question: "Which library in Python provides tabular DataFrame data structures?",
            options: ["Pandas", "Matplotlib", "Flask", "SciPy"],
            correctAnswer: 0,
            explanation: "Pandas is the premier library for DataFrame tabular data manipulation."
          }
        ]
      }
    ],
    reviews: []
  },
  {
    id: "deep-learning-pytorch",
    title: "Deep Learning & Neural Networks with PyTorch",
    description: "Build Convolutional Networks, Transformers, and Generative AI models using PyTorch 2.0.",
    longDescription: "Master deep learning principles with PyTorch. Build Artificial Neural Networks (ANN), Convolutional Neural Networks (CNN) for computer vision, Recurrent Neural Networks (RNN/LSTM) for time-series, and Transformer architectures.",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=450&fit=crop",
    instructor: "Dr. Elena Vance",
    instructorTitle: "AI Research Scientist at OpenAI Alumni",
    instructorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
    category: "Data Science & AI",
    level: "Advanced",
    rating: 4.95,
    reviewCount: 1340,
    totalLessons: 8,
    totalDuration: "5h 30m",
    price: 4499,
    originalPrice: 7999,
    featured: true,
    learningPoints: ["Build & train Deep Neural Networks in PyTorch", "Understand CNNs for Computer Vision & Transformers"],
    requirements: ["Python & linear algebra basics"],
    sections: [
      {
        id: "dl1",
        title: "Section 1: PyTorch Tensors & Autograd",
        lessons: [
          { id: "dll1", title: "1. Tensor Operations & GPU Acceleration", duration: "25:00", youtubeId: "V_xro1bcAuA", order: 1 }
        ],
        quiz: [
          {
            id: "dlq1",
            question: "What PyTorch feature automatically calculates gradients during backpropagation?",
            options: ["Autograd", "TorchVision", "DataLoader", "CUDA Sync"],
            correctAnswer: 0,
            explanation: "Autograd automatically records operations and calculates gradients for gradient descent."
          }
        ]
      }
    ],
    reviews: []
  },

  // 3. Mobile Development
  {
    id: "flutter-dart-bootcamp",
    title: "Flutter 3 & Dart Complete Mobile App Bootcamp",
    description: "Build beautiful cross-platform mobile apps for iOS, Android, and Web with Flutter and Dart.",
    longDescription: "Learn Google's Flutter framework from scratch. Master Dart programming language, widget composition, Material Design 3, State Management (Provider, Bloc), REST API integration, and Firebase backend.",
    thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=450&fit=crop",
    instructor: "Angela Yu Lead",
    instructorTitle: "Mobile Development Instructor",
    instructorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
    category: "Mobile Development",
    level: "Beginner",
    rating: 4.94,
    reviewCount: 2450,
    totalLessons: 8,
    totalDuration: "5h 10m",
    price: 2999,
    originalPrice: 4999,
    featured: true,
    learningPoints: ["Master Dart OOP language concepts", "Build complex responsive UIs with Flutter widgets"],
    requirements: ["No mobile experience required"],
    sections: [
      {
        id: "fl1",
        title: "Section 1: Dart Fundamentals & Flutter Setup",
        lessons: [
          { id: "fll1", title: "1. Intro to Flutter Architecture & Widgets", duration: "20:00", youtubeId: "x0uinJYeNxw", order: 1 }
        ],
        quiz: [
          {
            id: "flq1",
            question: "Everything in Flutter UI layout is a _____?",
            options: ["Widget", "View", "Component", "Activity"],
            correctAnswer: 0,
            explanation: "In Flutter, almost everything (layouts, padding, text, buttons) is a Widget."
          }
        ]
      }
    ],
    reviews: []
  },

  // 4. Cybersecurity
  {
    id: "ethical-hacking-penetration-testing",
    title: "The Complete Ethical Hacking & Penetration Testing Course",
    description: "Learn penetration testing, web vulnerability scanning, network hacking, and Kali Linux tools.",
    longDescription: "Become a certified ethical hacker. Learn how to discover web application vulnerabilities (SQLi, XSS, CSRF), scan networks with Nmap, perform Wi-Fi penetration testing, intercept traffic with Burp Suite, and secure systems.",
    thumbnail: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&h=450&fit=crop",
    instructor: "Zaid Sabih",
    instructorTitle: "Ethical Hacker & Security Researcher",
    instructorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop",
    category: "Cybersecurity",
    level: "Beginner",
    rating: 4.93,
    reviewCount: 3100,
    totalLessons: 8,
    totalDuration: "5h 00m",
    price: 3499,
    originalPrice: 5999,
    featured: true,
    learningPoints: ["Perform ethical penetration testing using Kali Linux", "Understand OWASP Top 10 vulnerabilities"],
    requirements: ["Basic computer IT knowledge"],
    sections: [
      {
        id: "eh1",
        title: "Section 1: Network Scanning & Reconnaissance",
        lessons: [
          { id: "ehl1", title: "1. Kali Linux Lab Setup & Nmap Scanning", duration: "25:00", youtubeId: "3Kq1MIfTWCE", order: 1 }
        ],
        quiz: [
          {
            id: "ehq1",
            question: "Which tool is standard for network port discovery and security auditing?",
            options: ["Nmap", "Postman", "Figma", "Docker"],
            correctAnswer: 0,
            explanation: "Nmap is the Industry standard open-source network scanner for vulnerability discovery."
          }
        ]
      }
    ],
    reviews: []
  },

  // 5. Cloud & DevOps
  {
    id: "cloud-devops",
    title: "AWS & DevOps Engineering Fundamentals",
    description: "Learn Docker, Kubernetes, CI/CD with GitHub Actions, Terraform, and AWS Cloud Infrastructure.",
    longDescription: "Automate software delivery pipelines and manage cloud infrastructure like a top DevOps engineer. Master Docker containerization, Kubernetes orchestration, Terraform scripts, and AWS services.",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=450&fit=crop",
    instructor: "Jason Miller",
    instructorTitle: "Cloud Solutions Architect",
    instructorAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop",
    category: "Cloud & DevOps",
    level: "Intermediate",
    rating: 4.85,
    reviewCount: 640,
    totalLessons: 6,
    totalDuration: "4h 10m",
    price: 3999,
    originalPrice: 6999,
    featured: true,
    learningPoints: ["Containerize applications with Docker", "Deploy microservices on Kubernetes"],
    requirements: ["Basic Linux terminal knowledge"],
    sections: [
      {
        id: "docker-k8s",
        title: "Section 1: Docker & Orchestration",
        lessons: [
          { id: "d1", title: "1. Intro to Containerization & Docker", duration: "25:00", youtubeId: "3c-iBn73dDE", order: 1 }
        ],
        quiz: [
          {
            id: "dq1",
            question: "What file defines instructions to build a Docker container image?",
            options: ["Dockerfile", "docker-compose.yml", "package.json", "index.html"],
            correctAnswer: 0,
            explanation: "Dockerfile contains step-by-step instructions to assemble a Docker container image."
          }
        ]
      }
    ],
    reviews: []
  },

  // 6. UI/UX Design
  {
    id: "uiux-design",
    title: "UI/UX Design & Figma Mastery 2026",
    description: "Learn user research, wireframing, interactive prototyping, and design systems in Figma.",
    longDescription: "Master end-to-end product design from user discovery to high-fidelity design systems in Figma. Learn design psychology, typography, color theory, auto-layout 5.0, and interactive prototyping.",
    thumbnail: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&h=450&fit=crop",
    instructor: "Elena Rostova",
    instructorTitle: "Principal Product Designer at DesignStudio",
    instructorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
    category: "UI/UX Design",
    level: "Beginner",
    rating: 4.95,
    reviewCount: 812,
    totalLessons: 6,
    totalDuration: "3h 50m",
    price: 2999,
    originalPrice: 4999,
    featured: true,
    learningPoints: [
      "Master Figma auto-layout & design tokens",
      "Conduct user research & create low-fi wireframes",
      "Build interactive prototypes with micro-animations"
    ],
    requirements: ["Free Figma account"],
    sections: [
      {
        id: "ux-foundations",
        title: "Section 1: UX Principles & Wireframing",
        lessons: [
          { id: "u1", title: "1. Foundations of UX Psychology", duration: "18:00", youtubeId: "c9Wg6Cb_YlU", order: 1 }
        ],
        quiz: [
          {
            id: "uxq1",
            question: "Which Figma feature allows responsive component resizing based on content?",
            options: ["Auto-Layout", "Smart Animate", "Variant Switch", "Grid Overlay"],
            correctAnswer: 0,
            explanation: "Auto-Layout allows components to shrink/grow dynamically with content."
          }
        ]
      }
    ],
    reviews: []
  },

  // 7. System Design
  {
    id: "system-design-interview",
    title: "System Design & High-Scalability Architecture",
    description: "Learn to design large-scale systems: Load Balancers, Caching, Microservices, Sharding & Message Queues.",
    longDescription: "Prepare for high-level tech system design interviews. Master scalability bottlenecks, load balancing algorithms, Redis caching strategies, database partitioning, Kafka message queues, and rate limiters.",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=450&fit=crop",
    instructor: "Alex Xu Fan",
    instructorTitle: "Ex-Google Software Architect",
    instructorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
    category: "System Design",
    level: "Advanced",
    rating: 4.97,
    reviewCount: 2900,
    totalLessons: 8,
    totalDuration: "5h 10m",
    price: 4499,
    originalPrice: 7999,
    featured: true,
    learningPoints: ["Design systems serving millions of daily users", "Master distributed caching, queues & sharding"],
    requirements: ["Software engineering experience"],
    sections: [
      {
        id: "sd1",
        title: "Section 1: Distributed Systems Building Blocks",
        lessons: [
          { id: "sdl1", title: "1. CAP Theorem, Load Balancing & CDN", duration: "25:00", youtubeId: "i7twT3GBUZY", order: 1 }
        ],
        quiz: [
          {
            id: "sdq1",
            question: "In CAP Theorem, what three guarantees are balanced?",
            options: [
              "Consistency, Availability, Partition Tolerance",
              "Concurrency, Accuracy, Performance",
              "Caching, API, Persistence",
              "Control, Authentication, Privacy"
            ],
            correctAnswer: 0,
            explanation: "CAP theorem states a distributed system can guarantee at most two of: Consistency, Availability, and Partition Tolerance."
          }
        ]
      }
    ],
    reviews: []
  }
];

// Dynamically generate remaining up to 52 courses with section quizzes
const instructorsList = [
  { name: "Dr. Alan Turing", title: "AI Researcher", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop" },
  { name: "Sophia Rodriguez", title: "Lead Architect", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop" },
  { name: "Marcus Vance", title: "DevOps Engineer", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop" },
  { name: "Emily Watson", title: "Product Designer", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop" }
];

const topics = [
  { cat: "Web Development", name: "GraphQL & Apollo Client Masterclass", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop", price: 2499 },
  { cat: "Web Development", name: "Tailwind CSS 4 & Shadcn UI Design", img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=450&fit=crop", price: 1999 },
  { cat: "Web Development", name: "Full-Stack Django & React App Development", img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=450&fit=crop", price: 3499 },
  { cat: "Web Development", name: "WebAssembly (WASM) with C++ & Rust", img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=450&fit=crop", price: 3999 },
  { cat: "Web Development", name: "Micro-Frontends Architecture with Webpack 5", img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop", price: 4299 },

  { cat: "Data Science & AI", name: "AI Agents & Autonomous Workflows with CrewAI", img: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&h=450&fit=crop", price: 4999 },
  { cat: "Data Science & AI", name: "Reinforcement Learning & Q-Learning in Python", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=450&fit=crop", price: 3999 },
  { cat: "Data Science & AI", name: "Big Data Processing with Apache Spark & PySpark", img: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=800&h=450&fit=crop", price: 3799 },
  { cat: "Data Science & AI", name: "Time Series Forecasting with Prophet & ARIMA", img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=450&fit=crop", price: 2999 },

  { cat: "Mobile Development", name: "Kotlin Multiplatform (KMP) Desktop & Mobile", img: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=800&h=450&fit=crop", price: 3499 },
  { cat: "Mobile Development", name: "iOS SwiftData & CoreData Persistence", img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=450&fit=crop", price: 2799 },
  { cat: "Mobile Development", name: "React Native Performance Optimization", img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=450&fit=crop", price: 2999 },

  { cat: "Cybersecurity", name: "Certified Information Systems Security Professional (CISSP)", img: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&h=450&fit=crop", price: 5999 },
  { cat: "Cybersecurity", name: "Wireshark Packet Analysis & Network Forensics", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=450&fit=crop", price: 2299 },
  { cat: "Cybersecurity", name: "Cloud Security on AWS & Azure IAM", img: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&h=450&fit=crop", price: 3499 },

  { cat: "Cloud & DevOps", name: "Kubernetes Certified Administrator (CKA)", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=450&fit=crop", price: 4499 },
  { cat: "Cloud & DevOps", name: "Ansible Configuration Management & Automation", img: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=450&fit=crop", price: 2799 },
  { cat: "Cloud & DevOps", name: "Google Cloud Platform (GCP) Architect Guide", img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=450&fit=crop", price: 3999 },

  { cat: "UI/UX Design", name: "Design Psychology & Conversion Optimization", img: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&h=450&fit=crop", price: 2499 },
  { cat: "UI/UX Design", name: "Mobile UI Design in Principle & Framer", img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=450&fit=crop", price: 2299 },

  { cat: "Game Development", name: "Blender 3D Modeling for Unity & Unreal Games", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=450&fit=crop", price: 2999 },
  { cat: "Game Development", name: "2D Pixel Art Animation for Indie Games", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop", price: 1999 },

  { cat: "Database Engineering", name: "Redis Data Structures, Caching & Pub/Sub", img: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=450&fit=crop", price: 2799 },
  { cat: "Database Engineering", name: "Apache Cassandra Distributed NoSQL Database", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop", price: 3499 },

  { cat: "System Design", name: "Microservices Architecture with gRPC & Kafka", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=450&fit=crop", price: 4499 },

  { cat: "Programming Languages", name: "Modern C++23 Programming & Memory", img: "https://images.unsplash.com/photo-1515879218367-8466d910auj7?w=800&h=450&fit=crop", price: 3499 },
  { cat: "Programming Languages", name: "TypeScript 5 Advanced Generics & Metaprogramming", img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop", price: 2799 }
];

topics.forEach((t, i) => {
  const inst = instructorsList[i % instructorsList.length];
  courses.push({
    id: `course-ext-${i + 1}`,
    title: t.name,
    description: `Complete guide to ${t.name}. Build real production projects with step-by-step guidance.`,
    longDescription: `Master ${t.name} with industry best practices. This course includes video lessons, hands-on exercises, section quizzes, code downloads, and an official certificate of completion.`,
    thumbnail: t.img,
    instructor: inst.name,
    instructorTitle: inst.title,
    instructorAvatar: inst.avatar,
    category: t.cat,
    level: i % 3 === 0 ? "Beginner" : i % 3 === 1 ? "Intermediate" : "Advanced",
    rating: parseFloat((4.7 + (i % 3) * 0.1).toFixed(1)),
    reviewCount: 300 + i * 45,
    totalLessons: 6 + (i % 4),
    totalDuration: `${3 + (i % 3)}h ${(i * 12) % 60}m`,
    price: t.price,
    originalPrice: Math.round(t.price * 1.7),
    learningPoints: [
      `Master core concepts of ${t.name}`,
      "Build real-world portfolio projects",
      "Pass section knowledge check quizzes"
    ],
    requirements: ["Basic computer literacy and programming setup"],
    sections: [
      {
        id: `sec-ext-${i}`,
        title: `Section 1: Fundamentals of ${t.name}`,
        lessons: [
          { id: `les-ext-${i}-1`, title: `1. Introduction to ${t.name}`, duration: "15:00", youtubeId: "Tn6-PIqc4UM", order: 1 },
          { id: `les-ext-${i}-2`, title: `2. Architecture & Configuration`, duration: "20:00", youtubeId: "9YkUCRhBz6k", order: 2 }
        ],
        quiz: [
          {
            id: `q-ext-${i}`,
            question: `What is a core benefit of mastering ${t.name}?`,
            options: ["High performance & industry demand", "No practice required", "Replaces HTML", "Only works offline"],
            correctAnswer: 0,
            explanation: `${t.name} delivers high performance and industry demand.`
          }
        ]
      }
    ],
    reviews: []
  });
});
