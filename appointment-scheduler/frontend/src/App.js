import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Providers from './pages/Providers';
import Appointments from './pages/Appointments';
import ScheduleAppointment from './pages/ScheduleAppointment';
import { AppointmentProvider } from './context/AppointmentContext';
import './App.css';

function App() {
  return (
    <AppointmentProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/providers" element={<Providers />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/schedule" element={<ScheduleAppointment />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AppointmentProvider>
  );
}

export default App;
