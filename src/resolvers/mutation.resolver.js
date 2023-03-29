import authController from "../controllers/auth.controller.js";
import bookController from "../controllers/book.controller.js";

export default {
  // Auth
  signupUser: authController.signup,
  loginUser: authController.login,
  addNewBook: bookController.addBook,
};
