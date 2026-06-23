import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/");

  };

  return (

    <div className="container mt-5">

      <h1 className="mb-3">
        Lead Management Dashboard
      </h1>

      <div className="alert alert-info">
        Logged in as <b>{role}</b>
      </div>


      <div className="d-flex gap-3">
        <button
          className="btn btn-danger"
          onClick={handleLogout}
        >
          Logout
        </button>

        <Link
          className="btn btn-primary"
          to="/leads"
        >
          View Leads
        </Link>

        {(role === "Manager" || role === "Admin") && (
          <Link
            className="btn btn-success"
            to="/create-lead"
          >
            Create Lead
          </Link>
        )}

      </div>

    </div>

  );

}

export default Dashboard;