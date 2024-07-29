import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './style.css';


function EmployeeDetaile() {
  const [employee, setemployee] = useState([]);
  const { eid } = useParams();
  const navigate = useNavigate();
  axios.defaults.withCredentials = true

  useEffect(() => {
    axios.get(`http://localhost:5001/employee_detail/` + eid)
      .then(res => {
        console.log(res.data)
        setemployee(res.data.result[0])
      })
      .catch(err => console.log(err))
  }, [eid])

  const handleLogout = () => {
    axios.get('http://localhost:5001/employee_logout')
      .then(res => {
        console.log(res)
        if (res.data.Status) {
          localStorage.removeItem("valid")  /// for route protect use 
          navigate('/')
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      <div className='p-2 d-flex justify-content-center shadow'>
        <h4>Employee Management System</h4>
      </div>
      <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
        <img src={`http://localhost:5001/Images/` + employee.image} alt='boy' className='emp_det_image' />
        <div className='d-flex align-items-center flex-column mt-5'>
          <h3>Name: {employee.ename}</h3>
          <h3>Eame: {employee.email}</h3>
          <h3>Salary: ${employee.salary}</h3>
        </div>
        <div>
          <button className='btn btn-primary me-2'>Edit</button>
          <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default EmployeeDetaile
