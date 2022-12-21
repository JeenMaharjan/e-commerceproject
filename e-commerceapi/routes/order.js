const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken")

const router = require("express").Router()
const CryptoJs = require("crypto-js")
const Product = require("../models/Product")
const Cart = require("../models/Cart")
const Order = require("../models/Order")

router.post("/", verifyToken, async(req, res) => {
    const newCart = new Order(req.body)

    try {
        const savedCart = await newCart.save()
        res.status(200).json(savedCart)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put("/:id", verifyTokenAndAdmin, async(req, res) => {

    try {
        const updatedCart = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(201).json(updatedCart)
    } catch (error) {
        res.status(500).json(err)
    }
})

router.delete("/:id", verifyTokenAndAdmin, async(req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("cart has been deleted")
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get("/find/:userid", verifyTokenAndAuthorization, async(req, res) => {

    try {
        const cart = await Order.find({ userId: req.params.userid })

        res.status(200).json(cart)


    } catch (err) {
        res.status(500).json(err)
    }
})

router.get("/", verifyTokenAndAdmin, async(req, res) => {
    try {
        const carts = await Order.find()
        res.status(200).json(carts)
    } catch (error) {
        res.status(500).json(err)

    }
})

router.get("/income", verifyTokenAndAdmin, async(req, res) => {
    const productId = req.query.pid
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))

    try {
        const income = await Order.aggregate([{
                $match: {
                    createdAt: { $gte: previousMonth },
                    ...(productId && {
                        products: { $elemMatch: { productId } },
                    }),
                },

            },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount"
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" }
                }
            }
        ])
        res.status(200).json(income)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router