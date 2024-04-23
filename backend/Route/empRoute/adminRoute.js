const express = require('express');
const adminRouter = express.Router();

const {adminLogin, adminTotal, AdminRecords, adminLogout} = require("../../Controller/empController/adminLogin");


adminRouter.post("/savedata", adminLogin)
adminRouter.get("/admin_count", adminTotal)
adminRouter.get("/admin_records", AdminRecords)
adminRouter.get("/logout", adminLogout)

module.exports = adminRouter