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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

const port = 3000;

app.use(cors({
  origin: "http://localhost:5173", // Remove the trailing slash
  methods: "GET, POST, PUT, DELETE",
  credentials: true
}));

app.use(session({
  secret: "12345gcvmjhfvcvbb",
  resave: false,
  saveUninitialized: true
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