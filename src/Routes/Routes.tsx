import { Routes, Route } from "react-router-dom";
import Login from "../Features/Login/Components/Login";
import ProtectedRoute from "./ProtectedRoute";

import CreateNewUser from "../Features/Login/Components/CreateNewUser";
import CreateTask from "../Features/Task/Components/CreateTask/CreateTask";
import CreateCategory from "../Features/Task/Components/CreateCategory/CreateCategory";

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
              <CreateCategory />
            </ProtectedRoute>
          }
        />
      </Routes>
    </main>
  );
}
