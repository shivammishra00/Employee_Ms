import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import './style.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [values, setvalues] = useState({
    email: "",
    password: ""
  })

  const [error, seterror] = useState(null)  // err ko dom me dekhne ke liye wrong email dalne par
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;  //token genrate ke liye frontend me use karna padega

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5001/savedata", values)
      .then((res) => {
        console.log(res)
        if (res.data.loginStatus) {
          localStorage.setItem("valid", true) // it means valid or not valid , login or not
          navigate("/dashboard")
        }
        else {
          seterror(res.data.Error)
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
      <div className=' p-3 rounded w-25 border loginForm'>
        <div className='text-warning'>
          {error && error}
        </div>
        <h2>Admin Login</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3'>
            <lable htmlFor="email"><strong>Email </strong></lable><br />
            <Form.Control type='email' placeholder='Enter Email' name='email'
              className='form-control-rounded-0' value={values.email} onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })} />
          </Form.Group>
          <Form.Group className='mb-3'>
            <lable htmlFor="password"><strong>Password </strong></lable><br />
            <Form.Control type='password' placeholder='Enter Password' name='password'
              className='form-control-rounded-0' value={values.password} onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })} />
          </Form.Group>
          <button type='submit' className='btn btn-success w-100 rounded-0 mb-2'>Log in</button>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="You are Agree with terms & conditions" />
          </Form.Group>
        </Form>
      </div>

    </div>
  )
}

export default Login
