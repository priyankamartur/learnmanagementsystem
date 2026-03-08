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
}

export interface Course {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  thumbnail: string;
  instructor: string;
  instructorAvatar: string;
  category: string;
  totalLessons: number;
  totalDuration: string;
  price: number;
  originalPrice?: number;
  sections: Section[];
  learningPoints: string[];
}

export const courses: Course[] = [
  {
    id: "react-complete",
    title: "The Complete React Developer Course",
    description: "Master React from scratch – hooks, state, routing, and real-world projects.",
    longDescription: "This comprehensive course covers everything you need to become a professional React developer. From the fundamentals of JSX and components to advanced patterns like custom hooks, context API, and performance optimization. Build real-world projects that you can add to your portfolio.",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=340&fit=crop",
    instructor: "Sarah Chen",
    instructorAvatar: "https://i.pravatar.cc/150?img=1",
    category: "Web Development",
    totalLessons: 8,
    totalDuration: "4h 30m",
    price: 49.99,
    originalPrice: 89.99,
    learningPoints: [
      "Build powerful, fast, user-friendly and reactive web apps",
      "Apply for high-paid jobs or work as a freelancer",
      "Understand the theory behind React and its core concepts",
      "Learn Hooks, Redux, React Router, and Next.js",
    ],
    sections: [
      {
        id: "react-basics",
        title: "React Fundamentals",
        lessons: [
          { id: "r1", title: "Introduction to React", duration: "12:30", youtubeId: "Tn6-PIqc4UM", order: 1 },
          { id: "r2", title: "JSX & Components", duration: "18:45", youtubeId: "9YkUCRhBz6k", order: 2 },
          { id: "r3", title: "Props & State", duration: "22:10", youtubeId: "IYvD9oBCuJI", order: 3 },
        ],
      },
      {
        id: "react-hooks",
        title: "React Hooks Deep Dive",
        lessons: [
          { id: "r4", title: "useState & useEffect", duration: "25:00", youtubeId: "O6P86uwfdR0", order: 4 },
          { id: "r5", title: "useContext & useReducer", duration: "20:15", youtubeId: "5LrDIWkK_Bc", order: 5 },
          { id: "r6", title: "Custom Hooks", duration: "15:30", youtubeId: "J-g9ZJha8FE", order: 6 },
        ],
      },
      {
        id: "react-advanced",
        title: "Advanced Patterns",
        lessons: [
          { id: "r7", title: "Performance Optimization", duration: "28:00", youtubeId: "CaShN564gMY", order: 7 },
          { id: "r8", title: "React Router & Navigation", duration: "19:45", youtubeId: "Ul3y1LXxzdU", order: 8 },
        ],
      },
    ],
  },
  {
    id: "python-ml",
    title: "Python for Machine Learning",
    description: "Learn Python and apply it to machine learning with hands-on projects.",
    longDescription: "Dive into the world of machine learning using Python. This course covers NumPy, Pandas, Matplotlib, Scikit-learn, and TensorFlow. By the end, you'll be able to build, train, and deploy ML models for real-world applications.",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=340&fit=crop",
    instructor: "Alex Rivera",
    instructorAvatar: "https://i.pravatar.cc/150?img=3",
    category: "Data Science",
    totalLessons: 6,
    totalDuration: "3h 15m",
    learningPoints: [
      "Understand core ML algorithms and when to use them",
      "Work with NumPy, Pandas, and Scikit-learn",
      "Build and evaluate machine learning models",
      "Deploy ML models to production",
    ],
    sections: [
      {
        id: "py-basics",
        title: "Python Essentials",
        lessons: [
          { id: "p1", title: "Python Crash Course", duration: "20:00", youtubeId: "JJmcL1N2KQs", order: 1 },
          { id: "p2", title: "NumPy & Pandas", duration: "25:00", youtubeId: "QUT1VHiLmmI", order: 2 },
          { id: "p3", title: "Data Visualization", duration: "18:00", youtubeId: "UO98lJQ3QGI", order: 3 },
        ],
      },
      {
        id: "py-ml",
        title: "Machine Learning",
        lessons: [
          { id: "p4", title: "Intro to ML", duration: "30:00", youtubeId: "ukzFI9rgwfU", order: 4 },
          { id: "p5", title: "Regression Models", duration: "22:00", youtubeId: "nk2CQITm_eo", order: 5 },
          { id: "p6", title: "Classification", duration: "28:00", youtubeId: "pqNCD_5r0IU", order: 6 },
        ],
      },
    ],
  },
  {
    id: "java-masterclass",
    title: "Java Programming Masterclass",
    description: "Complete Java course from basics to advanced OOP and enterprise patterns.",
    longDescription: "Whether you're new to programming or looking to deepen your Java skills, this masterclass covers it all. Learn variables, control flow, OOP, collections, generics, lambda expressions, and build enterprise-grade applications.",
    thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910auj7?w=600&h=340&fit=crop",
    instructor: "Marcus Johnson",
    instructorAvatar: "https://i.pravatar.cc/150?img=5",
    category: "Programming",
    totalLessons: 7,
    totalDuration: "5h 10m",
    learningPoints: [
      "Master Java fundamentals and OOP concepts",
      "Build real-world applications from scratch",
      "Understand collections, generics, and streams",
      "Learn design patterns and best practices",
    ],
    sections: [
      {
        id: "java-basics",
        title: "Java Basics",
        lessons: [
          { id: "j1", title: "Variables & Data Types", duration: "15:00", youtubeId: "eIrMbAQSU34", order: 1 },
          { id: "j2", title: "Control Flow", duration: "20:00", youtubeId: "ldYLYRNaucM", order: 2 },
          { id: "j3", title: "Methods & Functions", duration: "18:30", youtubeId: "vN3NJqN7f9Q", order: 3 },
        ],
      },
      {
        id: "java-oop",
        title: "Object-Oriented Programming",
        lessons: [
          { id: "j4", title: "Classes & Objects", duration: "25:00", youtubeId: "IUqKuGNasdM", order: 4 },
          { id: "j5", title: "Inheritance & Polymorphism", duration: "22:00", youtubeId: "Zs342ePFvRI", order: 5 },
          { id: "j6", title: "Interfaces & Abstract Classes", duration: "20:00", youtubeId: "rgHZa7-Dibg", order: 6 },
          { id: "j7", title: "Collections Framework", duration: "30:00", youtubeId: "viTainvCITk", order: 7 },
        ],
      },
    ],
  },
  {
    id: "js-dsa",
    title: "Data Structures & Algorithms in JS",
    description: "Crack coding interviews with solid DSA fundamentals in JavaScript.",
    thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&h=340&fit=crop",
    instructor: "Priya Sharma",
    instructorAvatar: "https://i.pravatar.cc/150?img=9",
    category: "Computer Science",
    totalLessons: 6,
    totalDuration: "3h 45m",
    learningPoints: [
      "Understand Big-O notation and complexity analysis",
      "Implement arrays, linked lists, trees, and graphs",
      "Solve real coding interview problems",
      "Master sorting and searching algorithms",
    ],
    longDescription: "Prepare for technical interviews with this comprehensive DSA course. Learn the most important data structures and algorithms implemented in JavaScript, with step-by-step explanations and whiteboard solutions.",
    sections: [
      {
        id: "dsa-basics",
        title: "Foundations",
        lessons: [
          { id: "d1", title: "Big-O Notation", duration: "16:00", youtubeId: "Mo4vesaut8g", order: 1 },
          { id: "d2", title: "Arrays & Strings", duration: "22:00", youtubeId: "TWRhGqbma1M", order: 2 },
          { id: "d3", title: "Linked Lists", duration: "25:00", youtubeId: "ZBdE8DElQQU", order: 3 },
        ],
      },
      {
        id: "dsa-advanced",
        title: "Advanced Structures",
        lessons: [
          { id: "d4", title: "Trees & BST", duration: "28:00", youtubeId: "fAAZixBzIAI", order: 4 },
          { id: "d5", title: "Graphs & BFS/DFS", duration: "30:00", youtubeId: "tWVWeAqZ0WU", order: 5 },
          { id: "d6", title: "Dynamic Programming", duration: "35:00", youtubeId: "oBt53YbR9Kk", order: 6 },
        ],
      },
    ],
  },
];
