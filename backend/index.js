const express = require("express")
const app =express()
const cors = require("cors")
const db = require("./Models")

app.use(cors())
app.use(express.json())

const port = 5000

const driverRouter = require("./routes/Driver")
const vehicleRouter = require("./routes/Vehicle")
const userRouter = require("./routes/User")
const apingRouter = require("./routes/ApingVahaan")
// const apingSaarthiRouter = require("./routes/ApingSaarthi")

app.use("/driver", driverRouter)
app.use("/user", userRouter)
app.use("/vehicle", vehicleRouter)
app.use("/aping", apingRouter)
// app.use("/apingsaarthi", apingSaarthiRouter)


db.sequelize.sync().then(()=>{
    app.listen(5000, ()=>{
        console.log(`App is working at port 5000`)
    })

})
