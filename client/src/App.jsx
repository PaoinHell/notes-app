import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import React, { useContext } from "react";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/Signup";
import NotesList from "./pages/NotesList";

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  console.log("PrivateRoute user:", user);
  return user ? children : <Navigate to="/signin" />;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <NotesList />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
