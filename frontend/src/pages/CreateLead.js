import { useState } from "react";

import api from "../services/api";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function CreateLead() {

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const { id } = useParams();

  const [phone, setPhone] =
    useState("");

  const [source, setSource] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [notes, setNotes] =
    useState("");
  const fetchLead = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await api.get(
        `/leads/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setName(response.data.name);
      setEmail(response.data.email);
      setPhone(response.data.phone);
      setSource(response.data.source);
      setStatus(response.data.status);
      setNotes(response.data.notes);

    } catch (err) {

      console.log(err);

    }

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      if (id) {

        await api.put(
          `/leads/${id}`,
          {
            name,
            email,
            phone,
            source,
            status,
            notes
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        alert("Lead Updated");

      } else {

        await api.post(
          "/leads/create",
          {
            name,
            email,
            phone,
            source,
            status,
            notes
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        alert("Lead Created");

      }

    } catch (err) {

      console.log(err);

      alert("Operation Failed");

    }

  };

  return (

    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-6">

          <div className="card p-4 shadow">

            <h2 className="mb-4 text-center">
              {id ? "Update Lead" : "Create Lead"}
            </h2>


            <form onSubmit={handleSubmit}>

              <input
                type="text"
                className="form-control mb-3"
                placeholder="Name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

              <input
                type="email"
                className="form-control mb-3"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

              <input
                type="text"
                className="form-control mb-3"
                placeholder="Phone"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
              />

              <select
                className="form-control mb-3"
                value={source}
                onChange={(e) =>
                  setSource(e.target.value)
                }
              >
                <option value="">
                  Select Source
                </option>

                <option value="Website">
                  Website
                </option>

                <option value="LinkedIn">
                  LinkedIn
                </option>

                <option value="Facebook">
                  Facebook
                </option>

                <option value="Referral">
                  Referral
                </option>
              </select>

              <select
                className="form-control mb-3"
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
              >
                <option value="">
                  Select Status
                </option>

                <option value="New">
                  New
                </option>

                <option value="Contacted">
                  Contacted
                </option>

                <option value="Qualified">
                  Qualified
                </option>

                <option value="Closed">
                  Closed
                </option>
              </select>

              <textarea
                className="form-control mb-3"
                placeholder="Notes"
                value={notes}
                onChange={(e) =>
                  setNotes(e.target.value)
                }
              />

              <button
                className="btn btn-success w-100"
                type="submit"
              >
                {id ? "Update Lead" : "Create Lead"}
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>

  );

}

export default CreateLead;