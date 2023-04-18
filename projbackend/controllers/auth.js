const User = require("../models/user");
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

exports.signup = (req, res)=>{
    const errors = validationResult(req);
    const {email} = req.body
    
    if (!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }

    User.findOne({email}, (err, member) => {
        // console.log("err", err, member)
        // if(!err || member){
        //     return res.status(400).json({
        //         error: "email already used"
        //     })
        // }
        const user = new User(req.body);
        user.save((err, user)=>{
            if(err) {
                return res.status(400).json({
                    error: "NOT able to save in DB"
                });
            }
            res.json({
                name: user.name,
                email: user.email,
                id: user._id,
                encrypassword: user.encry_password
            });
        })
    })

    // const user = new User(req.body);
    // user.save((err, user)=>{
    //     if(err) {
    //         return res.status(400).json({
    //             error: "NOT able to save in DB"
    //         });
    //     }
    //     res.json({
    //         name: user.name,
    //         email: user.email,
    //         id: user._id,
    //         encrypassword: user.encry_password
    //     });
    // })
}

exports.signin = (req,res)=>{
    const errors = validationResult(req);
    const { email, password} = req.body;

    if (!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }
    User.findOne({email}, (err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "user email doesnot exist"
            })
        }

        if(!user.autheticate(password)){
            return res.status(401).json({
                error: "email and password dosenot match"
            })
        }

        // create token
        const token = jwt.sign({_id: user._id}, process.env.SECRET)
        // PUT TOKEN
        res.cookie("token", token, {expire: new Date() + 9999})
        // send to front end
        const {_id, name, email, role} = user;
        return res.json({ token, user: {_id, name, email, role}});
    })
}

exports.signout = (req,res)=>{
    res.clearCookie("token");
    res.json({
        message: "user signedout successfully"
    });
}

exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "mallu" // it was auth, i changed it to mallu
});

// custom middlewares

exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.mallu && req.profile._id == req.mallu._id;
    // console.log("REQ.PROFILE :- ",req.profile);
    // console.log("REQ.AUTH :- ",req.mallu);
    // console.log("BODY :- ",req.body)
    if(!checker) {
        return res.status(403).json({
            error: "access denied"
        });
    }
    next();
}

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "You are not admin, Access denied"
        });
    }
    next();
}