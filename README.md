# Interview Preparation Board

A full-stack Kanban-style board to organize interview preparation topics.

## Features
- Add preparation topics with title, category, priority and notes
- Move topics across To Do, In Progress and Completed
- Edit and delete topics
- Filter by category
- Responsive dashboard

## Tech Stack
- Frontend: React + Vite + CSS
- Backend: Node.js + Express
- Database: MongoDB + Mongoose

## Setup

### 1. Backend
```bash
cd backend
npm install
```
Create `backend/.env` using `.env.example` and add your MongoDB connection string:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/interview_prep_board
```
Start backend:
```bash
npm run dev
```

### 2. Frontend
Open a second terminal:
```bash
cd frontend
npm install
npm run dev
```
Open the Local URL shown by Vite (usually http://localhost:5173).

## API
- `GET /api/topics` - list topics
- `POST /api/topics` - create topic
- `PUT /api/topics/:id` - update topic
- `DELETE /api/topics/:id` - delete topic
