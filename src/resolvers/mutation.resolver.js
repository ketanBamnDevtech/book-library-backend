import authController from "../controllers/auth.controller.js";
import bookController from "../controllers/book.controller.js";

export default {
  // Auth
  signupUser: authController.signup,
  loginUser: authController.login,
  addBook: bookController.addBook,
  addToLibrary: bookController.addToLibrary,
  addRating: bookController.addRating,
  myBooks: bookController.myBooks,
};
