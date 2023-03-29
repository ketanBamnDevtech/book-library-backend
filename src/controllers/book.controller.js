import bookModel from "../models/book.model.js";
import errorHandler from "./error.controller.js";

const addBook = async (
  parent,
  { input: { title, author, date, coverImage, collections } },
  { req }
) => {
  try {
    const book = await bookModel.create({
      title,
      author,
      date,
      coverImage,
      collections,
    });
    return {
      status: "success",
      book,
    };
  } catch (error) {
    if (error.code === 11000) {
      throw new ForbiddenError("User already exist");
    }
    errorHandler(error);
  }
};

export default {
  addBook,
};
