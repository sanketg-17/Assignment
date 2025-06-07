import Order from '../model/order.js';
import User from '../model/user.js';

const orderData = (req, res) => {
  console.log("Received ID:", req.params.id); 
  Order.findById(req.params.id)
    .populate('user')
    .then((order) => {
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.status(200).json(order);
    })
    .catch((err) => {
      console.error("Error fetching order:", err);
      res.status(500).json({ message: "Server error" });
    });
};

export default orderData;
