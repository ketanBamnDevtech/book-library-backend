import bookModel from "../models/book.model.js";
import ratingModel from "../models/rating.model.js";
import errorHandler from "./error.controller.js";
import { createWriteStream } from "fs";
import mongoose from "mongoose";
import path, { dirname } from "path";
import { v4 } from "uuid";
import checkIsLoggedIn from "../middleware/checkIsLoggedIn.js";
// import getAuthUser from "../middleware/authUser";

const addBook = async (parent, args, context) => {
  console.log("add book");
  const { title, author, date, collect, coverImage } = args;
  const { file } = await coverImage;
  const { createReadStream, filename, mimetype } = file;

  const fileExtension = filename.split(".").pop();
  const newFilename = `${v4()}.${fileExtension}`;
  const __dirname = path.resolve();
  const fileLocation = path.join(__dirname, "./src/uploads", newFilename);

  const stream = createReadStream();
  await stream.pipe(createWriteStream(fileLocation));

  try {
    console.log(new Date(date));
    const book = await bookModel.create({
      title,
      author,
      date: new Date(date),
      coverImage: newFilename,
      collect,
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

const allBooks = async (parent, args, context) => {
  const { collection, sortBy, filterByTitle, filterByDate } = args;

  const books = await bookModel.find();

  let filteredBooks = books;
  if (collection) {
    filteredBooks = filteredBooks.filter((book) => book.collect === collection);
  }
  if (filterByTitle) {
    filteredBooks = filteredBooks.filter((book) =>
      book.title.toLowerCase().includes(filterByTitle.toLowerCase())
    );
  }
  if (filterByDate) {
    filteredBooks = filteredBooks.filter((book) => book.date === filterByDate);
  }

  if (sortBy) {
    switch (sortBy) {
      case "TITLE_ASC":
        filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "TITLE_DESC":
        filteredBooks.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "DATE_ASC":
        filteredBooks.sort((a, b) => a.date.localeCompare(b.date));
        break;
      case "DATE_DESC":
        filteredBooks.sort((a, b) => b.date.localeCompare(a.date));
        break;
      default:
    }
  }

  return { status: "success", books: filteredBooks };
};

const modifyBook = async (parent, args, context) => {
  const { id, collect } = args.input;

  try {
    const update = {
      collect,
    };
    const book = await bookModel.findOneAndUpdate({ _id: id }, update, {
      returnNewDocument: true,
    });
    console.log(book);
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

const addRating = async (parent, args, context) => {
  const { bookId, userId, rating } = args.input;

  try {
    const data = {
      userId: new mongoose.Types.ObjectId(userId),
      bookId: new mongoose.Types.ObjectId(bookId),
      rating: Number(rating),
    };

    const rate = await ratingModel.create(data);
    return { status: "success", rating: rate };
  } catch (error) {
    errorHandler(error);
  }
};

export default {
  addBook,
  allBooks,
  modifyBook,
  addRating,
};
