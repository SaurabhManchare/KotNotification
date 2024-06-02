import React, { useState } from 'react';
import { database } from '../services/firebase';
import { ref, set } from 'firebase/database';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom';


const CreateUserForm = () => {
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const generateToken = () => {
    // Generate a random alphanumeric token
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 20; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!mobileNo || !password) {
      alert('Please enter mobile number and password');
      return;
    }
  
    const token = generateToken();

    
    set(ref(database, `users/${mobileNo}`), {
      mobileno: mobileNo,
      password: password,
      token: token,
     
    }).then(() => {
      navigate("/")
      alert('User registered successfully!');
     
    }).catch((error) => {
      console.error('Error registering user:', error);
      alert('Failed to register user. Please try again later.');
    });

   
    setMobileNo('');
    setPassword('');
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
            <i className="fa-solid fa-filter Iconcolor"></i>
          </div>
        </div>
      </nav>

      <div className="container mt-2">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4">
            <h3 className="text-center">
              <b><i>Register</i></b>
            </h3>
            <form onSubmit={handleRegister}>
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
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="position-absolute end-0 top-50 translate-middle-y me-3"
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
                  Register
                </button>
              </div>
              {/* Register link */}
              <div className="text-center">
                <p>
                  Already a member? <Link to="/">Sign in</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateUserForm;
