# Tariku Meseret 
— Advanced Developer Portfolio v2.0

> **Elevated from a basic static HTML/CSS file into a production-grade, state-of-the-art Web Application** built with **TypeScript**, **React 18**, **Tailwind CSS**, and **Vite**.

---

## ⚡ What Makes This Version Next-Gen & Advanced

### 1. Modern Technology Stack & Language Migration
- **Language**: Upgraded from raw JS to strict **TypeScript** (`.ts`, `.tsx`), delivering static type safety, autocompletion, and maintainability.
- **Framework**: Scalable **React 18** component architecture with custom hooks, reactive state, and modular separation of concerns.
- **Styling**: **Tailwind CSS** + Custom CSS variables, responsive viewport clamps, and glassmorphic blur filters.
- **Build Tool**: **Vite 6** with lightning-fast HMR (<350ms boot times) and production bundle optimization.

### 2. Interactive Features & Cybernetics
- **Interactive 60 FPS Particle Canvas (`ParticleCanvas.tsx`)**:
  - Hardware-accelerated HTML5 Canvas particle mesh that connects dynamic network nodes.
  - Interactive cursor repulsion and click shockwave ripple dynamics.
  - Automatically re-tints to match the active accent theme.
- **In-Browser Interactive Code Runner (`InteractiveCodeRunner.tsx`)**:
  - Live executable TypeScript developer card in the Hero section.
  - Visitors can edit parameters, toggle status, click **"Run"**, and see realistic simulated console output with celebration confetti.
- **Interactive Developer Terminal HUD (`TerminalModal.tsx`)**:
  - Press `Ctrl + K` or click **CLI** to launch an interactive command-line interface.
  - Available commands: `help`, `about`, `skills`, `projects`, `view <id>`, `contact`, `theme <color>`, `sound <on|off>`, `vcard`, `sudo hire`, `clear`, `exit`.
- **Procedural Web Audio Synthesizer (`audio.ts`)**:
  - Custom Web Audio API sound generator delivering subtle sci-fi clicks, hover blips, and execution fanfares with zero external MP3 assets. Includes a mute toggle.
- **Dynamic Accent Color Switcher**:
  - Switch on the fly between **Crimson Nova**, **Cyber Cyan**, **Matrix Emerald**, **Electric Violet**, and **Solar Amber**.
  - Dynamically updates ambient glows, borders, buttons, and canvas particles.
- **Live Addis Ababa Time & Status Tracker**:
  - Real-time live UTC+3 clock for Addis Ababa, Ethiopia, accompanied by a pulsing availability beacon.
- **Deep-Dive System Architecture Modals (`ProjectDetailsModal.tsx`)**:
  - Inspect full architectural specs for **PharmaJiji**, **AutoDrive**, **Media Works**, and **DevPulse**.
  - Explores database schemas (InnoDB), REST API contracts (`GET`, `POST`, `PATCH`), latency benchmarks, and concurrency design.
- **Interactive Skills Matrix (`SkillCodeModal.tsx`)**:
  - Categorized into Backend, Frontend, Database, DevOps, and Architecture.
  - Click any skill to view production-grade code patterns (e.g. Laravel Service Pattern, Vue 3 Composables, SQL index plans) and engineering rationales.
- **Recruiter Contact Suite (`ContactSection.tsx`)**:
  - One-click **Copy Email** with animated toast feedback.
  - One-click **Download vCard (.vcf)** to save Tariku's contact profile directly to a phone or computer.
  - Direct message form with client validation, character counter, and instant `mailto:` dispatch.

---

## 🚀 Quick Start Guide

### Development Mode (Local Live Server)
From the project root:
```bash
npm run dev
```
Or inside `tare-portfolio/`:
```bash
cd tare-portfolio
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
```
The compiled output is generated in `tare-portfolio/dist/`.

### Preview Production Build
```bash
npm run preview
```

---

## 📁 Project Architecture

```
tare-portfolio/
├── dist/                          # Production-ready static output
├── public/
│   └── assets/
│       └── profile-placeholder.svg # Profile photo slot
├── src/
│   ├── components/
│   │   ├── about/
│   │   │   └── AboutSection.tsx    # Bio, engineering philosophy & milestones
│   │   ├── background/
│   │   │   └── ParticleCanvas.tsx  # 60 FPS interactive particle constellation
│   │   ├── contact/
│   │   │   ├── ContactSection.tsx  # Contact suite, vCard download & form
│   │   │   └── Toast.tsx           # Floating toast notification system
│   │   ├── hero/
│   │   │   ├── Hero.tsx            # Main hero banner with profile badge & ticker
│   │   │   └── InteractiveCodeRunner.tsx # Live editable code playground
│   │   ├── icons/
│   │   │   └── SocialIcons.tsx     # Custom vector icons (GitHub, LinkedIn, Facebook)
│   │   ├── layout/
│   │   │   ├── Header.tsx          # Addis Ababa clock, theme picker, sound toggle
│   │   │   └── Footer.tsx          # System shortcuts & copyright
│   │   ├── projects/
│   │   │   ├── ProjectsSection.tsx # Filterable search and project showcase
│   │   │   └── ProjectDetailsModal.tsx # System design & database schema viewer
│   │   ├── skills/
│   │   │   ├── SkillsSection.tsx   # Skill cards with proficiency meters
│   │   │   └── SkillCodeModal.tsx  # Real-world code pattern viewer
│   │   └── terminal/
│   │       └── TerminalModal.tsx   # Ctrl+K Interactive Command Palette
│   ├── data/
│   │   ├── projectsData.ts         # Full project architecture & endpoint specs
│   │   └── skillsData.ts           # Skills list, categories & code snippets
│   ├── types/
│   │   └── index.ts                # TypeScript strict interfaces & type definitions
│   ├── utils/
│   │   ├── audio.ts                # Web Audio API sound engine
│   │   └── vcard.ts                # Digital contact card generator (.vcf)
│   ├── App.tsx                     # Top-level composition & state
│   ├── index.css                   # Tailwind + custom cyber-aesthetic layers
│   └── main.tsx                    # React application DOM entry
├── index.html                      # Root HTML with Google Fonts & metadata
├── package.json                    # Dependencies & build scripts
├── postcss.config.js               # PostCSS setup
├── tailwind.config.js              # Tailwind tokens & animations
├── tsconfig.json                   # TypeScript compiler options
└── vite.config.ts                  # Vite bundler configuration
```

---

## 🎨 Customization

1. **Replace Profile Photo**:
   Replace `tare-portfolio/public/assets/profile-placeholder.svg` with your photo (e.g. `profile.jpg`), or update the `src` attribute in `src/components/hero/Hero.tsx`.
2. **Update Contact Info**:
   Edit `src/components/contact/ContactSection.tsx` and `src/utils/vcard.ts` with your preferred email, phone, and social URLs.
3. **Add New Projects**:
   Append new entries to `src/data/projectsData.ts` — the system automatically generates search tags, filters, and architecture tabs.

