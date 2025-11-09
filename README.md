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
3. Single web service option (recommended): deploy the entire repository as one web service that serves the API and the built frontend from the same origin.

   - In Render or another host, set the repo to deploy from the `main` branch.
   - Use these commands on Render (or in the service settings):

     Build command:

     ```powershell
     npm install
     npm run build
     cd backend; npm install
     ```

     Start command:

     ```powershell
     npm start
     ```

   - Environment variables to set on the host: `MONGODB_URI`, `JWT_SECRET`, and `PORT` (optional).

   The backend is configured to serve the frontend build from `frontend/dist` when present. The root `package.json` contains helper scripts (`install-all`, `build`, `start`) to make local and CI usage easier.

4. If you prefer separate services: create a Render Web Service for the backend and a Static Site for the frontend as described earlier.

## Notes
- This scaffold focuses on core concepts and is intentionally minimal. Add input validation, rate-limiting, better error handling, role checks, and tests before production.
- See the individual package.json files in `backend` and `frontend` for scripts.
