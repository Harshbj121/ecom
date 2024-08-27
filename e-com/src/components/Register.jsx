// import React from 'react'

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { API_BASE_URL } from "../config";
import axios from "axios";

const Register = () => {

  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const register = (event) => {
    event.preventDefault();

    const requestData = { firstname: firstname, lastname: lastname, email: email, password: password };
    axios.post(`${API_BASE_URL}/auth/register`, requestData)
      .then((result) => {
        if (result) {
          navigate('/login');
        }
        setfirstname('');
        setlastname('');
        setemail('');
        setpassword('');
      })
      .catch((error) => {
        console.log(error);
      })
  }


  return (
    <div className="d-flex flex-column align-items-center mt-3" >
      <h2>Register</h2>
      <form style={{ width: '40%' }} className="border p-2 " onSubmit={(e) => { register(e) }}>
        <div className="form-group mt-1">
          <label htmlFor="InputFirstName" className="fs-5">First Name</label>
          <input type="text" className="form-control" id="InputFirstName" aria-describedby="emailHelp" value={firstname} onChange={(e) => setfirstname(e.target.value)} placeholder="Enter First Name" />
        </div>
        <div className="form-group mt-1">
          <label htmlFor="InputLastName" className="fs-5">Last Name</label>
          <input type="text" className="form-control" id="InputLastName" aria-describedby="emailHelp" value={lastname} onChange={(e) => setlastname(e.target.value)} placeholder="Enter Last Name" />
        </div>
        <div className="form-group mt-1">
          <label htmlFor="InputEmail1" className="fs-5" >Email address</label>
          <input type="email" className="form-control" id="InputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setemail(e.target.value)} placeholder="Enter email" />
        </div>
        <div className="form-group mt-1">
          <label htmlFor="InputPassword1" className="fs-5">Password</label>
          <input type="password" className="form-control" id="InputPassword1" value={password} onChange={(e) => setpassword(e.target.value)} placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-primary mt-2">Submit</button>
      </form>
      <p className="mt-2 ">Already Registered ?? <Link to='/login' className="fw-bold">Login</Link></p>
    </div>
  )
}

export default Register