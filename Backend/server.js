const express = require('express');
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const dotenv = require("dotenv");
const { router: authRouter, passport } = require('./controller/auth');
const { router: minerout } = require('./controller/minesrouting');
const { router: dicerout } = require('./controller/dicerouting');
const userdb = require("./model/userSchema");
const authenticateToken = require('./controller/authMiddleware');
const connectToDatabase = require("./dbconnection/database");

dotenv.config();
app.set('trust proxy', 1);  // Trust reverse proxy (e.g., Vercel)

const port = process.env.PORT || 3000;

const corsOptions = {
  origin: "https://take-money-app.vercel.app",
  methods: "GET, POST, PUT, DELETE",
  credentials: true
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration with MongoDB session store
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-session-secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
}));

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use("/auth", authRouter);
app.use("/takegames/mines", minerout);
app.use("/takegames/dice", dicerout);

// Protected route
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
