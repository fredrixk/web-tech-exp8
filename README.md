# LMS Project

A Learning Management System with MongoDB Atlas, React frontend, and Express backend, deployed as a single service.

## Local Development

1. Install dependencies:
```powershell
# Install server dependencies
cd lms-server
npm install

# Install client dependencies
cd ../lms-client
npm install
```

2. Set up environment:
- Copy `.env.example` to `.env` in `lms-server` directory
- Configure MongoDB Atlas URI and JWT secret

3. Start development servers:
```powershell
# Terminal 1 - Start backend
cd lms-server
npm run dev

# Terminal 2 - Start frontend
cd lms-client
npm start
```

## Production Deployment (e.g., Render)

1. MongoDB Atlas Setup:
   - Create a cluster
   - Get your connection string
   - Add your IP to allowlist (or 0.0.0.0/0 for all)

2. Deploy as Web Service:
   - Create a new Web Service on Render
   - Connect your repository
   - Set Root Directory: `lms-server`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Add Environment Variables:
     - `MONGO_URI`: Your MongoDB Atlas URI
     - `JWT_SECRET`: Your secret key
     - `NODE_ENV`: "production"

The backend will serve both the API and the React frontend automatically.

## Features

- User authentication (register/login)
- Course listing and details
- Role-based access (student/instructor/admin)
- MongoDB Atlas integration
- JWT-based authentication
