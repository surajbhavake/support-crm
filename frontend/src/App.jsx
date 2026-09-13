import { Navigate, Route, Routes } from "react-router-dom";

import CreateTicket from "./pages/CreateTicket";
import Dashboard from "./pages/Dashboard";
import TicketDetail from "./pages/TicketDetail";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/tickets/new" element={<CreateTicket />} />
      <Route path="/tickets/:ticketId" element={<TicketDetail />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}


export default App;