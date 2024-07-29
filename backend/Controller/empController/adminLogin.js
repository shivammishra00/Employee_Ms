const connection = require('../../Model/dbConnect');
const jwt = require('jsonwebtoken');

const adminLogin = async (req, res) => {
    const sqlquery = "SELECT * FROM admin WHERE email = ? and password = ?"
    await connection.query(sqlquery, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query error" })
        else if (result.length > 0) {
            const email = result[0].email;  // fetch email
            const id = result[0].id;        // fetch id

            // genrate token use jwt.sign method()
            const token = jwt.sign({ role: "admin", email: email, id: id }, "jwt-secret-key", { expiresIn: "1d" })
            res.cookie("token", token)
            return res.json({ loginStatus: true })
        }
        else {
            return res.json({ loginStatus: false, Error: "Wrong email or password" })
        }
    })
}

const adminTotal = async (req, res) => {
    const sqlquery = "SELECT COUNT(id) as admin FROM admin";
    await connection.query(sqlquery, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error", error: err.sqlMessage })
        else return res.json({ Status: true, result })
    })
}

const AdminRecords = async (req, res) => {
    const sqlquery = "SELECT * FROM admin";
    await connection.query(sqlquery, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error", error: err.sqlMessage })
        else return res.json({ Status: true, result })
    })
}

const adminLogout = (req,res) =>{
    res.clearCookie('token')
    return res.json({Status: true})
}


module.exports = { adminLogin, adminTotal, AdminRecords, adminLogout }