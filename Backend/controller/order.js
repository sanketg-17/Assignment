import product from "../model/product.js";


const order = (req, res) => {
  const { productId, title, price, imageUrl, selectedvarient, selectedsize, quantity } = req.body;

  console.log("Received order:", req.body);
  product.findById(productId).then(
    product => {
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      const updatedInventory = Math.max(product.inventory - quantity, 0);
      product.inventory = updatedInventory;

      return product.save();
    }
  ).then((savedProduct) => {
    console.log("Inventory updated:", savedProduct.inventory);

    res.status(200).json({ message: "Order received", data: req.body });
  })

 
};

export default order;