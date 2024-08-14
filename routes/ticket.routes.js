/** load library express */
const express = require(`express`)
/** initiate object that instance of express */
const app = express()
/** allow to read 'request' with json type */
app.use(express.json())
/** load ticket's controller */
const ticketController =
require(`../ticket.controller`) 
/** create route to add new ticket using method "POST" */
app.post("/", ticketController.addTicket)
/** create route to get data by id with method "GET" */
app.get("/:id", ticketController.ticketByID)
/** export app in order to load in another file */
module.exports = app
const ticketRoute = require(`./routes/ticket.route`)
app.use(`/ticket`, ticketRoute)