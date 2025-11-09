const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config();

const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const enrollRoutes = require('./routes/enroll');

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enroll', enrollRoutes);

// Helpful fallback at root when frontend build is missing
// This prevents a generic "Cannot GET /" and instructs the operator how to build the frontend.
const clientDist = path.join(__dirname, '../../frontend/dist');
app.get('/', (req, res) => {
  if (fs.existsSync(clientDist)) {
    return res.sendFile(path.join(clientDist, 'index.html'));
  }
  // Simple informative HTML while frontend isn't built
  res.type('html').send(`
    <html>
      <head><title>Simple LMS</title></head>
      <body style="font-family:system-ui,Segoe UI,Roboto,Arial;margin:2rem;">
        <h1>Simple LMS API</h1>
        <p>The backend API is running, but the frontend build was not found at <code>frontend/dist</code>.</p>
        <p>To build the frontend locally, run (from the repository root):</p>
        <pre style="background:#f4f4f4;padding:8px;border-radius:4px">npm run build</pre>
        <p>Then restart the server. Alternatively, visit <code>/api/courses</code> to see the API.</p>
      </body>
    </html>
  `);
});

// Serve frontend build if it exists (enables single-web-service deployment)
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));

  // All other non-API requests return the frontend index.html
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) return next();
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

const PORT = process.env.PORT || 4000;

const startServer = () => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

// Try to connect to MongoDB, but don't exit if it fails — this allows serving the frontend
// build for QA/deploy even when the DB isn't available. API endpoints that require the DB
// will still fail until a connection is established.
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Connected to MongoDB');
      startServer();
    })
    .catch(err => {
      console.error('Mongo connection error', err.message);
      console.warn('Starting server without DB connection — API routes that need the DB may fail.');
      startServer();
    });
} else {
  console.warn('No MONGODB_URI configured — starting server without DB connection.');
  startServer();
}
