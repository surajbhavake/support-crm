from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_home():
    response = client.get("/")

    assert response.status_code == 200
    assert response.json() == {
        "message": "Support CRM API is running"
    }


def test_create_ticket():
    response = client.post(
        "/api/tickets",
        json={
            "customer_name": "Test User",
            "customer_email": "test@example.com",
            "subject": "Test ticket",
            "description": "This is a test ticket."
        }
    )

    assert response.status_code == 201

    data = response.json()

    assert "ticket_id" in data
    assert "created_at" in data