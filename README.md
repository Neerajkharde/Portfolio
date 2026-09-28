# Neeraj Kharde — Personal Portfolio 

A modern, high-performance, dark-themed personal portfolio showcasing software engineering projects, backend microservices, and system architecture.

Built with **React 18**, **Vite**, **Framer Motion**, and **Vanilla CSS**, featuring 3D tilt micro-interactions, smooth tabbed subsection navigation, ambient glassmorphism, and interactive architecture lightboxes.

---

## 🚀 Key Sections & Architecture

### 1. **Hero Section** (`Hero.jsx`)
- Sleek dark-mode landing header with active status indicator pill ("Available for Opportunities").
- Minimalist typography with gradient accents and quick action CTAs ("Explore Work", "Download CV").
- Profile card with glassmorphism glow and social quick links (GitHub, LinkedIn, Email).

### 2. **About Me** (`About.jsx`)
- Academic background: Computer Engineering student at **PICT** (9.88 CGPA).
- Core Engineering Traits grid: Problem Solver (500+ DSA problems), Backend Developer, System Designer, and Builder.

### 3. **Tech Stack & Capabilities** (`Stack.jsx`)
- Interactive 4-card grid featuring **3D tilt cursor-tracking Spotlight** effects.
- Categorized skills:
  - **Core Languages**: Java, C++, Go, JavaScript, SQL
  - **Backend & Frameworks**: Spring Boot, REST APIs, Microservices, gRPC, Node.js
  - **Databases & Caching**: PostgreSQL, Redis, Apache Ignite, MySQL
  - **DevOps & Infrastructure**: Docker, Git, Linux, Spring Security, JWT, Actuator

### 4. **Featured Projects** (`Projects.jsx`)
- **Horizontal Tab Subsection Navigation**: Gliding active pill indicator (`layoutId="activeProjectPill"`) and step counter with arrow controls.
- **Circular Emblem Avatars**: Custom 60px × 60px circular logo/photo ring for each project with 3D hover zoom and accent glow.
- **Projects Showcase**:
  1. **MaintenOps**: Java Full Stack / Spring Boot maintenance management platform for ISKCON NVCC handling 100+ monthly requests with image-based reporting, multi-stage approvals, and JWT RBAC. Includes source code link and [Live Demo](https://mainten-ops.vercel.app/).
  2. **Liquidity Service Manager**: Distributed Spring Boot POC developed during Mastercard internship enabling same-day (T+0) fund settlement via gRPC & Apache Ignite (meeting 5ms–120ms SLA, 10K peak TPS, 99.999% availability). Features an interactive **System Architecture Lightbox Modal**.
  3. **RateGuard**: Distributed Sliding Window Rate Limiter using Java Spring Boot & Redis with atomic Lua scripting and Sorted Sets to prevent race conditions and enforce HTTP 429 throttling.

### 5. **Experience & Education** (`Experience.jsx`)
- Timeline highlighting professional software engineering internships, technical leadership, and academic accomplishments.


---

## 🛠️ Tech Stack & Dependencies

- **Frontend Library**: React 18
- **Build Tool & Dev Server**: Vite
- **Animations**: Framer Motion (`AnimatePresence`, `layoutId`, spring physics)
- **Icons**: React Icons (`fi`)
- **Styling**: Modular Vanilla CSS with custom CSS variables & Glassmorphism

---

## 📄 Author

Designed & Developed by **Neeraj Kharde**
