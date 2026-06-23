import { useState } from "react";
import api from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Manager");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      alert("Registration successful");
    } catch (err) {
      console.log(err);
      alert("Registration failed");
    }
  };

  const styles = {
    container: {
      width: "350px",
      margin: "50px auto",
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "10px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      textAlign: "center",
      backgroundColor: "#fff",
    },
    input: {
      width: "100%",
      padding: "10px",
      margin: "8px 0",
      border: "1px solid #ccc",
      borderRadius: "5px",
      boxSizing: "border-box",
    },
    select: {
      width: "100%",
      padding: "10px",
      margin: "8px 0",
      border: "1px solid #ccc",
      borderRadius: "5px",
    },
    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
    },
    heading: {
      marginBottom: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Register</h1>

      <form onSubmit={handleRegister}>
        <input
          style={styles.input}
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          style={styles.select}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="Agent">Agent</option>
        </select>

        <button style={styles.button} type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;