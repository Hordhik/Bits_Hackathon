<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import Home from "./pages//Home";
=======
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './components/Login';
import Register from './components/Register';
import OrganizerDashboard from './components/OrganizerDashboard';
import EventList from './components/EventList';
import { theme } from './theme';

const PrivateRoute = ({ children, allowedRole }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const isAuthenticated = !!localStorage.getItem('token');

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/" />;
  }

  return children;
};
>>>>>>> 329b10d (Updated app and main file)

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
<<<<<<< HEAD
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
      </Routes>
=======
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/organizer-dashboard"
          element={
            <PrivateRoute allowedRole="organizer">
              <OrganizerDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/events"
          element={
            <PrivateRoute allowedRole="attendee">
              <EventList />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </ThemeProvider>
>>>>>>> 329b10d (Updated app and main file)
  );
}

export default App;
