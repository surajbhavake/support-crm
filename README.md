# Support CRM

A simple customer support ticketing CRM built with **FastAPI, React, SQLite, and SQLAlchemy**.

The application allows support teams to create, search, filter, view, and update customer support tickets from a simple responsive dashboard.

---

## Features

### Ticket Management

* Create new support tickets
* Automatically generate ticket IDs such as `TKT-001`
* Store customer name and email
* Store ticket subject and description
* Automatically record creation and update timestamps
* View individual ticket details

### Search & Filtering

* Search tickets by:

  * Customer name
  * Customer email
  * Ticket ID
  * Subject
  * Description
* Filter tickets by status:

  * Open
  * In Progress
  * Closed
* Search and filtering work together

### Ticket Updates

* Change ticket status
* Add notes to tickets
* View previous notes
* Automatically update the ticket's `updated_at` timestamp

### Dashboard

* Total ticket count
* Open ticket count
* Closed ticket count
* Ticket table
* Search bar
* Status filter
* Quick access to create tickets
* Responsive layout for smaller screens

---

## Tech Stack

### Backend

* Python
* FastAPI
* SQLAlchemy
* SQLite
* Pydantic
* Uvicorn
* Pytest

### Frontend

* React
* Vite
* React Router
* JavaScript
* CSS

### Development Tools

* Git
* GitHub

---

## Project Structure

```text
support-crm/
│
├── backend/
│   │
│   ├── app/
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   └── tickets.py
│   │   │
│   │   ├── database.py
│   │   ├── main.py
│   │   ├── models.py
│   │   └── schemas.py
│   │
│   ├── tests/
│   │   └── test_tickets.py
│   │
│   ├── .env.example
│   ├── requirements.txt
│   └── support_crm.db
│
├── frontend/
│   │
│   ├── src/
│   │   ├── pages/
│   │   │   ├── CreateTicket.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── TicketDetail.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

# Getting Started

## Prerequisites

Make sure the following are installed:

* Python 3.10+
* Node.js
* npm
* Git

---

# Backend Setup

## 1. Go to the backend folder

```bash
cd support-crm/backend
```

## 2. Create a virtual environment

```bash
python3 -m venv .venv
```

## 3. Activate the virtual environment

### Linux/macOS

```bash
source .venv/bin/activate
```

### Windows

```bash
.venv\Scripts\activate
```

## 4. Install dependencies

```bash
pip install -r requirements.txt
```

## 5. Start the FastAPI server

```bash
uvicorn app.main:app --reload
```

The backend will be available at:

```text
http://127.0.0.1:8000
```

---

# FastAPI Documentation

FastAPI automatically provides interactive API documentation.

Open:

```text
http://127.0.0.1:8000/docs
```

You can use the Swagger UI to test the API endpoints directly from your browser.

---

# Frontend Setup

Open another terminal.

## 1. Go to the frontend folder

```bash
cd support-crm/frontend
```

## 2. Install dependencies

```bash
npm install
```

## 3. Create the environment file

Create:

```text
frontend/.env
```

Add:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

## 4. Start the development server

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# Environment Variables

## Frontend

The frontend uses:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

The `.env` file is intentionally excluded from Git.

A `.env.example` file is included in the repository so developers know which environment variable is required.

## Backend

The project currently uses SQLite with the database configuration defined in the backend.

Example configuration:

```env
DATABASE_URL=sqlite:///./support_crm.db
```

---

# API Documentation

Base URL:

```text
/api/tickets
```

---

## Create Ticket

### Request

```http
POST /api/tickets
```

### Example request body

```json
{
  "customer_name": "Rahul Sharma",
  "customer_email": "rahul@example.com",
  "subject": "Unable to login",
  "description": "I cannot login to my account after resetting my password."
}
```

### Example response

```json
{
  "ticket_id": "TKT-001",
  "created_at": "2026-09-14T12:00:00"
}
```

The ticket ID is generated automatically.

---

# Get Tickets

```http
GET /api/tickets
```

Returns the list of tickets.

### Search

You can search using:

```text
GET /api/tickets?search=Rahul
```

The search checks:

* Customer name
* Customer email
* Ticket ID
* Subject
* Description

### Status Filter

Example:

```text
GET /api/tickets?status=Open
```

Supported statuses:

```text
Open
In Progress
Closed
```

### Search + Status

Both parameters can be used together:

```text
GET /api/tickets?search=login&status=Open
```

---

# Get a Single Ticket

```http
GET /api/tickets/{ticket_id}
```

Example:

```text
GET /api/tickets/TKT-001
```

Returns:

* Ticket ID
* Customer information
* Subject
* Description
* Status
* Notes
* Creation time
* Last update time

---

# Update Ticket

```http
PUT /api/tickets/{ticket_id}
```

Example:

```text
PUT /api/tickets/TKT-001
```

### Example request

```json
{
  "status": "In Progress",
  "notes": "Customer contacted support. Investigating the issue."
}
```

The status can be changed to:

```text
Open
In Progress
Closed
```

Notes are stored separately and can be viewed from the ticket detail page.

---

# Ticket Data Model

A ticket contains the following information:

| Field            | Description                       |
| ---------------- | --------------------------------- |
| `ticket_id`      | Automatically generated ticket ID |
| `customer_name`  | Customer's name                   |
| `customer_email` | Customer's email                  |
| `subject`        | Ticket subject                    |
| `description`    | Description of the issue          |
| `status`         | Current ticket status             |
| `created_at`     | Ticket creation time              |
| `updated_at`     | Last update time                  |

---

# Ticket Statuses

The application supports three statuses:

### Open

The ticket has been created and requires attention.

### In Progress

The support team is currently working on the issue.

### Closed

The issue has been resolved or the ticket no longer requires action.

---

# Frontend Pages

## Dashboard

Route:

```text
/
```

The dashboard provides:

* Ticket statistics
* Search
* Status filtering
* Ticket list
* Create ticket button
* Ticket navigation

---

## Create Ticket

Route:

```text
/tickets/new
```

Used to create a new customer support ticket.

The form validates:

* Customer name
* Customer email
* Subject
* Description

After creating a ticket, the user is taken to the ticket detail page.

---

## Ticket Detail

Route:

```text
/tickets/:ticketId
```

Displays the complete ticket information.

Users can:

* View customer information
* Read the issue description
* View ticket status
* Change status
* Add notes
* View existing notes
* Save updates

---

# Running Tests

The backend uses Pytest.

Go to:

```bash
cd support-crm/backend
```

Activate the virtual environment:

```bash
source .venv/bin/activate
```

Run:

```bash
pytest
```

The tests currently cover basic API functionality, including:

* Health check
* Ticket creation

---

# Development Workflow

Start the backend:

```bash
cd backend
source .venv/bin/activate
uvicorn app.main:app --reload
```

Start the frontend in another terminal:

```bash
cd frontend
npm run dev
```

Then open:

```text
http://localhost:5173
```

---

# Manual Testing Checklist

The following workflow can be used to test the complete application.

### 1. Create a ticket

Create a ticket with customer information and an issue description.

Expected:

```text
TKT-001
```

is generated automatically.

### 2. View the ticket

Open the newly created ticket from the dashboard.

Verify:

* Customer information is correct
* Subject is correct
* Description is correct
* Status is `Open`

### 3. Add a note

Add a support note.

Expected:

* The note appears on the ticket
* The note has a timestamp

### 4. Update status

Change:

```text
Open
```

to:

```text
In Progress
```

Save the changes.

Expected:

```text
In Progress
```

is displayed.

### 5. Search

Search by:

```text
Customer name
Email
Subject
Ticket ID
Description
```

The relevant ticket should be returned.

### 6. Filter

Test:

```text
Open
In Progress
Closed
```

The ticket list should update according to the selected status.

### 7. Close the ticket

Change the status to:

```text
Closed
```

Verify that the closed ticket appears when the `Closed` filter is selected.

---

# Error Handling

The API returns appropriate errors for common invalid requests.

Examples include:

* Invalid email address
* Missing required fields
* Invalid status
* Ticket not found

For a ticket that does not exist, the API returns:

```text
404 Not Found
```

---

# Responsive Design

The frontend is designed to remain usable on smaller screens.

The dashboard adjusts for mobile layouts by:

* Stacking dashboard statistics
* Stacking search and filter controls
* Making action buttons full width
* Allowing the ticket table to scroll horizontally

---

# Database

The application uses **SQLite** for local development.

The database file is:

```text
support_crm.db
```

SQLAlchemy is used as the ORM for interacting with the database.

The main database models are:

* `Ticket`
* `Note`

Tables are created automatically when the FastAPI application starts.

---

# Git & GitHub

The project uses Git for version control.

Initialize the repository:

```bash
git init
```

Add files:

```bash
git add .
```

Create a commit:

```bash
git commit -m "Initial support CRM project"
```

Add the GitHub repository:

```bash
git remote add origin <your-github-repository-url>
```

Push:

```bash
git push -u origin main
```

---

# Deployment

The backend can be deployed to a service such as **Railway**.

The frontend can be deployed separately using a service such as **Vercel** or Railway.

For production deployment, update the frontend environment variable:

```env
VITE_API_URL=<production-backend-api-url>/api
```

The backend CORS configuration should also allow the deployed frontend domain.

> Note: SQLite is suitable for this assessment and local development. For a production application with multiple instances or higher traffic, a managed database such as PostgreSQL would be a better choice.

---

# Security Considerations

This project is designed as an assessment-level CRM application.

For a production system, additional security features would be required, such as:

* User authentication
* Role-based access control
* Secure secrets management
* Rate limiting
* Stronger input validation
* HTTPS
* Production database
* Audit logging
* More comprehensive automated tests

These are outside the current basic assessment implementation.

---

# Future Improvements

Possible improvements include:

* User authentication
* Agent accounts
* Role-based permissions
* Ticket assignment
* Pagination
* Advanced analytics
* File attachments
* Customer profiles
* Email notifications
* Ticket priority
* Ticket categories
* PostgreSQL support
* More comprehensive test coverage

---

# License

This project was created as a technical assessment project.

---

# Author

**Suraj Bhavake**

Built with:

**FastAPI + React + SQLite + SQLAlchemy**
