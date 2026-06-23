# Lead Management System

## Project Overview

This is a Full Stack Lead Management System developed using:

* React.js
* Node.js
* Express.js
* PostgreSQL
* JWT Authentication

The system allows managers to manage leads and automatically assign them to agents.

---

# Features

## Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes

## Lead Management

* Create Lead
* View All Leads
* Get Lead By ID
* Update Lead
* Delete Lead
* Search Leads

## Additional Features

* Auto Agent Assignment
* Activity Logs
* PostgreSQL Database Integration

---

# Tech Stack

## Frontend

* React.js
* Axios
* React Router DOM

## Backend

* Node.js
* Express.js
* PostgreSQL
* bcrypt
* JWT

---

# Folder Structure

```bash id="r1"
lead-management-system
│
├── backend
│
├── frontend
│
├── README.md
│
└── .gitignore
```

---

# Backend Setup

```bash id="r2"
cd backend

npm install

node src/server.js
```

Backend runs on:

```bash id="r3"
http://localhost:5000
```

---

# Frontend Setup

```bash id="r4"
cd frontend

npm install

npm start
```

Frontend runs on:

```bash id="r5"
http://localhost:3000
```

---

# Database Setup

Create PostgreSQL database:

```sql id="r6"
CREATE DATABASE lead_management;
```

Create required tables:

* users
* leads
* activity_logs

---

# API Endpoints

## Authentication APIs

### Register

```bash id="r7"
POST /api/auth/register
```

### Login

```bash id="r8"
POST /api/auth/login
```

### Profile

```bash id="r9"
GET /api/auth/profile
```

---

## Lead APIs

### Create Lead

```bash id="r10"
POST /api/leads/create
```

### Get All Leads

```bash id="r11"
GET /api/leads
```

### Get Lead By ID

```bash id="r12"
GET /api/leads/:id
```

### Update Lead

```bash id="r13"
PUT /api/leads/:id
```

### Delete Lead

```bash id="r14"
DELETE /api/leads/:id
```

---

# Authentication

JWT token is used for authentication and protected routes.

Example Header:

```bash id="r15"
Authorization: Bearer TOKEN
```

---

# Author

Nishant Patil
