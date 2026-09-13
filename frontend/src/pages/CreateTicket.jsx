import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../App.css";
import { createTicket } from "../services/api";


function CreateTicket() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    subject: "",
    description: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }


  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (
      !form.customer_name.trim() ||
      !form.customer_email.trim() ||
      !form.subject.trim() ||
      !form.description.trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      const ticket = await createTicket(form);

      navigate(`/tickets/${ticket.ticket_id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="app">
      <header className="topbar">
        <div>
          <h1>Create Ticket</h1>
          <p>Create a new customer support ticket</p>
        </div>

        <button
          className="secondary-button"
          onClick={() => navigate("/")}
        >
          Dashboard
        </button>
      </header>


      <main className="content">
        <section className="form-section">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="customer_name">
                Customer name
              </label>

              <input
                id="customer_name"
                name="customer_name"
                type="text"
                value={form.customer_name}
                onChange={handleChange}
                placeholder="John Doe"
              />
            </div>


            <div className="form-group">
              <label htmlFor="customer_email">
                Customer email
              </label>

              <input
                id="customer_email"
                name="customer_email"
                type="email"
                value={form.customer_email}
                onChange={handleChange}
                placeholder="john@example.com"
              />
            </div>


            <div className="form-group">
              <label htmlFor="subject">
                Subject
              </label>

              <input
                id="subject"
                name="subject"
                type="text"
                value={form.subject}
                onChange={handleChange}
                placeholder="Unable to login"
              />
            </div>


            <div className="form-group">
              <label htmlFor="description">
                Description
              </label>

              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the customer's issue..."
                rows="7"
              />
            </div>


            {error && (
              <p className="form-error">
                {error}
              </p>
            )}


            <button
              className="primary-button"
              type="submit"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Ticket"}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}


export default CreateTicket;