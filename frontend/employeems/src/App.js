import React from 'react';
import Login from './Components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import Employee from './Components/Employee';
import Category from './Components/Category';
import Profile from './Components/Profile';
import AddCategory from './Components/AddCategory';
import AddEmployee from './Components/AddEmployee';
import EditEmployee from './Components/EditEmployee';
import Start from './Components/Start';
import EmployeeLogin from './Components/EmployeeLogin';
import EmployeeDetaile from './Components/EmployeeDetaile';
import PrivateRoute from './Components/PrivateRoute';
// import axios from 'axios';



function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Start />}></Route>
          <Route path='/employee_login' element={<EmployeeLogin />}></Route>
          <Route path='/adminlogin' element={<Login />} />
          <Route path='/employee_detail/:eid' element={<EmployeeDetaile />}></Route>

          <Route path='/dashboard' element={   /// main route hai isi me sidebar or navbar hai
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
            // <Dashboard />
          }>
            <Route path='' element={<Home />}></Route>
            <Route path='/dashboard/employee' element={<Employee />}></Route>
            <Route path='/dashboard/category' element={<Category />}></Route>
            <Route path='/dashboard/profile' element={<Profile />}></Route>
            <Route path='/dashboard/add_category' element={<AddCategory />}></Route>
            <Route path='/dashboard/add_employee' element={<AddEmployee />}></Route>
            <Route path='/dashboard/edit_employee/:eid' element={<EditEmployee />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
