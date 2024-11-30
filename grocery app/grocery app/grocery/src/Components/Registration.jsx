import React, { useState } from 'react'
import "./Registration.css"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';



const Registration = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    mobile: "",
    address: ""
  });

  const [errors, setErrors] = useState({})
  const [valid, setValid] = useState(true)
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData)
    let isvalid = true;
    let validationErrors = {}
    if (formData.username.length < 5) {
      isvalid = false;
      validationErrors.username = "Username should be atleast 5 characters"
    }
    if (formData.password.length < 8) {
      isvalid = false;
      validationErrors.password = "Password should be atleast 8 characters"
    }

    setErrors(validationErrors)
    setValid(isvalid)
    if(Object.keys(validationErrors).length === 0) {
      axios.post('http://localhost:8000/users', formData)
        .then(result =>{
          alert("Registration Successfull")
          navigate('/login')
        }
        )
        .catch(err => console.log(err))
    }
  }
  return (
    <div>
      <div class="login">
        <div class="login-card">

          <form onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            {
              valid ? <></> :
                <span className="text-danger">
                  {errors.username};{errors.password}
                </span>
            }
            <div class="enter-columns">
              <div class="input">
                <input type="text" placeholder="Enter Username" onChange={(event) => setFormData({ ...formData, username: event.target.value })} required />
                <i class='bx bxs-user'></i>
              </div>
              <div class="input">
                <input type="email" placeholder="Enter Email" onChange={(event) => setFormData({ ...formData, email: event.target.value })} required />
                <i class='bx bx-envelope'></i>
              </div>
              <div class="input">
                <input type="password" placeholder="Enter Password" onChange={(event) => setFormData({ ...formData, password: event.target.value })} required />
                <i class='bx bxs-lock'></i>
              </div>
              <div class="input">
                <input type="tel" placeholder="Enter Mobile number" onChange={(event) => setFormData({ ...formData, mobile: event.target.value })} required />
                <i class='bx bxs-phone'></i>
              </div>

              <div class="input">
                <input type="text" placeholder="Enter Address" onChange={(event) => setFormData({ ...formData, address: event.target.value })} required />
                <i class='bx bxs-home'></i>
              </div>

              <div class="sub">
                <button type="submit">Sign Up</button>
              </div>

              <div class="sign-up">
                <p>Already had an account
                  <Link to='/login'>Login</Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registration
