# Podium

A distraction-free space built to learn in public, write with focus, and read without noise.

---

## 🚀 Why I Built Podium?

I built Podium because I wanted a personal space to log my journey in development and document my learnings, while also applying the skills I had been picking up. At the same time, I noticed that many publishing platforms are cluttered or distracting, so I set out to solve that by building a distraction-free, markdown-enabled writing interface with a clean reading experience. On the technical side, it gave me the chance to apply what I’d learned in practice — designing a scalable backend with Cloudflare Workers, Hono, and Prisma, along with secure authentication and role-based access.

---

## 🛑 Problem Podium is Solving

- Writing platforms often introduce friction: heavy UIs, distracting chrome, and bloated pages.  
- Developers need a simple way to write in markdown and publish with a clean, focused reading experience.  
- Personal projects need real-world scaffolding to practice production patterns: scalable runtimes, typed APIs, secure auth, and a good DX.  

---

## ✅ Solution

- Distraction-free editor and a clean reading surface.  
- Fast, scalable backend on Cloudflare Workers using Hono.  
- Strongly typed data access with Prisma, plus role-based access control for safe publishing workflows.  
- Modern, lightweight frontend powered by React and TailwindCSS.  

---

## 🛠 Tech Stack

**Backend**

- Cloudflare Workers (Wrangler)  
- Hono (HTTP framework, TypeScript)  
- Prisma ORM (+ Accelerate)  
- PostgreSQL  
- esbuild

**Frontend**

- React (Typescript) + React Router
- Vite  
- Tailwind CSS  
- Axios  
- tsParticles (visuals)  

**Tooling**

- Wrangler (Cloudflare Workers CLI)
- TypeScript  
- ESLint (TypeScript + React)  
- Shared types/schemas with Zod (via @arcbit/podium-common)  

---

## ✨ Features

- Markdown editor for focused writing  
- Clean, distraction-free reading experience  
- Role-based access (author, admin)  
- Scalable, edge-first API with Hono on Cloudflare Workers  
- Type-safe data layer with Prisma  

---

## 📂 Monorepo Layout

- frontend/ → React app (Vite, Tailwind)
- backend/ → Cloudflare Worker API (Hono, Prisma)
- common/ → Shared types/schemas (Zod Validation)

---

## ⚡ Getting Started

### Prerequisites

- Node.js 18+  
- npm (suggested) or pnpm  
- PostgreSQL (local or managed)  
- Cloudflare account + Wrangler CLI  

### Clone the repository

- git clone https://github.com/your-username/podium.git
- cd podium

### Install dependencies

Using npm (recommended):

- cd backend && npm install
- cd ../frontend && npm install

### Environment Variables

Backend (.env or .jsonc(recommended)):

- DATABASE_URL=postgres://USER:PASS@HOST:PORT/DB
- JWT_SECRET=your-secret

Frontend (create a config.ts file or .env):

- export const BACKEND_URL="your backend url"

Tip: Do not commit secrets. Use Wrangler secrets for production.

### Database Setup

- cd backend
- npx prisma migrate dev
- npx prisma generate
- npx prisma studio (for database management)

### Run locally

Backend (http://localhost:8787):

- cd backend
- npm run dev

Frontend (http://localhost:5173):

- cd frontend
- npm run dev

### Build for production

Backend:

- cd backend
- npm run build

Frontend:

- cd frontend
- npm run build

---

## 📜 Scripts

**Backend**

- build : bundle with esbuild to dist/
- dev : run Worker locally (Wrangler)
- deploy : deploy Worker (minified)
- cf-typegen : generate Cloudflare type bindings

**Frontend**

- dev : Vite dev server
- build : TypeScript build then Vite build
- preview : preview production build
- lint : ESLint

---

## 🧩 API Overview (Hono)

Sample endpoints :

- GET `/posts` → list posts  
- GET `/posts/:id` → fetch a post  
- POST `/posts` → create (role-protected)  
- PUT `/posts/:id` → update (role-protected)  
- DELETE `/posts/:id` → delete (role-protected)  

Auth :

- role-based access via middleware. 
- JWT-based authentication for secure access.
  
Types:

- shared via `@arcbit/podium-common`.

---

## 🖥 Frontend Overview

- React 18 + React Router
- Axios for API calls to the Worker  
- Tailwind CSS for utility-first styling  
- tsParticles for subtle visuals  

---

## ⚙️ Configuration Notes

- Frontend: Tailwind wired via `@tailwindcss/vite` in `vite.config.ts`  
- Backend TS: ESNext target, JSX via Hono (`jsxImportSource: "hono/jsx"`)  
- Prisma provider: PostgreSQL (see `migration_lock.toml`)  

---

## Deployment 🚀

**Backend (Cloudflare Workers)**  

- Configure `wrangler.jsonc` (name, account_id, routes, bindings/secrets).  
- Deploy: `npx wrangler deploy`
- Monitor: `npx wrangler tail`

**Frontend (Vercel)**

- Build: `npm run build` (after cd frontend)
- Deploy the `dist/` directory.  
  
or

- goto vercel after uploading your code to GitHub and link your account. Select your repository there and deploy.

## 🤝 Contributing

1. Fork the repo  
2. Create a new branch (`git checkout -b feature-name`)  
3. Commit changes (`git commit -m "Add feature"`)  
4. Push to branch (`git push origin feature-name`)  
5. Open a PR  

---

## 🔒 Security

- Do not commit secrets  
- Use Wrangler secrets for production keys  
- Enforce least-privilege roles for protected endpoints  
- Review dependencies regularly  

---

## License

- MIT License

## Acknowledgements

- Thanks to the contributors of the open-source libraries used in this project.
  
- Inspired by the work of others in the community.

- Hono : lightweight edge framework

- Cloudflare Workers : serverless platform

- Prisma : type-safe database ORM

- Vite : next-generation frontend tooling

- Tailwind CSS : utility-first CSS framework

- tsParticles : lightweight particles.js library

- special thanks to all maintainers and contributors of the open-source libraries used in this project.