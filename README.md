# 🎰 Take – A MERN Stack Betting Web App

**Take** is a fully functional betting platform inspired by [Stake.com](https://stake.com), built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)**. It allows users to sign in via Google, join chat groups, place bets, and more. The app uses **Fetch API** for communication between frontend and backend.

---

## 📦 Features

- 🎰 Betting Interface – Inspired by Stake.com, users can place bets and view outcomes.
- 🔐 Google OAuth Login – Secure user authentication via Google.
- 💰 Points System – Users bet and earn or lose points based on outcomes.
- 📊 Game Variety – Supports multiple types of betting games (can be extended).
- 🧾 Persistent Data – All user, bet, and transaction data is stored in MongoDB.
- ⚙️ Backend API – RESTful API using Express and Mongoose for all server-side operations.
- 🌐 Frontend-Backend Integration – Communicates using the Fetch API.
- 🚀 Fully Functional MERN Stack App – Ready for local use or deployment.
  
---

## 🛠️ Technologies Used

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Authentication:** Google OAuth 2.0, JWT, Express-Session

---

## ⚙️ Environment Setup

### 🔒 Backend `.env` file

Create a file named `.env` inside the `backend` directory with the following variables:

```
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret
MONGO_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback
```

### 🌐 Frontend `.env` file (Optional)

Create a `.env` file in the `frontend` directory with:

```
url=http://localhost:5000
```

> 🔁 If deploying, replace all instances of `http://localhost:5173` or `http://localhost:3000` with your production domain URL in both frontend and backend.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Rohan-Lohiya/Take.git
```

### 2. Install dependencies

Install backend dependencies:

```bash
cd backend
npm install
```

Install frontend dependencies:

```bash
cd ../frontend
npm install
```

### 3. Start the app

Start backend server with **nodemon**:

```bash
cd backend
nodemon server.js
```

Start frontend with Vite:

```bash
cd ../frontend
npm run dev
```

---

## 🧪 Testing
- Go to http://localhost:5173
- Sign in using your Google account
- Place demo bets (no real money involved)
- Track your points and betting outcomes
- Navigate through a fully functional betting interface

---

## 🌍 Deployment Notes

When deploying:

1. Set production `.env` files for both backend and frontend.
2. Replace all `localhost` URLs with your actual domain.
3. Update Google Cloud Console's **OAuth consent screen** and **Authorized Redirect URIs** to match your deployed domain.

---

## 📁 Project Structure

```
root/
├── backend/
│   ├── controller/
│   ├── model/
│   ├── dbconnection/
│   ├── .env
│   └── server.js
├── frontend/
│   ├── src/
│   ├── .env
│   └── ...
└── README.md
```

---

**Rohan Lohiya**  
IIIT Guwahati  

---
