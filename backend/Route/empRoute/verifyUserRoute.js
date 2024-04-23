const express = require('express');
const jwt = require("jsonwebtoken");

const verifyRoute = express.Router();

const { user } = require("../../Controller/verifyUser/verifyUser")

const verifyuser = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) return res.json({ Status: false, Error: "wrong Token" })
             req.id = decoded.id;
             req.role = decoded.role;
             next()
        })
    }
    else {
        return res.json({ Status: false, Error: "Not authenticated" })
    }
}

verifyRoute.get("/verify", verifyuser, user)

module.exports = verifyRoute