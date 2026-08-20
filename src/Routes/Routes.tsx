import { Routes, Route } from "react-router-dom";
import Login from "../Features/Login/Components/Login";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../Home";
import CreateNewUser from "../Features/Login/Components/CreateNewUser";

export default function App() {
  return (
    <main>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/createNewUser" element={<CreateNewUser/>}/>

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </main>
  );
}
