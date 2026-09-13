import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getTicket,
  updateTicket,
} from "../services/api";

import "../App.css";


function TicketDetail() {
  const { ticketId } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);
  const [status, setStatus] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  async function loadTicket() {
    try {
      setLoading(true);
      setError("");

      const data = await getTicket(ticketId);

      setTicket(data);
      setStatus(data.status);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    loadTicket();
  }, [ticketId]);


  async function handleSave() {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      await updateTicket(ticketId, {
        status,
        notes: note,
      });

      setNote("");
      setSuccess("Ticket updated successfully.");

      await loadTicket();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }


  if (loading) {
    return (
      <div className="app">
        <main className="content">
          <p className="message">Loading ticket...</p>
        </main>
      </div>
    );
  }


  if (error && !ticket) {
    return (
      <div className="app">
        <main className="content">
          <p className="message error">{error}</p>

          <button
            className="secondary-button"
            onClick={() => navigate("/")}
          >
            Back to tickets
          </button>
        </main>
      </div>
    );
  }


  return (
    <div className="app">
      <header className="topbar">
        <div>
          <h1>{ticket.ticket_id}</h1>
          <p>Ticket details</p>
        </div>

        <button
          className="secondary-button"
          onClick={() => navigate("/")}
        >
          Dashboard
        </button>
      </header>


      <main className="content">
        <section className="detail-section">

          <div className="detail-header">
            <div>
              <h2>{ticket.subject}</h2>
              <p>{ticket.customer_name}</p>
            </div>

            <span className="status">
              {ticket.status}
            </span>
          </div>


          <div className="detail-grid">
            <div>
              <span className="detail-label">Customer name</span>
              <p>{ticket.customer_name}</p>
            </div>

            <div>
              <span className="detail-label">Customer email</span>
              <p>{ticket.customer_email}</p>
            </div>

            <div>
              <span className="detail-label">Created</span>
              <p>
                {new Date(ticket.created_at).toLocaleString()}
              </p>
            </div>

            <div>
              <span className="detail-label">Updated</span>
              <p>
                {new Date(ticket.updated_at).toLocaleString()}
              </p>
            </div>
          </div>


          <div className="description">
            <span className="detail-label">Description</span>
            <p>{ticket.description}</p>
          </div>


          <div className="notes-section">
            <h3>Notes</h3>

            {ticket.notes.length === 0 ? (
              <p className="empty-notes">
                No notes have been added yet.
              </p>
            ) : (
              <div className="notes-list">
                {ticket.notes.map((item) => (
                  <div className="note" key={item.id}>
                    <p>{item.note_text}</p>

                    <span>
                      {new Date(item.created_at).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>


          <div className="update-section">
            <h3>Update ticket</h3>

            <div className="form-group">
              <label htmlFor="status">
                Status
              </label>

              <select
                id="status"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
            </div>


            <div className="form-group">
              <label htmlFor="note">
                Add note
              </label>

              <textarea
                id="note"
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Add a note about this ticket..."
                rows="4"
              />
            </div>


            {error && (
              <p className="form-error">
                {error}
              </p>
            )}

            {success && (
              <p className="form-success">
                {success}
              </p>
            )}


            <button
              className="primary-button"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>

        </section>
      </main>
    </div>
  );
}


export default TicketDetail;