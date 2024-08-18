import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import CalendarPage from "./pages/Calendar.page";

function App() {
  const date = new Date().toISOString().split("-");
  const url = `year/${date[0]}/month/${date[1]}`;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={url} replace />} />
        <Route path="/year/:year/month/:month" element={<CalendarPage />} />
      </Routes>
    </Router>
  );
}

export default App;
