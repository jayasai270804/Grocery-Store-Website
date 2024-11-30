import React, { useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function login() {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })

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
    axios.get('http://localhost:8000/users', formData)
      .then(result => {
        result.data.map(user => {
          if (user.username === formData.username) {
            if (user.password === formData.password) {
              alert("Login Successfull")
              navigate('/Store')
            }
            else {
              isvalid = false;
              validationErrors.password = "Password is incorrect"
            }
          } else if (formData.username.length > 5) {
            isvalid = false;
            validationErrors.username = "Username is incorrect"

          }
        })
        setErrors(validationErrors)
        setValid(isvalid)
      }
      )
      .catch(err => console.log(err))

  }
  return (
    <div>
      <div class="login">
        <div class="login-card">
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
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
                <input type="password" placeholder="Enter Password" onChange={(event) => setFormData({ ...formData, password: event.target.value })} required />
                <i class='bx bxs-lock-alt'></i>
              </div>
            </div>
            <div class="r-f boot">
              <div><input type="checkbox" />
                <label>Remember me</label></div>
              <a href="#">Forgot password?</a>
            </div>
            <div class="sub">
              <button type="submit">Login</button>
            </div>
            <div class="sign-up">
              <p>Don't have an account
                <Link to='/Registration'>Sign Up</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default login
