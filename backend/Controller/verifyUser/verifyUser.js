const connection = require("../../Model/dbConnect");


const user = (req, res) => {
    return res.json({Staus: true, role: req.role, id: req.id})
}

module.exports = {user}