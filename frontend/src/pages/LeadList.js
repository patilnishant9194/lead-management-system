import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function LeadList() {
  const role = localStorage.getItem("role");

  const navigate = useNavigate();

  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [source, setSource] = useState("");
  const [sort, setSort] = useState("DESC");
  const [page, setPage] = useState(1);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchLeads();
  }, [search, status, source, sort, page]);

  const fetchLeads = async () => {
    try {


      const token = localStorage.getItem("token");

      const response = await api.get(
        `/leads?search=${search}&status=${status}&source=${source}&sort=${sort}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setLeads(response.data);

    } catch (err) {
      console.log(err);
    }
  };

  const deleteLead = async (id) => {

    try {

      const token = localStorage.getItem("token");

      const confirmDelete = window.confirm(
        "Are you sure you want to delete this lead?"
      );

      if (!confirmDelete) return;

      await api.delete(
        `/leads/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Lead Deleted Successfully");

      fetchLeads();

    } catch (err) {

      console.log(err);

      alert("Failed to Delete Lead");

    }

  };

  return (

    <div className="container mt-5">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>Lead List</h2>

      </div>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search Lead By Name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select
        className="form-control mb-3"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">All Status</option>
        <option value="New">New</option>
        <option value="Contacted">Contacted</option>
        <option value="Qualified">Qualified</option>
        <option value="Closed">Closed</option>
      </select>
      <select
        className="form-control mb-3"
        value={source}
        onChange={(e) => setSource(e.target.value)}
      >
        <option value="">All Sources</option>
        <option value="Website">Website</option>
        <option value="LinkedIn">LinkedIn</option>
        <option value="Facebook">Facebook</option>
        <option value="Referral">Referral</option>
      </select>
      <select
        className="form-control mb-3"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="DESC">Newest First</option>
        <option value="ASC">Oldest First</option>
      </select>

      <table className="table table-bordered table-striped shadow">

        <thead className="table-dark">

          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Source</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {leads.length > 0 ? (

            leads.map((lead) => (

              <tr key={lead.id}>

                <td>{lead.id}</td>
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.phone}</td>
                <td>{lead.source}</td>
                <td>{lead.status}</td>

                <td>

                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => navigate(`/edit-lead/${lead.id}`)}
                  >
                    Edit
                  </button>

                  {role === "Admin" && (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteLead(lead.id)}
                    >
                      Delete
                    </button>
                  )}

                </td>

              </tr>

            ))

          ) : (

            <tr>
              <td colSpan="7" className="text-center">
                No Leads Found
              </td>
            </tr>

          )}

        </tbody>

      </table>
      <div className="d-flex justify-content-center gap-3 mt-3">

        <button
          className="btn btn-secondary"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>

        <span className="mt-2">
          Page {page}
        </span>

        <button
          className="btn btn-secondary"
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>

      </div>

    </div>

  );

}

export default LeadList;