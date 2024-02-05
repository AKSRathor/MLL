const express = require("express")
const app =express()
const cors = require("cors")
const db = require("./Models")

app.use(cors())
app.use(express.json())

const port = 5000

const driverRouter = require("./routes/Driver")
const vehicleRouter = require("./routes/Vehicle")
app.use("/driver", driverRouter)
app.use("/vehicle", vehicleRouter)


db.sequelize.sync().then(()=>{
    app.listen(5000, ()=>{
        console.log(`App is working at port 5000`)
    })

})
