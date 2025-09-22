import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard"; // later you’ll create this

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  // const ProtectedRoute = ({ children }) => {
  //   return isAuthenticated ? children : <Navigate to="/login" />;
  // };

  return (
    <Router>
      <Routes>
        {/* Default route → if logged in go to dashboard, else go to register */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/register" />
          }
        />

        {/* Public routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Example protected route */}
        {/* <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </Router>
  );
}

export default App;