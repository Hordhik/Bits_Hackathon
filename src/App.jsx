// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import EventPage from "./pages/EventPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event/:eventId" element={<EventPage />} />
      </Routes>
    </Router>
  );
}

export default App;
