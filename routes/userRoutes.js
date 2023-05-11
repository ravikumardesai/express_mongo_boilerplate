const express = require("express");
const { route } = require("./contactRoutes");
const { userRegister ,userLogin,userCurrent} = require("../contollers/userController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();


router.post("/register",userRegister)
router.post("/login",userLogin)
router.get("/current",validateToken,userCurrent)

// other way to do this - and that's also fine, but for short form we use above convension
// router.route("/register").post(userRegister)
// router.route("/login").post(userLogin)
// router.route("/current").get(userCurrent)

module.exports = router 