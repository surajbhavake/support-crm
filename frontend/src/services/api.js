const API_URL = import.meta.env.VITE_API_URL;


export async function getTickets(search = "", status = "") {
  const params = new URLSearchParams();

  if (search) {
    params.append("search", search);
  }

  if (status) {
    params.append("status", status);
  }

  const query = params.toString();

  const response = await fetch(
    `${API_URL}/tickets${query ? `?${query}` : ""}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch tickets");
  }

  return response.json();
}


export async function createTicket(ticketData) {
  const response = await fetch(`${API_URL}/tickets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ticketData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to create ticket");
  }

  return response.json();
}


export async function getTicket(ticketId) {
  const response = await fetch(`${API_URL}/tickets/${ticketId}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to fetch ticket");
  }

  return response.json();
}


export async function updateTicket(ticketId, ticketData) {
  const response = await fetch(`${API_URL}/tickets/${ticketId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ticketData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to update ticket");
  }

  return response.json();
}