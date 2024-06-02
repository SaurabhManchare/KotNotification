import React, { useState, useEffect } from "react";
import { database } from "../services/firebase";
import { ref, onValue } from "firebase/database";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";


const LoginForm = () => {
  const [data, setData] = useState(null);
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const dataRef = ref(database, "users");
    onValue(dataRef, (snapshot) => {
      const fetchedData = snapshot.val();
      setData(fetchedData);
    });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!mobileNo || !password) {
      alert("Please enter mobile number and password");
      return;
    }
    const user = Object.values(data).find(
      (user) => user.mobileno === mobileNo && user.password === password
    );
    if (user) {
      alert("Login successful!");
      console.log("User token:", user.token);
      localStorage.setItem("mobileNo", mobileNo);
      navigate("/Message");
    } else {
      alert("Invalid mobile number or password");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
       <nav className="navbar navbar-expand-lg navbar-light shadow-sm p-3 mb-5 bg-body rounded sticky-top">
        <div className="container">
          <a className="navbar-brand" href="#">
            <b className="logocolor">BillTraceAlert</b>
          </a>
          <div className="d-flex justify-content-between align-items-center">
            <i className="fa-sharp fa-solid fa-arrow-right-from-bracket me-3 Iconcolor"></i>
            <i
              className="fa-solid fa-filter Iconcolor"
             
            ></i>
          </div>
        </div>
      </nav>

      <div className="container mt-2">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4">
            <h3 className="text-center">
            <b>  <i>Login</i></b>
            </h3>
            <form onSubmit={handleLogin}>
              {/* Mobile Number input */}
              <div className="form-outline mb-4 mt-3">
              <label className="form-label" htmlFor="mobileNo">
                  Mobile No
                </label>
                <input
                  type="text"
                  id="mobileNo"
                  name="mobileNo"
                  className="form-control"
                  placeholder="Mobile Number"
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                />
                
              </div>
              {/* Password input */}
              <div className="form-outline mb-4 position-relative">
              <label className="form-label" htmlFor="password">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="Password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              
                <span
                  className="position-absolute end-0 top-50  translate-middle-y me-3"
                  style={{ cursor: "pointer" }}
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
              </div>
              {/* Submit button */}
              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-primary btn-block mb-4"
                >
                  Sign in
                </button>
              </div>
              {/* Register link */}
              <div className="text-center">
                <p>
                  Not a member? <Link to="/createuser">Register</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
