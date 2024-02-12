const express = require("express")
const router = express.Router()
const { ApiKeys } = require("../Models")
const { ApiLogs } = require("../Models")
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const JWT_SECRET = 'saltcode';
var fetchuser = require("../middleware/fetchuser")
var fetchapi = require("../middleware/fetchapi")
var convert = require('xml-js');


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


router.post("/fetchKeys",fetchuser, async (req, res) => {
    try {

        const {username} = req.body
        let allKey = await ApiKeys.findAll({ where: { username } })
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



router.post("/ulip/v1.0.0/:ulipIs/:reqIs",fetchuser, fetchapi, async(req,res)=>{

    try {
        // console.log("the requested mware ", req.usn)
        // const reqAuthKey = req.header
        console.log(JSON.stringify(req.body), req.header('Authorization'))
        const url = `https://www.ulipstaging.dpiit.gov.in/ulip/v1.0.0/${req.params.ulipIs}/${req.params.reqIs}`
        console.log("Url is ", url)
        const response = await fetch(url, {
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
                'Accept':"application/json",
                'Authorization':req.header('Authorization'),

            },
            body:JSON.stringify(req.body)
        })
        const json = await response.json()
        if(json.response[0].response){
            const xmlString = json.response[0].response
            var result1 = convert.xml2js(xmlString,{compact:true, spaces:4});
            const vhdet =result1["VehicleDetails"] 
    
            res.send({success:true, vhdet})

        }
        res.send({success:true, json})
        

    } catch (error) {
        
    }

})


// router.post("/ulip/v1.0.0/VAHAN/02",fetchuser, fetchapi, async(req,res)=>{

//     try {
        
//         const response = await fetch(`http://localhost:3002/api/vahaan/ulip/v1.0.0/VAHAN/02`, {
//             method: 'POST'
//         })
//           const json = await response.json()
//         res.send({success:"API key fetch successfully", json})
        
//     } catch (error) {
        
//     }

// })


// router.post("/ulip/v1.0.0/VAHAN/03",fetchuser, fetchapi, async(req,res)=>{

//     try {
        
//         const response = await fetch(`http://localhost:3002/api/vahaan/ulip/v1.0.0/VAHAN/02`, {
//             method: 'POST'
//         })
//           const json = await response.json()
//         res.send({success:"API key fetch successfully", json})
        
//     } catch (error) {
        
//     }

// })


module.exports = router