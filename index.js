/** load library express */
const express = require(`express`)
/** create object that instances of express */
const app = express()
/** define port of server */
/** load library cors */
const cors = require(`cors`)

const auth = require ('./routes/auth.route')
app.use('/auth', auth)

const eventRoute = require(`./routes/event.routes`)
app.use(`/event`, eventRoute)
/** route to access uploaded file */
app.use(express.static(__dirname))
/** open CORS policy */
app.use(cors())
/** define all routes */
const userRoute = require(`./routes/user.routes`)
/** define prefix for each route */
app.use(`/user`, userRoute)
/** run server based on defined port */

const PORT = 8000


app.listen(PORT, ()=>{
    console.log(`Server of ticket sales run on port ${PORT}`)
})
