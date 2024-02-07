const {ApiKeys} = require("../Models")
// const router = express.Router()

const fetchapi = async(req, res, next)=>{
    const apiKey = req.header("api-key")
    const user = req.body.username
    console.log(apiKey, user)

    try {
        let myKey = await ApiKeys.findOne({ where: { key:apiKey } })
        if(myKey.username === user){
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