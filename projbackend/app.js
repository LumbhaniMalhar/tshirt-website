require('dotenv').config()

const mongoose = require('mongoose');
const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// my routes
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const categoryRoutes = require("./routes/category")
const productRoutes = require("./routes/product")
const orderRoutes = require("./routes/order")
const stripeRoutes = require("./routes/stripePayment")
const razorpayRoutes = require("./routes/razorpayPayment")


// DB CONNECTIONS
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED");
});

// MIDDLEWARE
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// ROUTING
app.use("/api", authRoutes)
app.use("/api", userRoutes)
app.use("/api", categoryRoutes)
app.use("/api", productRoutes)
app.use("/api", orderRoutes)
app.use("/api", stripeRoutes)
app.use("/api", razorpayRoutes)



// STARTING THE SERVER
app.listen(port, ()=>{
    console.log(`App is running at ${port}`);
});