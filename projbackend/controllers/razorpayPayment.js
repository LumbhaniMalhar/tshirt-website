const Razorpay = require('razorpay')

const razorpay = new Razorpay({
	key_id: 'rzp_test_IeBv4hpfwD2886',
	key_secret: 'jmm9O29yzxI37eMoxhJebhs7'
})

exports.razorpayment = async (req, res) => {
    console.log(req.body)
    const {products} = req.body

    console.log("PRODUCTS ARE HERE",products)

    let amount = 0;
    if(products){
        products.map(p => {
            amount = amount + p.price;
        })
    }

    const payment_capture = 1
	const currency = 'INR'

    const options = {
		amount: amount * 100,
		currency,
		receipt: "receipt_no_1",
		payment_capture
	}
    try {
		const response = await razorpay.orders.create(options)
		console.log(response)
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount
		})
	} catch (error) {
		console.log(error)
	}
}

exports.validation = (req, res) => {
    const secret = '12345678'

	console.log(req.body)

	const crypto = require('crypto')

	const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body))
	const digest = shasum.digest('hex')

	console.log(digest, req.headers['x-razorpay-signature'])

	if (digest === req.headers['x-razorpay-signature']) {
		console.log('request is legit')
		// process it
		// require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
	} else {
		// pass it
	}
	res.json({ status: 'ok' })
}


// const keys = require("../keys")
// const Razorpay = require('razorpay')
// const request = require('request')

// // const razorInstance = new Razorpay({
// //     key_id : keys.razorIdkey,
// //     key_secret : keys.razorIdSecret
// // })



// exports.razorget = (req, res) => {
//     var instance = new Razorpay({
//         key_id : keys.razorIdkey,
//         key_secret : keys.razorIdSecret
//     })
//     const options = {
//         amount: 10*100,
//         currency: "INR",
//     }
//     instance.orders.create(options, function(err, order){
//         if(err){
//             return res.status(500).json({
//                 error: "error in get route"
//             })
//         }
//         return res.status(200).json(order)
//     })
// }

// exports.razorpost = (req, res) => {
//     // const {products, token} = req.body
//     // let amount = 0;
//     // products.map(p => {
//     //   amount = amount + p.price;
//     // })
//     try{
//         return request(
//             {
//                 method: "POST",
//                 url: `https://${keys.razorIdkey}:${keys.razorIdSecret}@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
//                 form: {
//                     amount: 10*100,
//                     currency: "INR"
//                 },
//             },
//             async function (err, response, body) {
//                 if (err) {
//                     return res.status(500).json({
//                         error: "error in get route"
//                     })
//                 }
//                 return res.status(200).json(body)
//             }
//         )
//     }
//     catch(err){
//         return res.status(500).json({
//             error: "error in get route"
//         })
//     }
// }