import User from "../model/user.js";
import mongoose from "mongoose";
import Order from "../model/order.js";
import { sendOrderEmail } from '../utils/email.js';

const getUser = async (req, res) => {
  const { user, order } = req.body;
  console.log(order);

  const cvv = user.cvv;

  let status = "approved";
  if (cvv === "222") status = "declined";
  else if (cvv === "333") status = "error";

  try {
    const savedUser = await User.create(user);


    const orderId = new mongoose.Types.ObjectId();

    await Order.create({
      _id: orderId,
      user: savedUser._id,
      order:order,
      status:status,
    });

    await sendOrderEmail(status, orderId, order, user);

    res.json({ success: true, orderId, status });

  } catch (error) {
    console.error('Error saving order/user:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export default getUser