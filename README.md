# 🌐 Full-Stack Employee & Task Management System

This repository contains my **Full-Stack Web Application** built as part of the Employee & Task Management assignment.
It includes:

* A **React Frontend**
* A **Node.js + Express Backend**
* A **MongoDB Database**

Together, they form a complete system capable of managing employees, tasks, and CRUD operations through a fully integrated UI.

---

# 📁 Project Structure

```
/frontend
    Frontend/               → React application source code

/backend
    index.js                → Main server entry point
    config.json             → General app configuration
    controllers/            → Employee & Task business logic
    models/                 → Mongoose models
    routers/                → API route definitions
    middleware/             → Error handling, validation, etc.
    utilities.js            → Helper utility functions
    .env                    → Environment variables (MongoDB URI, PORT)
    package.json            → Dependencies & scripts
```

---

# 🚀 Full-Stack Overview

## **Frontend – React**

The frontend is built using **React** and provides:

* A clean UI to view, create, update, and delete employees & tasks
* API integration with the backend
* Component-based scalable architecture
* Responsive layout for smooth usage

---

## **Backend – Node.js + Express**

The backend is powered by **Express.js**, with:

* RESTful API endpoints
* Organized routes, controllers, and models
* MongoDB integration using **Mongoose**
* Middleware for validations & error handling
* Environment configurations through `.env`

---

## **Database – MongoDB**

MongoDB serves as the primary database for storing:

* Employee documents
* Task documents

The backend uses **Mongoose schemas** for validation and productivity.

---

# ▶️ Running the Project

## ✔️ 1. Clone the Repo

```bash
git clone https://github.com/4rnav-here/Notes-app-using-MERN-stack
```

---

# ⚙️ Backend Setup (Node + Express)

### 2. Go to backend directory

```bash
cd backend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Add `.env` file

Example:

```
MONGO_URI=mongodb+srv://...
PORT=5000
```

### 5. Start the backend server

```bash
npm start
```

Backend will run at:

```
http://localhost:5000
```

---

# 🎨 Frontend Setup (React)

### 1. Go to frontend folder

```bash
cd frontend/Frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

(or whichever port Vite chooses)

---

# 🧪 Features Implemented

### ✔ Fully integrated React + Express + MongoDB application

### ✔ CRUD operations for Employees and Tasks

### ✔ Clean MVC structure (models, controllers, routers)

### ✔ Mongoose-based schema validation

### ✔ Environment-based configuration

### ✔ Modular utilities & middleware

### ✔ Frontend consuming live backend APIs

---

# 😄 Fun Note: The Bun Saga 🍞

So… somewhere around **70% into the project**, I discovered **Bun** — the super-fast JS runtime that could have made my life dramatically easier.

Did I use it?
No.
Should I have?
Absolutely.
Will I pretend like I might switch to Bun someday?
Also yes.

If *you* want to spice up your life, you can run the backend with Bun like:

```bash
bun install
bun start
```

But yeah… I found this out way too late. 😭
For now, we stay loyal to **npm**.
