const express = require('express');

const empRouter = express.Router();

const multer = require('multer');
const path = require("path");

//// image upload for local machine in public/Images  folder  /////
const  storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'Public/Images')
    },
    filename: (req, file, cb) =>{
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage : storage
})

///////////////////////////////////////////////////////////////////////////////////////

const {addEmployee, showEmployee, paramsEmployee, updateEmployee, deleteEmployee, employeeTotal, salaryTotal} = require('../../Controller/empController/employee')

//////////////////  for employee_login  /////////////////////
const {employeeLogin, employeeDetail, employeeLogout} = require('../../Controller/empController/employee')

empRouter.post("/employee_login", employeeLogin)
empRouter.get('/employee_detail/:eid', employeeDetail)
empRouter.get("/employee_logout", employeeLogout)


///////////////////////////////////////////////////////////////////////////////////////////////
empRouter.post("/add_employee", upload.single('image') , addEmployee)
empRouter.get("/show_employee", showEmployee)
empRouter.get("/show_employee/:eid", paramsEmployee)
empRouter.put("/edit_employee/:eid", updateEmployee)
empRouter.delete("/delete_employee/:eid", deleteEmployee)

empRouter.get("/employee_count", employeeTotal)
empRouter.get("/salary_count", salaryTotal)

module.exports = empRouter
