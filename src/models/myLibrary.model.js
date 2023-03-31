import mongoose from "mongoose";

const myLibrarySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Rating must have user"],
    },
    bookId: {
      type: mongoose.Schema.ObjectId,
      ref: "Book",
      required: [true, "Review must have book"],
    },
    collect: {
      type: String,
      enum: ["WANT_TO_READ", "READING", "READ"],
      default: "WANT_TO_READ",
    },
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5, 0],
      default: 0,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const myLibraryModel = mongoose.model("MyLibrary", myLibrarySchema);
export default myLibraryModel;
