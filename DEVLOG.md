# My First Application - Dev Log

## Session 1 — 2026-04-09

### What We Built
A full stack web app with login functionality and a welcome home page, built from scratch.

---

### Tech Stack

| Layer | Tool | Hosted On |
|-------|------|-----------|
| Frontend | React + Vite | Vercel |
| Backend | Node.js + Express | Render (free tier) |
| Database | Supabase (PostgreSQL) | Mumbai (ap-south-1) |
| Auth | bcryptjs + jsonwebtoken | — |

---

### Step-by-Step What We Did

#### 1. Setup
- Checked Node.js (v24.14.1) and npm (v11.11.0) were installed
- Fixed PowerShell execution policy: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
- Created project folder: `my-first-application/` with `frontend/` and `backend/` subfolders

#### 2. Frontend Setup
- Created React app using Vite: `npm create vite@latest . -- --template react`
- Installed packages: `npm install react-router-dom axios`
  - `react-router-dom` — navigate between pages
  - `axios` — make HTTP requests to backend
- Replaced default Vite files with our own:
  - `App.jsx` — routing between Login and Home pages
  - `src/pages/Login.jsx` — login form
  - `src/pages/Home.jsx` — welcome page after login
- Cleaned up unused Vite default files (assets, CSS)

#### 3. Supabase (Database) Setup
- Created free Supabase account at supabase.com
- Created project "shrutitotla's Project" in Mumbai region
- Created `users` table via SQL Editor:
```sql
CREATE TABLE users (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  created_at timestamp DEFAULT now()
);
```

#### 4. Backend Setup
- Initialized: `npm init -y`
- Installed packages: `npm install express cors dotenv bcryptjs jsonwebtoken @supabase/supabase-js`
  - `express` — web server
  - `cors` — allow frontend to talk to backend
  - `dotenv` — load secret keys from .env file
  - `bcryptjs` — hash passwords securely
  - `jsonwebtoken` — create login tokens (JWT)
  - `@supabase/supabase-js` — connect to Supabase database
- Created `.env` file with Supabase URL, anon key, JWT secret, port
- Created `server.js` — main server file
- Created `routes/auth.js` — register and login routes

#### 5. Testing Locally
- Ran backend: `node server.js` → "Server running on port 3000"
- Ran frontend: `npm run dev` → `http://localhost:5173/`
- Registered test user via PowerShell:
```powershell
$body = '{"email":"shruti@test.com","password":"password123"}'
Invoke-WebRequest -Uri "http://localhost:3000/api/auth/register" -Method POST -Headers @{"Content-Type"="application/json"} -Body $body
```
- Logged in successfully through browser → "Welcome Shruti!" page appeared

#### 6. Deployment
- Pushed code to GitHub: `github.com/shrutitotla/My-first-application`
- Deployed backend to Render:
  - Root Directory: `backend`
  - Build Command: `npm install`
  - Start Command: `node server.js`
  - Added environment variables manually (same as .env)
  - Backend URL: `https://my-first-application-ygu0.onrender.com`
- Updated `Login.jsx` to use Render URL instead of localhost
- Deployed frontend to Vercel:
  - Connected GitHub repo
  - Root Directory: `frontend`
  - Auto-deploys on every `git push`

---

### Issues We Hit & How We Fixed Them

| Issue | Fix |
|-------|-----|
| PowerShell blocked npm | `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser` |
| Packages installed in wrong folder | `npm uninstall` from root, reinstall in `frontend/` |
| App.jsx imports on one line | Manually fixed whitespace in VS Code |
| Home.jsx empty after paste | Re-pasted code carefully |
| Vercel deploy failed (casing error) | Changed `Home` → `home` in imports, Linux is case-sensitive |
| Backend URL was localhost | Updated to Render URL in Login.jsx |
| No loading state on login button | Added `loading` state, button shows "Logging in..." |

---

### File Structure

```
my-first-application/
├── .gitignore
├── DEVLOG.md
├── frontend/
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx        ← routing
│       ├── App.css        ← empty (clean)
│       ├── main.jsx
│       ├── index.css      ← basic reset styles
│       └── pages/
│           ├── Login.jsx  ← login form
│           └── Home.jsx   ← welcome page
└── backend/
    ├── .gitignore         ← excludes .env and node_modules
    ├── .env               ← SECRET — never commit this
    ├── package.json
    ├── server.js          ← main Express server
    └── routes/
        └── auth.js        ← /register and /login endpoints
```

---

### Key Concepts Learned

- **git add / commit / push** — pack, label, send code to GitHub
- **.env file** — stores secret keys locally, never pushed to GitHub
- **localhost vs production** — localhost only works on your machine
- **Continuous Deployment** — Vercel auto-deploys every time you push to GitHub
- **JWT (JSON Web Token)** — a token given after login to prove who you are
- **bcrypt** — hashes passwords so they're never stored as plain text
- **CORS** — allows frontend and backend on different URLs to talk to each other
- **Render free tier** — sleeps after 15 min inactivity, first request takes ~60 seconds to wake up

---

### Next Features to Build
- [ ] Signup page (register from browser)
- [ ] Logout button
- [ ] Protected routes (redirect to login if not authenticated)
- [ ] Better UI/styling
- [ ] Profile page
