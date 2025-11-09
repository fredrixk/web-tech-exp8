# Simple LMS (Node.js + React)

This repository is a starter scaffold for a simple Learning Management System (LMS):
- Backend: Node.js + Express + Mongoose (MongoDB Atlas)
- Frontend: React (Vite)

## Features included
- User register/login (JWT)
- Course CRUD (create/list/get)
- Lessons in courses
- Enrollment endpoint

## Local development

1. Backend
- Copy `backend/.env.example` to `backend/.env` and fill `MONGODB_URI` and `JWT_SECRET`.
- Install and run:

```powershell
cd backend; npm install; npm run dev
```

Server runs on port 4000 by default.

2. Frontend
- Set VITE_API_URL if backend not at default.

```powershell
cd frontend; npm install; npm run dev
```

Open the dev URL shown by vite.

## Deploying to Render + MongoDB Atlas

1. Push this repo to GitHub.
2. Create a MongoDB Atlas cluster and a database user. Copy the connection string.
3. On Render, create a new Web Service: connect to your GitHub repo and set the build/start commands for the backend:
   - Build command: `npm install`
   - Start command: `npm start`
   - Set environment variables on Render: `MONGODB_URI`, `JWT_SECRET`, `PORT` (optional)
4. For the frontend, create a separate Web Service (Static Site) or a Node service using `npm install` and `npm run build`, then serve `dist` (Vite builds to `dist`).

## Notes
- This scaffold focuses on core concepts and is intentionally minimal. Add input validation, rate-limiting, better error handling, role checks, and tests before production.
- See the individual package.json files in `backend` and `frontend` for scripts.
