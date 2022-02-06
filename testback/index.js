const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res)=>{
    return res.send("home page");
});

app.get("/login", (req,res)=>{
    return res.send("login page");
});

const admin = (req, res)=>{
    return res.send("in the admin page dashboard");
};
const isadmin = (req, res, next)=>{
    console.log("in the admin dashboard");
    next()
};

const isloggedin = (req, res, next)=>{
    console.log("user logged in");
    next()
};

app.get("/admin", isloggedin, isadmin, admin);

app.get("/signup", (req,res)=>{
    return res.send("you are sign-up page");
});

app.get("/hitesh", (req, res)=>{
    return res.send("hitesh uses instagram");
});

app.listen(port, ()=> {
    console.log("server is up and running...")
})