import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AddEmployee() {
    const [show, setshow] = useState([]);  // select for category  
    const [employee, setemployee] = useState({
        eid: "",
        ename: "",
        email: "",
        password: "",
        salary: "",
        address: "",
        image: "",
        did: ""
    })


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
    }, [])

    
    const handleSubmit = (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('eid', employee.eid)
        formdata.append('ename', employee.ename)
        formdata.append('email', employee.email)
        formdata.append('password', employee.password)
        formdata.append('salary', employee.salary)
        formdata.append('address', employee.address)
        formdata.append('image', employee.image)
        formdata.append('did', employee.did)
        axios.post("http://localhost:5001/add_employee", formdata)
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
        <div className='d-flex justify-content-center align-items-center mt-3'>
            <div className=' p-3 rounded w-50 border '>
                <h3 className='text-center'>Add Employee</h3>
                <Form className='row g-1' onSubmit={handleSubmit}>

                    <Form.Group className='mb-2'>
                        <lable htmlFor="eid">Employee Id: </lable><br />
                        <Form.Control type='text' placeholder='Enter eid' name='eid'
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
                        <lable htmlFor="password">Password:</lable><br />
                        <Form.Control type='password' placeholder='Enter password' name='password'
                            className='form-control-rounded-0' id='password'
                            value={employee.password}
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

                    <Form.Group className='mb-2'>
                        <lable htmlFor="address">Select Image: </lable><br />
                        <Form.Control type='file' name='image'
                            className='form-control-rounded-0'
                            onChange={(e) => setemployee({ ...employee, [e.target.name]: e.target.files[0] })}
                        />
                    </Form.Group>
                    <button type='submit' className='btn btn-primary w-100 '>Add Employee</button>
                </Form>
            </div>
        </div>
    )
}

export default AddEmployee
