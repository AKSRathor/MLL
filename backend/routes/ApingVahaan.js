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
var crypto = require('crypto');
require('dotenv').config()


router.post("/createKey", fetchuser, async (req, res) => {
    try {

        let key = req.body
        key.username = req.usn
        // let keyVal = key.key
        // keyVal = CrockfordBase32.encode(keyVal)
        const keyIs = await ApiKeys.create(key)
        res.json({ success: true, keyIs })
        // res.json({success:true,key, keyVal})

    } catch (error) {
        res.status(500).send("Internal Server Error")
        console.log(error.message)
    }

})

router.put("/generateseckey", fetchuser, async (req, res) => {
    const { passKey } = req.body

    let secKey = crypto.randomUUID()

    const newKey = crypto.createCipher('aes-128-cbc', "secKey");
    var mystr = newKey.update(secKey, 'utf8', 'hex')
    mystr += newKey.final('hex');

    const dateTime = new Date()
    dateTime.setDate(dateTime.getDate() + 15)

    console.log(dateTime)
    const apiKeyIs = await ApiKeys.update(
        {
            secKey: mystr,
            secValidity: dateTime
        },
        { returning: true, where: { key: passKey } }
    )
    res.send({ success: true, secKeyIs: mystr })


})

router.post("/createLog", async (req, res) => {
    try {

        const keyLog = req.body
        const keyLogIs = await ApiLogs.create(keyLog)
        res.json({ success: true, keyLogIs })

    } catch (error) {
        res.status(500).send("Internal Server Error")
    }

})


router.post("/fetchKeys", fetchuser, async (req, res) => {
    try {

        // const {username} = req.body
        let allKey = await ApiKeys.findAll({ where: { username: req.usn } })
        res.send({ success: true, allKey })

    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }

})


router.post("/fetchLogs", fetchuser, async (req, res) => {
    try {

        const { username } = await req.usn
        console.log(username)
        let allLogs = await ApiLogs.findAll({ where: { username: req.usn } })
        res.send({ success: true, allLogs })

    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }

})



router.post("/ulip/v1.0.0/:ulipIs/:reqIs", fetchuser, fetchapi, async (req, res) => {

    try {
        // console.log("all next completed")
        // console.log("the requested mware ", req.usn)
        // const reqAuthKey = req.header
        // console.log(JSON.stringify(req.body), req.header('Authorization'))
        const url = `${process.env.ulip_url}/${req.params.ulipIs}/${req.params.reqIs}`
        // const url = "http://localhost:3002/api/vahaan/ulip/v1.0.0/VAHAN/01"
        console.log("Url is ", url)
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json",
                'Authorization': `Bearer ${req.authorization}`,
                // 'Authorization': req.header('Authorization'),

            },
            body: JSON.stringify(req.body)
        })
        // console.log("all done", req.authorization)
        let json = await response.json()
        // console.log(json, "is the response")


        if (req.params.ulipIs === "VAHAN") {
            
            const xmlString = json.response[0].response
            var result1 = convert.xml2js(xmlString, { compact: true, spaces: 4 });
            const vhdet = result1["VehicleDetails"]

            // res.send({ success: true, vhdet })
            json = vhdet

        }
        const urlArray = req.url.split("/")
        const dt = new Date()
        console.log(dt, urlArray)
        console.log(req.applicationName, "is ny key")
        const newApiLog = {
            key: req.header("api-key"),
            ulip: urlArray[3],
            reqDataCode: urlArray[4],
            resData: "JSON.stringify(json[0])",
            time: dt.getTime(),
            applicationName: req.applicationName,
            username: req.usn,
            reqData: JSON.stringify(req.body)

        }
        console.log("logs sent")
        const apiLogIs = await ApiLogs.create(newApiLog)

        res.send({ success: true, json })


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