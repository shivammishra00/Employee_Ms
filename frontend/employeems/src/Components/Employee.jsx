import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './style.css';


function Employee() {
    const [employee, setemployee] = useState([])

    useEffect(() => {
        axios.get("http://localhost:5001/show_employee")
            .then(res => {
                // console.log(res)
                if (res.data.Status) {
                    setemployee(res.data.result)
                }
                else {
                    alert(res.data.Error)
                }
            })
            .catch(err => console.log(err))
    }, [])
    // console.log(employee)


    const handleDelete = (eid) => {
        axios.delete(`http://localhost:5001/delete_employee/` + eid)
            .then(res => {
                // console.log(res)
                if (res.data.Status) {
                    window.location.reload(true)  ///  isse page reload hota hai 
                }
                else {
                    alert(res.data.Error)
                }

            })
            .catch(err => console.log(err))
    }

    return (
        <div className='px-5 mt-3'>
            <div className='d-flex justify-content-center'>
                <h3>Employee List</h3>
            </div>
            <Link to="/dashboard/add_employee" className='btn btn-success'>Add Employee</Link>

            <div className='mt-3'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Eid</th>
                            <th>Ename</th>
                            <th>Email</th>
                            <th>Salary</th>
                            <th>Address</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {
                        employee.map((d, ind) => {
                            return (
                                <tbody>
                                    <tr>
                                        <td>{d.eid}</td>
                                        <td>{d.ename}</td>
                                        <td>{d.email}</td>
                                        <td>{d.salary}</td>
                                        <td>{d.address}</td>
                                        <td>
                                            <img src={`http://localhost:5001/Images/` + d.image}
                                                className='employee_image' alt='product img' />
                                        </td>

                                        <td>
                                            <Link to={`/dashboard/edit_employee/` + d.eid} className='btn btn-info btn-sm me-2'>Edit</Link>
                                            <button className='btn btn-warning btn-sm'
                                                onClick={() => handleDelete(d.eid)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            )
                        })
                    }
                </table>
            </div>
        </div>
    )
}

export default Employee
