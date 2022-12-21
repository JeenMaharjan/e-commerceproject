const router = require("express").Router();
const stripe = require("stripe")("sk_test_51LJfziIhZceH4lANENX8tZFAnjVT0H5JRnPJlOzfxrnpSTK0vx30cGolaMKr8ytD9fyNKnc09KtP4iumpd2DehG600DLKVAXEO");

router.post("/payment", (req, res) => {
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd"
    }, (stripeErr, stripeRes) => {
        if (stripeErr) {
            res.status(500).json(stripeErr)
        } else {
            res.status(200).json(stripeRes)
        }

    })
})

module.exports = router