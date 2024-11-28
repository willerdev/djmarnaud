import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { AdminDashboardHome } from './pages/AdminDashboardHome';
import { AddTicket } from './pages/AddTicket';
import { EventsList } from './pages/EventsList';
import { BookedTickets } from './pages/BookedTickets';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/add-ticket" element={<AddTicket />} />
            <Route path="/booked-tickets" element={<BookedTickets />} />
            <Route path="/events-list" element={<EventsList />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-dashboard-home"
              element={
                <ProtectedRoute>
                  <AdminDashboardHome />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;