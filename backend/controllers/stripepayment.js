require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { v4: uuid } = require("uuid");

exports.makePayment = (req, res) => {
  const { products, token, totalAmount } = req.body;
  const idempotencyKey = uuid();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges
        .create(
          {
            amount: totalAmount,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            description: "Test Account",
            // shipping: {
            //   name: token.card.name,
            // },
          },
          { idempotencyKey }
        )
        .then((result) => {
          return res.status(200).json(result);
        })
        .catch((err) => console.error(err));
    });
};
