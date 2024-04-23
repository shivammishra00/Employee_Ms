import axios from 'axios';
import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AddCategory() {
    const [category, setcategory] = useState({
        did: "",
        dname: ""
    });

    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5001/add_category", category)
            .then(res => {
                console.log(res)
                if (res.data.Status) {
                    navigate("/dashboard/category")
                }
                else {
                    alert(res.data.Error)
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='d-flex justify-content-center align-items-center h-75 '>
            <div className=' p-3 rounded w-25 border '>
                <h2>Add Department</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-3'>
                        <lable htmlFor="cid"><strong>Department Id: </strong></lable><br />
                        <Form.Control type='text' placeholder='Enter did' name='did'
                            className='form-control-rounded-0' value={category.cid}
                            onChange={(e) => setcategory({ ...category, [e.target.name]: e.target.value })} />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <lable htmlFor="dname"><strong>Department Name: </strong></lable><br />
                        <Form.Control type='text' placeholder='Enter department' name='dname'
                            className='form-control-rounded-0' value={category.dname}
                            onChange={(e) => setcategory({ ...category, [e.target.name]: e.target.value })} />
                    </Form.Group>
                    <button type='submit' className='btn btn-success w-100 rounded-0 mb-2'>Add Department</button>
                </Form>
            </div>
        </div>
    )
}

export default AddCategory
