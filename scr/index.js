const  express = require("express")
const app = express()
const connect = require("./config/db")
const usercontroller = require("./controllers/user.ctrl")
const moviecontroller = require("./controllers/movie.ctrl")
require('dotenv')
app.use(express.json())

const port = process.env.PORT || 4000

app.use("/user", usercontroller)
app.use("/movie", moviecontroller)
app.listen(port, async ()=>{
    try {
        await connect()
        console.log(`Listening to my port on ${port}`)
    } catch (error) {
        console.log({error:error.message})
    }
})