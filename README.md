# 🎰 Take – A MERN Stack Betting Web App

**Take** is a fully functional betting platform inspired by [Stake.com](https://stake.com), built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)**. It allows users to sign in via Google, join chat groups, place bets, and more. The app uses **Fetch API** for communication between frontend and backend and includes **socket.io** for real-time interactions.

---

## 📦 Features

- 🔐 Google OAuth login
- 💬 Real-time group chat (socket.io)
- 📈 Live betting interface
- 🧑‍🤝‍🧑 Group creation, member management, admin control
- 🧾 Persistent chat data via MongoDB
- ⚙️ Role-based access (Admin vs Member)
- ⚡ Fully functional MERN app ready for deployment

---

## 🛠️ Technologies Used

- **Frontend:** React.js, TailwindCSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Authentication:** Google OAuth 2.0, JWT, Express-Session
- **Real-Time:** Socket.io

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

> 🔁 If deploying, replace all instances of `http://localhost:5000` or `http://localhost:3000` with your production domain URL in both frontend and backend.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/take-betting-app.git
cd take-betting-app
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

- Go to `http://localhost:3000`
- Sign in using Google
- Create or join a group
- Add members, promote admins, and chat live
- Place demo bets (this is just a UI/logic simulation; no real money)

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
│   ├── socket/
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

## ✍️ Author

**Rohan Lohiya**  
IIIT Guwahati  
Open to collaboration and feedback!

---

## 📄 License

This project is licensed under the MIT License.