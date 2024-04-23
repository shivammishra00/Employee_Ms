import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import axios from 'axios';

function EditEmployee() {
    const { eid } = useParams()  ///  params ka data store karne ke liye hota hai  ..
    const [employee, setemployee] = useState({
        ename: "",
        email: "",
        salary: "",
        address: "",
        did: ""
    })
    const [show, setshow] = useState([]);  // select for category in select tag
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5001/show_category')
            .then(res => {
                console.log(res)
                if (res.data.Status) {
                    setshow(res.data.result)
                }
                else {
                    alert(res.data.Error)
                }

            })
            .catch(err => console.log(err))

        axios.get('http://localhost:5001/show_employee/' + eid)
            .then(res => {
                console.log(res.data)  /// check karne ke liye ..

                setemployee({    /// value update kiye yaha par....
                    ...employee,
                    eid: res.data.result[0].eid,
                    ename: res.data.result[0].ename,
                    email: res.data.result[0].email,
                    address: res.data.result[0].address,
                    salary: res.data.result[0].salary,
                    did: res.data.result[0].did,
                })
            })
            .catch(err => console.log(err))
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:5001/edit_employee/` + eid, employee)
            .then(res => {
                console.log(res)
                if (res.data.Status) {
                    navigate("/dashboard/employee")
                }
                else {
                    alert(res.data.Error)
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='d-flex justify-content-center align-items-center mt-3  '>
            <div className=' p-3 rounded w-50 border '>
                <h3 className='text-center'>Edit Employee</h3>
                <Form className='row g-1' onSubmit={handleSubmit} >

                    <Form.Group className='mb-2'>
                        <lable htmlFor="eid">Employee Id: </lable><br />
                        <Form.Control type='text' readOnly placeholder='Enter eid' name='eid'
                            className='form-control-rounded-0' id='eid'
                            value={employee.eid}
                            onChange={(e) => setemployee({ ...employee, [e.target.name]: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group className='mb-2'>
                        <lable htmlFor="ename">Employee Name: </lable><br />
                        <Form.Control type='text' placeholder='Enter employe' name='ename'
                            className='form-control-rounded-0' id='ename'
                            value={employee.ename}
                            onChange={(e) => setemployee({ ...employee, [e.target.name]: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group className='mb-2'>
                        <lable htmlFor="email">Email:</lable><br />
                        <Form.Control type='email' placeholder='Enter email' name='email'
                            className='form-control-rounded-0' autoComplete='off' id='email'
                            value={employee.email}
                            onChange={(e) => setemployee({ ...employee, [e.target.name]: e.target.value })}
                        />
                    </Form.Group>


                    <Form.Group className='mb-2'>
                        <lable htmlFor="salary">Salary: </lable><br />
                        <Form.Control type='number' placeholder='Enter salary' name='salary'
                            className='form-control-rounded-0' id='salary'
                            value={employee.salary}
                            onChange={(e) => setemployee({ ...employee, [e.target.name]: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group className='mb-2'>
                        <lable htmlFor="address">Address: </lable><br />
                        <Form.Control type='text' placeholder='Enter address' name='address'
                            className='form-control-rounded-0' autoComplete='off' id='address'
                            value={employee.address}
                            onChange={(e) => setemployee({ ...employee, [e.target.name]: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group className='mb-2'>
                        <lable htmlFor="did" className="form-label">Department: </lable><br />
                        <select name='did' id='did' className='form-select'
                            value={employee.did}
                            onChange={(e) => setemployee({ ...employee, [e.target.name]: e.target.value })}
                        >
                            {
                                show.map((d, ind) => {
                                    return (
                                        <option value={d.did}>{d.dname}</option>
                                    )
                                })
                            }
                        </select>
                    </Form.Group>

                    <div className='col-12'>
                        <button type='submit' className='btn btn-primary w-100 '>
                            Edit Employee
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default EditEmployee
