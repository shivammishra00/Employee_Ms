const connection = require('../../Model/dbConnect');
const jwt = require('jsonwebtoken');  /// for employee_login
const bcrypt = require('bcrypt');
const { response } = require('express');
const salt = 10;


const addEmployee = (req, res) => {
    const sqlquery = "INSERT INTO  employee SET ?";

    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if (err) return console.log({ Status: false, err: "Error for hasing password" })
        const data = {
            eid: req.body.eid,
            ename: req.body.ename,
            email: req.body.email,
            // password: req.body.password
            password: hash,
            salary: req.body.salary,
            address: req.body.address,
            image: req.file.filename,
            did: req.body.did
        }
        console.log(data)
        connection.query(sqlquery, [data], (err, result) => {
            if (err) return res.json({
                Status: false, Error: "Query Error",
                error: err.sqlMessage
            })
            else return res.json({ Status: true, result, Message: "Data insertesd successfully" })
        })
    })
}

const showEmployee = (req, res) => {
    const sqlquery = "SELECT * FROM employee";
    connection.query(sqlquery, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error", error: err.sqlMessage })
        else return res.json({ Status: true, result })
    })
}

//////   use params for update employee   ///////
const paramsEmployee = (req, res) => {
    const eid = req.params.eid;
    console.log(eid)
    const sqlquery = "SELECT * FROM employee WHERE eid = ?";
    connection.query(sqlquery, [eid], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error", error: err.sqlMessage })
        else return res.json({ Status: true, result })
    })
}

const updateEmployee = async (req, res) => {
    const userdata = [
        req.body.ename,
        req.body.email,
        req.body.salary,
        req.body.address,
        req.body.did
    ]
    const eid = req.params.eid;
    console.log(userdata, eid)
    const sqlquery = "UPDATE employee SET ename=?, email=?, salary=?, address=?, cid=? WHERE eid=? "
    await connection.query(sqlquery, [...userdata, eid], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error", err })
        else return res.json({ Status: true, result, Message: "Data updated succesfully" })
    })

}

const deleteEmployee = async (req, res) => {
    const eid = req.params.eid
    const sqlquery = "DELETE FROM employee WHERE eid=?";
    console.log(eid);
    await connection.query(sqlquery, [eid], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error", err })
        else return res.json({ Status: true, result })
    })
}


const employeeTotal = async (req, res) => {
    const sqlquery = "SELECT COUNT(eid) as employee FROM employee";
    await connection.query(sqlquery, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error", error: err.sqlMessage })
        else return res.json({ Status: true, result })
    })
}

const salaryTotal = async (req, res) => {
    const sqlquery = "SELECT SUM(salary) as totalSalary FROM employee";
    await connection.query(sqlquery, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error", error: err.sqlMessage })
        else return res.json({ Status: true, result })
    })
}


//////////////////////////////////////////////////////////////////////////////////////////////
const employeeLogin = async (req, res) => {
    const sqlquery = "SELECT * FROM employee WHERE email = ? "
    await connection.query(sqlquery, [req.body.email], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query error" })
        else if (result.length > 0) {
            bcrypt.compare(req.body.password, result[0].password, (err, response) => {
                if (err) return res.json({ loginStatus: false, Error: "wrong password" })
                else if (response) {
                    const email = result[0].email;
                    const eid = result[0].eid;
                    const id = eid;
                    const token = jwt.sign({ role: "employee", email: email, eid: id }, "jwt-secret-key", { expiresIn: "1d" });
                    res.cookie("token", token)
                    return res.json({ loginStatus: true, eid: result[0].eid })
                }
            })
        }
        else {
            return res.json({ loginStatus: false, Error: "Wrong email or password" })
        }
    })
}

const employeeDetail = async (req, res) => {
    const eid = req.params.eid;
    console.log(eid)
    const sqlquery = "SELECT * FROM employee WHERE eid=?"
    await connection.query(sqlquery, [eid], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error", error: err.sqlMessage })
        else return res.json({ Status: true, result })
    })
}

const employeeLogout = (req, res) => {
    res.clearCookie('token')
    return res.json({ Status: true })
}


module.exports = { addEmployee, showEmployee, paramsEmployee, updateEmployee, deleteEmployee, employeeTotal, salaryTotal, employeeLogin, employeeDetail, employeeLogout }