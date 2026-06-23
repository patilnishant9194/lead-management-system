import { useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await api.post(
        "/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );
      localStorage.setItem(
  "role",
  response.data.user.role
);
      alert("Login successful");

      navigate("/dashboard");

    } catch (err) {

      console.log(err);

      alert("Login failed");

    }

  };

  return (

  <div className="container mt-5">

    <div className="row justify-content-center">

      <div className="col-md-4">

        <div className="card p-4 shadow">

          <h2 className="text-center mb-4">
            Login
          </h2>

        <form onSubmit={handleLogin}>

  <input
    type="email"
    className="form-control mb-3"
    placeholder="Enter Email"
    value={email}
    onChange={(e) =>
      setEmail(e.target.value)
    }
  />

  <input
    type="password"
    className="form-control mb-3"
    placeholder="Enter Password"
    value={password}
    onChange={(e) =>
      setPassword(e.target.value)
    }
  />

  <button
    className="btn btn-primary w-100"
    type="submit"
  >
    Login
  </button>

</form>

<p className="text-center mt-3">
  Don't have an account?{" "}
  <a href="/register">
    Register Here
  </a>
</p>

        </div>

      </div>

    </div>

  </div>

);

}

export default Login;