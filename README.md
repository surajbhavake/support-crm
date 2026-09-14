# Support CRM

A simple customer support ticketing CRM built with FastAPI, React, SQLite, and SQLAlchemy.

## Features

- Create support tickets
- Automatic ticket IDs such as TKT-001
- View all tickets
- Search tickets by customer, email, subject, description, or ticket ID
- Filter tickets by status
- View ticket details
- Update ticket status
- Add notes to tickets
- Responsive dashboard

## Tech Stack

### Backend

- FastAPI
- SQLAlchemy
- SQLite
- Pydantic
- Uvicorn

### Frontend

- React
- Vite
- React Router

## Project Structure

```text
support-crm/
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   ├── database.py
│   │   ├── main.py
│   │   ├── models.py
│   │   └── schemas.py
│   ├── tests/
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── .env.example
│
└── .gitignore
Running the Backend

Go to the backend folder:

cd backend

Create and activate the virtual environment:

python3 -m venv .venv
source .venv/bin/activate

Install dependencies:

pip install -r requirements.txt

Start the server:

uvicorn app.main:app --reload

The API will run at:

http://127.0.0.1:8000

API documentation:

http://127.0.0.1:8000/docs
Running the Frontend

Open another terminal and go to:

cd frontend

Install dependencies:

npm install

Create a .env file:

VITE_API_URL=http://127.0.0.1:8000/api

Start the development server:

npm run dev

The frontend will run at:

http://localhost:5173
Running Tests

From the backend folder:

pytest
API Endpoints
Method	Endpoint	Description
POST	/api/tickets	Create a ticket
GET	/api/tickets	Get tickets
GET	/api/tickets/{ticket_id}	Get ticket details
PUT	/api/tickets/{ticket_id}	Update ticket
Ticket Statuses
Open
In Progress
Closed