# HireHub

**HireHub** is a resume management and shortlisting system for recruiters and HRs.  
Recruiters can upload resumes, run a matching algorithm against Job Descriptions (JDs), and shortlist candidates.  
HRs can view and manage all jobs within their company and see shortlisted candidates.  
Authentication is handled via **Firebase Google Sign-In** with role-based access control (Recruiter & HR).

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

## 🎥 Demo Videos

### Recruiter Workflow
![Recruiter Demo](./demos/recruiter-demo.gif)

### HR Dashboard
![HR Demo](./demos/hr-demo.gif)

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
├── client/                                # React/Next.js frontend
│   ├── public/                            # Static assets (images, icons, fonts)
│   └── src/
│       ├── app/                           # Next.js App Router
│       │   ├── workspace/                 # Workspace pages for logged-in users
│       │   │   ├── hr/                    # HR-specific pages
│       │   │   │   └── page.js
│       │   │   └── recruiter/             # Recruiter-specific pages
│       │   │       └── page.js
│       │   ├── global.css                 # Global styles (themes, CSS variables)
│       │   ├── layout.js                  # Root layout, global wrappers (theme, auth)
│       │   └── page.js                    # Landing page
│       ├── components/                    # Reusable UI components
│       │   ├── landing/                   # Landing page components
│       │   ├── dashboard/                 # Custom dashboard components
│       │   │   ├── hr/                    # HR-specific dashboard components
│       │   │   └── recruiter/             # Recruiter-specific dashboard components
│       │   └── ui/                        # Shadcn-generated components
│       ├── context/                       # React Context providers (auth, theme, etc.)
│       ├── lib/                           # Utility functions (API calls, helpers)
│       └── middleware.js                  # Next.js middleware for role-based routing
├── server/                                # FastAPI project
│   └── app/
│       ├── auth/                          # Authentication related files
│       │   └── dependencies.py            # Role & token verification
│       ├── config/                        # Configuration files
│       │   └── db.py                      # Database connection setup
│       ├── core/                          # Core utilities
│       │   └── firebase.py                # Firebase auth integration
│       ├── models/                        # Database models
│       │   ├── company.py                 # Company table model
│       │   ├── jobs.py                    # Jobs table model
│       │   ├── resumes.py                 # Resumes table model
│       │   └── users.py                   # Users table model
│       ├── routers/                       # API routes
│       │   ├── hr/                        # HR-related endpoints
│       │   │   ├── candidates.py          # Manage candidates
│       │   │   ├── jobs.py                # Manage HR jobs
│       │   │   └── shortlisted.py         # View/manage shortlisted candidates
│       │   ├── recruiter/                 # Recruiter-related endpoints
│       │   │   ├── filters.py             # Candidate/job filters
│       │   │   ├── jobs.py                # Recruiter job management
│       │   │   ├── matching.py            # Candidate-job matching logic
│       │   │   ├── resumes.py             # Manage resumes
│       │   │   └── shortlisted.py         # Manage shortlisted candidates
│       │   └── users.py                   # Users-related endpoints
│       ├── schemas/                       # Pydantic schemas
│       ├── utils/                         # Utility functions
│       │   └── auth.py                    # Session cookie & role-based auth helpers
│       └── main.py                        # FastAPI app entry point
├── docs/                                  # Documentation and diagrams
└── README.md                              # Project overview & instructions
```

---

## ⚡ Getting Started

1. Clone the repository:  
   ```bash
   git clone https://github.com/ts-31/hire-hub.git
   ```

2. Install backend dependencies:  
   ```bash
   cd server
   pip install -r requirements.txt
   ```

3. Configure **Firebase credentials** and **PostgreSQL connection**.

4. Start the backend:  
   ```bash
   uvicorn app.main:app --reload
   ```

5. Start the frontend (React/Next.js) and connect to the backend.
   ```bash
    cd client
    npm run dev
   ```

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
  - `UNIQUE(firebase_uid)` on users table.  
