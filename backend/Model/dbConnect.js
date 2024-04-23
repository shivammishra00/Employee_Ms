const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    port: "3306",
    database: "employeems"
})
connection.connect((err,result)=>{
    if(err){
        console.log("err", err.sqlMessage)
    }
    else{
        console.log("Database Connected")
    }
})
module.exports = connection;