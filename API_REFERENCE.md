# Saksham Job Portal — API Reference Map

This reference guide documents all HTTP API endpoints, their physical file locations (routes, controllers, services, and validators), authentication roles, and operational functions.

---

## 1. Authentication (`/api/auth`)
* **Route File**: [auth.routes.js](file:///c:/Users/swapn/OneDrive/Desktop/saksham/src/routes/auth/auth.routes.js)
* **Controller File**: [auth.controller.js](file:///c:/Users/swapn/OneDrive/Desktop/saksham/src/controllers/auth/auth.controller.js)
* **Service File**: [auth.service.js](file:///c:/Users/swapn/OneDrive/Desktop/saksham/src/services/auth/auth.service.js)
* **Validator File**: [auth.validator.js](file:///c:/Users/swapn/OneDrive/Desktop/saksham/src/validators/auth/auth.validator.js)

| Method & Route | Validator | Auth Role | Description |
| :--- | :--- | :--- | :--- |
| **`POST /api/auth/register`** | `validateRegister` | None (Public) | Registers a new user account as either `JOB_SEEKER` or `EMPLOYER`. |
| **`POST /api/auth/login`** | `validateLogin` | None (Public) | Authenticates credentials and returns a secure JWT containing the user ID and role. |
| **`GET /api/auth/me`** | — | Any (JWT Required) | Retrieves profile information for the currently authenticated session. |
| **`POST /api/auth/logout`** | — | Any (JWT Required) | Stateless logout confirmation. |

---

## 2. Users (`/api/users`)
* **Route File**: [user.routes.js](file:///c:/Users/swapn/OneDrive/Desktop/saksham/src/routes/user/user.routes.js)
* **Controller File**: [user.controller.js](file:///c:/Users/swapn/OneDrive/Desktop/saksham/src/controllers/user/user.controller.js)
* **Service File**: [user.service.js](file:///c:/Users/swapn/OneDrive/Desktop/saksham/src/services/user/user.service.js)
* **Validator File**: [application.validator.js](file:///c:/Users/swapn/OneDrive/Desktop/saksham/src/validators/application/application.validator.js)

| Method & Route | Validator | Auth Role | Description |
| :--- | :--- | :--- | :--- |
| **`GET /api/users/:id`** | `validateObjectId` | Any (JWT Required) | Fetches sanitized metadata of a user (password field excluded). |

---

## 3. Profiles (`/api/profile`)
* **Route File**: [profile.routes.js](file:///c:/Users/swapn/OneDrive/Desktop/saksham/src/routes/profile/profile.routes.js)
* **Controller File**: [profile.controller.js](file:///c:/Users/swapn/OneDrive/Desktop/saksham/src/controllers/profile/profile.controller.js)
* **Service File**: [profile.service.js](file:///c:/Users/swapn/OneDrive/Desktop/saksham/src/services/profile/profile.service.js)
* **Validator File**: [profile.validator.js](file:///c:/Users/swapn/OneDrive/Desktop/saksham/src/validators/profile/profile.validator.js)

| Method & Route | Validator | Auth Role | Description |
| :--- | :--- | :--- | :--- |
| **`GET /api/profile`** | — | `JOB_SEEKER` | Retrieves the detailed resume/skills profile of the logged-in candidate. |
| **`POST /api/profile`** | `validateProfile` | `JOB_SEEKER` | Creates a new candidate profile, supporting profile picture and resume file upload. |
| **`PUT /api/profile`** | `validateProfile` | `JOB_SEEKER` | Updates candidate profile details, replacing skills, bio, or uploaded attachments. |
| **`DELETE /api/profile`** | — | `JOB_SEEKER` | Deletes the logged-in candidate's profile. |

---

## 4. Companies (`/api/companies`)
* **Route File**: [company.routes.js](file:///c:/Users/swapn/OneDrive/Desktop/saksham/src/routes/company/company.routes.js)
* **Controller File**: [company.controller.js](file:///c:/Users/swapn/OneDrive/Desktop/saksham/src/controllers/company/company.controller.js)
* **Service File**: [company.service.js](file:///c:/Users/swapn/OneDrive/Desktop/saksham/src/services/company/company.service.js)
* **Validator File**: [application.validator.js](file:///c:/Users/swapn/OneDrive/Desktop/saksham/src/validators/application/application.validator.js)

| Method & Route | Validator | Auth Role | Description |
| :--- | :--- | :--- | :--- |
| **`GET /api/companies`** | — | None (Public) | Returns a list of all registered companies. |
| **`GET /api/companies/:id`** | `validateObjectId` | None (Public) | Retrieves detailed profile information for a single company. |
| **`POST /api/companies`** | — | `EMPLOYER` | Creates a new company profile, attaching a brand logo upload. |
| **`PUT /api/companies/:id`** | `validateObjectId` | Owner or `ADMIN` | Modifies company profile fields or replaces the logo. |
| **`DELETE /api/companies/:id`** | `validateObjectId` | Owner or `ADMIN` | Removes the company profile. |

---

## 5. Jobs (`/api/jobs`)
* **Route File**: [job.routes.js](file:///c:/Users/swapn/OneDrive/Desktop/saksham/src/routes/job/job.routes.js)
* **Controller File**: [job.controller.js](file:///c:/Users/swapn/OneDrive/Desktop/saksham/src/controllers/job/job.controller.js)
* **Service File**: [job.service.js](file:///c:/Users/swapn/OneDrive/Desktop/saksham/src/services/job/job.service.js)
* **Validator File**: [job.validator.js](file:///c:/Users/swapn/OneDrive/Desktop/saksham/src/validators/job/job.validator.js)

| Method & Route | Validator | Auth Role | Description |
| :--- | :--- | :--- | :--- |
| **`GET /api/jobs`** | — | None (Public) | Searches and filters open job postings with pagination. |
| **`GET /api/jobs/:id`** | `validateJobId` | None (Public) | Returns full job description, skills list, and company metadata. |
| **`POST /api/jobs`** | `validateJob` | `EMPLOYER` | Posts a new job listing associated with an employer's company. |
| **`PUT /api/jobs/:id`** | `validateJobId`, `validateJob` | Owner or `ADMIN` | Modifies parameters or requirements of a job posting. |
| **`DELETE /api/jobs/:id`** | `validateJobId` | Owner or `ADMIN` | Deletes a job listing. |

---

## 6. Saved Jobs / Bookmarks (`/api/saved-jobs` & `/api/jobs/:jobId/save`)
* **Route Files**: [savedJob.routes.js](file:///c:/Users/swapn/OneDrive/Desktop/saksham/src/routes/savedJob/savedJob.routes.js) & [job.routes.js](file:///c:/Users/swapn/OneDrive/Desktop/saksham/src/routes/job/job.routes.js)
* **Controller File**: [savedJob.controller.js](file:///c:/Users/swapn/OneDrive/Desktop/saksham/src/controllers/savedJob/savedJob.controller.js)
* **Service File**: [savedJob.service.js](file:///c:/Users/swapn/OneDrive/Desktop/saksham/src/services/savedJob/savedJob.service.js)
* **Validator File**: [application.validator.js](file:///c:/Users/swapn/OneDrive/Desktop/saksham/src/validators/application/application.validator.js)

| Method & Route | Validator | Auth Role | Description |
| :--- | :--- | :--- | :--- |
| **`POST /api/jobs/:jobId/save`** | `validateObjectId` | `JOB_SEEKER` | Saves/bookmarks a job posting for future reference. |
| **`DELETE /api/jobs/:jobId/save`** | `validateObjectId` | `JOB_SEEKER` | Removes a job posting from saved bookmarks list. |
| **`GET /api/saved-jobs`** | — | `JOB_SEEKER` | Lists all jobs saved by the authenticated user. |

---

## 7. Job Applications (`/api/applications` & `/api/jobs/:jobId/apply`)
* **Route Files**: [application.routes.js](file:///c:/Users/swapn/OneDrive/Desktop/saksham/src/routes/application/application.routes.js) & [job.routes.js](file:///c:/Users/swapn/OneDrive/Desktop/saksham/src/routes/job/job.routes.js)
* **Controller File**: [application.controller.js](file:///c:/Users/swapn/OneDrive/Desktop/saksham/src/controllers/application/application.controller.js)
* **Service File**: [application.service.js](file:///c:/Users/swapn/OneDrive/Desktop/saksham/src/services/application/application.service.js)
* **Validator File**: [application.validator.js](file:///c:/Users/swapn/OneDrive/Desktop/saksham/src/validators/application/application.validator.js)

| Method & Route | Validator | Auth Role | Description |
| :--- | :--- | :--- | :--- |
| **`POST /api/jobs/:jobId/apply`** | `validateObjectId` | `JOB_SEEKER` | Applies to a job posting (handles cover letter and resume file upload). |
| **`GET /api/applications/my`** | — | `JOB_SEEKER` | Lists all applications submitted by the logged-in job seeker. |
| **`GET /api/jobs/:jobId/applications`** | `validateObjectId` | Owner or `ADMIN` | Fetches applications submitted to a specific job. |
| **`GET /api/applications/:id`** | `validateObjectId` | Applicant, Owner, or `ADMIN` | Retrieves details of a specific application. |
| **`PATCH /api/applications/:id/status`** | `validateObjectId`, `validateApplicationStatus` | Owner or `ADMIN` | Updates application progress status (`SHORTLISTED`, `INTERVIEW`, `SELECTED`, etc.). |
| **`DELETE /api/applications/:id`** | `validateObjectId` | Applicant or `ADMIN` | Withdraws or removes the application. |

---

## 8. Notifications (`/api/notifications`)
* **Route File**: [notification.routes.js](file:///c:/Users/swapn/OneDrive/Desktop/saksham/src/routes/notification/notification.routes.js)
* **Controller File**: [notification.controller.js](file:///c:/Users/swapn/OneDrive/Desktop/saksham/src/controllers/notification/notification.controller.js)
* **Service File**: [notification.service.js](file:///c:/Users/swapn/OneDrive/Desktop/saksham/src/services/notification/notification.service.js)
* **Validator File**: [application.validator.js](file:///c:/Users/swapn/OneDrive/Desktop/saksham/src/validators/application/application.validator.js)

| Method & Route | Validator | Auth Role | Description |
| :--- | :--- | :--- | :--- |
| **`GET /api/notifications`** | — | Any (JWT Required) | Lists all notifications (unread/read) sent to the authenticated user. |
| **`PATCH /api/notifications/read-all`** | — | Any (JWT Required) | Marks all unread user notifications as read. |
| **`PATCH /api/notifications/:id/read`** | `validateObjectId` | Any (JWT Required) | Marks a single notification as read. |
| **`DELETE /api/notifications/:id`** | `validateObjectId` | Any (JWT Required) | Deletes a notification. |

---

## 9. Admin Panel (`/api/admin`)
* **Route File**: [admin.routes.js](file:///c:/Users/swapn/OneDrive/Desktop/saksham/src/routes/admin/admin.routes.js)
* **Controller File**: [admin.controller.js](file:///c:/Users/swapn/OneDrive/Desktop/saksham/src/controllers/admin/admin.controller.js)
* **Service Dependency**: [user.service.js](file:///c:/Users/swapn/OneDrive/Desktop/saksham/src/services/user/user.service.js) & [job.service.js](file:///c:/Users/swapn/OneDrive/Desktop/saksham/src/services/job/job.service.js)
* **Validator File**: [application.validator.js](file:///c:/Users/swapn/OneDrive/Desktop/saksham/src/validators/application/application.validator.js)

| Method & Route | Validator | Auth Role | Description |
| :--- | :--- | :--- | :--- |
| **`GET /api/admin/users`** | — | `ADMIN` | Lists all users registered in the system database. |
| **`PATCH /api/admin/users/:id/status`** | `validateObjectId` | `ADMIN` | Activates/deactivates a user's account status (blocks login if inactive). |
| **`DELETE /api/admin/users/:id`** | `validateObjectId` | `ADMIN` | Deletes a user account from the system (self-deletion blocked). |
| **`GET /api/admin/jobs`** | — | `ADMIN` | Lists all job listings across the system regardless of status. |
| **`DELETE /api/admin/jobs/:id`** | `validateObjectId` | `ADMIN` | Deletes any job listing. |
| **`GET /api/admin/applications`** | — | `ADMIN` | Audits all job applications submitted across the system. |
