### API Documentation for TaskFlow

This document provides a clear overview of the available endpoints for the TaskFlow API.

#### **Section 1: User Authentication**

These are the endpoints that handle user registration and login.

| Endpoint | HTTP Method | Description | Authentication | Request Body Example |
| :--- | :--- | :--- | :--- | :--- |
| `/api/auth/register` | `POST` | Registers a new user. | Not Required | `{ "username": "testuser", "email": "test@example.com", "password": "password123" }` |
| `/api/auth/login` | `POST` | Logs in an existing user and returns a JWT token. | Not Required | `{ "email": "test@example.com", "password": "password123" }` |

<br>

#### **Section 2: Workspaces**

These endpoints manage the collaborative spaces where tasks are organized.

| Endpoint | HTTP Method | Description | Authentication | Request Body Example |
| :--- | :--- | :--- | :--- | :--- |
| `/api/workspaces` | `POST` | Creates a new workspace for the logged-in user. | Required (JWT) | `{ "name": "New Project", "description": "Details about the project." }` |
| `/api/workspaces` | `GET` | Retrieves all workspaces the logged-in user is a member of. | Required (JWT) | (None) |

<br>

#### **Section 3: Tasks**

These endpoints manage the individual tasks within workspaces.

| Endpoint | HTTP Method | Description | Authentication | Request Body Example |
| :--- | :--- | :--- | :--- | :--- |
| `/api/tasks` | `POST` | Creates a new task within a specific workspace. | Required (JWT) | `{ "title": "Finish the report", "description": "Draft and submit.", "workspace": "workspace_id_here" }` |
| `/api/tasks/workspace/:workspaceId` | `GET` | Retrieves all tasks for a specific workspace. | Required (JWT) | (None) |