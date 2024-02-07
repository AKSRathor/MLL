const fetchuser = (req, res, next)=>{
    const token = req.header("Authorization")
    if(token){
        next()
    }
    else{
        res.status(401).send({error:"Please authenticate using a valid token"})
    }
}

module.exports = fetchuser