const {midOne} = require ("../middlewares/simple-middleware")
/** load library express */
const express = require(`express`)
/** initiate object that instance of express */
const app = express()
/** allow to read 'request' with json type */
app.use(express.json())
/** load user's controller */

const userController = require(`../controllers/user.controller`)
// app.get("/:key", userController.findUser)
// app.delete("/:id", userController.deleteUser)

// app.get("/",[midOne], userController.getAllUser)

const { validateUser } = require("../middlewares/user-validation")
// app.post("/", validateUser, userController.addUser)
// app.put("/:key", validateUser, userController.updateUser)           



const { authorize } = require('../controllers/auth.controller')
const {IsUser, IsAdmin} = require('../middlewares/role-validation')
app.get("/", authorize, IsAdmin, userController.getAllUser)
app.get("/:key", authorize, IsAdmin, userController.findUser)
app.post("/", authorize, IsAdmin, validateUser,userController.addUser)
app.put("/:id", authorize, IsUser,userController.updateUser)
app.delete("/:id", authorize, IsAdmin,userController.deleteUser)
app.post("/register", validateUser, userController.register)
app.put("/reset/:id", userController.resetPass)

module.exports = app
