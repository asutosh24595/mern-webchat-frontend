import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  const [signUpData, setSignUpData] = useState({
    fullname: "",
    email: "",
    phno: "",
  });

  const [error, setError] = useState(null);
  const [succMsg, setSuccMsg] = useState(null);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/signup",
        signUpData
      );
      console.log(response.data.data);
      if (response.status === 201) {
        console.log("User signed up successfully!");
        setSuccMsg(response.data.message);
        setError(null);
      } else {
        console.error("Unexpected response status:", response.status);
      }
      setSignUpData({
        fullname: "",
        email: "",
        phno: "",
      });
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
      }else{
        setError("An error occurred during sign up");
        console.error("Error signing up:", error.message);
      }
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 position-absolute top-50 start-50 translate-middle">
          <main className="w-100 form-wrapper">
            <h1  className="text-center" style={{color:"cyan", fontFamily:"cursive"}}>Sign Up</h1>
            <br></br>
            {succMsg && <div className="alert alert-success mt-3">{succMsg}</div>}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={signUpData.fullname}
                  onChange={(e) =>
                    setSignUpData({ ...signUpData, fullname: e.target.value })
                  }
                  required
                ></input>
                <label htmlFor="fullname">Full Name </label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  value={signUpData.email}
                  onChange={(e) =>
                    setSignUpData({ ...signUpData, email: e.target.value })
                  }
                  required
                ></input>
                <label htmlFor="email">Email </label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={signUpData.phno}
                  onChange={(e) =>
                    setSignUpData({ ...signUpData, phno: e.target.value })
                  }
                  required
                  pattern="\d{10}"
                  title="Please enter exactly 10 digits"
                ></input>
                <label htmlFor="phno">Phone No </label>
              </div>
              <button className="btn btn-primary">Submit</button> &nbsp;
              <Link to={"/"}>
                <button className="btn btn-primary" type="button">
                  Cancel
                </button>
              </Link>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}
