import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import LeadList from "./pages/LeadList";
import CreateLead from "./pages/CreateLead";
import Register from "./pages/Register";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/leads"
          element={<LeadList />}
        />

        <Route
          path="/create-lead"
          element={<CreateLead />}
        />

        <Route
          path="/register"
          element={<Register />}
        />
        <Route path="/edit-lead/:id" element={<CreateLead />} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;