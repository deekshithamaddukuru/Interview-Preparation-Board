# Interview Preparation Board

A full-stack web application designed to simplify interview preparation by helping users organize technical topics, manage learning tasks, and monitor their preparation progress through an interactive dashboard.

## Overview

Interview Preparation Board provides a centralized platform to plan and track interview preparation. Users can organize topics based on their preparation status, prioritize tasks, and monitor overall progress.

## Features

- **Topic Management:** Add, edit, and delete interview preparation topics.
- **Progress Tracking:** Organize topics into To Do, In Progress, and Completed sections.
- **Category Filtering:** Filter topics based on categories.
- **Priority Management:** Assign priorities to preparation topics.
- **Dashboard Statistics:** View total topics, ongoing tasks, and completed topics.
- **Progress Overview:** Monitor preparation progress through a percentage-based indicator.
- **Responsive Interface:** Clean and user-friendly interface.

## Tech Stack

**Frontend**
- React.js
- Vite
- HTML5
- CSS3
- JavaScript

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB
- Mongoose

**Tools**
- Visual Studio Code
- Git
- GitHub
- Postman

## Project Structure

```text
Interview-Preparation-Board/
│
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   └── Topic.js
│   │   ├── routes/
│   │   │   └── topics.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── style.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── .gitignore
└── README.md
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/deekshithamaddukuru/Interview-Preparation-Board.git
```

```bash
cd Interview-Preparation-Board
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder and add:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/interview_prep_board
```

Start the backend server:

```bash
npm run dev
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed in the terminal to access the application.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/topics` | Retrieve all topics |
| POST | `/api/topics` | Add a new topic |
| PUT | `/api/topics/:id` | Update a topic |
| DELETE | `/api/topics/:id` | Delete a topic |

## Future Enhancements

- User authentication and personalized dashboards.
- Interview question bank.
- Preparation reminders and study schedules.
- Performance analytics and progress reports.

## Author

**Deekshitha Maddukuru**

B.Tech – Computer Science and Engineering

GitHub: [@deekshithamaddukuru](https://github.com/deekshithamaddukuru)

---

*Built to make interview preparation more organized, structured, and productive.*
