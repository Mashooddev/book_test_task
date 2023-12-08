const User = require("../entity/user");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const Order = require("../entity/order");
const sequelize = require("../service/db")
module.exports = {
  signUp: async function (req, res, next) {
    try {
    // await sequelize.sync({ alter: true });

      const { username, email, password } = req.body;

      // Check if username or email already exists in the database
      const existingUser = await User.findOne({
        where: {
          [Op.or]: [{ username }, { email }],
        },
      });

      if (existingUser) {
        return res.status(400).json({
          message: "Username or email already exists.",
          result: false,
        });
      }

      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user in the database
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });

      return res.status(201).json({
        message: "User created successfully",
        user: newUser,
        result: true,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error creating user",
        error: error.message,
        result: false,
      });
    }
  },

  logIn: async function (req, res, next) {
    try {
      const { email, password } = req.body;

      // Find the user by username
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found", result: false });
      }

      // Check if the password matches
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ message: "Invalid password", result: false });
      }

      // Password is valid, user can be logged in
      return res
        .status(200)
        .json({ message: "Login successful", user, result: true });
    } catch (error) {
      return res.status(500).json({
        message: "Error logging in",
        error: error.message,
        result: false,
      });
    }
  },
  cartDetails: async function (req, res, next) {
    try {
      const userId = req.params.userId;

      // Find all orders associated with the user and calculate the total items
      const orders = await Order.findAll({
        where: {
          user_id: parseInt(userId),
        },
      });

      return res.status(200).json({ totalItems: orders.length });
    } catch (error) {
      return res.status(500).json({
        message: "Error fetching total items in cart",
        error: error.message,
      });
    }
  },
};
