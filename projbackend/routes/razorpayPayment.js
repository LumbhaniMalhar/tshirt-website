const express = require("express");
const router = express.Router();
const {razorpayment, validation} = require("../controllers/razorpayPayment")

// router.get("/order", razorget)
// router.post("/capture/:paymentId", razorpost)

router.get('/logo.svg', (req, res) => {
    try{
        res.sendFile(path.join(__dirname, 'logo.svg'))
    }
    catch(error){
        console.log(error)
    }
	
})

router.post('/razorpay', razorpayment)
router.post('/verification', validation)

module.exports = router

