const express = require("express")
const router = express.Router()
const { ApiKeys } = require("../Models")
const { ApiLogs } = require("../Models")
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const JWT_SECRET = 'saltcode';




router.post("/createKey", async (req, res) => {
    try {

        const key = req.body
        const keyIs = await ApiKeys.create(key)
        res.json({success:true, keyIs })

    } catch (error) {
        res.status(500).send("Internal Server Error")
    }

})

router.post("/createLog", async (req, res) => {
    try {

        const keyLog = req.body
        const keyLogIs = await ApiLogs.create(keyLog)
        res.json({success:true, keyLogIs })

    } catch (error) {
        res.status(500).send("Internal Server Error")
    }

})


router.get("/fetchKeys", async (req, res) => {
    try {

        const {username} = req.body
        let allKey = await ApiKeys.findOne({ where: { username } })
        res.send({success:true, allKey})
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }

})


router.get("/fetchLogs", async (req, res) => {
    try {

        const {username} = req.body
        let allLogs = await ApiLogs.findOne({ where: { username } })
        res.send({success:true, allLogs})
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }

})



module.exports = router