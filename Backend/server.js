// server.js

const express = require('express');
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const connectToDatabase = require("./dbconnection/database");
const session = require("express-session");
const { router: authRouter, passport } = require('./controller/auth');  // Importing the auth router and passport
const dotenv = require("dotenv");
const { router: minerout } = require('./controller/minesrouting'); 
const { router: dicerout } = require('./controller/dicerouting'); 
const userdb = require("./model/userSchema");
const authenticateToken = require('./controller/authMiddleware');
const MongoStore = require("connect-mongo"); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

const port = 3000;

app.use(cors({
  origin: "https://take-e3k2.vercel.app", // No trailing slash
  methods: "GET, POST, PUT, DELETE",
  credentials: true
}));

app.use(session({
  secret: "your-secret-key",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: {
    httpOnly: true,
    secure: true,  // Make sure this is true in production for HTTPS
    sameSite: 'None',  // Allow cross-site cookies
    maxAge: 24 * 60 * 60 * 1000  // 1 day
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// Main routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Use the auth router for all routes starting with /auth
app.use("/auth", authRouter);
app.use("/takegames/mines", minerout);
app.use("/takegames/dice", dicerout);

app.get('/api/balance', authenticateToken, async(req, res) => {
  // Fetch the user's balance from the database
  try {
    const userId = req.user.googleID; // Retrieve the user ID from the authenticated request
    console.log("this is googlei",userId);
    const user = await userdb.findOne({ googleID: userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Send the user's balance
    res.json({ balance: user.balance });
  } catch (error) {
    console.error('Database Error:', error);
    return res.status(500).json({ message: 'Error accessing the database.' });
  }
});

connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}).catch(error => {
  console.error("Failed to connect to the database:", error);
});
