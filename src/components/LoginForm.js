import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function LoginForm() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const { login } = useAuth();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        loginData
      );
      console.log("Login Token: ", response.data.token);
      const token = response.data.token;
      login(token);
      navigate("/create-username");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred during login");
      }
    }
    setLoginData({
      email: "",
      password: "",
    });
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 position-absolute top-50 start-50 translate-middle">
          <main className="w-100 form-wrapper">
            <h1
              className="text-center"
              style={{ color: "cyan", fontFamily: "cursive" }}
            >
              Login
            </h1>
            <br></br>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                  required
                ></input>
                <label htmlFor="username">Username </label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  required
                ></input>
                <label htmlFor="password">Password </label>
              </div>
              <button className="btn btn-primary">Sign In</button> &nbsp;
              <Link to={"/signup"}>
                <button className="btn btn-primary" type="button">
                  Sign Up
                </button>
              </Link>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}
