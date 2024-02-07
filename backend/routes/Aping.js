const express = require("express")
const router = express.Router()
const { ApiKeys } = require("../Models")
const { ApiLogs } = require("../Models")
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const JWT_SECRET = 'saltcode';
var fetchuser = require("../middleware/fetchuser")
// const axios = require('axios/dist/node/axios.cjs'); 
var fetchapi = require("../middleware/fetchapi")


router.post("/createKey", async (req, res) => {
    try {

        const key = req.body
        const keyIs = await ApiKeys.create(key)
        res.json({success:true, keyIs })

    } catch (error) {
        res.status(500).send("Internal Server Error")
        console.log(error.message)
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


router.post("/fetchvahaan",fetchuser, fetchapi, async(req,res)=>{

    try {
        // fetch("localhost:5002/api/vahaan/fetchall", )

        const response = await fetch(`http://localhost:3002/api/vahaan/fetchall`, {
            method: 'POST'
        })
          const json = await response.json()
        //   console.log(JSON.stringify(json))
        // console.log(json)
      
        res.send({success:"API key fetch successfully", json})
        
    } catch (error) {
        
    }

})


module.exports = router