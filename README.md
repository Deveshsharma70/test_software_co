# User Role Management API (Node.js + MongoDB)

This is a RESTful API built using **Node.js**, **Express**, and **MongoDB** for managing users, roles, and access control modules. It includes features such as user registration, login, CRUD operations for users and roles, role-based access control, and bulk updates.

---

## Features

- Signup and Login APIs (JWT based authentication)
- CRUD operations for **Users** and **Roles**
- Populate only `roleName` and `accessModules` in user list
- Add or remove access modules to a Role (with uniqueness enforcement)
- Check if a user has access to a specific module
- Bulk update users with same or different data
- Search users by name or email (case-insensitive)

---

## Technologies Used

- Node.js
- Express
- MongoDB with Mongoose
- JWT (jsonwebtoken)
- Bcrypt (for password hashing)

---

## Project Structure

```
├── app.js
├── .env
├── controllers/
│   ├── authController.js
│   ├── roleController.js
│   └── userController.js
├── models/
│   ├── Role.js
│   └── User.js
├── routes/
│   ├── authRoutes.js
│   ├── roleRoutes.js
│   └── userRoutes.js
```

---

## Installation

```bash
git clone <your-repo-url>
cd user-role-api
npm install
```

---

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/user-role-api
JWT_SECRET=your_jwt_secret_key
```

---

## Running the Project

```bash
node app.js
```
The server will start at `http://localhost:5000`

---

## API Endpoints

### Auth
- `POST /api/auth/signup`
- `POST /api/auth/login`

### Role APIs
- `POST /api/roles` - Create role
- `GET /api/roles` - Get list of roles
- `PATCH /api/roles/:id/accessModules` - Add/remove access module

### User APIs
- `POST /api/users` - Create user
- `GET /api/users?q=abc` - List/search users
- `GET /api/users/:userId/hasAccess/:module` - Check access
- `PATCH /api/users/bulk/same` - Bulk update (same data)
- `PATCH /api/users/bulk/different` - Bulk update (different data)

---

## Search Feature
Supports case-insensitive search by:
- `firstName`
- `lastName`
- `email`

Example:
```
GET /api/users?q=a
```
Returns users with names/emails containing "a" or "A"

---

## License
MIT