import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
export default function UsernameCreation() {
  const [inputValue, setInputValue] = useState("");
  const { token } = useAuth(); 
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/chat/${inputValue}`,{state:{token}});
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 position-absolute top-50 start-50 translate-middle">
          <main className="w-100 form-wrapper">
            <h1 className="text-center" style={{color:"cyan", fontFamily:"cursive"}}>Create Username</h1>
            <br></br>
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  required
                ></input>
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
