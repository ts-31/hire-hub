# Authentication and User Flow Documentation

This document explains how **Login** and **Registration** work in the system using a single route (`/check-user`). It also covers the migration to session cookies for authentication.

---

## 🔑 Authentication Flow

### 1. Login with Google
- User clicks **Login** button.
- They can log in using **Sign in with Google** (Firebase handles authentication).
- On successful login, Firebase returns an **ID token**.
- The token is sent to backend (`/check-user`) for verification.
- Upon successful verification, a session cookie is set in the response (valid for 14 days).
- Client stores user profile in localStorage as "hh_user" for displaying user info (e.g., name, role).

### 2. Dual-Mode `/check-user` Endpoint
The `/check-user` route handles **both login and registration** depending on the request body. It requires `Authorization: Bearer <id_token>`.

#### **Login Check Mode**
- **Request**: `POST /check-user` with **no body** (or empty body).
- Backend verifies Firebase ID token and checks DB:
  - ✅ If user exists → returns `200 OK` with user details and sets session cookie.
  - ❌ If user does not exist → returns `404 User is not registered`.

#### **Registration Mode**
- **Request**: `POST /check-user` with JSON body containing:
  ```json
  {
    "role": "HR or Recruiter",
    "company_name": "Some Company"
  }
  ```
- Registration requires **role** and **company_name**.
- Upon success, sets Firebase custom claims and session cookie.

### 3. Logout
- **Request**: `POST /session-logout` (no body required).
- Clears the session cookie by setting an expired cookie.
- Client removes "hh_user" from localStorage.
- Response: `200 OK` with message "Logged out".

---

## 🏢 Registration Rules

### HR Registration
- Allowed **only if the company does NOT already exist** in DB.
- Creates a new user with role = `HR`.
- Sets Firebase custom claims: `{ role: "HR", company: company_name }`.
- Response: `201 Created` with user details and session cookie.

### Recruiter Registration
- Allowed **only if the company already exists** in DB (created by HR).
- Creates a new user with role = `Recruiter` and assigns to that company.
- Sets Firebase custom claims: `{ role: "Recruiter", company: company_name }`.
- Response: `201 Created` with user details and session cookie.

### Invalid Role
- If role is not `HR` or `Recruiter` → returns `400 Bad Request`.

---

## 🔄 Summary of Flow

1. **User Clicks Login**
   - Option A → Login with Google
     - If user exists → logged in ✅ (session cookie set, hh_user stored in localStorage)
     - If not registered → must register
   - Option B → Register (must provide role + company name)

2. **Registration Rules**
   - HR → company must not exist
   - Recruiter → company must exist

3. **Single Unified Route (`/check-user`)**
   - No body → login check (sets cookie on success, stores hh_user)
   - With body (role + company_name) → registration (sets cookie on success, stores hh_user)

4. **Logout**
   - Clears session cookie via `/session-logout`.
   - Removes hh_user from localStorage.

---

## 📊 Example Requests

### Login (Check User)
```http
POST /check-user
Authorization: Bearer <firebase_id_token>
Content-Type: application/json

{}
```
**Response (200 OK):** (Sets `session` cookie)
```json
{
  "message": "User exists",
  "user": {
    "uid": "firebase_uid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "Recruiter",
    "company_name": "Acme Corp"
  }
}
```

**Response (404 Not Found):**
```json
{ "detail": "User is not registered" }
```

---

### Register HR
```http
POST /check-user
Authorization: Bearer <firebase_id_token>
Content-Type: application/json

{
  "role": "HR",
  "company_name": "Acme Corp"
}
```

**Response (201 Created):** (Sets `session` cookie)
```json
{
  "message": "HR user created successfully",
  "user": {
    "uid": "firebase_uid",
    "name": "Alice HR",
    "email": "alice@example.com",
    "role": "HR",
    "company_name": "Acme Corp"
  }
}
```

---

### Register Recruiter
```http
POST /check-user
Authorization: Bearer <firebase_id_token>
Content-Type: application/json

{
  "role": "Recruiter",
  "company_name": "Acme Corp"
}
```

**Response (201 Created):** (Sets `session` cookie)
```json
{
  "message": "Recruiter user created successfully",
  "user": {
    "uid": "firebase_uid",
    "name": "Bob Recruiter",
    "email": "bob@example.com",
    "role": "Recruiter",
    "company_name": "Acme Corp"
  }
}
```

---

### Logout
```http
POST /session-logout
```
**Response (200 OK):** (Clears `session` cookie)
```json
{
  "message": "Logged out"
}
```

---

## ✅ Key Points
- **Single route** for login and registration → `/check-user`.
- **Login** = no request body (sets cookie on success, stores hh_user in localStorage for UI).
- **Registration** = requires `role` + `company_name` (sets cookie on success, stores hh_user in localStorage for UI).
- HR creates the company, Recruiters join existing companies.
- Firebase custom claims store role + company for each user.
- Session cookies replace bearer tokens + local storage for authentication (14-day expiry). Do NOT store ID tokens in localStorage.
- Client stores only the user profile (hh_user) in localStorage to display user info.
- Logout clears the session cookie and removes hh_user from localStorage.