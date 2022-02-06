const stripe = require("stripe")("sk_test_51KKg5QSFuyA7DgQVmSV7VSljGnlWRMQ5DUCIJ8d0JkFRBOWhpGJntXT6GssmMPwGdyT1tZho6hEtezCeOdyc1iYw00vdJRGOnj")
const uuid = require("uuid/v4")

exports.makepayment = (req, res) => {
    const {products, token} = req.body
    console.log("PRODUCTS", products)

    let amount = 0;
    products.map(p => {
      amount = amount + p.price;
    })
    
    const idempotencyKey = uuid()
    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        stripe.charges.create({
            amount: amount*100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email
        },{ idempotencyKey })
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err))
    })
    
}