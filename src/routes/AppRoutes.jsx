import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../components/pages/Dashboard";
import SigninForm from "../components/authentication/SigninForm";
import ProtectedRoute from "./ProtectedRoute";
import SignupForm from "../components/authentication/SignupForm";
import RedirectRoute from "./RedirectRoute";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/signin"
          element={
            <RedirectRoute>
              <SigninForm />
            </RedirectRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectRoute>
              <SignupForm />
            </RedirectRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
