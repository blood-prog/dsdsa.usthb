# Algø — Interactive Algorithms & Data Structures I Track

A playful, interactive study platform designed to help university students master the fundamentals of **Algorithms & Data Structures I (Algo 1)** through hands-on lessons, live visualizers, checkpoints, and exam challenges.

---

## 🌟 Highlights & Features

- **8 Core Chapters & 26 In-Depth Lessons**:
  - **Ch 01**: Algorithmic Blueprint, Donald Knuth's 5 Properties & Memory Swaps
  - **Ch 02**: Conditionals, Truth Tables & Decision Branching
  - **Ch 03**: Iteration Mechanics, Loop Invariants & Off-by-One Traps
  - **Ch 04**: 1D Arrays, Strings & Suffix Scans
  - **Ch 05**: 2D Matrices, Diagonals & Symmetries
  - **Ch 06**: Sorting Foundations (Selection Sort & Bubble Sort) & Binary Search
  - **Ch 07**: Modular Functions, Procedures & Call Stack Lifetimes
  - **Ch 08**: Tutorial Sheets 1 & 2 Problem Vault (Armstrong numbers, leaders, array rotations)

- **Interactive Visualizer Studio**:
  - Step-by-step Selection Sort and Bubble Sort with comparing, minimum, swapping, and sorted state highlights.
  - Dichotomic Binary Search with left, right, and mid pointer tracking on logarithmic intervals.

- **50-Question Master Certification Quiz**:
  - Covers all 5 weeks and tutorial sheets with immediate feedback, rationale explanations, and category filters.

- **5 Real Exam-Level Coding Challenges**:
  - Equilibrium Index in `O(N)`
  - Array Leaders (`O(N)` suffix maximum)
  - Three-Reversal Circular Array Rotation in `O(1)` space
  - Degenerate Quadratic Solver handling `a = 0`
  - Matrix Saddle Point (Point-Selle) Detection

- **Interactive 3D Felt Monster Companion ("Byte")**:
  - Real-time 3D Three.js companion loaded directly from `felt_monster_avatar.glb` with offline base64 fallback.
  - Draggable anywhere on screen, reacts to correct and incorrect answers, flips on click, and speaks over 140 algorithmic tips.

- **100% Client-Side & Frictionless**:
  - No accounts or signups required.
  - Progress (lessons mastered, quiz answers, scores) is preserved locally in `localStorage`.
  - Includes a quick reset option anytime.

- **Modern 21st.dev & Motiq Design System**:
  - Motiq-inspired Border Beam panels with delta-time spring physics and twin-comet alpha masks.
  - Acertinity-style Moving Border perimeter spotlight.
  - Clean typographic hierarchy, generous positive whitespace, and distraction-free reading modes.

---

## 🚀 Quick Start (Local Development)

You can run the platform locally with any static HTTP server:

```bash
# Using Python
python -m http.server 3000

# Or using Node.js npx serve
npx serve .
```

Open `http://localhost:3000` in your web browser.

---

## 🌐 Live Platform & Deploy to Vercel

- **Live URL**: [https://dsdsa.usthb.vercel.com](https://dsdsa.usthb.vercel.com)
- **Repository**: [https://github.com/blood-prog/blood-prog](https://github.com/blood-prog/blood-prog) — ⭐ *Please star the repo if you find it helpful!*

This repository includes a production-ready `vercel.json` configuration for zero-config static deployment:

1. Push your repository to GitHub (`https://github.com/blood-prog/blood-prog`).
2. Go to [Vercel](https://vercel.com) and click **"New Project"**.
3. Import your GitHub repository.
4. Set domain to `dsdsa.usthb.vercel.com` (or your preferred custom domain).
5. Click **"Deploy"**. Your site will be live immediately with global CDN caching.

---

## 📜 Authorship & Course Context

Made by **[Ibrahim Benabida](https://github.com/blood-prog/blood-prog)**, student in USTHB, based on the course given by the teacher.
⭐ If this study guide helped you, please give it a star on [GitHub](https://github.com/blood-prog/blood-prog)!
