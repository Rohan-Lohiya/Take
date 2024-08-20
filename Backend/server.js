const express = require('express');
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const session = require("express-session");
const MongoStore = require('connect-mongo'); // Add this for MongoDB session store
const dotenv = require("dotenv");
const { router: authRouter, passport } = require('./controller/auth');
const { router: minerout } = require('./controller/minesrouting');
const { router: dicerout } = require('./controller/dicerouting');
const userdb = require("./model/userSchema");
const authenticateToken = require('./controller/authMiddleware');
const connectToDatabase = require("./dbconnection/database");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

const port = process.env.PORT || 3000;

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE",
  credentials: true
};
app.use(cors(corsOptions));

// Session configuration with MongoDB session store

app.use(session({
  secret: process.env.SESSION_SECRET || 'your-session-secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: { secure: process.env.NODE_ENV === 'production' } // Ensure cookies are secure in production
}));
app.use((req, res, next) => {
  console.log("Session Store Debugging:", req.session);
  next();
});
// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Main routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use("/auth", authRouter);
app.use("/takegames/mines", minerout);
app.use("/takegames/dice", dicerout);

// Example of a protected route
app.get('/api/balance', authenticateToken, async(req, res) => {
  try {
    const userId = req.user.googleID;
    console.log("Google ID:", userId);
    const user = await userdb.findOne({ googleID: userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ balance: user.balance });
  } catch (error) {
    console.error('Database Error:', error);
    return res.status(500).json({ message: 'Error accessing the database.' });
  }
});

// Connect to database and start server
connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}).catch(error => {
  console.error("Failed to connect to the database:", error);
});
