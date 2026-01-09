# Premium Contact Management App

A modern, high-performance Contact Management Web Application built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). This application features a premium **Glassmorphism UI**, real-time form validation, and a responsive design.

## 🚀 Features

- **Glassmorphism UI**: Stunning visual effects using `backdrop-blur`, semi-transparent backgrounds, and light reflection.
- **Shiny Effects**: Interactive elements with linear/radial gradients and smooth `@keyframes` animations.
- **Neumorphism**: Depth and tactile feel for interactive elements like input fields.
- **Micro-interactions**: Subtle hover animations, scale effects, and float animations for a premium user experience.
- **Contact Management**:
  - Add new contacts with real-time validation (Name, Email, Phone).
  - View all contacts in a beautifully styled list.
  - Delete contacts with instant UI updates.
  - Automatic sorting (newest first).
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop screens.
- **Backend API**: Robust RESTful API built with Express and Mongoose.

## 🛠️ Tech Stack

- **Frontend**: Vite + React, Tailwind CSS (v4), Axios, Lucide-React.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Local/Atlas).
- **Styling**: Custom Tailwind utilities for Glassmorphism and Shiny effects.

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16+)
- MongoDB installed and running locally

### 1. Clone the repository
```bash
git clone https://github.com/YVINAY2005/Full-stack-Form.git
cd Full-stack-Form
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/contact_management
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
Start the frontend development server:
```bash
npm run dev
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/contacts` | Fetch all contacts |
| `POST` | `/api/contacts` | Create a new contact |
| `DELETE` | `/api/contacts/:id` | Delete a specific contact |

## 🎨 UI/UX Highlights

- **Glassmorphism**: Applied to the main form and contact cards for a modern, "frosted glass" look.
- **Shiny Buttons**: Submit buttons feature a moving light reflection effect on hover.
- **Floating Animations**: Decorative background elements with blur and pulse animations to add depth.
- **Real-time Validation**: Instant feedback on form fields to guide the user.

## 📂 Project Structure

```text
├── backend/
│   ├── models/        # Mongoose schemas
│   ├── server.js      # Express server & API routes
│   └── .env           # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/ # React components (Form, List)
│   │   ├── App.jsx     # Main application layout
│   │   └── index.css   # Global styles & custom utilities
│   └── vite.config.js  # Vite configuration with Tailwind v4
└── README.md
```

## 📄 License
MIT
