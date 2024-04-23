import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [adminTotal, setadminTotal] = useState();
  const [emoloyeeTotal, setemoloyeeTotal] = useState();
  const [salaryTotal, setsalaryTotal] = useState();
  const [admin, setadmin] = useState([]);

  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
    AdminRecords();
  }, [])

  const AdminRecords = () => {
    axios.get('http://localhost:5001/admin_records')
      .then(res => {
        console.log(res)
        if (res.data.Status) {
          setadmin(res.data.result)
        }
        else {
          alert(res.data.Error)
        }
      })
  }

  const adminCount = () => {
    axios.get('http://localhost:5001/admin_count')
      .then(res => {
        console.log(res)
        if (res.data.Status) {
          setadminTotal(res.data.result[0].admin)
        }
        else {
          alert(res.data.Error)
        }
      })
  }

  const employeeCount = () => {
    axios.get('http://localhost:5001/employee_count')
      .then(res => {
        console.log(res)
        if (res.data.Status) {
          setemoloyeeTotal(res.data.result[0].employee)
        }
        else {
          alert(res.data.Error)
        }
      })
  }

  const salaryCount = () => {
    axios.get('http://localhost:5001/salary_count')
      .then(res => {
        console.log(res)
        if (res.data.Status) {
          setsalaryTotal(res.data.result[0].totalSalary)
        }
        else {
          alert(res.data.Error)
        }
      })
  }
  return (
    <div style={{overflowY: "auto"}}>

      <div className='p-3 d-flex justify-content-around mt-3'>

        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Admin</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-around'>
            <h5>Total:</h5>
            <h5>{adminTotal}</h5>
          </div>
        </div>

        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Employee</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-around'>
            <h5>Total:</h5>
            <h5>{emoloyeeTotal}</h5>
          </div>
        </div>

        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Salary</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-around'>
            <h5>Total:</h5>
            <h5>${salaryTotal}</h5>
          </div>
        </div>

      </div>

      <div className='mt-4 px-5 pt-3'>
        <h3>List of Admins</h3>
        <table className='table'>
          <thead>
            <tr>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              admin.map((d, ind) => {
                return (
                  <tr>
                    <td>{d.email}</td>
                    <td>
                      <Link  className='btn btn-info btn-sm me-2'>Edit</Link>
                      <button className='btn btn-warning btn-sm'
                        // onClick={() => handleDelete(d.eid)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home
