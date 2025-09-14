# Online Learning Platform – Full-Stack Application

This project was built as part of the SDE Intern assignment. It is a full-stack online learning platform supporting **Instructors** and **Students**. Instructors can create courses and lectures (reading or quiz), while students can browse courses, complete lectures, attempt quizzes, and track progress.

---

## Tech Stack

**Backend:** Node.js + Express.js, MongoDB + Mongoose, JWT for authentication & authorization  
**Frontend:** React.js, Axios for API calls, Tailwind CSS  
**Tools:** Postman, Git/GitHub  

---

## Features

### User Management
- Sign-up & login with role selection (Instructor / Student)  
- JWT-based authentication & role-based route protection  

### Instructor
- Create courses with title & description  
- Add, update, delete lectures (Reading / Quiz)  
- View assigned courses  

### Student
- Browse all courses  
- Sequential lecture viewing  
- Attempt quizzes & view instant results  
- Track progress  

### Backend
- RESTful API design  
- Database schema supporting users, courses, lectures, progress  
- Error handling with meaningful messages and HTTP status codes  

---

## Project Structure
```
frontend/
├─ src/
│ ├─ api/ # Axios API calls
│ ├─ components/ # Navbar, reusable components
│ ├─ pages/ # Login, Register, Dashboards, CourseDetails, LectureView
│ ├─ App.js
│ ├─ index.js
│ └─ index.css

backend/
├─ src/
│ ├─ config/ # MongoDB connection
│ ├─ controllers/ # Business logic
│ ├─ middleware/ # Auth & roles
│ ├─ models/ # Mongoose schemas
│ ├─ routes/ # API routes
│ └─ index.js # Entry point
├─ .env
├─ .gitignore
└─ package.json
```

---
## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Harshini4080/Scaler_Online_Learning_Tutorial.git
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd frontend
npm install
```


### 4. Add .env File Backend

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

```

### 4. Start the Backend Server

```bash
cd backend
npm run dev
```
Backend API runs at: http://localhost:5000

### 4. Start the Frontend 

```bash
cd ../frontend
npm start
```
Frontend runs at: http://localhost:3000


## Authentication

After logging in via `POST /api/auth/login`, you'll receive a **JWT token**.
To access protected routes, include this header in every request:
Authorization: Bearer <your_token>


---

## API Endpoints

### Authentication
| Method | Endpoint               | Description           | Auth |
|--------|-----------------------|---------------------|------|
| POST   | /api/auth/register    | Register a user      | ❌   |
| POST   | /api/auth/login       | Login & get JWT      | ❌   |

### Courses
| Method | Endpoint                     | Description                 | Auth |
|--------|------------------------------|-----------------------------|------|
| GET    | /api/courses                 | List all courses            | ❌   |
| GET    | /api/courses/catalog         | List unassigned courses     | ❌   |
| GET    | /api/courses/mine            | Instructor’s assigned course | ✅  |
| POST   | /api/courses                 | Create new course           | ✅   |
| DELETE | /api/courses/:courseId       | Delete course               | ✅   |


### Lectures
| Method | Endpoint                                     | Description                   | Auth |
|--------|---------------------------------------------|-------------------------------|------|
| POST   | /api/courses/:courseId/lectures             | Add lecture                   | ✅   |
| GET    | /api/courses/:courseId/lectures             | List lectures                 | ✅   |
| GET    | /api/lectures/:id                            | Get single lecture            | ✅   |
| PUT    | /api/courses/:courseId/lectures/:lectureId  | Update lecture                | ✅   |
| DELETE | /api/courses/:courseId/lectures/:lectureId  | Delete lecture                | ✅   |
| POST   | /api/lectures/:id/submit-quiz               | Submit quiz & get score       | ✅   |
| POST   | /api/lectures/:id/complete                  | Mark lecture as completed     | ✅   |

### Progress
| Method | Endpoint                     | Description                      | Auth |
|--------|------------------------------|----------------------------------|------|
| GET    | /api/progress/:courseId       | Get student's course progress    | ✅   |


---

## Notes
- JWT secures routes and implements role-based authorization.
- Lectures unlock sequentially.
- Quizzes are graded in real-time; passing score ≥ 70%.
- Error handling and HTTP status codes are consistent.

## Bonus / Future Improvements
- File upload for lecture content (PDF, images)
- Course search functionality
- Fully responsive frontend


## AI Disclosure
I used AI tools to help set up API integration and frontend components. All code was reviewed and tested manually.



