
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../App.css";
import { getTickets } from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadTickets() {
    try {
      setLoading(true);
      setError("");

      const data = await getTickets(search, status);
      setTickets(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      loadTickets();
    }, 300);

    return () => clearTimeout(timer);
  }, [search, status]);

  const totalTickets = tickets.length;

  const openTickets = tickets.filter(
    (ticket) => ticket.status === "Open"
  ).length;

  const closedTickets = tickets.filter(
    (ticket) => ticket.status === "Closed"
  ).length;

  return (
    <div className="app">
      <header className="topbar">
        <div>
          <h1>Support CRM</h1>
          <p>Customer support tickets</p>
        </div>

        <button
          className="primary-button"
          onClick={() => navigate("/tickets/new")}
        >
          + Create Ticket
        </button>
      </header>

      <main className="content">
        <section className="stats">
          <div className="stat-card">
            <span>Total tickets</span>
            <strong>{totalTickets}</strong>
          </div>

          <div className="stat-card">
            <span>Open tickets</span>
            <strong>{openTickets}</strong>
          </div>

          <div className="stat-card">
            <span>Closed tickets</span>
            <strong>{closedTickets}</strong>
          </div>
        </section>

        <section className="toolbar">
          <input
            type="text"
            placeholder="Search by customer, email, subject or ticket ID..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value="">All statuses</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </section>

        <section className="ticket-section">
          <div className="section-header">
            <div>
              <h2>Tickets</h2>
              <span>{tickets.length} tickets</span>
            </div>

            <button
              className="secondary-button"
              onClick={() => navigate("/tickets/new")}
            >
              Create Ticket
            </button>
          </div>

          {loading && (
            <p className="message">Loading tickets...</p>
          )}

          {error && (
            <p className="message error">{error}</p>
          )}

          {!loading && !error && tickets.length === 0 && (
  <div className="empty-state">
    <p>No tickets found.</p>

    <button
      className="primary-button"
      onClick={() => navigate("/tickets/new")}
    >
      Create your first ticket
    </button>
  </div>
)}

          {!loading && !error && tickets.length > 0 && (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Ticket</th>
                    <th>Customer</th>
                    <th>Subject</th>
                    <th>Status</th>
                    <th>Created</th>
                  </tr>
                </thead>

                <tbody>
                  {tickets.map((ticket) => (
                    <tr
                      key={ticket.ticket_id}
                      className="ticket-row"
                      onClick={() =>
                        navigate(`/tickets/${ticket.ticket_id}`)
                      }
                    >
                      <td>{ticket.ticket_id}</td>
                      <td>{ticket.customer_name}</td>
                      <td>{ticket.subject}</td>

                      <td>
                        <span
                          className={`status status-${ticket.status
                            .toLowerCase()
                            .replace(" ", "-")}`}
                        >
                          {ticket.status}
                        </span>
                      </td>

                      <td>
                        {new Date(
                          ticket.created_at
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
