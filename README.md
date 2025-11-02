# TaskFlow: A Secure & Collaborative Task Management REST API

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

TaskFlow is a robust, feature-complete REST API built with Node.js and Express, designed to serve as the powerful backend for a collaborative task management application. It features a secure, stateless authentication system, comprehensive workspace and task management, and a scalable, modular architecture.

## 🚀 Live Demonstration

To provide a live, interactive demonstration of the backend's capabilities, a functional frontend dashboard was built using Python and Streamlit.

You can test the live API through this globally deployed demo application:

**[https://taskflow-frontend-g0c5.onrender.com](https://taskflow-frontend-g0c5.onrender.com)**

*(Note: The backend is hosted on a free tier; the initial server startup may take up to 60 seconds. Please be patient on the first load when registering or logging in.)*

---

## 🎯 Project Overview

TaskFlow was engineered to be a professional, real-world **backend service**, demonstrating a strong command of modern API development principles. The primary focus was creating a secure, well-structured, and reliable service capable of being consumed by any client application.

This project serves as a practical showcase of core backend competencies:

-   **Secure API Design:** Crafting logical, intuitive, and secure RESTful endpoints.
-   **Authentication & Authorization:** Implementing a robust user authentication system from scratch using JSON Web Tokens (JWT) and bcrypt for password hashing.
-   **Protected Routes:** Utilizing custom middleware to protect sensitive endpoints and ensure strict data privacy.
-   **Database Architecture:** Designing and integrating a NoSQL (MongoDB) database schema for complex relationships between users, workspaces, and tasks.
-   **Deployment & DevOps:** Successfully deploying the Node.js application to a live cloud environment on Render.

---

## ✅ Core API Features

-   **Stateless User Authentication:** Full user registration and login functionality returning a stateless JWT for secure client-side session management.
-   **Workspace Management:** Endpoints to create and retrieve collaborative workspaces, with authorization checks to ensure a user can only access their own data.
--   **Task Management:** Endpoints to create and retrieve tasks, with relational logic to ensure each task is correctly associated with a user and a workspace.
-   **Modular Architecture:** Organized into a clean structure with routes, controllers, middleware, and models for excellent separation of concerns and maintainability.

---

## 🛠️ Tech Stack & Architecture

### Backend Technologies
-   **Runtime:** Node.js
-   **Framework:** Express.js
-   **Database:** MongoDB Atlas (with Mongoose ODM)
-   **Authentication:** JSON Web Tokens (JWT), bcrypt.js

### Demonstration Frontend
-   **Language:** Python
-   **Framework:** Streamlit

### System Architecture
The API is the central hub, designed for high-performance and scalability. The provided demo follows this clean, decoupled flow:

`[Client (Web Browser)]` ↔️ `[Streamlit Demo Frontend]` ↔️ `[**TaskFlow REST API (Node.js)**]` ↔️ `[MongoDB Atlas]`

---

## 📖 API Documentation

A complete breakdown of all available API endpoints, methods, and expected request/response formats is available in the documentation file. This is the primary guide to consuming the backend service.

**[View the full API Documentation here.](./DOCUMENTATION.md)**

---

## ⚙️ Local Setup and Installation

To run this project's backend on your local machine, follow these steps:

**Prerequisites:**
-   Node.js and npm installed
-   A MongoDB Atlas account and connection URI

**1. Clone the Repository**
git clone https://github.com/hpinmetaverse/TaskFlow_Collaborative-Task-Management-API_.git
cd TaskFlow_Collaborative-Task-Management-API_

**2. Configure Backend Environment**

-   **Install Dependencies:** Navigate to the root directory and install all required npm packages.
    ```bash
    npm install
    ```
-   **Create Environment File:** Create a new file named `.env` in the root of the project. This file will hold your secret keys and database connection string.
-   **Add Environment Variables:** Open the `.env` file and add the following two variables, replacing the placeholder values with your actual credentials:
    ```
    MONGO_URI=your_mongodb_atlas_connection_string
    JWT_SECRET=your_super_secret_key_for_signing_tokens
    ```
