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
(<img width="1889" height="860" alt="Screenshot 2025-09-14 110415" src="https://github.com/user-attachments/assets/6aff9ee7-fa1c-428e-9791-079ffa016b48" />)
(<img width="1890" height="676" alt="Screenshot 2025-09-14 110426" src="https://github.com/user-attachments/assets/799bd520-cc25-41a2-ba9a-af408208a181" />)

2. The application provides two dashboards: Instructor and Student.  
Instructors can access only their assigned course dashboard.
Students can browse and view all available courses on the platform.Each course displays its title and description for easy selection.
(<img width="1884" height="548" alt="Screenshot 2025-09-14 110513" src="https://github.com/user-attachments/assets/858ce1ee-2420-480d-b13b-472e96839898" />)
(<img width="1888" height="862" alt="Screenshot 2025-09-14 110702" src="https://github.com/user-attachments/assets/d37b703b-6409-45b1-a765-90d879b4f065" />)

3. Instructors can add, update, and delete lectures within their assigned course dashboard.  
They can also create quizzes for each lecture to assess student learning.
(<img width="1884" height="548" alt="Screenshot 2025-09-14 110513" src="https://github.com/user-attachments/assets/ba212590-b548-4894-a0f4-5c5e97a2291a" />)
(<img width="1863" height="788" alt="Screenshot 2025-09-14 110615" src="https://github.com/user-attachments/assets/b3e5b403-a4ed-431c-adc9-dcb2f9bd386b" />)

4.Students can view existing courses and enroll in the ones they choose.  
Enrollment allows them to access lectures and track their progress within the selected course. Lectures unlock sequentially, so the next lecture is accessible only after completing the previous one.
(<img width="1888" height="862" alt="Screenshot 2025-09-14 110702" src="https://github.com/user-attachments/assets/9fcaa9fd-c442-411e-b10a-39a4a01a0f59" />)
(<img width="1909" height="751" alt="Screenshot 2025-09-14 110722" src="https://github.com/user-attachments/assets/a5528600-b329-4e75-917f-1fdc7cf8bc1a" />)

5.Students can read lecture content and attempt quizzes to test their understanding.  
(<img width="1896" height="875" alt="Screenshot 2025-09-14 110732" src="https://github.com/user-attachments/assets/c78c45ee-d812-4622-9b49-6932d4df5925" />)
(<img width="1391" height="558" alt="Screenshot 2025-09-14 110748" src="https://github.com/user-attachments/assets/1eb6e21f-9b6b-4405-987c-e8f38d45e94c" />)


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

### 5. Start the Frontend 

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



