const User = require("../models/user");
const Order = require("../models/order");

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: "no user was found in DB"
            });
        }
        req.profile = user;
        next();
    });
};

exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile);
}

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new:true, useFindAndModify: false},
        ( err, user) => {
            if(err) {
                return res.status(400).json({
                    error: "you are not authorized to update this user"
                });
            }
            req.profile.salt = undefined;
            req.profile.encry_password = undefined;
            req.profile.createdAt = undefined;
            req.profile.updatedAt = undefined;
            res.json(user);
        }
    )
}

exports.userPurchaseList = (req, res) => {
    Order.find({user: req.profile._id})
    .populate("user", "_id name")
    .exe((err, orders) => {
        if(err){
            return res.status(400).json({
                error: "no order in these account"
            })
        }
        return res.json(orders);
    })
}

exports.pushOrderInPurchaseList = (req, res, next) => {
    let purchases = []
    req.body.order.products.forEach(product => {
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            tranction_id: req.body.order.tranction_id
        })
    })
    User.findOneAndUpdate(
        {_id: req.profile._id},
        { $push: { purchases: purchases}},
        { new: true },
        (err, purchases) => {
            if(err){
                return res.status(400).json({
                    error: "Unable to save purchase list"
                });
            }
            next();
        }
    )
}

// assignment for fun
// exports.getalluser = (req, res) => {
//     User.find((err, user) => {
//         if(err || !user){
//             return res.status(400).json({
//                 error: "no user"
//             })
//         }
//         return res.json(user)
//     })
// }