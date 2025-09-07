# HireHub

**HireHub** is a resume management and shortlisting system for recruiters and HRs.  
Recruiters can upload resumes, run a matching algorithm against Job Descriptions (JDs), and shortlist candidates.  
HRs can view and manage all jobs within their company and see shortlisted candidates.  
Authentication is handled via **Firebase Google Sign-In** with role-based access control (Recruiter & HR).

---

## 🚀 MVP Flow

### Recruiter Flow
1. User selects **Recruiter** role.  
2. Sign in with Google → store Firebase token.  
3. Autofill **Name** and **Email** from token + autofill **Role** from earlier selection.  
4. Enter **Company Name**.  
5. Click **Register** → backend flow:
   - Check if company exists.  
     - ❌ If not found → return error: *Company not found*.  
     - ✅ If found → verify token, then store user (`name`, `email`, `company_id`, `role`) in DB.  
6. Recruiter options after login:
   - **Create Job** or **Upload Resumes**.  
   - Must create/select a job before uploading resumes.  
   - Upload resumes (limit: 20 per batch).  
   - Backend uploads resumes to S3 → parses → stores in DB one by one:  
     ```
     candidate_id (PK), recruiter_id (FK), job_id (FK), resume_url,
     resume_text (parsed), created_at, status (shortlisted: true/false)
     ```
   - Run matching algorithm to shortlist candidates.  
   - Apply filters (e.g., CGPA > 7).  

### HR Flow
1. User selects **HR** role.  
2. Sign in with Google → store Firebase token.  
3. Autofill **Name** and **Email** from token + autofill **Role** from earlier selection.  
4. Enter **Company Name**.  
5. Click **Register** → backend flow:
   - Check if company exists.  
     - ✅ If found → return error: *Company already exists*.  
     - ❌ If not found → verify token, create new company, then store HR user in DB.  
6. HR after login:  
   - View **all jobs** created by recruiters from their company.  
   - View shortlisted candidates.  

---

## ✨ Features

- Upload resumes (single or bulk `.zip`) → stored in **Amazon S3**  
- Background parsing of resumes into **PostgreSQL**  
- Matching algorithm (skills, experience, location) performed by Recruiters  
- Filtering options for Recruiters (e.g., CGPA, experience)  
- Shortlisting candidates by Recruiters  
- HR dashboard: view all jobs + shortlisted candidates  
- Recruiter dashboard: manage own jobs  
- **Firebase Authentication + Custom Claims** for RBAC  

---

## 🛠 Tech Stack

- **Backend:** Python + FastAPI  
- **Frontend:** React / Next.js  
- **Database:** PostgreSQL  
- **Storage:** AWS S3 (resumes)  
- **Authentication:** Firebase Google Sign-In  

---

## 📂 Project Structure

```
hire-hub/
   ├── client/                                # React/Next.js app
   │   ├── public/                            # Static assets
   │   └── src/
   │       └── app/                           # Next.js App Router
   │           ├── page.js                    # Landing page
   │           ├── workspace/                 # Workspace pages
   │           │   └── page.js
   │           └── components/                # Reusable UI components
   ├── server/                                # FastAPI project
   ├── docs/                                  # Documentation and diagrams
   └── README.md
```

---

## ⚡ Getting Started

1. Clone the repository:  
   ```bash
   git clone https://github.com/ts-31/hire-hub.git
   ```

2. Install backend dependencies:  
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. Configure **Firebase credentials** and **PostgreSQL connection**.

4. Start the backend:  
   ```bash
   uvicorn hirehub.main:app --reload
   ```

5. Start the frontend (React/Next.js) and connect to the backend.

---

## 🔑 RBAC (Role-Based Access Control)

- **Recruiter:**  
  - Upload resumes  
  - Create JDs  
  - Run matching algorithm  
  - Shortlist candidates  

- **HR:**  
  - View all jobs in their company  
  - View shortlisted candidates  
  - Manage interviews  

RBAC is enforced via **Firebase Custom Claims**.  
The backend verifies roles before allowing API access.

---

## 📌 Notes

- MVP supports **1 HR per company** but allows **many Recruiters**.  
- `firebase_uid` is stored in DB for secure token verification & user mapping.  
- Constraints:  
  - `UNIQUE(company_name)` on companies table.  
  - `UNIQUE(firebase_uid)` on users table.  
