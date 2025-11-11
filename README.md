# Nityio Infotech Technical Interview Project

A full-stack Todo application built with **Express.js** (Backend) and **Vue.js** (Frontend) featuring user authentication and task management.

## 📋 Project Overview

This project consists of two main applications:

- **Backend API** (`/api`): Express.js REST API with JWT authentication
- **Frontend** (`/user-profile`): Vue.js 3 SPA with TypeScript

## 🚀 Features

### Backend API Features

- ✅ User authentication (Login/Register)
- ✅ JWT token-based authorization
- ✅ Todo CRUD operations
- ✅ User-specific todo filtering
- ✅ TypeScript support
- ✅ CORS enabled
- ✅ Error handling middleware

### Frontend Features

- ✅ User authentication (Login/Logout)
- ✅ Protected routes
- ✅ Todo list management
- ✅ User profile management
- ✅ Responsive design
- ✅ Real-time API integration
- ✅ TypeScript support
- ✅ Modern Vue 3 Composition API

## 🛠️ Tech Stack

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **JWT** - Authentication
- **CORS** - Cross-origin requests
- **Nodemon** - Development server

### Frontend

- **Vue.js 3** - Progressive framework
- **TypeScript** - Type safety
- **Vue Router** - Client-side routing
- **Vite** - Build tool
- **Axios** - HTTP client
- **PrimeIcons** - Icon library

## 📁 Project Structure

```
nityio-infotech/
├── api/                          # Backend Express.js API
│   ├── src/
│   │   ├── config/              # Configuration files
│   │   ├── controllers/         # Route controllers
│   │   ├── middleware/          # Custom middleware
│   │   ├── models/              # Data models
│   │   ├── routes/              # API routes
│   │   ├── services/            # Business logic
│   │   ├── types/               # TypeScript types
│   │   ├── app.ts               # Express app setup
│   │   └── server.ts            # Server entry point
│   ├── package.json
│   └── tsconfig.json
│
└── user-profile/                # Frontend Vue.js App
    ├── src/
    │   ├── components/          # Vue components
    │   ├── views/               # Page components
    │   ├── router/              # Vue Router setup
    │   ├── assets/              # Static assets
    │   ├── axios.ts             # HTTP client setup
    │   ├── store.ts             # Global state
    │   └── main.ts              # App entry point
    ├── package.json
    └── vite.config.ts
```

## 🔧 Prerequisites

Make sure you have the following installed:

- **Node.js** (v20.19.0 or higher, v22.12.0+ recommended)
- **pnpm** (recommended) or **npm**

### Install pnpm (if not already installed)

```bash
npm install -g pnpm
```

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/zzCOMzz/nityo-infotect-technical-interview.git
cd nityio-infotech-technical-interview
```

### 2. Backend Setup (API)

Navigate to the API directory:

```bash
cd api
```

Install dependencies:

```bash
pnpm install
# or
npm install
```

Create environment file:

```bash
cp .env.example .env  # If .env.example exists
# or create .env manually
touch .env
```

Add the following to your `.env` file:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# JWT Configuration
JWT_SECRET_KEY=your-super-secret-jwt-key-here

# Add other environment variables as needed
```

### 3. Frontend Setup (User Profile)

Navigate to the user-profile directory:

```bash
cd ../user-profile
```

Install dependencies:

```bash
pnpm install
# or
npm install
```

## 🚀 Running the Application

### Method 1: Run Both Services Simultaneously

#### Terminal 1 - Start Backend API:

```bash
cd api
pnpm dev
# or
npm run dev
```

The API will start on `http://localhost:3000`

#### Terminal 2 - Start Frontend:

```bash
cd user-profile
pnpm dev
# or
npm run dev
```

The frontend will start on `http://localhost:5173` (or another available port)

### Method 2: Production Build

#### Build Backend:

```bash
cd api
pnpm build
pnpm start
# or
npm run build
npm start
```

#### Build Frontend:

```bash
cd user-profile
pnpm build
pnpm preview
# or
npm run build
npm run preview
```

## 🧪 API Endpoints

### Authentication

- `POST /api/login` - User login

### Todos (Protected Routes)

- `GET /api/todos` - Get user's todos
- `POST /api/todos` - Create new todo
- `PATCH /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

### Request Headers

For protected routes, include:

```
Authorization: Bearer <jwt-token>
```

## 👤 Demo Credentials

```
Email: irvan@email.com
Password: password123
```

## 🎯 Usage Guide

1. **Start both servers** (API and Frontend)
2. **Open browser** and go to `http://localhost:5173`
3. **Login** with demo credentials or register a new account
4. **Navigate to Todo List** from the navigation menu
5. **Add, edit, delete, and manage** your todos
6. **Visit Profile** to view/edit user information
7. **Logout** when done

## 🔍 Development

### Backend Development

```bash
cd api
pnpm dev          # Start development server with hot reload
pnpm build        # Build TypeScript to JavaScript
pnpm lint         # Run ESLint
```

### Frontend Development

```bash
cd user-profile
pnpm dev          # Start development server with hot reload
pnpm build        # Build for production
pnpm type-check   # Run TypeScript type checking
pnpm preview      # Preview production build
```

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use

```bash
# Kill process on port 3000 (API)
lsof -ti:3000 | xargs kill -9

# Kill process on port 5173 (Frontend)
lsof -ti:5173 | xargs kill -9
```

#### JWT Token Issues

- Check if the JWT_SECRET_KEY is set in your .env file
- Verify the token is being sent in request headers
- Check browser localStorage for the token

#### Database/Data Issues

This project uses in-memory data storage. Restart the API server to reset data.

## 🔐 Environment Variables

### Backend (.env)

```env
PORT=3000
NODE_ENV=development
JWT_SECRET_KEY=your-secret-key-minimum-32-characters-long
```

## 📝 API Response Format

### Success Response

```json
{
  "message": "Success message",
  "data": {
    /* response data */
  }
}
```

### Error Response

```json
{
  "error": "Error message"
}
```

## 📄 License

This project is for interview/assessment purposes.

## 💡 Additional Notes

- The project uses in-memory storage for simplicity
- All todos are filtered by user email from JWT token
- Frontend includes loading states and error handling
- Responsive design works on desktop, tablet, and mobile
- TypeScript is used throughout for better development experience

## 🆘 Support

If you encounter any issues:

1. Check this README for troubleshooting steps
2. Verify all dependencies are installed correctly
3. Ensure both servers are running
4. Check browser console for frontend errors
5. Check terminal logs for backend errors

---

**Happy coding!** 🚀
