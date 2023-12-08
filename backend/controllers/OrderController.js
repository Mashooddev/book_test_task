const Order = require("../entity/order");
const Book = require("../entity/book");

module.exports = {
  createOrder: async function (req, res, next) {
    try {
      const { userId, bookId, quantity } = req.body;

      // Fetch the book's price based on the bookId
      const book = await Book.findByPk(bookId);

      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }

      const bookPrice = book.price; // Assuming 'price' is the field in the Book model representing the book's price

      // Calculate total_price based on quantity and book price

      // Create a new order associated with the user
      const newOrder = await Order.create({
        user_id: userId,
        book_id: bookId,
        quantity: quantity,
        total_price: bookPrice,
        // Other order details if needed
      });

      return res
        .status(201)
        .json({ message: "Order placed successfully", order: newOrder });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error placing order", error: error.message });
    }
  },

  cancelOrder: async function (req, res, next) {
    try {
      const orderId = req.params.orderId; // Get orderId from the route parameter

      // Find the order by ID and delete it
      const deletedOrder = await Order.findByPk(orderId);

      if (!deletedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }

      await deletedOrder.destroy();

      return res.status(200).json({ message: "Order canceled successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error canceling order", error: error.message });
    }
  },

  totalOrders: async function (req, res) {
    try {
      const totalCount = await Order.count();
      return res.status(200).json({ totalCount });
    } catch (error) {
      return res.status(500).json({ message: "Error fetching total orders count", error: error.message });
    }
  }
};
