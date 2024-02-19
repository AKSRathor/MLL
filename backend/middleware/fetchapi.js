const {ApiKeys} = require("../Models")
const {ApiLogs} = require("../Models")

// const router = express.Router()

const fetchapi = async(req, res, next)=>{
    const apiKey = req.header("api-key")
    const secKeyH= req.header("seckey")
    const user = req.usn
    console.log(apiKey, user)

    try {
        let myKey = await ApiKeys.findOne({ where: { key:apiKey } })
        const dt = new Date()
        let mySecKey = myKey.secKey
        if(mySecKey != secKeyH){
            console.log("sec key api ", mySecKey === secKeyH, dt.getDate()>myKey.secValidity.getDate(), dt.getDate(), "  ", myKey.secValidity.getDate())
            res.send("Wrong API key entered")
        }
        else if(myKey.username === user){
            console.log("second if")
            const urlArray = req.url.split("/")
            console.log(dt, urlArray)
            const newApiLog = {
                key:apiKey,
                ulip: urlArray[3],
                reqData: urlArray[4],
                resData:"resData",
                time:dt.getTime()
            }
            const apiLogIs = await ApiLogs.create(newApiLog)
            next()
        }
        else{
            res.status(401).send({ error: "Wrong Api key entered"})
        }

    } catch (error) {
        res.status(501).send({error:error.message})
    }
    
    
}

module.exports = fetchapi