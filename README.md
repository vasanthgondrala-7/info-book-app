📒 Contact Book Web App

A simple, responsive full-stack **Contact Book** built for the SDE Intern assignment.  
Users can add, view (with pagination), and delete contacts.  
Contacts are **persisted in a local JSON file** via a Node.js backend.

---

## ✨ Features
- Responsive form with **Name, Email, Phone**
- **Add contact** → instantly visible in the list
- **Delete contact** with one click
- **Validation**: Email format + 10-digit phone number
- **Pagination**: Browse contacts page by page
- **Persistent storage** (saved in `contacts.json`)

---

## 🛠️ Tech Stack
- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Backend**: Node.js, Express.js
- **Database**: JSON file persistence (SQLite/MongoDB optional upgrade)

---

## 📂 Project Structure
contact-book-app/
│
├── backend/
│ ├── server.js # Express backend with REST APIs
│ └── contacts.json # Persistent storage
│
├── frontend/
│ └── index.html # Responsive UI + Pagination
│
└── README.md # Project documentation

yaml
Copy code

---

## 🚀 Getting Started

### 1️⃣ Clone Repository
```bash
git clone <your-repo-url>
cd contact-book-app
2️⃣ Setup Backend
bash
Copy code
cd backend
npm init -y
npm install express cors
node server.js
✅ Backend will run at: http://localhost:5000

3️⃣ Run Frontend
Option 1: VS Code Live Server Extension

Right-click frontend/index.html

Select "Open with Live Server"

Option 2: Direct Browser

Double-click frontend/index.html to open in your browser

📡 API Endpoints
➕ Add Contact
http
Copy code
POST /contacts
Content-Type: application/json

{
  "name": "Alice",
  "email": "alice@example.com",
  "phone": "1234567890"
}
📖 Get Contacts (Paginated)
http
Copy code
GET /contacts?page=1&limit=5
❌ Delete Contact
http
Copy code
DELETE /contacts/:id
🎯 Future Improvements
Replace JSON file with SQLite or MongoDB

Add search & filter

Add edit/update contact

Deploy: Backend → Render/Heroku | Frontend → Vercel/Netlify

