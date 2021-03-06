const { Order, ProductCart } = require("./../models/order");

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No Order Found in DB",
        });
      }
      req.order = order;
      next();
    });
};

// Read
exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: "No Order Found",
        });
      }
      res.json(orders);
    });
};

// Create
exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);

  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "Error in saving order",
      });
    }
    res.json(order);
  });
};

// read and update status of order
exports.updateStatus = (req, res) => {
  Order.updateOne(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: "Cannot update the order status",
        });
      }
      res.json(order);
    }
  );
};

exports.getOrderStatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};
