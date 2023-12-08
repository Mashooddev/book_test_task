const Book = require("../entity/book");

module.exports = {
  listBooks: async function (req, res, next) {
    try {
      const page = req.query.page || 1; // Get the requested page number or default to 1
      const limit = 10; // Number of books per page
      const offset = (page - 1) * limit; // Calculate the offset based on the page number

      const books = await Book.findAll({
        limit: limit,
        offset: offset,
      });

      const totalBooksCount = await Book.count(); // Get total count of books

      res.json({
        books: books,
        currentPage: page,
        totalPages: Math.ceil(totalBooksCount / limit),
        totalBooks: totalBooksCount,
        status: true,
        message: "Books list retrieved successfully",
      });
    } catch (e) {
      console.log("ERROR is", e);
      res.status(500).json({
        message:
          "There was a problem in retrieving the books list, please try again.",
        result: false,
      });
    }
  },

  createBook: async function (req, res, next) {
    try {
      const book = await Book.create(req.body);
      res.json({
        book: book,
        status: true,
        message: "Book created successfully",
      });
    } catch (e) {
      console.log("ERROR is", e);
      res.status(500).json({
        message: "There was a problem in creating the book, please try again.",
        result: false,
      });
    }
  },
};
