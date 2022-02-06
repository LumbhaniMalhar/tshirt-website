var express = require('express');
var router = express.Router();
const { check } = require('express-validator');
const {signout, signup, signin, isSignedIn, isAuthenticated} = require("../controllers/auth")

router.post("/signup",[
    check("name","name should be atleast 3 characters").isLength({ min: 3}),
    check("email","enter valid email").isEmail(),
    check("password","password should be atleast 3 characters").isLength({ min: 3}),
], signup)

router.post("/signin",[
    check("email","enter valid email").isEmail(),
    check("password","password is required").isLength({ min: 1}),
], signin)

router.get("/signout", signout)

router.get("/testroute", isSignedIn, (req, res)=>{
    res.json(req.mallu);
})

module.exports = router