# Hajj Guide – Next.js + MongoDB + Sessions

Interactive Hajj checklist with user auth and an admin dashboard that shows online users (based on recent activity) and basic user management.

## Tech
- Next.js (App Router)
- MongoDB (Mongoose)
- iron-session (cookie-based sessions)
- Tailwind CSS UI

## Features
- Register/Login (email + password)
- Checklist of Hajj steps with progress per user
- Heartbeat updates `lastSeen` every 30s
- Admin dashboard:
  - See all users + who is **online** (lastSeen within 2 minutes)
  - Change user role (user/admin)
  - Delete user

## Quick start

```bash
# 1) Install deps
npm install

# 2) Configure env
cp .env.example .env.local
# edit .env.local values (MONGODB_URI, SESSION_PASSWORD)

# 3) Run dev
npm run dev
```

Default pages:
- `/register` – create account
- `/login` – sign in
- `/dashboard` – progress tracker (protected)
- `/guide` – read-only guide
- `/admin` – admin panel (must set your account role to admin in the DB or via another admin)

## Notes
- "Online" status is computed as `now - lastSeen < 2 minutes`. The dashboard and step updates call a heartbeat to keep you marked online.
- For production, set a strong `SESSION_PASSWORD` and use HTTPS.
