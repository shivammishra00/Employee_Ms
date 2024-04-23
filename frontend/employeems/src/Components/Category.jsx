import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


function Category() {
    const [show, setshow] = useState([]);

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
      console.log(show)
    return (
        <div className='px-5 mt-3'>
            <div className='d-flex justify-content-center'>
                <h3>Department List</h3>
            </div>
            <Link to="/dashboard/add_category" className='btn btn-success'>Add Department</Link>

            <div className='mt-3'>
                <table className='table' border={3}>
                    <thead>
                        <tr>
                            <th>Did</th>
                            <th>Dname</th>
                        </tr>
                    </thead>
                    {
                        show.map((d, ind) => {
                            return (
                                <tbody>
                                    <tr>
                                        <td>{d.did}</td>
                                        <td>{d.dname}</td>
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

export default Category
