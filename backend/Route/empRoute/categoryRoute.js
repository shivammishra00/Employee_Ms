const express = require('express');
const categoryRouter = express.Router();

const {addCategory, showCategory} = require('../../Controller/empController/category')

categoryRouter.get("/show_category", showCategory)
categoryRouter.post("/add_category",addCategory)

module.exports = categoryRouter