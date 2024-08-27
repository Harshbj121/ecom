// import React from 'react'

import { Link, useNavigate } from "react-router-dom"
import { API_BASE_URL } from "../config";
import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = (event) => {
    event.preventDefault();

    const requestData = { email: email, password: password };
    axios.post(`${API_BASE_URL}/auth/login`, requestData)
      .then((result) => {
        if (result) {
          console.log(result);
          localStorage.setItem('token', result.data.result.token);
          localStorage.setItem('user', JSON.stringify(result.data.result.user));
          // dispatch({ type: 'LOGIN_SUCCESS', payload: result.data.result.user });
          navigate('/')
        }

        setemail('');
        setpassword('');
      })
      .catch((error) => {
        alert(error)
      })
  }
  return (
    <div className="d-flex flex-column align-items-center mt-3" >
      <h2>Login</h2>
      <form style={{width:'40%'}} className="border p-2 " onSubmit={(e) => login(e)}>
        <div className="form-group mt-1">
          <label htmlFor="InputEmail1" className="fs-5">Email address</label>
          <input type="email" className="form-control" id="InputEmail1" value={email} onChange={(e) => setemail(e.target.value)} aria-describedby="emailHelp" placeholder="Enter email"/>
        </div>
        <div className="form-group mt-1">
          <label htmlFor="InputPassword1" className="fs-5">Password</label>
          <input type="password" className="form-control" id="InputPassword1" value={password} onChange={(e) => setpassword(e.target.value)} placeholder="Password"/>
        </div>
        <button type="submit" className="btn btn-primary mt-2">Submit</button>
      </form>
      <p className="mt-2 ">Not Registered ?? <Link to='/register' className="fw-bold">Register</Link></p>
    </div>
  )
}

export default Login