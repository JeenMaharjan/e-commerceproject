const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken")

const router = require("express").Router()
const CryptoJs = require("crypto-js")
const Product = require("../models/Product")
const Cart = require("../models/Cart")
const Order = require("../models/Order")


router.post("/", verifyToken, async(req, res) => {
    const newOrder = new Order(req.body)

    try {
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put("/:id", verifyTokenAndAdmin, async(req, res) => {

    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(201).json(updatedOrder)
    } catch (error) {
        res.status(500).json(err)
    }
})

router.delete("/:id", verifyTokenAndAdmin, async(req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("order has been deleted")
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

})


module.exports = router