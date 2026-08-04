# Job Portal Backend — API Documentation

This backend is built on the MEAN stack (Node.js + Express + MongoDB/Mongoose) and provides a secure, role-based REST API for a Job Portal.

## Base URL
```text
http://localhost:8000/api
```

---

## Response Structure

### Success Response (Status 200/201)
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {}
}
```

### Failure Response (Status 400/401/403/404/409/500)
```json
{
  "success": false,
  "message": "Error description details",
  "error": "ERROR_CODE"
}
```

---

## Endpoints

### 1. Health Check
* **Method**: `GET`
* **URL**: `/health`
* **Auth Required**: No
* **Response**:
  ```json
  {
    "success": true,
    "message": "Job Portal API is running",
    "database": "Connected"
  }
  ```

---

### 2. Authentication

#### Register User
* **Method**: `POST`
* **URL**: `/auth/register`
* **Auth Required**: No
* **Request Body**:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "password123",
    "role": "JOB_SEEKER" // Allowed: JOB_SEEKER, EMPLOYER, ADMIN
  }
  ```
* **Success Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "data": {
      "user": {
        "_id": "60d0fe4f5311236168a109ca",
        "name": "Jane Doe",
        "email": "jane@example.com",
        "role": "JOB_SEEKER",
        "isActive": true,
        "createdAt": "2026-08-02T15:00:00.000Z",
        "updatedAt": "2026-08-02T15:00:00.000Z"
      }
    }
  }
  ```
* **Errors**:
  * `400 BAD REQUEST` (Validation error: invalid email format, password too short)
  * `409 CONFLICT` (Email already registered)

#### Login
* **Method**: `POST`
* **URL**: `/auth/login`
* **Auth Required**: No
* **Request Body**:
  ```json
  {
    "email": "jane@example.com",
    "password": "password123"
  }
  ```
* **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "_id": "60d0fe4f5311236168a109ca",
        "name": "Jane Doe",
        "email": "jane@example.com",
        "role": "JOB_SEEKER",
        "isActive": true
      }
    }
  }
  ```
* **Errors**:
  * `401 UNAUTHORIZED` (Invalid credentials)
  * `403 FORBIDDEN` (User account deactivated)

#### Get Current User Info
* **Method**: `GET`
* **URL**: `/auth/me`
* **Auth Required**: Yes (Bearer Token)
* **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Current user profile retrieved",
    "data": {
      "user": {
        "_id": "60d0fe4f5311236168a109ca",
        "name": "Jane Doe",
        "email": "jane@example.com",
        "role": "JOB_SEEKER",
        "isActive": true
      }
    }
  }
  ```

#### Logout
* **Method**: `POST`
* **URL**: `/auth/logout`
* **Auth Required**: No
* **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Logged out successfully",
    "data": {}
  }
  ```

---

### 3. Profile System (Job Seekers)

#### Get Profile
* **Method**: `GET`
* **URL**: `/profile`
* **Auth Required**: Yes (Bearer Token)
* **Role**: `JOB_SEEKER`
* **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Profile retrieved successfully",
    "data": {
      "profile": {
        "_id": "60d0fe4f5311236168a109cb",
        "userId": "60d0fe4f5311236168a109ca",
        "phone": "555-0199",
        "location": "Chicago, IL",
        "bio": "Web Developer",
        "skills": ["JavaScript", "Node.js"],
        "education": [],
        "experience": [],
        "resumeUrl": null
      }
    }
  }
  ```

#### Create Profile
* **Method**: `POST`
* **URL**: `/profile`
* **Auth Required**: Yes
* **Role**: `JOB_SEEKER`
* **Request Format**: `multipart/form-data` or `application/json`
* **Form Fields / JSON Keys**:
  * `phone` (String)
  * `location` (String)
  * `bio` (String)
  * `skills` (Array of Strings or JSON String)
  * `education` (Array or JSON String)
  * `experience` (Array or JSON String)
  * `profileImage` (File Upload - JPG/PNG/WEBP)
  * `resume` (File Upload - PDF/DOC/DOCX)
* **Success Response (201 Created)**: Returns the profile document.

#### Update Profile
* **Method**: `PUT`
* **URL**: `/profile`
* **Auth Required**: Yes
* **Role**: `JOB_SEEKER`
* **Request Format**: `multipart/form-data` or `application/json`
* **Success Response (200 OK)**: Returns the updated profile document.

#### Delete Profile
* **Method**: `DELETE`
* **URL**: `/profile`
* **Auth Required**: Yes
* **Role**: `JOB_SEEKER`
* **Success Response (200 OK)**: Returns success status.

---

### 4. Company System

#### Create Company Profile
* **Method**: `POST`
* **URL**: `/companies`
* **Auth Required**: Yes
* **Role**: `EMPLOYER`
* **Request Format**: `multipart/form-data` or `application/json`
* **Form Fields**:
  * `companyName` (String, Required)
  * `description` (String)
  * `website` (String)
  * `location` (String)
  * `industry` (String)
  * `logo` (File Upload - JPG/PNG/WEBP)
* **Success Response (201 Created)**: Returns the created company profile.

#### Get All Companies
* **Method**: `GET`
* **URL**: `/companies`
* **Auth Required**: No

#### Get Company Details
* **Method**: `GET`
* **URL**: `/companies/:id`
* **Auth Required**: No

#### Update Company
* **Method**: `PUT`
* **URL**: `/companies/:id`
* **Auth Required**: Yes
* **Role**: `EMPLOYER` (Owner only) or `ADMIN`
* **Request Format**: `multipart/form-data` or `application/json`

#### Delete Company
* **Method**: `DELETE`
* **URL**: `/companies/:id`
* **Auth Required**: Yes
* **Role**: `EMPLOYER` (Owner only) or `ADMIN`

---

### 5. Job System

#### Create Job Posting
* **Method**: `POST`
* **URL**: `/jobs`
* **Auth Required**: Yes
* **Role**: `EMPLOYER`
* **Request Body**:
  ```json
  {
    "companyId": "60d0fe4f5311236168a109cc",
    "title": "Software Engineer",
    "description": "Job details...",
    "location": "Remote",
    "employmentType": "FULL_TIME", // FULL_TIME, PART_TIME, CONTRACT, INTERNSHIP, REMOTE, HYBRID
    "experienceLevel": "MID", // ENTRY, MID, SENIOR, LEAD
    "salaryMin": 60000,
    "salaryMax": 90000,
    "skills": ["Node.js", "Express"],
    "category": "Software Engineering",
    "deadline": "2026-12-31"
  }
  ```
* **Success Response (201 Created)**: Returns created Job details.

#### Query & Search Jobs
* **Method**: `GET`
* **URL**: `/jobs`
* **Auth Required**: No
* **Query Parameters (Optional)**:
  * `keyword` (String - searches title/description)
  * `location` (String)
  * `skills` (Comma separated list, e.g. `Node.js,React`)
  * `category` (String)
  * `employmentType` (String)
  * `experienceLevel` (String)
  * `salaryMin` (Number)
  * `salaryMax` (Number)
  * `status` (String - default is `OPEN`)
  * `page` (Number - default `1`)
  * `limit` (Number - default `10`)
* **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Jobs retrieved successfully",
    "data": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "totalPages": 1
    }
  }
  ```

#### Get Job Details
* **Method**: `GET`
* **URL**: `/jobs/:id`
* **Auth Required**: No

#### Update Job
* **Method**: `PUT`
* **URL**: `/jobs/:id`
* **Auth Required**: Yes
* **Role**: `EMPLOYER` (Owner only) or `ADMIN`

#### Delete Job
* **Method**: `DELETE`
* **URL**: `/jobs/:id`
* **Auth Required**: Yes
* **Role**: `EMPLOYER` (Owner only) or `ADMIN`

---

### 6. Saved Jobs

#### Save Job
* **Method**: `POST`
* **URL**: `/jobs/:jobId/save`
* **Auth Required**: Yes
* **Role**: `JOB_SEEKER`
* **Success Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Job saved successfully",
    "data": {
      "savedJob": {
        "_id": "60d0fe4f5311236168a109cd",
        "userId": "60d0fe4f5311236168a109ca",
        "jobId": "60d0fe4f5311236168a109ce",
        "savedAt": "2026-08-02T15:00:00.000Z"
      }
    }
  }
  ```

#### Remove Saved Job
* **Method**: `DELETE`
* **URL**: `/jobs/:jobId/save`
* **Auth Required**: Yes
* **Role**: `JOB_SEEKER`

#### Get Saved Jobs List
* **Method**: `GET`
* **URL**: `/saved-jobs`
* **Auth Required**: Yes
* **Role**: `JOB_SEEKER`

---

### 7. Application System

#### Apply for a Job
* **Method**: `POST`
* **URL**: `/jobs/:jobId/apply`
* **Auth Required**: Yes
* **Role**: `JOB_SEEKER`
* **Request Format**: `multipart/form-data`
* **Form Fields**:
  * `resume` (File Upload, Required unless `resumeUrl` is passed in body)
  * `coverLetter` (String, Optional)
* **Success Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Applied to job successfully",
    "data": {
      "application": {
        "_id": "60d0fe4f5311236168a109cf",
        "jobId": "60d0fe4f5311236168a109ce",
        "applicantId": "60d0fe4f5311236168a109ca",
        "resumeUrl": "uploads/resumes/resume-12345.pdf",
        "coverLetter": "Hello...",
        "status": "APPLIED",
        "createdAt": "2026-08-02T15:00:00.000Z"
      }
    }
  }
  ```
* **Errors**:
  * `400 BAD REQUEST` (Job closed, or resume missing)
  * `409 CONFLICT` (Candidate already applied to this job)

#### View My Applications
* **Method**: `GET`
* **URL**: `/applications/my`
* **Auth Required**: Yes
* **Role**: `JOB_SEEKER`

#### View Applications for a Job
* **Method**: `GET`
* **URL**: `/jobs/:jobId/applications`
* **Auth Required**: Yes
* **Role**: `EMPLOYER` (Owner of the job only) or `ADMIN`

#### Get Single Application Details
* **Method**: `GET`
* **URL**: `/applications/:id`
* **Auth Required**: Yes
* **Role**: Applicant, Job Employer, or Admin

#### Update Application Status
* **Method**: `PATCH`
* **URL**: `/applications/:id/status`
* **Auth Required**: Yes
* **Role**: `EMPLOYER` (Owner only) or `ADMIN`
* **Request Body**:
  ```json
  {
    "status": "SHORTLISTED" // APPLIED, SHORTLISTED, INTERVIEW, SELECTED, REJECTED, WITHDRAWN
  }
  ```

#### Withdraw Application
* **Method**: `DELETE`
* **URL**: `/applications/:id`
* **Auth Required**: Yes
* **Role**: `JOB_SEEKER` (Applicant only) or `ADMIN`

---

### 8. Notification System

#### Get My Notifications
* **Method**: `GET`
* **URL**: `/notifications`
* **Auth Required**: Yes

#### Mark Notification as Read
* **Method**: `PATCH`
* **URL**: `/notifications/:id/read`
* **Auth Required**: Yes

#### Mark All Notifications as Read
* **Method**: `PATCH`
* **URL**: `/notifications/read-all`
* **Auth Required**: Yes

#### Delete Notification
* **Method**: `DELETE`
* **URL**: `/notifications/:id`
* **Auth Required**: Yes

---

### 9. Admin System

#### View All Users
* **Method**: `GET`
* **URL**: `/admin/users`
* **Auth Required**: Yes
* **Role**: `ADMIN`

#### Update User Status (Activate/Deactivate)
* **Method**: `PATCH`
* **URL**: `/admin/users/:id/status`
* **Auth Required**: Yes
* **Role**: `ADMIN`
* **Request Body**:
  ```json
  {
    "isActive": false
  }
  ```

#### Delete User
* **Method**: `DELETE`
* **URL**: `/admin/users/:id`
* **Auth Required**: Yes
* **Role**: `ADMIN` (Cannot delete self)

#### View All Jobs
* **Method**: `GET`
* **URL**: `/admin/jobs`
* **Auth Required**: Yes
* **Role**: `ADMIN`

#### Delete Job
* **Method**: `DELETE`
* **URL**: `/admin/jobs/:id`
* **Auth Required**: Yes
* **Role**: `ADMIN`

#### View All Applications
* **Method**: `GET`
* **URL**: `/admin/applications`
* **Auth Required**: Yes
* **Role**: `ADMIN`

---

## Repository Folder Structure

The project code is organized into domain-specific subfolders within each layer:

*   **Controllers (`src/controllers/`)**: Grouped by domain (e.g. `auth/`, `job/`, `application/`).
*   **Routes (`src/routes/`)**: Grouped by domain (e.g. `auth/`, `job/`, `application/`).
*   **Services (`src/services/`)**: Grouped by domain (e.g. `auth/`, `job/`, `application/`).
*   **Validators (`src/validators/`)**: Grouped by domain (e.g. `auth/`, `job/`, `application/`).
