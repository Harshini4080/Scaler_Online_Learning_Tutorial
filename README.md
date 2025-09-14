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

----
##  Screenshot
1. Users can register and log in based on their role: Instructor or Student.  
   Instructors must also provide a course title and description during registration.
(<img width="1902" height="859" alt="Screenshot 2025-09-14 110401" src="https://github.com/user-attachments/assets/41cddc42-340a-43f3-97ef-5b21fa964c22" />)
(![Screenshot 2025-07-02 104200](https://github.com/user-attachments/assets/f1a5eb7e-6e24-48c2-b35c-9cc672f20054)
(![Screenshot 2025-07-02 104136](https://github.com/user-attachments/assets/b27923eb-cb9c-45c3-be6b-92054afe59f0)

---
---
## Project Structure
```
frontend/
├─ src/
│ ├─ api/ # Axios API calls
│ ├─ components/ # Navbar,
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



