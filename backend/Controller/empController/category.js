const connection = require("../../Model/dbConnect");

const showCategory = async (req, res) => {
    const sqlquery = "SELECT * FROM department"
    await connection.query(sqlquery, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error", error: err.sqlMessage })
        else return res.json({ Status: true, result})
    })
}

const addCategory = async (req, res) => {
    const sqlquery = "INSERT INTO  department (did,dname) values(?)";
    const data = [req.body.did, req.body.dname];
    // console.log(data)
    await connection.query(sqlquery, [data], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error", error: err.sqlMessage })
        else return res.json({ Status: true, result })
    })
}

module.exports = { addCategory, showCategory }